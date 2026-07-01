"use client";

import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-2">
              Ready to Get
              <br />
              Our New Stuff?
            </h2>
          </div>

          <div className="flex-1 w-full lg:w-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-3 mb-6">
              <input
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-5 py-3 bg-white rounded-xl text-sm text-gray-900 placeholder-gray-400 outline-none border border-gray-200 focus:border-gray-400 transition-colors"
              />
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors whitespace-nowrap border border-gray-700"
              >
                Send
              </button>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              <span className="font-semibold text-white">Karibu for Homes and Needs</span>
              <br />
              Lorem Ipsum is simply the text of the printing, and then create
              a complete smart EV charging solution that is right for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
