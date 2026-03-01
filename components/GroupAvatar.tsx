"use client";

import type { Group } from "@/types/group";

function getPlaceholderLogoUrl(seed: string, size: number): string {
  return `https://api.dicebear.com/7.x/identicon/png?seed=${encodeURIComponent(seed)}&size=${size}`;
}

export function GroupAvatar({ group, size = "md" }: { group: Group; size?: "sm" | "md" }) {
  const dimension = size === "sm" ? "h-9 w-9" : "h-10 w-10";
  const pixelSize = size === "sm" ? 36 : 40;
  const src = group.avatar_url ?? getPlaceholderLogoUrl(group.id, pixelSize);

  return (
    <img
      src={src}
      alt=""
      className={`${dimension} shrink-0 rounded-full object-cover bg-zinc-100 dark:bg-zinc-800`}
    />
  );
}
