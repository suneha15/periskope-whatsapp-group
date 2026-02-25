import { getGroups } from "@/lib/groups";
import GroupsView from "@/components/GroupsView";

export default async function GroupsPage() {
  const { groups, source } = await getGroups();

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <GroupsView initialGroups={groups} dataSource={source} />
    </div>
  );
}
