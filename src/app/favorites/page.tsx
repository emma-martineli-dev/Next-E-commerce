"use client";

/**
 * Favorites Page
 * Displays the user's favorite products.
 * Requires authentication — unauthenticated users are redirected to sign in.
 */

import React from "react";
import { assets, HeartIcon } from "@assets/assets";
import Image from "next/image";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import EmptyState from "@components/ui/EmptyState";
import ProductImage from "@components/ui/ProductImage";
import { useAppContext } from "@context/AppContext";
import useAuthGuard from "@hooks/useAuthGuard";
import ProductCard from "@components/ProductCard";
import toast from "react-hot-toast";

const Favorites = () => {
  const { products, router, favorites, removeFavorite, getFavoritesCount } = useAppContext();

  // Redirect unauthenticated users to sign in before accessing favorites
  useAuthGuard("/favorites", "Please sign in to view your favorites.");

  // Get favorite products
  const favoriteProducts = products.filter(product => favorites.includes(product._id));
  const hasFavorites = favoriteProducts.length > 0;

  const handleRemoveFavorite = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeFavorite(itemId);
  };

  const handleAddToCartFromFavorites = (itemId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // This would need the addToCart function from context
    // For now, we'll navigate to the product page
    router.push(`/shop/${itemId}`);
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 pt-14 mb-20 bg-[#050F1C] min-h-screen">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-medium text-slate-100">My <span className="font-medium text-orange-500">Favorites</span></h1>
          <div className="w-28 h-0.5 bg-orange-500 mt-2"></div>
          <p className="text-slate-400 mt-4">
            {getFavoritesCount()} {getFavoritesCount() === 1 ? 'item' : 'items'} in favorites
          </p>
        </div>

        {!hasFavorites ? (
          <EmptyState
            message="You haven't added any items to your favorites list. Start exploring products and click the heart icon to add them here."
            actionLabel="Browse Products"
            onAction={() => router.push("/shop")}
          />
        ) : (
          <>
            {/* Desktop view - grid layout */}
            <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {favoriteProducts.map((product) => (
                <div key={product._id} className="relative group">
                  <ProductCard product={product} />
                  <button
                    onClick={(e) => handleRemoveFavorite(product._id, e)}
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg border border-slate-300 transition opacity-0 group-hover:opacity-100"
                    aria-label="Remove from favorites"
                  >
                    <HeartIcon filled={true} />
                  </button>
                </div>
              ))}
            </div>

            {/* Mobile view - list layout */}
            <div className="md:hidden space-y-6 mt-8">
              {favoriteProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex items-center gap-4 p-4 bg-[#0C1F35] rounded-lg border border-[#1E3A5F]"
                  onClick={() => router.push(`/shop/${product._id}`)}
                >
                  <div className="relative w-24 h-24 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
                    <Image
                      src={product.image[0]}
                      alt={product.name}
                      width={96}
                      height={96}
                      className="object-contain w-4/5 h-4/5"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-100 font-medium truncate">{product.name}</h3>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-lg font-semibold text-slate-100">${product.offerPrice}</p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/shop/${product._id}`);
                          }}
                          className="px-3 py-1 text-xs border border-[#1E3A5F] text-slate-300 rounded hover:bg-[#112844] transition"
                        >
                          View
                        </button>
                        <button
                          onClick={(e) => handleRemoveFavorite(product._id, e)}
                          className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition"
                          aria-label="Remove from favorites"
                        >
                          <HeartIcon filled={true} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue shopping button */}
            <div className="flex justify-center mt-12">
              <button
                onClick={() => router.push("/shop")}
                className="px-8 py-3 border border-[#1E3A5F] rounded text-slate-300 hover:bg-[#0C1F35] hover:text-white transition cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Favorites;