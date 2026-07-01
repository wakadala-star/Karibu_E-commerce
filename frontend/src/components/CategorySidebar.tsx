"use client";

import {
  LayoutGrid,
  Home,
  Music,
  Smartphone,
  HardDrive,
  Sparkles,
  TrendingUp,
  Percent,
  ChevronDown,
} from "lucide-react";
import { categories, filterOptions } from "@/data/products";

const iconMap: Record<string, React.ReactNode> = {
  grid: <LayoutGrid className="w-4 h-4" />,
  home: <Home className="w-4 h-4" />,
  music: <Music className="w-4 h-4" />,
  smartphone: <Smartphone className="w-4 h-4" />,
  "hard-drive": <HardDrive className="w-4 h-4" />,
  sparkles: <Sparkles className="w-4 h-4" />,
  "trending-up": <TrendingUp className="w-4 h-4" />,
  percent: <Percent className="w-4 h-4" />,
};

interface CategorySidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedFilter: string | null;
  onFilterChange: (filter: string | null) => void;
}

export default function CategorySidebar({
  selectedCategory,
  onCategoryChange,
  selectedFilter,
  onFilterChange,
}: CategorySidebarProps) {
  return (
    <aside className="w-full lg:w-56 flex-shrink-0">
      <div className="sticky top-24 space-y-6">
        <div>
          <h3 className="text-sm font-bold text-black mb-3">Category</h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === category.id
                    ? "bg-black text-white font-medium"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {iconMap[category.icon]}
                <span className="flex-1 text-left">{category.name}</span>
                {category.id === "all" && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded ${
                      selectedCategory === category.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {category.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 space-y-1">
          {filterOptions.map((filter) => (
            <button
              key={filter.id}
              onClick={() =>
                onFilterChange(selectedFilter === filter.id ? null : filter.id)
              }
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedFilter === filter.id
                  ? "bg-black text-white font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {iconMap[filter.icon]}
              <span className="flex-1 text-left">{filter.name}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  selectedFilter === filter.id ? "rotate-180" : ""
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
