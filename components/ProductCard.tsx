"use client";

/**
 * ProductCard
 * Displays a single product in a grid layout.
 * Clicking the card navigates to the product detail page.
 * The "Buy now" button adds the item to the cart and redirects to /cart.
 * Both actions require the user to be signed in.
 */

import { assets } from "@assets/assets";
import Image from "next/image";
import { useAppContext } from "@context/AppContext";
import { useClerk } from "@clerk/nextjs";
import { Product } from "types/types";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { currency, router, user, addToCart } = useAppContext();
  const { openSignIn } = useClerk();

  /**
   * handleBuyNow
   * Adds the product to the cart and navigates to the cart page.
   * Stops event propagation to prevent triggering the card's onClick.
   * Redirects unauthenticated users to sign in first.
   */
  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast.error("Please sign in to purchase items.");
      openSignIn({ redirectUrl: `/shop/${product._id}` });
      return;
    }
    addToCart(product._id);
    router.push("/cart");
  };

  return (
    <div
      onClick={() => { router.push(`/shop/${product._id}`); scrollTo(0, 0); }}
      className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
    >
      {/* Product image — light grey background keeps images visible on dark theme */}
      <div className="cursor-pointer group relative bg-slate-100 rounded-xl w-full h-52 flex items-center justify-center p-3 overflow-hidden border border-slate-200">
        <Image
          src={product.image[0]}
          alt={product.name}
          width={800}
          height={800}
          className="group-hover:scale-105 transition duration-300 object-contain w-4/5 h-4/5"
        />
        {/* Wishlist button — stops propagation to avoid navigating to product page */}
        <button
          onClick={(e) => e.stopPropagation()}
          className="absolute top-2 right-2 bg-slate-100 hover:bg-white p-2 rounded-full shadow-md border border-slate-200 transition"
          aria-label="Add to wishlist"
        >
          <Image src={assets.heart_icon} alt="wishlist" className="h-3 w-3" />
        </button>
      </div>

      {/* Product name */}
      <p className="md:text-base font-medium pt-2 w-full truncate text-slate-200">
        {product.name}
      </p>

      {/* Short description */}
      <p className="w-full text-xs text-slate-500 max-sm:hidden truncate">
        {product.description}
      </p>

      {/* Star rating — static 4.5 stars (no backend rating system yet) */}
      <div className="flex items-center gap-1.5 mt-0.5">
        <p className="text-xs text-slate-400">4.5</p>
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Image
              key={i}
              src={i < 4 ? assets.star_icon : assets.star_dull_icon}
              alt="star"
              className="h-3 w-3"
            />
          ))}
        </div>
      </div>

      {/* Price and Buy now button */}
      <div className="flex items-end justify-between w-full mt-1">
        <p className="text-base font-semibold text-slate-100">
          {currency}{product.offerPrice}
        </p>
        <button
          onClick={handleBuyNow}
          className="max-sm:hidden px-4 py-1.5 text-slate-300 border border-[#1E3A5F] rounded-full text-xs hover:bg-orange-600 hover:text-white hover:border-orange-600 transition cursor-pointer"
        >
          Buy now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
