/**
 * ProductImage
 * Renders a product image inside a light grey container.
 * Prevents the dark background from obscuring product photos.
 * Used in ProductCard, cart rows, order thumbnails, and seller lists.
 */
import Image from "next/image";

interface ProductImageProps {
  src: string;
  alt: string;
  /** Width of the image in pixels */
  size?: number;
  /** Extra Tailwind classes for the outer container */
  className?: string;
}

const ProductImage = ({ src, alt, size = 64, className = "" }: ProductImageProps) => {
  return (
    <div
      className={`bg-slate-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${className}`}
    >
      <Image
        src={src && src !== "" && src !== null ? src : "/placeholder-image.png"}
        alt={alt}
        width={size}
        height={size}
        className="object-contain w-full h-full"
      />
    </div>
  );
};

export default ProductImage;
