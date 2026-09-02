import { saveInquiry } from "@/lib/inquiries";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || "info@bharatspace.co";

function json(data, status = 200) {
  return Response.json(data, { status });
}

async function emailInquiry({ name, email, phone, message, website, origin }) {
  if (process.env.WEB3FORMS_ACCESS_KEY) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_ACCESS_KEY,
        subject: `Bharat Space inquiry from ${name}`,
        from_name: "Bharat Space Website",
        name,
        email,
        phone: phone || "Not provided",
        website: website || "Not provided",
        message,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.success === false) {
      throw new Error(data.message || "Web3Forms delivery failed");
    }
    return;
  }

  const res = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(TO_EMAIL)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: origin,
        Referer: `${origin}/contact`,
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || "Not provided",
        website: website || "Not provided",
        message,
        _subject: `Bharat Space inquiry from ${name}`,
        _template: "table",
        _captcha: "false",
        _replyto: email,
      }),
    }
  );
  const data = await res.json().catch(() => ({}));
  const failed = data.success === "false" || data.success === false;
  const activating =
    typeof data.message === "string" &&
    data.message.toLowerCase().includes("activation");
  if (!res.ok || (failed && !activating)) {
    throw new Error(data.message || "Email delivery failed");
  }
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  const name = String(body?.name || "").trim();
  const email = String(body?.email || "").trim();
  const phone = String(body?.phone || "").trim();
  const message = String(body?.message || "").trim();
  const website = String(body?.website || "").trim();
  const company = String(body?.company || "").trim();

  if (company) {
    return json({ ok: true });
  }

  if (name.length < 2 || name.length > 120) {
    return json({ ok: false, error: "Please enter your full name." }, 400);
  }
  if (!EMAIL_RE.test(email) || email.length > 200) {
    return json(
      { ok: false, error: "Please enter a valid email address." },
      400
    );
  }
  if (phone.length > 40) {
    return json({ ok: false, error: "Phone number is too long." }, 400);
  }
  if (website.length > 200) {
    return json({ ok: false, error: "Website is too long." }, 400);
  }
  if (message.length < 10 || message.length > 4000) {
    return json(
      {
        ok: false,
        error: "Please describe your requirement (at least 10 characters).",
      },
      400
    );
  }

  const inquiry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    name,
    phone,
    email,
    message,
    website,
  };

  let saved = false;
  try {
    saveInquiry(inquiry);
    saved = true;
  } catch (err) {
    console.error("Failed to save inquiry:", err);
  }

  try {
    const origin =
      request.headers.get("origin") ||
      (request.headers.get("referer")
        ? new URL(request.headers.get("referer")).origin
        : "https://bharatspace.co");
    await emailInquiry({ name, email, phone, message, website, origin });
  } catch (err) {
    console.error("Contact email error:", err);
    if (!saved) {
      return json(
        {
          ok: false,
          error:
            "Could not send your message. Please email info@bharatspace.co directly.",
        },
        502
      );
    }
  }

  return json({ ok: true });
}
