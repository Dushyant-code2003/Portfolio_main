import { useState, useRef, type FormEvent } from "react";
import { profile } from "../../data/profile";
import { useAppContext } from "../../context/AppContext";
import { sendContactEmail } from "../../utils/sendContactEmail";
import "./Contact.css";

type SubmitState = "idle" | "connecting" | "encrypting" | "complete" | "error";

export default function Contact() {
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const { setMode } = useAppContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state !== "idle" && state !== "error") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const identity = String(data.get("identity") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!identity || !email || !message) return;

    setErrorMessage("");
    setState("connecting");

    try {
      await sendContactEmail({ identity, email, message });

      setState("encrypting");
      await delay(600);
      setState("complete");
      form.reset();
    } catch {
      setState("error");
      setErrorMessage(
        "Transmission failed. Please try again or email directly."
      );
    }
  };

  const statusMessages: Record<SubmitState, string> = {
    idle: "",
    connecting: "CONNECTING...",
    encrypting: "ENCRYPTING MESSAGE...",
    complete: "TRANSMISSION COMPLETE.",
    error: "TRANSMISSION FAILED.",
  };

  const isSubmitting = state === "connecting" || state === "encrypting";

  return (
    <section id="connect" className="contact section" aria-label="Contact">
      <p className="section-label">CHAPTER 08 — ESTABLISH CONNECTION</p>
      <h2 className="section-title">
        Open A<br />Connection
      </h2>

      <form
        ref={formRef}
        className="contact__form"
        onSubmit={handleSubmit}
        noValidate
      >
        {/* Honeypot — hidden from users, catches bots */}
        <input
          type="text"
          name="_honey"
          tabIndex={-1}
          autoComplete="off"
          className="contact__honeypot"
          aria-hidden
        />

        <div className="contact__field">
          <label className="contact__label" htmlFor="identity">
            IDENTITY
          </label>
          <input
            id="identity"
            name="identity"
            className="contact__input"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            disabled={isSubmitting}
            onFocus={() => setMode("connect")}
            onBlur={() => setMode("default")}
          />
        </div>

        <div className="contact__field">
          <label className="contact__label" htmlFor="email">
            EMAIL
          </label>
          <input
            id="email"
            name="email"
            className="contact__input"
            type="email"
            required
            autoComplete="email"
            placeholder="you@domain.com"
            disabled={isSubmitting}
          />
        </div>

        <div className="contact__field">
          <label className="contact__label" htmlFor="message">
            MESSAGE
          </label>
          <textarea
            id="message"
            name="message"
            className="contact__textarea"
            required
            placeholder="Transmit your message..."
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          className="contact__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "TRANSMITTING..." : "ESTABLISH CONNECTION"}
        </button>

        <p
          className={`contact__status ${state === "error" ? "contact__status--error" : ""}`}
          aria-live="polite"
        >
          {statusMessages[state]}
          {state === "complete" && (
            <>
              <br />
              <span className="contact__status-note">
                Message sent to {profile.email}. I'll get back to you.
              </span>
            </>
          )}
          {state === "error" && (
            <>
              <br />
              <span className="contact__status-note">{errorMessage}</span>
            </>
          )}
        </p>
      </form>

      <div className="contact__links">
        <a href={`mailto:${profile.email}`} className="contact__link">
          {profile.email}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="contact__link"
        >
          GITHUB
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="contact__link"
        >
          LINKEDIN
        </a>
      </div>

      <p className="contact__footer">
        © {new Date().getFullYear()} {profile.name.toUpperCase()} · ENGINEERED WITH INTENT
      </p>
    </section>
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
