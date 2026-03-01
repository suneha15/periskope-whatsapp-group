"use client";

import { GroupAvatar } from "@/components/GroupAvatar";
import { formatLastActive } from "@/lib/format";
import { defaultProjectClass, getLabelChipPanelClass, getLabelDotClass, projectChipClasses } from "@/lib/chipColors";
import type { Group } from "@/types/group";

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);

export default function GroupSidePanel({ group }: { group: Group | null }) {
  if (!group) {
    return (
      <div className="flex w-80 shrink-0 flex-col items-center justify-center border-l border-zinc-200 bg-zinc-50/50 p-6 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400">
        Select a group to view details
      </div>
    );
  }

  return (
    <aside className="flex w-80 shrink-0 flex-col border-l border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-zinc-200 px-4 dark:border-zinc-800">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="ring-1 ring-zinc-200 rounded-full p-0.5 dark:ring-zinc-600">
            <GroupAvatar group={group} size="sm" />
          </div>
          <span className="truncate text-sm font-semibold text-zinc-800 dark:text-zinc-100">
            {group.name}
          </span>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400"
          title="Refresh"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>
      <div className="flex gap-4 border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
        <button type="button" className="border-b-2 border-brand pb-2 text-sm font-medium text-brand dark:border-brand dark:text-brand">
          Overview
        </button>
        <button type="button" className="pb-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
          Members
        </button>
        <button type="button" className="pb-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50">
          Logs
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <dl className="space-y-3 pb-5 text-sm">
          <div className="flex items-center justify-between gap-3">
            <dt className="shrink-0 text-zinc-500 dark:text-zinc-400">Last Active</dt>
            <dd className="min-w-0 text-right font-medium text-zinc-900 dark:text-zinc-50">
              {group.last_active_display ?? formatLastActive(group.last_active)}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">Disappearing Messages</dt>
            <dd className="flex min-w-0 flex-1 items-center justify-end gap-2">
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50">OFF</span>
              <button type="button" className="shrink-0 text-zinc-500 dark:text-zinc-400" aria-label="Disappearing Messages options">
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="shrink-0 text-xs text-zinc-500 dark:text-zinc-400">Send Message Permission</dt>
            <dd className="flex min-w-0 flex-1 items-center justify-end gap-2">
              <span className="text-xs font-medium text-zinc-900 dark:text-zinc-50">All</span>
              <button type="button" className="shrink-0 text-zinc-500 dark:text-zinc-400" aria-label="Send message permission options">
                <ChevronDownIcon className="h-4 w-4" />
              </button>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="shrink-0 text-zinc-500 dark:text-zinc-400">Project</dt>
            <dd className="min-w-0 text-right">
              <span className={`inline-flex rounded px-2 py-0.5 text-xs font-medium border ${group.project === "Clients" ? "border-orange-200 dark:border-orange-700 " : "border-blue-200 dark:border-blue-700 "}${projectChipClasses[group.project] ?? defaultProjectClass}`}>
                # {group.project}
              </span>
            </dd>
          </div>
          <div className="flex items-start justify-between gap-3">
            <dt className="shrink-0 text-zinc-500 dark:text-zinc-400">Labels</dt>
            <dd className="flex min-w-0 flex-col items-end gap-1.5">
              {group.labels.map((label) => (
                <span
                  key={label}
                  className={`inline-flex w-fit items-center gap-1 rounded px-2 py-0.5 text-xs font-medium ${getLabelChipPanelClass(label)}`}
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${getLabelDotClass(label)}`} />
                  {label}
                </span>
              ))}
              <button type="button" className="inline-flex w-fit items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                <span>+</span>
                <span>Add Label</span>
              </button>
            </dd>
          </div>
        </dl>
        <div className="border-t border-zinc-200 pt-4 dark:border-zinc-800">
          <div className="flex flex-col gap-2">
            <button type="button" className="flex items-center gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200">
              <svg className="h-4 w-4 shrink-0 text-zinc-700 dark:text-zinc-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
              </svg>
              Export Chat
            </button>
            <button type="button" className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-400">
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v3.75m9 9-3-3m0 0-3 3m3-3V9" />
              </svg>
              Exit Group
            </button>
          </div>
        </div>
        <div className="mt-4">
          <div className="rounded border border-zinc-200 p-3 dark:border-zinc-800">
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400">PER-011 | {group.name}</span>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-500 text-xs font-medium text-white">
                H
              </div>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-zinc-900 dark:text-zinc-50">
              <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" />
              Issues with mentions on groups
            </p>
            <div className="mt-1 flex items-center justify-between gap-2 text-xs">
              <span className="flex items-center gap-1.5">
                <svg className="h-3.5 w-3.5 shrink-0 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
                <span className="inline-flex items-center gap-1 rounded border border-pink-200 bg-pink-50 px-1.5 py-0.5 text-zinc-600 dark:border-pink-800 dark:bg-pink-950/30 dark:text-zinc-400">
                  <svg className="h-3 w-3 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  Dec 22
                </span>
                <span className="inline-flex items-center gap-1 rounded border border-zinc-200 bg-zinc-100 px-1.5 py-0.5 text-zinc-600 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-500 dark:bg-zinc-400" />
                  client
                </span>
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">3 days</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
