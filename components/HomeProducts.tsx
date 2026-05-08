"use client"

import { useAppContext } from "@context/AppContext";
import ProductCard from "./ProductCard";

const HomeProducts = () => {

  const { products, router } = useAppContext();

  return (
    <div className="flex flex-col items-center pt-14">
        <p className="text-2xl font-medium text-left w-full text-slate-100">
            Popular Products
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
            {products.map((product, index) => <ProductCard key={index} product={product} />)}
        </div>
        <button onClick={() => { router.push("/shop") }} className="px-12 py-2.5 border border-[#1E3A5F] rounded text-slate-300 hover:bg-[#0C1F35] hover:text-white hover:border-slate-400 transition">
            See more
        </button>
    </div>
  )
}

export default HomeProducts