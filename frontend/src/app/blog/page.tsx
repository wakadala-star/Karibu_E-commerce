"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import { blogPosts, blogCategories } from "@/data/blog";
import type { BlogPost } from "@/data/blog";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Search,
  Tag,
  X,
  ChevronRight,
} from "lucide-react";

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const featuredPost = blogPosts.find((p) => p.featured);
  const regularPosts = blogPosts.filter((p) => !p.featured);

  const filteredPosts = useMemo(() => {
    let result = [...regularPosts];

    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query) ||
          p.tags.some((t) => t.toLowerCase().includes(query))
      );
    }

    return result;
  }, [selectedCategory, searchQuery, regularPosts]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-gray-500 mb-3 tracking-wide uppercase">
              Karibu Blog
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4 leading-tight">
              Insights, Guides &amp; News
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              Expert advice on tech, home security, audio gear, and everything
              you need to make smarter purchase decisions.
            </p>

            <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-gray-200 max-w-lg">
              <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {featuredPost && selectedCategory === "all" && !searchQuery && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-6 bg-black rounded-full" />
            <h2 className="text-lg font-bold text-black">Featured Article</h2>
          </div>

          <button
            onClick={() => setSelectedPost(featuredPost)}
            className="w-full text-left bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 relative h-64 lg:h-auto">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('${featuredPost.image}')` }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                    Featured
                  </span>
                </div>
              </div>

              <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-medium text-black bg-gray-100 px-3 py-1 rounded-full capitalize">
                    {featuredPost.category.replace("-", " ")}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3 group-hover:text-gray-700 transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-gray-500 text-sm mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-xs">
                        {featuredPost.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">
                        {featuredPost.author}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(featuredPost.publishedAt)}
                      </p>
                    </div>
                  </div>

                  <span className="flex items-center gap-1 text-sm font-medium text-black group-hover:gap-2 transition-all">
                    Read Article
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          </button>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-black rounded-full" />
          <h2 className="text-lg font-bold text-black">
            {selectedCategory === "all"
              ? "Latest Articles"
              : blogCategories.find((c) => c.id === selectedCategory)?.name}
          </h2>
        </div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {blogCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? "bg-black text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">No articles found</p>
            <p className="text-gray-400 text-sm">
              Try a different search term or category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <button
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="text-left bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${post.image}')` }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-3 py-1 rounded-full capitalize">
                      {post.category.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-black mb-2 group-hover:text-gray-700 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-[10px]">
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-black">
                        {post.author}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {post.authorRole}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </section>

      <Newsletter />
      <Footer />

      {selectedPost && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center overflow-y-auto py-10 px-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl my-auto">
            <div className="relative h-64 sm:h-80">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-t-2xl"
                style={{ backgroundImage: `url('${selectedPost.image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-2xl" />

              <button
                onClick={() => setSelectedPost(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-white/90 backdrop-blur-sm text-black text-xs font-medium px-3 py-1 rounded-full capitalize">
                    {selectedPost.category.replace("-", " ")}
                  </span>
                  <span className="text-white/80 text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {selectedPost.readTime}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {selectedPost.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {selectedPost.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-black">
                    {selectedPost.author}
                  </p>
                  <p className="text-xs text-gray-400">
                    {selectedPost.authorRole} ·{" "}
                    {formatDate(selectedPost.publishedAt)}
                  </p>
                </div>
              </div>

              <div
                className="prose prose-sm max-w-none text-gray-600 leading-relaxed
                  [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-black [&_h3]:mt-8 [&_h3]:mb-3
                  [&_p]:mb-4 [&_p]:text-sm [&_p]:leading-relaxed
                  [&_ul]:mb-4 [&_ul]:pl-5 [&_ul]:space-y-2
                  [&_li]:text-sm [&_li]:text-gray-600"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full capitalize"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 border border-gray-200 text-gray-600 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </button>
                <Link
                  href="/"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
                >
                  Browse Products
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
