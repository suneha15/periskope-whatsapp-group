export const projectChipClasses: Record<string, string> = {
  Demo: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
  Clients: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-200",
  Internal: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200",
};

export const defaultProjectClass =
  "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200";

const labelDotClasses = [
  "bg-zinc-800 dark:bg-zinc-300",
  "bg-brand",
  "bg-violet-500 dark:bg-violet-400",
  "bg-red-500 dark:bg-red-400",
] as const;

const labelNameToIndex: Record<string, number> = {
  priority: 1,
  pilot: 2,
  warm: 3,
  "high value": 0,
};

function getLabelColorIndex(label: string): number {
  const key = label.toLowerCase().trim();
  return labelNameToIndex[key] ?? (key.startsWith("high") ? 0 : (key.length % 4));
}

export function getLabelDotClass(label: string): string {
  return labelDotClasses[getLabelColorIndex(label)];
}

const labelChipPanelClasses = [
  "border border-zinc-300 bg-zinc-100 text-zinc-800 dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-200",
  "border border-brand bg-brand-light text-brand-muted dark:border-brand dark:bg-brand/20 dark:text-brand-light",
  "border border-violet-400 bg-violet-100 text-violet-800 dark:border-violet-500 dark:bg-violet-900/40 dark:text-violet-200",
  "border border-red-300 bg-red-100 text-red-800 dark:border-red-400 dark:bg-red-900/40 dark:text-red-200",
] as const;

export function getLabelChipPanelClass(label: string): string {
  return labelChipPanelClasses[getLabelColorIndex(label)];
}
