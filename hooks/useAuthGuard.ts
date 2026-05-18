/**
 * useAuthGuard
 * Custom hook that redirects unauthenticated users to the Clerk sign-in modal.
 * Shows a toast notification before opening the sign-in dialog.
 *
 * @param redirectUrl - The URL to redirect back to after successful sign-in.
 * @param message     - The toast error message shown to the user.
 *
 * Usage:
 *   useAuthGuard("/cart", "Please sign in to view your cart.");
 */
"use client";

import { useEffect } from "react";
import { useClerk } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { useAppContext } from "@context/AppContext";

const useAuthGuard = (redirectUrl: string, message: string) => {
  const { user, isLoaded } = useAppContext();
  const { openSignIn } = useClerk();

  useEffect(() => {
    // Only check when Clerk has finished loading
    if (isLoaded && user === null) {
      toast.error(message);
      openSignIn({ redirectUrl });
    }
  }, [user, isLoaded]);
};

export default useAuthGuard;
