"use client";

/**
 * Seller — Add Product Page
 * Allows sellers to add new products to the store.
 * Saves products to localStorage in demo mode (no backend).
 */

import React, { useEffect, useState } from "react";
import { assets } from "@assets/assets";
import Image from "next/image";
import Footer from "@components/seller/Footer";
import toast from "react-hot-toast";

/** Shared input class for consistent seller form field styling */
const INPUT_CLASS =
  "outline-none md:py-2.5 py-2 px-3 rounded border border-[#1E3A5F] bg-[#071525] text-slate-300 placeholder-slate-600 focus:border-orange-500 transition";

const AddProduct = () => {
  const [files, setFiles]       = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [name, setName]         = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Earphone");
  const [price, setPrice]       = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  /** Updates the file and preview arrays at the given slot index */
  const handleFilesChange = (file: File, index: number) => {
    const updatedFiles    = [...files];    updatedFiles[index]    = file;
    const newPreviews     = [...previews]; newPreviews[index]     = URL.createObjectURL(file);
    setFiles(updatedFiles);
    setPreviews(newPreviews);
  };

  // Revoke object URLs on unmount to prevent memory leaks
  useEffect(() => {
    return () => { previews.forEach((url) => url && URL.revokeObjectURL(url)); };
  }, [previews]);

  /** Validates the form, builds a product object, and saves it to localStorage */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const priceNum      = parseFloat(price);
    const offerPriceNum = parseFloat(offerPrice);

    if (isNaN(priceNum) || priceNum <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }
    if (isNaN(offerPriceNum) || offerPriceNum <= 0) {
      toast.error("Please enter a valid offer price.");
      return;
    }
    if (offerPriceNum > priceNum) {
      toast.error("Offer price cannot be higher than the original price.");
      return;
    }

    // Build the new product object (demo mode — no real API call)
    const newProduct = {
      _id:        `local_${Date.now()}`,
      userId:     "seller_demo",
      name:       name.trim(),
      description: description.trim(),
      price:      priceNum,
      offerPrice: offerPriceNum,
      image:      previews.filter(Boolean).length > 0
        ? previews.filter(Boolean)
        : ["https://raw.githubusercontent.com/avinashdm/gs-images/main/quickcart/k4dafzhwhgcn5tnoylrw.webp"],
      category,
      date:       Date.now(),
      __v:        0,
    };

    // Persist to localStorage alongside any previously added products
    const existing = JSON.parse(localStorage.getItem("seller_products") || "[]");
    localStorage.setItem("seller_products", JSON.stringify([...existing, newProduct]));

    toast.success(`"${name}" has been added successfully!`);

    // Reset form fields
    setName(""); setDescription(""); setCategory("Earphone");
    setPrice(""); setOfferPrice(""); setFiles([]); setPreviews([]);
  };

  const priceNum      = parseFloat(price);
  const offerPriceNum = parseFloat(offerPrice);
  const hasValidPrices = price && offerPrice && priceNum > 0 && offerPriceNum > 0;
  const discountPct    = hasValidPrices ? Math.round((1 - offerPriceNum / priceNum) * 100) : 0;
  const savings        = hasValidPrices ? (priceNum - offerPriceNum).toFixed(2) : "0.00";

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between bg-[#050F1C]">
      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">

        {/* Product image upload — up to 4 slots */}
        <div>
          <p className="text-base font-medium text-slate-200">Product Image</p>
          <p className="text-xs text-slate-500 mt-1 mb-2">
            Upload up to 4 images. The first image will be the main display.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {[...Array(4)].map((_, index) => (
              <label key={index} htmlFor={`image${index}`} className="cursor-pointer">
                <input
                  type="file"
                  id={`image${index}`}
                  accept="image/*"
                  hidden
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) handleFilesChange(e.target.files[0], index);
                  }}
                />
                <div className={`w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden transition
                  ${previews[index] ? "border-orange-500" : "border-[#1E3A5F] hover:border-slate-400"}`}>
                  {previews[index] ? (
                    <Image src={previews[index]} alt={`Product Image ${index + 1}`} width={96} height={96} className="w-full h-full object-cover" />
                  ) : (
                    <Image src={assets.upload_area} alt="Upload placeholder" width={40} height={40} className="opacity-40" />
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Product name */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium text-slate-200" htmlFor="product-name">
            Product Name <span className="text-orange-500">*</span>
          </label>
          <input id="product-name" type="text" placeholder="e.g. Sony WH-1000XM5"
            className={INPUT_CLASS} value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        {/* Product description */}
        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium text-slate-200" htmlFor="product-description">
            Product Description <span className="text-orange-500">*</span>
          </label>
          <textarea id="product-description" rows={4}
            className={`${INPUT_CLASS} resize-none`}
            placeholder="Describe the product features, specs, and benefits..."
            value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>

        {/* Category and price fields */}
        <div className="flex items-end gap-5 flex-wrap">
          <div className="flex flex-col gap-1 w-36">
            <label className="text-base font-medium text-slate-200" htmlFor="category">Category</label>
            <select id="category" className={INPUT_CLASS} value={category} onChange={(e) => setCategory(e.target.value)}>
              {["Earphone","Headphone","Watch","Smartphone","Laptop","Camera","Accessories"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium text-slate-200" htmlFor="product-price">
              Price ($) <span className="text-orange-500">*</span>
            </label>
            <input id="product-price" type="number" min="0" step="0.01" placeholder="0.00"
              className={INPUT_CLASS} value={price} onChange={(e) => setPrice(e.target.value)} required />
          </div>

          <div className="flex flex-col gap-1 w-32">
            <label className="text-base font-medium text-slate-200" htmlFor="offer-price">
              Offer Price ($) <span className="text-orange-500">*</span>
            </label>
            <input id="offer-price" type="number" min="0" step="0.01" placeholder="0.00"
              className={INPUT_CLASS} value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} required />
          </div>
        </div>

        {/* Live discount preview */}
        {hasValidPrices && offerPriceNum <= priceNum && (
          <p className="text-green-400 text-sm">
            ✓ Discount: {discountPct}% off (saving ${savings})
          </p>
        )}
        {hasValidPrices && offerPriceNum > priceNum && (
          <p className="text-red-400 text-sm">⚠ Offer price cannot exceed the original price.</p>
        )}

        <button type="submit"
          className="px-8 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded cursor-pointer transition">
          ADD PRODUCT
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default AddProduct;
