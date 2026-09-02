import { profile } from "../data/profile";

export interface ContactPayload {
  identity: string;
  email: string;
  message: string;
}

export async function sendContactEmail({
  identity,
  email,
  message,
}: ContactPayload): Promise<void> {
  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: identity,
        email,
        message,
        _subject: `Portfolio Contact — ${identity}`,
        _template: "table",
        _captcha: "false",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Email request failed (${response.status})`);
  }

  const result = (await response.json()) as { success?: string; message?: string };

  if (!result.success) {
    throw new Error(result.message ?? "Email delivery failed");
  }
}
