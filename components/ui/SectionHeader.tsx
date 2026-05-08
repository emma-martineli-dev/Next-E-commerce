/**
 * SectionHeader
 * Displays a labeled section with an optional orange eyebrow text,
 * a main heading, and an optional orange underline accent.
 * Used consistently across About, Contact, and other content pages.
 */

interface SectionHeaderProps {
  /** Small uppercase label shown above the heading in orange */
  eyebrow?: string;
  /** Main heading text */
  heading: string;
  /** Show a short orange underline bar below the heading */
  underline?: boolean;
  /** Center-align the text */
  centered?: boolean;
}

const SectionHeader = ({
  eyebrow,
  heading,
  underline = false,
  centered = false,
}: SectionHeaderProps) => {
  return (
    <div className={centered ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-orange-500 font-medium mb-3 tracking-wide uppercase text-sm">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold text-slate-100">{heading}</h2>
      {underline && (
        <div className="w-28 h-0.5 bg-orange-500 mt-2 mx-auto" />
      )}
    </div>
  );
};

export default SectionHeader;
