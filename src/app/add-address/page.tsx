"use client";

/**
 * Add Address Page
 * Allows authenticated users to add a new shipping address.
 * Requires authentication — unauthenticated users are redirected to sign in.
 */

import { assets } from "@assets/assets";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuthGuard from "@hooks/useAuthGuard";

/** Shared input/textarea class for consistent form field styling */
const INPUT_CLASS =
  "px-2 py-2.5 focus:border-orange-500 transition border border-[#1E3A5F] bg-[#071525] rounded outline-none w-full text-slate-300 placeholder-slate-600";

const AddAddress = () => {
  const router = useRouter();

  // Redirect unauthenticated users to sign in
  useAuthGuard("/add-address", "Please sign in to add an address.");

  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    pincode: "",
    area: "",
    city: "",
    state: "",
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!address.fullName || !address.phoneNumber || !address.city || !address.state) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newAddress = { ...address, _id: `addr-${Date.now()}` };
    const existing = JSON.parse(localStorage.getItem("addresses") || "[]");
    localStorage.setItem("addresses", JSON.stringify([...existing, newAddress]));

    toast.success("Address saved!");
    router.push("/cart");
  };

  return (
    <>
      <Navbar />
      <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between bg-[#050F1C] min-h-screen">
        <form onSubmit={onSubmitHandler} className="w-full">
          <p className="text-2xl md:text-3xl text-slate-400">
            Add Shipping <span className="font-semibold text-orange-500">Address</span>
          </p>

          <div className="space-y-3 max-w-sm mt-10">
            <input
              className={INPUT_CLASS}
              type="text"
              placeholder="Full name"
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
            />
            <input
              className={INPUT_CLASS}
              type="text"
              placeholder="Phone number"
              value={address.phoneNumber}
              onChange={(e) => setAddress({ ...address, phoneNumber: e.target.value })}
            />
            <input
              className={INPUT_CLASS}
              type="text"
              placeholder="Pin code"
              value={address.pincode}
              onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
            />
            <textarea
              className={`${INPUT_CLASS} resize-none`}
              rows={4}
              placeholder="Address (Area and Street)"
              value={address.area}
              onChange={(e) => setAddress({ ...address, area: e.target.value })}
            />
            <div className="flex space-x-3">
              <input
                className={INPUT_CLASS}
                type="text"
                placeholder="City / District / Town"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
              <input
                className={INPUT_CLASS}
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => setAddress({ ...address, state: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase cursor-pointer transition"
          >
            Save Address
          </button>
        </form>

        <Image
          className="md:mr-16 mt-16 md:mt-0"
          src={assets.my_location_image}
          alt="location illustration"
        />
      </div>
      <Footer />
    </>
  );
};

export default AddAddress;
