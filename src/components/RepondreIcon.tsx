interface RepondreIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

/** Enveloppe reçue et flèche de réponse : symbole du mode Répondre. */
export function RepondreIcon({
  size = 24,
  color = "currentColor",
  strokeWidth = 1.5,
  className,
}: RepondreIconProps) {
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
      <rect x="4" y="10" width="16" height="10" rx="2" ry="2" opacity="0.6" />
      <path d="m4 10 8 6 8-6" opacity="0.6" />
      <path d="M9 5 3 10l6 5" />
      <path d="M3 10h11a5 5 0 0 0 5-5V4" />
    </svg>
  );
}
