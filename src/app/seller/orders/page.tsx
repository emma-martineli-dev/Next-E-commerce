"use client";

/**
 * Seller — Orders Page
 * Displays all orders visible to the seller.
 * Merges static dummy data with real orders stored in localStorage.
 */

import React, { useEffect, useState } from "react";
import { orderData } from "@constants/order-data";
import { useAppContext } from "@context/AppContext";
import Footer from "@components/seller/Footer";
import Loading from "@components/Loading";
import ProductImage from "@components/ui/ProductImage";
import type { Order } from "types/types";

const Orders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Merge static demo orders with any real orders placed via the storefront
    const localOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders([...orderData, ...localOrders]);
    setLoading(false);
  }, []);

  return (
    <div className="flex-1 h-screen overflow-scroll flex flex-col justify-between text-sm bg-[#050F1C]">
      {loading ? (
        <Loading />
      ) : (
        <div className="md:p-10 p-4 space-y-5">
          <h2 className="text-lg font-medium text-slate-200">Orders</h2>
          <div className="max-w-4xl rounded-md">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-5 justify-between p-5 border-t border-[#1E3A5F] text-slate-400"
              >
                {/* Order items summary */}
                <div className="flex-1 flex gap-5 max-w-80">
                  <ProductImage
                    src={order.items[0]?.product?.image?.[0] || ""}
                    alt="order item"
                    size={64}
                    className="w-16 h-16 p-1.5"
                  />
                  <div className="flex flex-col gap-3">
                    <span className="font-medium text-slate-300">
                      {order.items.map((item) => `${item.product.name} x ${item.quantity}`).join(", ")}
                    </span>
                    <span>Items: {order.items.length}</span>
                  </div>
                </div>

                {/* Delivery address */}
                <div>
                  <p className="font-medium text-slate-300">{order.address.fullName}</p>
                  <p>{order.address.area}</p>
                  <p>{`${order.address.city}, ${order.address.state}`}</p>
                  <p>{order.address.phoneNumber}</p>
                </div>

                {/* Order total */}
                <p className="font-medium my-auto text-slate-200">{currency}{order.amount}</p>

                {/* Order metadata */}
                <div className="flex flex-col gap-1">
                  <span>Method: COD</span>
                  <span>Date: {new Date(order.date).toLocaleDateString()}</span>
                  <span>Payment: Pending</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Orders;
