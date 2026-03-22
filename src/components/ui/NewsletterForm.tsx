"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-3/5 flex h-11 shadow-sm rounded-r-md overflow-hidden"
    >
      <input
        type="email"
        name="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={submitted ? "Email Terkirim!" : "Masukkan Email Anda"}
        className="w-full px-4 h-full text-sm bg-white focus:outline-none placeholder-gray-400 text-gray-800 transition-colors"
        disabled={submitted}
      />
      <button
        type="submit"
        disabled={submitted}
        className={`font-bold h-full px-6 text-xs whitespace-nowrap transition-all duration-300 ${
          submitted
            ? "bg-green-500 text-white"
            : "bg-gradient-to-r from-brand-pink-start to-brand-blue-start text-white hover:opacity-80 hover:scale-105 active:scale-95"
        }`}
      >
        {submitted ? "TERKIRIM" : "KIRIM"}
      </button>
    </form>
  );
}
