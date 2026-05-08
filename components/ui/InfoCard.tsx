/**
 * InfoCard
 * A dark navy card with a border used for displaying content blocks.
 * Supports an optional hover highlight on the border.
 * Used in About (values, team) and Contact (info, FAQ) pages.
 */
import React from "react";

interface InfoCardProps {
  children: React.ReactNode;
  /** Extra Tailwind classes for the card container */
  className?: string;
  /** Enable orange border highlight on hover */
  hoverable?: boolean;
}

const InfoCard = ({ children, className = "", hoverable = true }: InfoCardProps) => {
  return (
    <div
      className={`bg-[#0C1F35] border border-[#1E3A5F] rounded-xl p-6 transition
        ${hoverable ? "hover:border-orange-500/50" : ""}
        ${className}`}
    >
      {children}
    </div>
  );
};

export default InfoCard;
