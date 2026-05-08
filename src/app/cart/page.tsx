"use client";

/**
 * Cart Page
 * Displays the user's current cart items with quantity controls.
 * Requires authentication — unauthenticated users are redirected to sign in.
 */

import React from "react";
import { assets } from "@assets/assets";
import OrderSummary from "@components/OrderSummary";
import Image from "next/image";
import Navbar from "@components/Navbar";
import EmptyState from "@components/ui/EmptyState";
import ProductImage from "@components/ui/ProductImage";
import { useAppContext } from "@context/AppContext";
import useAuthGuard from "@hooks/useAuthGuard";

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext();

  // Redirect unauthenticated users to sign in before accessing the cart
  useAuthGuard("/cart", "Please sign in to view your cart.");

  const hasItems = Object.keys(cartItems).some((id) => cartItems[id] > 0);

  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20 bg-[#050F1C] min-h-screen">
        <div className="flex-1">
          {/* Cart header */}
          <div className="flex items-center justify-between mb-8 border-b border-[#1E3A5F] pb-6">
            <p className="text-2xl md:text-3xl text-slate-400">
              Your <span className="font-medium text-orange-500">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-slate-500">{getCartCount()} Items</p>
          </div>

          {/* Empty cart state */}
          {!hasItems ? (
            <EmptyState
              message="Your cart is empty."
              actionLabel="Start Shopping"
              onAction={() => router.push("/shop")}
            />
          ) : (
            <>
              {/* Cart items table */}
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="text-left">
                    <tr>
                      <th className="text-nowrap pb-6 md:px-4 px-1 text-slate-400 font-medium">Product Details</th>
                      <th className="pb-6 md:px-4 px-1 text-slate-400 font-medium">Price</th>
                      <th className="pb-6 md:px-4 px-1 text-slate-400 font-medium">Quantity</th>
                      <th className="pb-6 md:px-4 px-1 text-slate-400 font-medium">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(cartItems).map((itemId) => {
                      const product = products.find((p) => p._id === itemId);
                      if (!product || cartItems[itemId] <= 0) return null;
                      return (
                        <tr key={itemId}>
                          {/* Product info cell */}
                          <td className="flex items-center gap-4 py-4 md:px-4 px-1">
                            <div>
                              <ProductImage
                                src={product.image[0]}
                                alt={product.name}
                                size={64}
                                className="p-2 w-20 h-20"
                              />
                              <button
                                className="md:hidden text-xs text-orange-500 mt-1 cursor-pointer hover:text-orange-400"
                                onClick={() => updateCartQuantity(product._id, 0)}
                              >
                                Remove
                              </button>
                            </div>
                            <div className="text-sm hidden md:block">
                              <p className="text-slate-300">{product.name}</p>
                              <button
                                className="text-xs text-orange-500 mt-1 cursor-pointer hover:text-orange-400"
                                onClick={() => updateCartQuantity(product._id, 0)}
                              >
                                Remove
                              </button>
                            </div>
                          </td>

                          <td className="py-4 md:px-4 px-1 text-slate-400">${product.offerPrice}</td>

                          {/* Quantity stepper */}
                          <td className="py-4 md:px-4 px-1">
                            <div className="flex items-center md:gap-2 gap-1">
                              <button
                                onClick={() => updateCartQuantity(product._id, cartItems[itemId] - 1)}
                                className="cursor-pointer"
                                aria-label="Decrease quantity"
                              >
                                <Image src={assets.decrease_arrow} alt="decrease" className="w-4 h-4" />
                              </button>
                              <input
                                type="number"
                                value={cartItems[itemId]}
                                onChange={(e) => updateCartQuantity(product._id, Number(e.target.value))}
                                className="w-8 border border-[#1E3A5F] bg-[#071525] text-slate-300 text-center appearance-none"
                                aria-label="Item quantity"
                              />
                              <button
                                onClick={() => addToCart(product._id)}
                                className="cursor-pointer"
                                aria-label="Increase quantity"
                              >
                                <Image src={assets.increase_arrow} alt="increase" className="w-4 h-4" />
                              </button>
                            </div>
                          </td>

                          <td className="py-4 md:px-4 px-1 text-slate-400">
                            ${(product.offerPrice * cartItems[itemId]).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Continue shopping link */}
              <button
                onClick={() => router.push("/shop")}
                className="group flex items-center mt-6 gap-2 text-orange-500 hover:text-orange-400 cursor-pointer transition"
              >
                <Image
                  className="group-hover:-translate-x-1 transition"
                  src={assets.arrow_right_icon_colored}
                  alt="back to shop"
                />
                Continue Shopping
              </button>
            </>
          )}
        </div>

        {/* Order summary sidebar */}
        <OrderSummary />
      </div>
    </>
  );
};

export default Cart;
