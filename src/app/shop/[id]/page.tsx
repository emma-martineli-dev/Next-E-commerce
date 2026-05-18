"use client"
import { useEffect, useState } from "react";
import { assets } from "@assets/assets";
import ProductCard from "@components/ProductCard";
import Navbar from "@components/Navbar";
import Footer from "@components/seller/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@components/Loading";
import { useAppContext } from "@context/AppContext";
import { useClerk } from "@clerk/nextjs";
import React from "react";
import type { Product } from "types/types";
import toast from "react-hot-toast";

const Product = () => {
    const { id } = useParams();
    const { products, router, addToCart, user, isLoaded } = useAppContext();
    const { openSignIn } = useClerk();

    const [mainImage, setMainImage] = useState<string | null>(null);
    const [productData, setProductData] = useState<Product | null>(null);

    useEffect(() => {
        const product = products.find(product => product._id === id);
        if (product) return setProductData(product);
    }, [id, products]);

    const handleAddToCart = () => {
        // Don't do anything if Clerk is still loading
        if (!isLoaded) {
            return;
        }
        
        if (!user) {
            toast.error("Please sign in to add items to your cart.");
            openSignIn({ redirectUrl: `/shop/${id}` });
            return;
        }
        addToCart(productData!._id);
    };

    const handleBuyNow = () => {
        // Don't do anything if Clerk is still loading
        if (!isLoaded) {
            return;
        }
        
        if (!user) {
            toast.error("Please sign in to purchase items.");
            openSignIn({ redirectUrl: `/shop/${id}` });
            return;
        }
        addToCart(productData!._id);
        router.push("/cart");
    };

    return productData ? (<>
        <Navbar />
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10 bg-[#050F1C] min-h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-slate-100 mb-4 p-4">
                        <Image
                            src={mainImage || productData.image[0]}
                            alt={productData.name}
                            className="w-full h-auto object-contain"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productData.image.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className={`cursor-pointer rounded-lg overflow-hidden bg-slate-100 p-2 border-2 transition
                                  ${mainImage === image || (!mainImage && index === 0)
                                    ? 'border-orange-500'
                                    : 'border-transparent hover:border-slate-400'}`}
                            >
                                <Image
                                    src={image}
                                    alt={productData.name}
                                    className="w-full h-auto object-contain"
                                    width={1280}
                                    height={720}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-slate-100 mb-4">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p className="text-slate-400">(4.5)</p>
                    </div>
                    <p className="text-slate-400 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6 text-slate-100">
                        ${productData.offerPrice}
                        <span className="text-base font-normal text-slate-500 line-through ml-2">
                            ${productData.price}
                        </span>
                    </p>
                    <hr className="border-[#1E3A5F] my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-slate-400 font-medium pr-6 py-1">Category</td>
                                    <td className="text-slate-300">{productData.category}</td>
                                </tr>
                                <tr>
                                    <td className="text-slate-400 font-medium pr-6 py-1">Listed</td>
                                    <td className="text-slate-300">{new Date(productData.date).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td className="text-slate-400 font-medium pr-6 py-1">Original Price</td>
                                    <td className="text-slate-300">${productData.price}</td>
                                </tr>
                                <tr>
                                    <td className="text-slate-400 font-medium pr-6 py-1">Offer Price</td>
                                    <td className="text-orange-400 font-semibold">${productData.offerPrice}</td>
                                </tr>
                                <tr>
                                    <td className="text-slate-400 font-medium pr-6 py-1">Savings</td>
                                    <td className="text-green-400">${(productData.price - productData.offerPrice).toFixed(2)} ({Math.round((1 - productData.offerPrice / productData.price) * 100)}% off)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center mt-10 gap-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={!isLoaded}
                            className={`w-full py-3.5 border border-[#1E3A5F] transition ${
                                !isLoaded
                                    ? 'bg-[#0C1F35] text-slate-500 cursor-not-allowed opacity-50'
                                    : 'bg-[#0C1F35] text-slate-300 hover:bg-[#112844] cursor-pointer'
                            }`}
                        >
                            {!isLoaded ? 'Loading...' : 'Add to Cart'}
                        </button>
                        <button
                            onClick={handleBuyNow}
                            disabled={!isLoaded}
                            className={`w-full py-3.5 transition ${
                                !isLoaded
                                    ? 'bg-orange-700 text-slate-300 cursor-not-allowed opacity-50'
                                    : 'bg-orange-500 text-white hover:bg-orange-600 cursor-pointer'
                            }`}
                        >
                            {!isLoaded ? 'Loading...' : 'Buy now'}
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="text-3xl font-medium text-slate-100">Featured <span className="font-medium text-orange-500">Products</span></p>
                    <div className="w-28 h-0.5 bg-orange-500 mt-2"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button onClick={() => router.push('/shop')} className="px-8 py-2 mb-16 border border-[#1E3A5F] rounded text-slate-400 hover:bg-[#0C1F35] hover:text-white transition cursor-pointer">
                    See more
                </button>
            </div>
        </div>
        <Footer />
    </>
    ) : <Loading />
};

export default Product;
