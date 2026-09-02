import { randomBytes, createHash } from "node:crypto";
import { writeFileSync } from "node:fs";

const participants = [
  {
    name: "John Smith",
    email: "email@email.com",
  },
  
 

  // Add the remaining participants here.
];

const SITE_URL =
  "https://gardenloft.ca/advisory-survey";

function makeToken() {
  return randomBytes(32).toString("hex");
}

function hashToken(token) {
  return createHash("sha256")
    .update(token)
    .digest("hex");
}

function escapeCsv(value) {
  const stringValue = String(value ?? "");

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
}

const databaseRows = [];
const invitationRows = [];

for (const participant of participants) {
  const token = makeToken();
  const tokenHash = hashToken(token);

  const link =
    `${SITE_URL}?t=${encodeURIComponent(token)}`;

  databaseRows.push({
    name: participant.name,
    email: participant.email,
    token_hash: tokenHash,
    status: "pending",
  });

  invitationRows.push({
    name: participant.name,
    email: participant.email,
    link,
  });
}

const databaseCsv = [
  "name,email,token_hash,status",
  ...databaseRows.map((row) =>
    [
      escapeCsv(row.name),
      escapeCsv(row.email),
      escapeCsv(row.token_hash),
      escapeCsv(row.status),
    ].join(",")
  ),
].join("\n");

const invitationsCsv = [
  "name,email,link",
  ...invitationRows.map((row) =>
    [
      escapeCsv(row.name),
      escapeCsv(row.email),
      escapeCsv(row.link),
    ].join(",")
  ),
].join("\n");

writeFileSync(
  "advisory-invites-database.csv",
  databaseCsv
);

writeFileSync(
  "advisory-invitation-links.csv",
  invitationsCsv
);

console.log(
  `Generated ${participants.length} advisory invitations.`
);

console.log(
  "\nadvisory-invites-database.csv -> import into Supabase"
);

console.log(
  "advisory-invitation-links.csv -> use when emailing participants"
);