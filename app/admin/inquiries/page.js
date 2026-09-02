import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { readInquiries } from "@/lib/inquiries";

export const metadata = {
  title: "Contact inquiries | Bharat Space",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function isAuthorized(searchParams) {
  const secret = process.env.INQUIRIES_SECRET;
  if (secret) return searchParams?.key === secret;
  const host = headers().get("host") || "";
  return host.startsWith("localhost") || host.startsWith("127.0.0.1");
}

function formatWhen(iso) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default function InquiriesPage({ searchParams }) {
  if (!isAuthorized(searchParams)) notFound();

  const inquiries = readInquiries();

  return (
    <main className="min-h-screen px-4 sm:px-6 py-12 sm:py-16">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs tracking-[0.22em] uppercase text-sky-400 font-semibold mb-3">
          Admin
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
          Contact inquiries
        </h1>
        <p className="text-slate-300 text-base mb-8">
          {inquiries.length === 0
            ? "No messages yet. Submit the contact form to see a record here."
            : `${inquiries.length} message${inquiries.length === 1 ? "" : "s"} saved from the website contact form.`}
        </p>

        {inquiries.length > 0 && (
          <div className="space-y-4">
            {inquiries.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-white/10 bg-space-500/70 backdrop-blur p-5 sm:p-6 overflow-hidden min-w-0"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4 min-w-0">
                  <h2 className="text-xl font-semibold text-white break-words min-w-0">
                    {item.name}
                  </h2>
                  <p className="text-sm text-slate-400 shrink-0">
                    {formatWhen(item.createdAt)}
                  </p>
                </div>
                <dl className="grid sm:grid-cols-2 gap-3 text-sm mb-4 min-w-0">
                  <div className="min-w-0">
                    <dt className="text-slate-400 mb-1">Email</dt>
                    <dd>
                      <a
                        href={`mailto:${item.email}`}
                        className="text-sky-400 hover:text-sky-300 break-all"
                      >
                        {item.email}
                      </a>
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-slate-400 mb-1">Phone</dt>
                    <dd className="text-white break-all">
                      {item.phone ? (
                        <a href={`tel:${item.phone}`} className="hover:text-sky-300">
                          {item.phone}
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </dd>
                  </div>
                  <div className="min-w-0 sm:col-span-2">
                    <dt className="text-slate-400 mb-1">Website</dt>
                    <dd className="text-white break-all">
                      {item.website ? (
                        <a
                          href={
                            /^https?:\/\//i.test(item.website)
                              ? item.website
                              : `https://${item.website}`
                          }
                          target="_blank"
                          rel="noreferrer"
                          className="text-sky-400 hover:text-sky-300"
                        >
                          {item.website}
                        </a>
                      ) : (
                        "Not provided"
                      )}
                    </dd>
                  </div>
                </dl>
                <p className="text-slate-400 text-sm mb-1">Message</p>
                <p className="text-white text-base leading-relaxed whitespace-pre-wrap break-all">
                  {item.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
