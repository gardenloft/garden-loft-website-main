import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://gardenloft.ca",
  "https://www.gardenloft.ca",
  "http://localhost:5173",
]);

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") ?? "";

  const allowedOrigin = allowedOrigins.has(origin)
    ? origin
    : "https://gardenloft.ca";

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods":
      "POST, OPTIONS",
    "Content-Type": "application/json",
  };
}

async function sha256(value: string) {
  const encoded =
    new TextEncoder().encode(value);

  const digest =
    await crypto.subtle.digest(
      "SHA-256",
      encoded
    );

  return Array.from(
    new Uint8Array(digest)
  )
    .map((byte) =>
      byte.toString(16).padStart(2, "0")
    )
    .join("");
}

Deno.serve(async (req) => {
  const headers = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(
      "ok",
      {
        headers,
      }
    );
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Method not allowed",
      }),
      {
        status: 405,
        headers,
      }
    );
  }

  try {
    const body = await req.json();

    const action = body?.action;
    const token = body?.token;

    if (
      typeof token !== "string" ||
      token.length < 20
    ) {
      return new Response(
        JSON.stringify({
          valid: false,
          error: "Invalid token",
        }),
        {
          status: 200,
          headers,
        }
      );
    }

    if (
      action !== "validate" &&
      action !== "complete"
    ) {
      return new Response(
        JSON.stringify({
          error: "Invalid action",
        }),
        {
          status: 400,
          headers,
        }
      );
    }

    const supabaseUrl =
      Deno.env.get("SUPABASE_URL");

    const serviceRoleKey =
      Deno.env.get(
        "SUPABASE_SERVICE_ROLE_KEY"
      );

    if (
      !supabaseUrl ||
      !serviceRoleKey
    ) {
      throw new Error(
        "Supabase server configuration missing"
      );
    }

    // SERVER-SIDE ONLY.
    // Never put this service role key
    // inside your Vite application.
    const admin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      }
    );

    const tokenHash =
      await sha256(token);

    const {
      data: invite,
      error: findError,
    } = await admin
      .from("advisory_invites")
      .select(
        "id, name, status, completed_at"
      )
      .eq(
        "token_hash",
        tokenHash
      )
      .maybeSingle();

    if (findError) {
      console.error(findError);

      throw new Error(
        "Unable to validate invitation"
      );
    }

    if (!invite) {
      return new Response(
        JSON.stringify({
          valid: false,
        }),
        {
          status: 200,
          headers,
        }
      );
    }

    /*
     * CHECK TOKEN
     */
    if (action === "validate") {
      return new Response(
        JSON.stringify({
          valid: true,

          name: invite.name,

          completed:
            invite.status ===
            "completed",

          completedAt:
            invite.completed_at,
        }),
        {
          status: 200,
          headers,
        }
      );
    }

    /*
     * COMPLETE REVIEW
     */
    if (
      invite.status ===
      "completed"
    ) {
      return new Response(
        JSON.stringify({
          success: false,
          alreadyCompleted: true,
        }),
        {
          status: 200,
          headers,
        }
      );
    }

    const {
      data: completedInvite,
      error: updateError,
    } = await admin
      .from("advisory_invites")
      .update({
        status: "completed",

        completed_at:
          new Date().toISOString(),
      })
      .eq(
        "id",
        invite.id
      )
      .eq(
        "status",
        "pending"
      )
      .select("id")
      .maybeSingle();

    if (updateError) {
      console.error(updateError);

      throw new Error(
        "Unable to complete invitation"
      );
    }

    /*
     * Protect against two tabs trying
     * to complete the same token.
     */
    if (!completedInvite) {
      return new Response(
        JSON.stringify({
          success: false,
          alreadyCompleted: true,
        }),
        {
          status: 200,
          headers,
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        status: 200,
        headers,
      }
    );
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({
        error:
          "Something went wrong.",
      }),
      {
        status: 500,
        headers,
      }
    );
  }
});