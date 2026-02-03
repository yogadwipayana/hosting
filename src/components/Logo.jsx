export function Logo({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Cloud/Server base */}
      <rect x="4" y="18" width="24" height="10" rx="2" fill="white" fillOpacity="0.9" />
      <rect x="6" y="20" width="4" height="2" rx="1" fill="#006BFF" />
      <rect x="6" y="24" width="4" height="2" rx="1" fill="#006BFF" />
      <circle cx="24" cy="21" r="1.5" fill="#22c55e" />
      <circle cx="24" cy="25" r="1.5" fill="#22c55e" />
      
      {/* Upload arrow / Learning symbol */}
      <path
        d="M16 4L22 12H18V16H14V12H10L16 4Z"
        fill="white"
      />
      
      {/* Connection lines */}
      <rect x="15" y="16" width="2" height="2" fill="white" fillOpacity="0.7" />
    </svg>
  )
}

export function LogoMark({ size = 32, color = "currentColor", className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <rect width="32" height="32" rx="8" fill="#006BFF" />
      
      {/* Server/hosting base */}
      <rect x="6" y="18" width="20" height="8" rx="2" fill="white" fillOpacity="0.95" />
      <rect x="8" y="20" width="3" height="1.5" rx="0.75" fill="#006BFF" />
      <rect x="8" y="23" width="3" height="1.5" rx="0.75" fill="#006BFF" />
      <circle cx="22" cy="20.75" r="1" fill="#22c55e" />
      <circle cx="22" cy="23.75" r="1" fill="#22c55e" />
      
      {/* Upload/Deploy arrow */}
      <path
        d="M16 6L21 13H18V16H14V13H11L16 6Z"
        fill="white"
      />
    </svg>
  )
}
