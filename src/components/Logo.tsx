export default function Logo({ className = "", size = "md" }: { className?: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "h-12", md: "h-16", lg: "h-24" };
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 200 80"
        className={`${sizes[size]} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Sugar Sands Hunting Preserve logo with deer, turkey, and bear silhouettes"
        role="img"
      >
        {/* Bear silhouette - left */}
        <g fill="currentColor" opacity="0.9">
          <path d="M15 58c-1-2-2-5-1-8 1-4 3-7 6-9 2-1 3-3 3-5 0-3 2-4 4-3 1 1 2 0 2-1 1-2 3-2 4 0 1 1 2 2 3 1 2-1 4 0 4 3 0 2 1 4 3 5 3 2 5 5 6 9 1 3 0 6-1 8H15z" />
          <ellipse cx="20" cy="34" rx="2.5" ry="3" />
          <ellipse cx="38" cy="34" rx="2.5" ry="3" />
        </g>

        {/* Deer/Buck silhouette - center */}
        <g fill="currentColor">
          {/* Antlers */}
          <path d="M88 8c-1 3-3 5-5 7-1 1-1 2 0 3l3 4c1 1 0 2-1 2-2-1-4-3-5-5-1 2 0 5 2 7 1 1 0 2-1 1-2-1-3-3-3-5 0 2 1 4 2 6 0 1-1 1-1 1-2-2-3-4-3-6v5c0 1-1 1-1 0-1-3-1-6 0-9l-1 1c0 1-1 1-1 0l-1-4 1-3c1-2 3-4 5-5l3-2c1-1 2 0 2 1l1 1z" />
          <path d="M112 8c1 3 3 5 5 7 1 1 1 2 0 3l-3 4c-1 1 0 2 1 2 2-1 4-3 5-5 1 2 0 5-2 7-1 1 0 2 1 1 2-1 3-3 3-5 0 2-1 4-2 6 0 1 1 1 1 1 2-2 3-4 3-6v5c0 1 1 1 1 0 1-3 1-6 0-9l1 1c0 1 1 1 1 0l1-4-1-3c-1-2-3-4-5-5l-3-2c-1-1-2 0-2 1l-1 1z" />
          {/* Head */}
          <ellipse cx="100" cy="26" rx="6" ry="7" />
          {/* Neck */}
          <path d="M95 32c0 0-2 4-3 8-1 3-1 6 0 8h16c1-2 1-5 0-8-1-4-3-8-3-8h-10z" />
          {/* Body */}
          <path d="M85 46c-3 1-5 3-6 6-1 2-1 5 0 7h42c1-2 1-5 0-7-1-3-3-5-6-6H85z" />
          {/* Legs */}
          <rect x="87" y="58" width="3" height="12" rx="1" />
          <rect x="95" y="58" width="3" height="11" rx="1" />
          <rect x="103" y="58" width="3" height="11" rx="1" />
          <rect x="111" y="58" width="3" height="12" rx="1" />
          {/* Ears */}
          <path d="M93 20l-3-4c0-1 0-1 1-1l3 3-1 2z" />
          <path d="M107 20l3-4c0-1 0-1-1-1l-3 3 1 2z" />
        </g>

        {/* Turkey silhouette - right */}
        <g fill="currentColor" opacity="0.9">
          {/* Fan tail */}
          <path d="M170 30c-4-8-2-16 2-22 1-1 2-1 2 1-1 5 0 10 3 14 1-5 3-10 6-14 1-1 2-1 2 0-1 6-1 14-4 20l2-1c4-4 7-9 8-15 0-1 1-1 1 0 0 7-3 13-7 18l1 1c3-2 6-6 8-10 0-1 1-1 1 0-1 5-4 10-8 13 3-1 5-4 7-7 0-1 1 0 1 0-1 4-4 8-8 10h1c0-1 1-1 1 0 0 3-2 6-5 8l-3 1-10 2z" />
          {/* Body */}
          <ellipse cx="172" cy="45" rx="8" ry="10" />
          {/* Head/neck */}
          <path d="M168 35c-1-3-1-6 0-9 0-2 2-2 3-1 1 2 1 5 0 8l-3 2z" />
          <circle cx="168" cy="24" r="2.5" />
          {/* Snood */}
          <path d="M166 24c-1 1-2 3-1 5 0 1-1 1-1 0-1-2 0-4 1-6l1 1z" />
          {/* Legs */}
          <path d="M169 54l-2 8-3 1h6l-3-1 2-8z" />
          <path d="M175 54l-2 8-3 1h6l-3-1 2-8z" />
        </g>

        {/* Decorative line */}
        <line x1="50" y1="72" x2="150" y2="72" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      </svg>
    </div>
  );
}
