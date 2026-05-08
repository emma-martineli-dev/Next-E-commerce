"use client"
import { addressData } from "@constants/address-data";
import { Address } from "types/types";
import { useAppContext } from "@context/AppContext";
import React, { useEffect, useState } from "react";
import { productsData } from "@constants/products-data";
import toast from "react-hot-toast";
import { useAuth, useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";


const OrderSummary = () => {

  const { currency, router, getCartCount, getCartAmount, cartItems, setCartItems } = useAppContext()

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState<Address[]>([]);

  const fetchUserAddresses = async () => {
    const stored = JSON.parse(localStorage.getItem("addresses") || "[]"); 
    if (stored.length > 0) {
      setUserAddresses(stored); 
    } else {
      setUserAddresses(addressData); 
    }
  }

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address); 
    setIsDropdownOpen(false); 
    localStorage.setItem("selectedAddress", JSON.stringify(address))
  };

   useEffect(() => {
    fetchUserAddresses();

    // ✅ Load saved address if available
    const savedAddress = localStorage.getItem("selectedAddress");
    if (savedAddress) {
      setSelectedAddress(JSON.parse(savedAddress));
    }
  }, []);




  const { isSignedIn } = useAuth(); 
  const { openSignIn } = useClerk(); 

  const pathname = usePathname(); 

  const createOrder = () => {

  if (!selectedAddress) {
    toast.error("Please select an address first!");
    return;
  }

  if (!isSignedIn) {
    openSignIn({
      redirectUrl: pathname
    }); 
    return ;
  } 

  const orderItems = Object.entries(cartItems)
    .map(([itemId, quantity]) => {
      const product = productsData.find(p => p._id === itemId);
      if (!product) return null;
      return {
        product,       // full product object
        quantity,      // from cartItems
        _id: `${itemId}-${Date.now()}` // unique ID per order item
      };
    })
    .filter(Boolean);

  const subtotal = orderItems.reduce((sum, item) => sum + item!.product.offerPrice * item!.quantity, 0);
  const tax = Math.floor(subtotal * 0.02 * 100) / 100;
  const total = subtotal + tax;

  const order = {
    _id: `order-${Date.now()}`,
    userId: "user_demo", // or get from context/user auth
    items: orderItems,
    amount: total,
    address: selectedAddress,
    status: "Order Placed",
    date: Date.now()
  };

  // Save order to localStorage
  const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
  localStorage.setItem("orders", JSON.stringify([...existingOrders, order]));

  // Clear cart after placing order
  setCartItems({});

  toast.success("Order placed successfully!");
  router.push("/my-orders");
};

  

  return (
    <div className="w-full md:w-96 bg-[#0C1F35] p-5 border border-[#1E3A5F]">
      <h2 className="text-xl md:text-2xl font-medium text-slate-200">
        Order Summary
      </h2>
      <hr className="border-[#1E3A5F] my-5" />
      <div className="space-y-6">
        <div>
          <label className="text-base font-medium uppercase text-slate-400 block mb-2">
            Select Address
          </label>
          <div className="relative inline-block w-full text-sm border border-[#1E3A5F]">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-[#071525] text-slate-300 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>
              <svg className={`w-5 h-5 inline float-right transition-transform duration-200 ${isDropdownOpen ? "rotate-0" : "-rotate-90"}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#94A3B8"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-[#071525] border border-[#1E3A5F] shadow-md mt-1 z-10 py-1.5">
                {userAddresses.map((address, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-[#112844] cursor-pointer text-slate-300"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-[#112844] cursor-pointer text-center text-slate-300"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="text-base font-medium uppercase text-slate-400 block mb-2">
            Promo Code
          </label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-slate-300 bg-[#071525] border border-[#1E3A5F] placeholder-slate-600"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700 cursor-pointer">
              Apply
            </button>
          </div>
        </div>

        <hr className="border-[#1E3A5F] my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-slate-400">Items {getCartCount()}</p>
            <p className="text-slate-200">{currency}{getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-400">Shipping Fee</p>
            <p className="font-medium text-slate-200">Free</p>
          </div>
          <div className="flex justify-between">
            <p className="text-slate-400">Tax (2%)</p>
            <p className="font-medium text-slate-200">{currency}{Math.floor(getCartAmount() * 0.02)}</p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t border-[#1E3A5F] pt-3 text-slate-200">
            <p>Total</p>
            <p>{currency}{getCartAmount() + Math.floor(getCartAmount() * 0.02)}</p>
          </div>
        </div>
      </div>

      <button onClick={createOrder} className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700 cursor-pointer">
        Place Order
      </button>
    </div>
    
  );
};

export default OrderSummary;
