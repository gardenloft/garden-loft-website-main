import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../../lib/supabase";

import "./Advisory.css";

type Stage =
  | "loading"
  | "invalid"
  | "intro"
  | "review"
  | "completed"
  | "error";

export default function AdvisorySurvey() {
  const [stage, setStage] =
    useState<Stage>("loading");

  const [participantName, setParticipantName] =
    useState("");

  const [confirmSubmitted, setConfirmSubmitted] =
    useState(false);

  const [submitting, setSubmitting] =
    useState(false);

  const params =
    new URLSearchParams(
      window.location.search
    );

  const token =
    params.get("t") ?? "";

  /*
   * Replace these later.
   */
  const VIDEO_EMBED_URL =
    import.meta.env
      .VITE_ADVISORY_VIDEO_EMBED_URL;

  const MICROSOFT_FORM_EMBED_URL =
    import.meta.env
      .VITE_ADVISORY_FORM_EMBED_URL;

  useEffect(() => {
    validateInvitation();
  }, []);

  async function validateInvitation() {
    if (!token) {
      setStage("invalid");
      return;
    }

    try {
      const {
        data,
        error,
      } =
        await supabase.functions.invoke(
          "advisory-access",
          {
            body: {
              action: "validate",
              token,
            },
          }
        );

      if (error) {
        console.error(error);
        setStage("error");
        return;
      }

      if (!data?.valid) {
        setStage("invalid");
        return;
      }

      if (data.completed) {
        setStage("completed");
        return;
      }

      setParticipantName(
        data.name ?? ""
      );

      setStage("intro");
    } catch (error) {
      console.error(error);

      setStage("error");
    }
  }

  function beginReview() {
    /*
     * IMPORTANT:
     *
     * We are NOT consuming the token here.
     *
     * That means if someone accidentally
     * closes their browser while watching
     * the video, they can come back and
     * finish their survey.
     *
     * The token is permanently disabled
     * only after final confirmation.
     */

    setStage("review");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function completeQuestionnaire() {
    if (!confirmSubmitted) {
      return;
    }

    // const confirmed =
    //   window.confirm(
    //     "Please confirm that you have submitted the Microsoft Forms questionnaire.\n\nOnce you complete this review, you will no longer be able to access the video or questionnaire using this invitation link."
    //   );

    // if (!confirmed) {
    //   return;
    // }

    setSubmitting(true);

    try {
      const {
        data,
        error,
      } =
        await supabase.functions.invoke(
          "advisory-access",
          {
            body: {
              action: "complete",
              token,
            },
          }
        );

      if (error) {
        console.error(error);

        alert(
          "We were unable to complete your review. Please try again."
        );

        setSubmitting(false);

        return;
      }

      if (
        data?.alreadyCompleted
      ) {
        finishSession();
        return;
      }

      if (!data?.success) {
        alert(
          "We were unable to complete your review. Please try again."
        );

        setSubmitting(false);

        return;
      }

      finishSession();
    } catch (error) {
      console.error(error);

      alert(
        "We were unable to complete your review. Please try again."
      );

      setSubmitting(false);
    }
  }

  function finishSession() {
    /*
     * Remove token from visible URL
     * after successful completion.
     */
    window.history.replaceState(
      {},
      document.title,
      "/advisory-survey"
    );

    setSubmitting(false);

    setStage("completed");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /*
   * LOADING
   */

  if (stage === "loading") {
    return (
      <main className="advisory-page">
        <div className="advisory-card advisory-centered">
          <div className="advisory-spinner" />

          <p>
            Validating your invitation…
          </p>
        </div>
      </main>
    );
  }

  /*
   * INVALID LINK
   */

  if (stage === "invalid") {
    return (
      <main className="advisory-page">
        <div className="advisory-card advisory-centered">

          <h1>
            GARDEN LOFT | CLIQ | Alberta Innovates
          </h1>

          <h2>
            Advisory Survey
          </h2>

          <p>
            This invitation link is
            invalid or is no longer
            available.
          </p>

          <p className="advisory-muted">
            Please use the unique link
            that was provided to you in
            your invitation email.
          </p>

        </div>
      </main>
    );
  }

  /*
   * ERROR
   */

  if (stage === "error") {
    return (
      <main className="advisory-page">
        <div className="advisory-card advisory-centered">

          <h1>
            GARDEN LOFT | CLIQ | Alberta Innovates
          </h1>

          <h2>
            Something Went Wrong
          </h2>

          <p>
            We couldn't validate your
            invitation.
          </p>

          <button
            className="advisory-primary-button"
            onClick={() => {
              setStage("loading");
              validateInvitation();
            }}
          >
            Try Again
          </button>

        </div>
      </main>
    );
  }

  /*
   * COMPLETED
   */

  if (stage === "completed") {
    return (
      <main className="advisory-page">
        <div className="advisory-card advisory-centered">

          <div className="advisory-success-icon">
            ✓
          </div>

          <h1>
            Thank You
          </h1>

          <h2>
            Advisory Survey Completed
          </h2>

          <p>
            Your Garden Loft advisory
            questionnaire has been
            completed.
          </p>

          <p className="advisory-muted">
            This invitation can no longer
            be used to access the video
            or questionnaire.
          </p>

          <p>
            Thank you for taking the time
            to provide your feedback.
          </p>

        </div>
      </main>
    );
  }

  /*
   * INTRO
   */

  if (stage === "intro") {
    return (
      <main className="advisory-page">

        <div className="advisory-card">

          <div className="advisory-header">

            <div>
              <div className="advisory-brand">
                GARDEN LOFT | CLIQ | Alberta Innovates
              </div>

              <h1>
                Advisory Survey
              </h1>
            </div>

          </div>

          {participantName && (
            <p className="advisory-welcome">
              Welcome, {participantName}.
            </p>
          )}

          <div className="advisory-notice">

            <h2>
              Before You Begin
            </h2>

            <p>
              You have been invited to
              participate in a <strong>one-time </strong>
               advisory survey.
            </p>


            <p>
              Please allow approximately
              <strong> 15-20 minutes </strong>
              to complete the review.
            </p>

            <div className="advisory-time-grid">

              <div>
                <strong>
                  10–15 minutes
                </strong>

                <span>
                  Watch the video
                </span>
              </div>

              <div>
                <strong>
                  5–7 minutes
                </strong>

                <span>
                  Complete the questionnaire
                </span>
              </div>

            </div>

            <p>
              Please watch the entire video
              before completing the
              questionnaire.
            </p>
            <br />

            <p className="advisory-warning">
              Once you submit the
              questionnaire and select
              “Complete Questionnaire” at
              the end of this review, you
              will not be able to access
              the review again.
            </p>

            <p>

              <br />
        
              <p>
            <strong>Confidentiality Notice: </strong>

The contents of this survey are confidential and are intended solely for the purposes of the Garden Loft / CLIQ project in collaboration with Alberta Innovates. Information, materials, questions, concepts, and other content contained within this survey should not be copied, distributed, shared, reproduced, or disclosed to individuals outside of the project without prior authorization.

By participating in this survey, you are asked to respect the confidentiality of the materials presented and to use the information only for the intended project and research purposes.

            </p>
            </p>

          </div>

          <button
            className="advisory-primary-button advisory-large-button"
            onClick={beginReview}
          >
            Begin Review
          </button>

        </div>

      </main>
    );
  }

  /*
   * MAIN REVIEW
   */

  return (
    <main className="advisory-page">

      <div className="advisory-card advisory-review-card">

        <header className="advisory-review-header">

          <div className="advisory-brand">
            GARDEN LOFT | CLIQ | Alberta Innovates
          </div>

          <h1>
            Advisory Survey
          </h1>

          <p>
            Please watch the following
            video in full before completing
            the questionnaire.
          </p>

        </header>

        {/* VIDEO */}

        <section className="advisory-section">

          <div className="advisory-step">
            Step 1
          </div>

          <h2>
            Watch the Video
          </h2>

          <p>
            Approximately 15 minutes
          </p>

          <div className="advisory-video-wrapper">

            {VIDEO_EMBED_URL ? (
              <iframe
                src={VIDEO_EMBED_URL}
                title="Garden Loft Advisory Survey Video"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="advisory-placeholder">
                Video will appear here.
              </div>
            )}

          </div>

        </section>

        {/* MICROSOFT FORM */}

        <section className="advisory-section">

          <div className="advisory-step">
            Step 2
          </div>

          <h2>
            Complete the Survey
          </h2>

          <p>
            Please answer all <b>6</b> required
            questions and press
            <strong> Submit </strong>
            within the Microsoft Form.
          </p>

          <div className="advisory-form-wrapper">

            {MICROSOFT_FORM_EMBED_URL ? (
              <iframe
                src={MICROSOFT_FORM_EMBED_URL}
                title="Garden Loft Advisory Questionnaire"
                width="100%"
                height="1400"
                frameBorder="0"
                marginWidth={0}
                marginHeight={0}
              >
                Loading…
              </iframe>
            ) : (
              <div className="advisory-placeholder">
                Microsoft Form will
                appear here.
              </div>
            )}

          </div>

        </section>

        {/* FINAL CONFIRMATION */}

        <section className="advisory-completion-section">

          <div className="advisory-step">
            Final Step
          </div>

          <h2>
            Complete Your Review
          </h2>

          <p>
            After you have pressed
            <strong> Submit </strong>
            inside the Microsoft Form,
            confirm below to complete
            your Garden Loft review.
          </p>

          <label className="advisory-checkbox-row">

            <input
              type="checkbox"
              checked={confirmSubmitted}
              onChange={(event) =>
                setConfirmSubmitted(
                  event.target.checked
                )
              }
            />

            <span>
              I confirm that I have
              submitted the questionnaire.
            </span>

          </label>

          <div className="advisory-final-warning">

            {/* Once completed, this invitation {" "}
            <u>cannot</u> be used again. */}

            Once you complete this review, you will no longer
  be able to access the video or questionnaire using
  this invitation link.

          </div>

          <button
            className="advisory-primary-button advisory-large-button"
            disabled={
              !confirmSubmitted ||
              submitting
            }
            onClick={
              completeQuestionnaire
            }
          >
            {submitting
              ? "Completing…"
              : "Complete Questionnaire"}
          </button>

        </section>

      </div>

    </main>
  );
}