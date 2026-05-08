"use client";

/**
 * Shop Page
 * Displays all available products with search, category filter, and sort controls.
 */

import { useState, useMemo } from "react";
import Navbar from "@components/Navbar";
import ProductCard from "@components/ProductCard";
import Footer from "@components/seller/Footer";
import EmptyState from "@components/ui/EmptyState";
import { useAppContext } from "@context/AppContext";

const CATEGORIES = ["All", "Earphone", "Headphone", "Smartphone", "Laptop", "Camera", "Accessories", "Watch"];

const SORT_OPTIONS = [
  { label: "Default",            value: "default"    },
  { label: "Price: Low to High", value: "price_asc"  },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest",             value: "newest"     },
];

const Shop = () => {
  const { products } = useAppContext();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");

  /**
   * filtered
   * Derives the visible product list by applying search, category, and sort
   * in sequence. Memoized to avoid recomputing on unrelated re-renders.
   */
  const filtered = useMemo(() => {
    let list = [...products];

    // Text search across name and description
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (activeCategory !== "All") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Sort
    if (sortBy === "price_asc")  list.sort((a, b) => a.offerPrice - b.offerPrice);
    if (sortBy === "price_desc") list.sort((a, b) => b.offerPrice - a.offerPrice);
    if (sortBy === "newest")     list.sort((a, b) => b.date - a.date);

    return list;
  }, [products, activeCategory, sortBy, search]);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start px-6 md:px-16 lg:px-32 bg-[#050F1C] min-h-screen">

        {/* Page header with search and sort controls */}
        <div className="w-full pt-12 pb-6 border-b border-[#1E3A5F]">
          <p className="text-2xl font-medium text-slate-100 mb-6">All Products</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 bg-[#071525] border border-[#1E3A5F] rounded-lg text-slate-300 placeholder-slate-600 outline-none focus:border-orange-500 transition text-sm"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#071525] border border-[#1E3A5F] rounded-lg text-slate-300 outline-none focus:border-orange-500 transition text-sm"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap gap-2 py-5 w-full">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition cursor-pointer border
                ${activeCategory === cat
                  ? "bg-orange-600 border-orange-600 text-white"
                  : "border-[#1E3A5F] text-slate-400 hover:border-orange-500 hover:text-orange-400"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-slate-500 text-sm mb-4">
          {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Product grid or empty state */}
        {filtered.length === 0 ? (
          <EmptyState
            message="No products found."
            actionLabel="Clear filters"
            onAction={() => { setActiveCategory("All"); setSearch(""); }}
          />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 pb-14 w-full">
            {filtered.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Shop;
