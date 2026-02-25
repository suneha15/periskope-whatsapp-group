"use client";

import { formatLastActive } from "@/lib/format";
import type { Group } from "@/types/group";

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
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-500 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.215C3.383 15.97 4.167 15.5 5 15.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 1-1.302 4.665" />
            </svg>
          </div>
          <span className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-50">
            {group.name}
          </span>
        </div>
        <button
          type="button"
          className="flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
          title="Refresh"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          <span>Refresh</span>
        </button>
      </div>
      <div className="flex gap-4 border-b border-zinc-200 px-4 py-2 dark:border-zinc-800">
        <button type="button" className="border-b-2 border-emerald-600 pb-2 text-sm font-medium text-emerald-600 dark:border-emerald-500 dark:text-emerald-400">
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
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Last Active</dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-50">
              {group.last_active_display ?? formatLastActive(group.last_active)}
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
              Disappearing Messages
              <button type="button" className="rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300" aria-label="Info">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </button>
            </dt>
            <dd className="font-medium text-zinc-900 dark:text-zinc-50">OFF</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Send Message Permission</dt>
            <dd className="flex items-center gap-1 font-medium text-zinc-900 dark:text-zinc-50">
              All
              <svg className="h-4 w-4 text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Project</dt>
            <dd>
              <span className="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-200">
                # {group.project}
              </span>
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Labels</dt>
            <dd className="flex flex-wrap gap-1">
              {group.labels.map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                  {label}
                </span>
              ))}
              <button type="button" className="rounded-full border border-dashed border-zinc-300 px-2 py-0.5 text-xs text-zinc-500 dark:border-zinc-600 dark:text-zinc-400">
                + Add Label
              </button>
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-zinc-200 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
          >
            ↑ Export Chat
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-red-200 py-2 px-3 text-sm font-medium text-red-600 dark:border-red-900 dark:text-red-400"
          >
            Exit Group
          </button>
        </div>
        <div className="mt-4 rounded-lg border border-zinc-200 p-3 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
            <span>PER-011 | {group.name}</span>
            <span className="text-red-500">⚠</span>
          </div>
          <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            Issues with mentions on groups
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
            Dec 22 · client · 3 days
          </p>
        </div>
      </div>
    </aside>
  );
}
