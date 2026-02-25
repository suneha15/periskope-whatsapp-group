"use client";

import { useState } from "react";
import GroupsTable from "@/components/GroupsTable";
import GroupSidePanel from "@/components/GroupSidePanel";
import type { Group } from "@/types/group";

export default function GroupsView({
  initialGroups,
  dataSource,
}: {
  initialGroups: Group[];
  dataSource: "supabase" | "mock";
}) {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  return (
    <div className="flex h-full flex-1 overflow-hidden">
      <div className="flex min-w-0 flex-1 flex-col">
        <GroupsTable
          groups={initialGroups}
          selectedId={selectedGroup?.id ?? null}
          onSelectRow={setSelectedGroup}
          dataSource={dataSource}
        />
      </div>
      <GroupSidePanel group={selectedGroup} />
    </div>
  );
}
