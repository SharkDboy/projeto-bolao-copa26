import { useState } from "react";
import {
  getTeamDisplayName,
  getTeamFlagEmoji,
  getTeamFlagUrl,
} from "../lib/teamFlags";

interface TeamFlagProps {
  teamName: string;
  size?: "sm" | "md" | "lg" | "panel";
  panelSide?: "left" | "right";
  className?: string;
}

const imgSizeClasses = {
  sm: "h-4 w-6",
  md: "h-5 w-7",
  lg: "h-6 w-9",
  panel: "h-full w-full object-cover",
};

const panelWrapperClasses = {
  left: "h-20 w-14 shrink-0 overflow-hidden rounded-l-lg sm:h-28 sm:w-20",
  right: "h-20 w-14 shrink-0 overflow-hidden rounded-r-lg sm:h-28 sm:w-20",
};

const emojiSizeClasses = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
  panel: "text-3xl sm:text-4xl",
};

export default function TeamFlag({
  teamName,
  size = "md",
  panelSide = "left",
  className = "",
}: TeamFlagProps) {
  const [failed, setFailed] = useState(false);
  const url = getTeamFlagUrl(teamName);
  const label = getTeamDisplayName(teamName);
  const emoji = getTeamFlagEmoji(teamName);

  if (size === "panel") {
    if (!url || failed) {
      return (
        <span
          className={`inline-flex items-center justify-center bg-zinc-800 ${panelWrapperClasses[panelSide]} ${className}`}
          role="img"
          aria-label={label}
          title={label}
        >
          <span className={emojiSizeClasses.panel}>{emoji}</span>
        </span>
      );
    }

    return (
      <span
        className={`inline-flex ${panelWrapperClasses[panelSide]} ${className}`}
        title={label}
      >
        <img
          src={url}
          alt=""
          className={imgSizeClasses.panel}
          onError={() => setFailed(true)}
        />
      </span>
    );
  }

  if (!url || failed) {
    return (
      <span
        className={`inline-flex shrink-0 items-center justify-center leading-none ${emojiSizeClasses[size]} ${className}`}
        role="img"
        aria-label={label}
        title={label}
      >
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={url}
      alt=""
      width={size === "lg" ? 36 : size === "md" ? 28 : 24}
      height={size === "lg" ? 24 : size === "md" ? 20 : 16}
      className={`shrink-0 rounded-sm object-cover shadow-sm ${imgSizeClasses[size]} ${className}`}
      onError={() => setFailed(true)}
      title={label}
    />
  );
}
