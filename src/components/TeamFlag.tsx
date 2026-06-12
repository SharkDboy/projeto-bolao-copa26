import { getTeamFlagEmoji } from "../lib/teamFlags";

interface TeamFlagProps {
  teamName: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const emojiSizeClasses = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
};

export default function TeamFlag({
  teamName,
  size = "md",
  className = "",
}: TeamFlagProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center leading-none ${emojiSizeClasses[size]} ${className}`}
      role="img"
      aria-label={teamName}
    >
      {getTeamFlagEmoji(teamName)}
    </span>
  );
}
