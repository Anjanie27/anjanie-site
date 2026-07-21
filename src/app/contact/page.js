"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, MessageCircle, Send, Sparkles } from "lucide-react";

const fields = [
  { id: "name", label: "Name", placeholder: "Your name", type: "text" },
  {
    id: "email",
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
  },
  {
    id: "subject",
    label: "Subject",
    placeholder: "Message subject",
    type: "text",
  },
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState({
    loading: false,
    success: null,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null });

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      setStatus({ loading: false, success: true });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({ loading: false, success: false });
    }
  };

  return (
    <main className="spotlight noise-overlay relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-20 text-foreground sm:px-8">
      <div className="absolute inset-0 -z-20 animated-gradient-bg" />
      <div className="soft-orb left-[8%] top-28 h-36 w-36 bg-skyblue/25" />
      <div className="soft-orb bottom-24 right-[10%] h-44 w-44 bg-[#f9a8d4]/23 [animation-delay:1.6s]" />

      <section className="mb-10 max-w-2xl text-center animate-slide-down">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-jordyblue to-skyblue text-white shadow-lg shadow-jordyblue/25">
          <MessageCircle size={26} />
        </div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.34em] text-jordyblue">
          Contact
        </p>
        <h1 className="animated-gradient-text text-4xl font-black tracking-tight lg:text-6xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-base leading-8 text-foreground/76 sm:text-lg">
          Reach out for collaborations, opportunities, questions, or even just
          to say hi. I’d love to hear from you.
        </p>
      </section>

      <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="glass-card rounded-[2rem] p-6 animate-fade-up sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f9a8d4] to-jordyblue text-white shadow-lg">
              <Sparkles size={22} />
            </div>
            <div>
              <h2 className="text-xl font-bold">Let’s create momentum</h2>
              <p className="text-sm text-foreground/65">
                I usually reply when I can.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="group flex items-center gap-4 rounded-2xl border border-white/70 bg-white/54 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white/80">
              <Mail className="text-jordyblue" size={22} />
              <div>
                <p className="font-semibold">Email form</p>
                <p className="text-sm text-foreground/62">
                  Send a message directly below.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border border-jordyblue/16 bg-gradient-to-r from-[#eef4ff]/82 to-lavenderblush/65 p-4 text-sm leading-6 text-foreground/70">
              Tip: include a clear subject so your message is easier to sort.
            </div>
          </div>
        </aside>

        <form
          onSubmit={handleSubmit}
          className="glass-card flex w-full flex-col gap-5 rounded-[2rem] p-6 animate-fade-up sm:p-8"
          style={{ animationDelay: "0.08s" }}
        >
          {fields.map((field) => (
            <div key={field.id} className="flex flex-col text-left">
              <label
                htmlFor={field.id}
                className="mb-2 text-sm font-bold text-foreground/78"
              >
                {field.label}
              </label>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                value={form[field.id]}
                onChange={handleChange}
                required
                className="rounded-2xl border border-jordyblue/18 bg-white/74 px-4 py-3 text-foreground shadow-sm outline-none transition-all duration-300 placeholder:text-foreground/35 focus:-translate-y-0.5 focus:border-jordyblue focus:bg-white focus:ring-4 focus:ring-jordyblue/15"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          <div className="flex flex-col text-left">
            <label
              htmlFor="message"
              className="mb-2 text-sm font-bold text-foreground/78"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={form.message}
              onChange={handleChange}
              required
              className="resize-none rounded-2xl border border-jordyblue/18 bg-white/74 px-4 py-3 text-foreground shadow-sm outline-none transition-all duration-300 placeholder:text-foreground/35 focus:-translate-y-0.5 focus:border-jordyblue focus:bg-white focus:ring-4 focus:ring-jordyblue/15"
              placeholder="Write your message here..."
            />
          </div>

          <button
            type="submit"
            disabled={status.loading}
            className={`group inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-jordyblue via-skyblue to-[#f9a8d4] px-8 py-3 font-bold text-white shadow-lg shadow-jordyblue/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
              status.loading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {status.loading ? "Sending..." : "Send Message"}
            <Send
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>

          {status.success === true && (
            <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-center text-sm font-semibold text-green-700 animate-fade-up">
              ✅ Message sent successfully!
            </p>
          )}
          {status.success === false && (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700 animate-fade-up">
              ❌ Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
