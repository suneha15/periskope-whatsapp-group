"use client";

import { formatLastActive } from "@/lib/format";
import { defaultProjectClass, getLabelDotClass, projectChipClasses } from "@/lib/chipColors";
import type { Group } from "@/types/group";
import { GroupAvatar } from "@/components/GroupAvatar";

function ProjectPill({ project }: { project: string }) {
  const className = projectChipClasses[project] ?? defaultProjectClass;
  return (
    <span className={`inline-flex shrink-0 rounded-full px-2 py-0.5 text-xs font-medium whitespace-nowrap ${className}`}>
      # {project}
    </span>
  );
}

export default function GroupsTable({
  groups,
  selectedId,
  onSelectRow,
}: {
  groups: Group[];
  selectedId: string | null;
  onSelectRow: (group: Group) => void;
}) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-4 border-b border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center gap-2">
          <div className="flex h-9 min-w-[10rem] items-center gap-2 rounded border border-zinc-200 bg-zinc-50 px-3 dark:border-zinc-600 dark:bg-zinc-800">
            <svg className="h-4 w-4 shrink-0 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              placeholder="Q Search"
              className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500 dark:placeholder:text-zinc-400"
              readOnly
            />
          </div>
          <button
            type="button"
            className="flex h-9 items-center gap-2 rounded-lg border border-zinc-200 bg-zinc-100 px-3 text-sm font-medium text-zinc-700 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            <svg className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            <span>Filter</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 items-center rounded-lg bg-brand px-3 text-sm font-medium text-white hover:bg-brand-hover"
          >
            Bulk message
          </button>
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            <span>Group Actions</span>
            <svg className="h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-zinc-50 dark:bg-zinc-900">
            <tr className="border-b border-zinc-200 dark:border-zinc-800">
              <th className="w-10 px-4 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400" />
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Group Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Project
              </th>
              <th className="min-w-[7rem] px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Labels
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Members
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Last Active
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => {
              const isSelected = selectedId === group.id;
              return (
                <tr
                  key={group.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelectRow(group)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelectRow(group);
                    }
                  }}
                  className={`cursor-pointer border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900/50 ${
                    isSelected ? "bg-brand/10 dark:bg-brand/20" : "bg-white dark:bg-zinc-950"
                  }`}
                >
                  <td className="w-10 px-4 py-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-zinc-300"
                      onClick={(e) => e.stopPropagation()}
                      readOnly
                    />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      <GroupAvatar group={group} size="md" />
                      <div className="flex min-w-0 items-center gap-2">
                        <span className="truncate font-medium text-zinc-900 dark:text-zinc-50">
                          {group.name}
                        </span>
                        {group.unread_count > 0 && (
                          <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-brand px-1.5 text-xs font-medium text-white">
                            {group.unread_count > 99 ? "99+" : group.unread_count}
                          </span>
                        )}
                        {group.has_alert && (
                          <span className="text-red-500" title="Alert">⚠</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <ProjectPill project={group.project} />
                  </td>
                  <td className="min-w-0 px-4 py-2 align-top">
                    <div className="flex flex-wrap gap-1.5">
                      {group.labels.slice(0, 3).map((label) => (
                        <span
                          key={label}
                          className="inline-flex shrink-0 max-w-[6rem] items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-900 whitespace-nowrap dark:bg-zinc-800 dark:text-zinc-100"
                        >
                          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${getLabelDotClass(label)}`} />
                          <span className="min-w-0 truncate">{label}</span>
                        </span>
                      ))}
                      {group.labels.length > 3 && (
                        <span className="inline-flex shrink-0 items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400">
                          +{group.labels.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {group.members_count}
                  </td>
                  <td className="px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {group.last_active_display ?? formatLastActive(group.last_active)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-zinc-200 px-4 py-2 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded border border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          aria-label="Previous page"
        >
          &lt;
        </button>
        <span>1 of 6</span>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded border border-zinc-200 bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          aria-label="Next page"
        >
          &gt;
        </button>
        <span className="ml-2">{groups.length} rows</span>
      </div>
    </div>
  );
}
