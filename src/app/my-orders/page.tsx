"use client";

/**
 * My Orders Page
 * Displays the authenticated user's order history.
 * Requires authentication — unauthenticated users are redirected to sign in.
 */

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { assets } from "@assets/assets";
import { useAppContext } from "@context/AppContext";
import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import Loading from "@components/Loading";
import EmptyState from "@components/ui/EmptyState";
import ProductImage from "@components/ui/ProductImage";
import useAuthGuard from "@hooks/useAuthGuard";
import { Order } from "types/types";

const MyOrders = () => {
  const { currency, router } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Redirect unauthenticated users to sign in
  useAuthGuard("/my-orders", "Please sign in to view your orders.");

  useEffect(() => {
    const storedOrders = localStorage.getItem("orders");
    if (storedOrders) {
      setOrders(JSON.parse(storedOrders));
    }
    setLoading(false);
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between px-6 md:px-16 lg:px-32 py-6 min-h-screen bg-[#050F1C]">
        <div className="space-y-5">
          <h2 className="text-lg font-medium mt-6 text-slate-200">My Orders</h2>

          {loading ? (
            <Loading />
          ) : (
            <div className="max-w-5xl border-t border-[#1E3A5F] text-sm">
              {orders.length === 0 ? (
                <EmptyState
                  message="You have no orders yet."
                  actionLabel="Browse Products"
                  onAction={() => router.push("/shop")}
                />
              ) : (
                <div className="divide-y divide-[#1E3A5F]">
                  {orders.map((order, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr_2fr] gap-6 p-5"
                    >
                      {/* Col 1: Order items summary with first product image */}
                      <div className="flex gap-4">
                        <ProductImage
                          src={order.items[0]?.product?.image?.[0] || assets.box_icon}
                          alt="order item"
                          size={64}
                          className="w-16 h-16 p-1.5"
                        />
                        <div className="flex flex-col justify-center">
                          <span className="font-medium text-base line-clamp-2 text-slate-200">
                            {order.items.map((item) => `${item.product.name} x ${item.quantity}`).join(", ")}
                          </span>
                          <span className="text-slate-500">
                            Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                          </span>
                        </div>
                      </div>

                      {/* Col 2: Delivery address */}
                      <div className="text-slate-400">
                        <p className="font-medium text-slate-300">{order.address.fullName}</p>
                        <p className="truncate">{order.address.area}</p>
                        <p className="truncate">{`${order.address.city}, ${order.address.state}`}</p>
                        <p>{order.address.phoneNumber}</p>
                      </div>

                      {/* Col 3: Total amount */}
                      <div className="flex items-center font-medium whitespace-nowrap text-slate-200">
                        {currency}{order.amount.toFixed(2)}
                      </div>

                      {/* Col 4: Order metadata */}
                      <div className="text-slate-500 space-y-1">
                        <p>Method: COD</p>
                        <p>Date: {new Date(order.date).toLocaleDateString()}</p>
                        <p>Payment: Pending</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyOrders;
