"use client";

import { useState } from "react";
import { publicPath } from "@/lib/publicPath";

const EMPTY = {
  name: "",
  phone: "",
  email: "",
  message: "",
  website: "",
  company: "",
};

function str(value) {
  return String(value ?? "").trim();
}

export function useContactForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (key) => (e) =>
    setForm((f) => ({ ...EMPTY, ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    if (str(form.company)) {
      setStatus("sent");
      setForm(EMPTY);
      return;
    }

    if (str(form.message).length < 10) {
      setStatus("error");
      setError("Please enter at least 10 characters in your message.");
      return;
    }

    setStatus("sending");
    setError("");

    const payload = {
      name: str(form.name),
      phone: str(form.phone),
      email: str(form.email),
      message: str(form.message),
      website: str(form.website),
    };

    try {
      const res = await fetch(publicPath("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        throw new Error(
          data.error || "Could not send your message. Please try again."
        );
      }
      setStatus("sent");
      setForm(EMPTY);
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Could not send your message. Please try again."
      );
    }
  };

  return { form, update, handleSubmit, status, error };
}
