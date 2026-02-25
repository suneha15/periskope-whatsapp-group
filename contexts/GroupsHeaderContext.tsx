"use client";

import { createContext, useContext, useState } from "react";

export type GroupsHeaderState = {
  count: number;
  dataSource: "supabase" | "mock";
} | null;

const GroupsHeaderContext = createContext<{
  groupsHeader: GroupsHeaderState;
  setGroupsHeader: (value: GroupsHeaderState) => void;
}>({
  groupsHeader: null,
  setGroupsHeader: () => {},
});

export function GroupsHeaderProvider({ children }: { children: React.ReactNode }) {
  const [groupsHeader, setGroupsHeader] = useState<GroupsHeaderState>(null);
  return (
    <GroupsHeaderContext.Provider value={{ groupsHeader, setGroupsHeader }}>
      {children}
    </GroupsHeaderContext.Provider>
  );
}

export function useGroupsHeader() {
  return useContext(GroupsHeaderContext);
}
