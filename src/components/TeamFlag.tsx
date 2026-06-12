import { getTeamFlagUrl } from "../lib/teamFlags";

interface TeamFlagProps {
  teamName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-3.5 w-5",
  md: "h-4 w-6",
  lg: "h-5 w-7",
};

const sizeWidths = {
  sm: 28,
  md: 40,
  lg: 56,
};

export default function TeamFlag({
  teamName,
  size = "md",
  className = "",
}: TeamFlagProps) {
  const url = getTeamFlagUrl(teamName, sizeWidths[size]);

  if (!url) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center rounded bg-zinc-800 text-[10px] font-bold text-zinc-500 ${sizeClasses[size]} ${className}`}
        aria-hidden
      >
        ?
      </span>
    );
  }

  return (
    <img
      src={url}
      srcSet={`${getTeamFlagUrl(teamName, sizeWidths[size] * 2)} 2x`}
      alt=""
      className={`shrink-0 rounded-sm object-cover shadow-sm ${sizeClasses[size]} ${className}`}
      loading="lazy"
    />
  );
}
