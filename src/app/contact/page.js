"use client";

import { useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

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
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setStatus({ loading: false, success: true });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus({ loading: false, success: false });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center px-6 py-20">
      <section className="max-w-2xl w-full text-center mb-12">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-lg text-foreground/80">
          Feel free to reach out for collaborations, opportunities, or just to
          say hi!
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white/70 backdrop-blur-md rounded-3xl shadow-md border border-jordyblue/30 p-8 flex flex-col gap-6"
      >
        {/* Name */}
        <div className="flex flex-col text-left">
          <label htmlFor="name" className="font-medium mb-1 text-sm">
            Name
          </label>
          <input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-jordyblue transition-all"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col text-left">
          <label htmlFor="email" className="font-medium mb-1 text-sm">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-jordyblue transition-all"
            placeholder="you@example.com"
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col text-left">
          <label htmlFor="subject" className="font-medium mb-1 text-sm">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-jordyblue transition-all"
            placeholder="Message subject"
          />
        </div>

        {/* Message */}
        <div className="flex flex-col text-left">
          <label htmlFor="message" className="font-medium mb-1 text-sm">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-jordyblue transition-all resize-none"
            placeholder="Write your message here..."
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status.loading}
          className={`rounded-full px-8 py-3 font-semibold text-white bg-jordyblue hover:bg-jordyblue/90 transition-all ${
            status.loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {status.loading ? "Sending..." : "Send Message"}
        </button>

        {/* Feedback */}
        {status.success === true && (
          <p className="text-green-600 text-sm text-center mt-2">
            ✅ Message sent successfully!
          </p>
        )}
        {status.success === false && (
          <p className="text-red-600 text-sm text-center mt-2">
            ❌ Something went wrong. Please try again.
          </p>
        )}
      </form>
    </main>
  );
}
