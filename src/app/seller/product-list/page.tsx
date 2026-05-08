"use client";

/**
 * Seller — Product List Page
 * Displays all products available in the store.
 * Merges the static product data with any products added via the seller dashboard.
 */

import { useEffect, useState } from "react";
import { assets } from "@assets/assets";
import { productsData } from "@constants/products-data";
import Image from "next/image";
import { useAppContext } from "@context/AppContext";
import Footer from "@components/seller/Footer";
import Loading from "@components/Loading";
import ProductImage from "@components/ui/ProductImage";
import { Product } from "types/types";

const ProductList = () => {
  const { router } = useAppContext();
  const [products, setProducts] = useState<Product[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Merge static product data with any locally added products
    const localProducts = JSON.parse(localStorage.getItem("seller_products") || "[]");
    setProducts([...productsData, ...localProducts]);
    setLoading(false);
  }, []);

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between bg-[#050F1C]">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full md:p-10 p-4">
          <h2 className="pb-4 text-lg font-medium text-slate-200">All Products</h2>

          <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-[#071525] border border-[#1E3A5F]">
            <table className="table-fixed w-full overflow-hidden">
              <thead className="text-slate-300 text-sm text-left">
                <tr>
                  <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Product</th>
                  <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                  <th className="px-4 py-3 font-medium truncate">Price</th>
                  <th className="px-4 py-3 font-medium max-sm:hidden">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-400">
                {products?.map((product, index) => (
                  <tr key={index} className="border-t border-[#1E3A5F]">
                    {/* Product name with thumbnail */}
                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                      <ProductImage
                        src={product.image[0]}
                        alt={product.name}
                        size={64}
                        className="w-16 h-16 p-2"
                      />
                      <span className="truncate w-full text-slate-300">{product.name}</span>
                    </td>

                    <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                    <td className="px-4 py-3">${product.offerPrice}</td>

                    {/* Visit product page button */}
                    <td className="px-4 py-3 max-sm:hidden">
                      <button
                        onClick={() => router.push(`/shop/${product._id}`)}
                        className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-md cursor-pointer transition"
                      >
                        <span className="hidden md:block">Visit</span>
                        <Image src={assets.redirect_icon} alt="visit" className="h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ProductList;
