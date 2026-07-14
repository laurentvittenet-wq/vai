interface LogoProps {
  size?: number;
  className?: string;
}

/** Diplomatico mark: a speech bubble (the raw message) with a sparkle (the reformulation). */
export function Logo({ size = 36, className }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="36" height="36" rx="10" fill="var(--accent)" />
      <path
        d="M7 13a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v3a5 5 0 0 1-5 5h-6.5L8 25v-4.6A5 5 0 0 1 7 16v-3Z"
        fill="var(--on-accent)"
      />
      <path
        d="M27 4c.5 2.6 1.6 3.7 4.2 4.2-2.6.5-3.7 1.6-4.2 4.2-.5-2.6-1.6-3.7-4.2-4.2C25.4 7.7 26.5 6.6 27 4Z"
        fill="var(--on-accent)"
      />
    </svg>
  );
}
