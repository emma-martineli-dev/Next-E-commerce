"use client";

/**
 * AppContext
 * Global application state provider.
 * Manages products, cart, user session, and seller status.
 * Wraps the entire app via AppContextProvider in layout.tsx.
 */

import { useRouter, usePathname } from "next/navigation";
import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { productsData } from "@constants/products-data";
import { AppContextType, Product } from "../types/types";
import { useUser, useClerk } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * useAppContext
 * Convenience hook for consuming AppContext.
 * Throws if used outside of AppContextProvider.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider = (props: { children: ReactNode }) => {
  const currency = process.env.NEXT_PUBLIC_CURRENCY;
  const router = useRouter();
  const pathname = usePathname();

  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [products, setProducts] = useState<Product[]>([]);
  const [userData, setUserData] = useState(false);

  /**
   * isSeller
   * In production this should check Clerk publicMetadata.role === "seller".
   * In demo mode (no role set), any logged-in user is treated as a seller.
   */
  const [isSeller, setIsSeller] = useState(false);

  // Derive seller status from Clerk user metadata whenever the user changes
  useEffect(() => {
    if (user) {
      const role = user.publicMetadata?.role;
      setIsSeller(role === "seller" || !role);
    } else {
      setIsSeller(false);
    }
  }, [user]);

  // Cart state — persisted to localStorage so it survives page refreshes
  const [cartItems, setCartItems] = useState<Record<string, number>>({});

  // Load persisted cart from localStorage on initial mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (err) {
        console.error("Failed to parse stored cart:", err);
      }
    }
  }, []);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /** Loads product data from the static constants file (demo mode). */
  const fetchProductData = async () => {
    setProducts(productsData);
  };

  /** Syncs userData flag with the current Clerk session. */
  const fetchUserData = async () => {
    setUserData(!!user);
  };

  /**
   * addToCart
   * Adds one unit of the given product to the cart.
   * Requires the user to be signed in — shows a toast and opens
   * the Clerk sign-in modal if they are not.
   */
  const addToCart = (itemId: string) => {
    if (!user) {
      toast.error("Please sign in to add items to your cart.");
      openSignIn({ redirectUrl: pathname });
      return;
    }
    const cartData = structuredClone(cartItems);
    cartData[itemId] = (cartData[itemId] ?? 0) + 1;
    setCartItems(cartData);
    toast.success("Item added to cart successfully!");
  };

  /**
   * updateCartQuantity
   * Sets the quantity of a cart item to the given value.
   * Passing quantity = 0 removes the item from the cart.
   * Requires the user to be signed in.
   */
  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (!user) {
      toast.error("Please sign in to manage your cart.");
      openSignIn({ redirectUrl: pathname });
      return;
    }
    const cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);
  };

  /** Returns the total number of individual items in the cart. */
  const getCartCount = () =>
    Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  /** Returns the total price of all items in the cart before tax. */
  const getCartAmount = () =>
    Object.entries(cartItems).reduce((total, [itemId, qty]) => {
      const item = products.find((p) => p._id === itemId);
      return item ? total + item.offerPrice * qty : total;
    }, 0);

  useEffect(() => { fetchProductData(); }, []);
  useEffect(() => { fetchUserData(); }, [user]);

  const value: AppContextType = {
    user,
    currency,
    router,
    isSeller,
    setIsSeller,
    userData,
    fetchUserData,
    products,
    fetchProductData,
    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
