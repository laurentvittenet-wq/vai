interface ReformulerIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

/** Avion en papier brut qui s'adoucit en vol : symbole du mode Reformuler. */
export function ReformulerIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  className,
}: ReformulerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 3 10 14" />
      <path d="m21 3-6.5 18-3.5-8-8-3.5 18-6.5z" />
      <path d="M3 21c3-3 7-1 10 2s6-2 8-5" opacity="0.6" />
    </svg>
  );
}
