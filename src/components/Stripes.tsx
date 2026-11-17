/** Diagonal stripe motif from the logo's lower-left corner. */
export function Stripes({ className = "", count = 4 }: { className?: string; count?: number }) {
  return (
    <span className={`inline-flex gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="block h-full w-[5px] skew-brand bg-current" />
      ))}
    </span>
  );
}
