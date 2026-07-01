"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategorySidebar from "@/components/CategorySidebar";
import ProductGrid from "@/components/ProductGrid";
import Pagination from "@/components/Pagination";
import Recommendations from "@/components/Recommendations";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { products, recommendedProducts } from "@/data/products";
import { useAdminStore } from "@/store/admin";

const ITEMS_PER_PAGE = 9;

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const adminProducts = useAdminStore((state) => state.products);

  const allProducts = useMemo(() => {
    return [...products, ...adminProducts];
  }, [adminProducts]);

  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (activeSearch.trim()) {
      const query = activeSearch.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          (p.badge && p.badge.toLowerCase().includes(query))
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (selectedFilter === "new-arrival") {
      const adminIds = adminProducts.map((p) => p.id);
      result = result.filter((p) => adminIds.includes(p.id));
      if (result.length === 0) {
        result = [...allProducts].slice(0, 6);
      }
    } else if (selectedFilter === "best-seller") {
      result = result.filter((p) => p.rating >= 4.8);
    } else if (selectedFilter === "on-discount") {
      result = result.filter((p) => p.price < 30);
    }

    return result;
  }, [allProducts, adminProducts, selectedCategory, selectedFilter, activeSearch]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const newAdminProducts = useMemo(() => {
    return adminProducts.length > 0 ? adminProducts : recommendedProducts;
  }, [adminProducts]);

  const handleSearch = useCallback(() => {
    setActiveSearch(searchQuery);
    setCurrentPage(1);
  }, [searchQuery]);

  const focusSearch = useCallback(() => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 500);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSearchClick={focusSearch} />
      <Hero
        ref={searchInputRef}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
      />

      {activeSearch.trim() && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing results for &quot;<span className="font-medium text-black">{activeSearch}</span>&quot;
              {' '}({filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"} found)
            </p>
            <button
              onClick={() => {
                setActiveSearch("");
                setSearchQuery("");
              }}
              className="text-sm text-black font-medium hover:underline"
            >
              Clear search
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <CategorySidebar
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
            selectedFilter={selectedFilter}
            onFilterChange={(filter) => {
              setSelectedFilter(filter);
              setCurrentPage(1);
            }}
          />

          <main className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-2">No products found</p>
                <p className="text-gray-400 text-sm">Try a different search term or category</p>
              </div>
            ) : (
              <>
                <ProductGrid products={paginatedProducts} />

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <Recommendations products={newAdminProducts} />

      <Newsletter />
      <Footer />
    </div>
  );
}
