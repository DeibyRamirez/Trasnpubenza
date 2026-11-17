type PictureProps = {
  name: "Bus" | "Bus2" | "Bus3";
  widths: number[];
  /** intrinsic size of the largest variant (prevents CLS) */
  width: number;
  height: number;
  sizes: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/** AVIF → WebP → original JPG, with explicit width/height. */
export function Picture({ name, widths, width, height, sizes, alt, className = "", priority = false }: PictureProps) {
  const set = (ext: string) => widths.map((w) => `/recursos/opt/${name}-${w}.${ext} ${w}w`).join(", ");
  return (
    <picture>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={`/recursos/${name}.jpg`}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
      />
    </picture>
  );
}
