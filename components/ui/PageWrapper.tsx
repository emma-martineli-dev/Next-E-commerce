/**
 * PageWrapper
 * Wraps a page with the standard Navbar and Footer layout.
 * Used across all customer-facing pages to ensure consistent structure.
 */
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
  /** Additional className applied to the inner content container */
  className?: string;
}

const PageWrapper = ({ children, className = "" }: PageWrapperProps) => {
  return (
    <>
      <Navbar />
      <main className={`bg-[#050F1C] min-h-screen ${className}`}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default PageWrapper;
