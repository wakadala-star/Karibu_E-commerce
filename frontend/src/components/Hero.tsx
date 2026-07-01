"use client";

import { Search } from "lucide-react";
import { forwardRef } from "react";

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearch: () => void;
}

const Hero = forwardRef<HTMLInputElement, HeroProps>(
  ({ searchQuery, onSearchChange, onSearch }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        onSearch();
      }
    };

    return (
      <section id="hero" className="relative w-full h-[320px] sm:h-[380px] lg:h-[420px] overflow-hidden bg-gray-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-600/70 to-gray-400/50" />

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[120px] sm:text-[180px] lg:text-[240px] font-bold text-white/80 leading-none select-none tracking-tight">
            Shop
          </h1>
        </div>

        <div className="absolute bottom-6 left-0 right-0 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <h2 className="text-lg sm:text-xl font-bold text-black whitespace-nowrap">
                Give All You Need
              </h2>

              <div className="flex-1 flex items-center bg-gray-50 rounded-xl px-4 py-2.5 border border-gray-100">
                <Search className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
                <input
                  ref={ref}
                  type="text"
                  placeholder="Search on Karibu"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                />
              </div>

              <button
                onClick={onSearch}
                className="bg-black text-white px-6 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-800 transition-colors whitespace-nowrap"
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }
);

Hero.displayName = "Hero";

export default Hero;
