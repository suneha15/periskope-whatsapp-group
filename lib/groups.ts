import { formatLastActive } from "@/lib/format";
import { createSupabaseClient } from "@/lib/supabase";
import type { Group } from "@/types/group";

/** Mock groups for when Supabase is not configured or returns no data */
const MOCK_GROUPS: Group[] = [
  { id: "1", name: "Evoke <> Skope", project: "Demo", members_count: 3, last_active: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), labels: ["High Value", "Priority", "Warm"], avatar_url: null, unread_count: 10, has_alert: false },
  { id: "2", name: "Xindus Trade Network <> Periskope", project: "Clients", members_count: 8, last_active: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), labels: ["Pilot", "1+"], avatar_url: null, unread_count: 17, has_alert: false },
  { id: "3", name: "TBC <> Periskope", project: "Demo", members_count: 5, last_active: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), labels: ["Priority"], avatar_url: null, unread_count: 8, has_alert: true },
  { id: "4", name: "Alpha <> Skope", project: "Demo", members_count: 4, last_active: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), labels: ["Warm"], avatar_url: null, unread_count: 0, has_alert: false },
  { id: "5", name: "Beta <> Periskope", project: "Clients", members_count: 6, last_active: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), labels: ["High Value", "Pilot"], avatar_url: null, unread_count: 3, has_alert: false },
  { id: "6", name: "Gamma <> Skope", project: "Internal", members_count: 10, last_active: new Date(Date.now() - 30 * 60 * 1000).toISOString(), labels: ["Priority", "Warm"], avatar_url: null, unread_count: 5, has_alert: false },
  { id: "7", name: "Delta <> Periskope", project: "Clients", members_count: 7, last_active: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), labels: ["Pilot"], avatar_url: null, unread_count: 12, has_alert: false },
  { id: "8", name: "Epsilon <> Skope", project: "Demo", members_count: 3, last_active: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), labels: ["Warm"], avatar_url: null, unread_count: 0, has_alert: true },
  { id: "9", name: "Zeta <> Periskope", project: "Internal", members_count: 9, last_active: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), labels: ["High Value"], avatar_url: null, unread_count: 2, has_alert: false },
  { id: "10", name: "Eta <> Skope", project: "Clients", members_count: 5, last_active: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), labels: ["Priority", "1+"], avatar_url: null, unread_count: 6, has_alert: false },
];

export type GroupsResult = { groups: Group[]; source: "supabase" | "mock" };

export async function getGroups(): Promise<GroupsResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    const groups = MOCK_GROUPS.map((g) => ({ ...g, last_active_display: formatLastActive(g.last_active) }));
    return { groups, source: "mock" };
  }

  try {
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
      .from("groups")
      .select("*")
      .order("last_active", { ascending: false });

    if (error) {
      const groups = MOCK_GROUPS.map((g) => ({ ...g, last_active_display: formatLastActive(g.last_active) }));
      return { groups, source: "mock" };
    }
    if (!data?.length) {
      const groups = MOCK_GROUPS.map((g) => ({ ...g, last_active_display: formatLastActive(g.last_active) }));
      return { groups, source: "mock" };
    }

    const groups = data.map((row: Record<string, unknown>) => {
      const last_active = String(row.last_active);
      return {
        id: String(row.id),
        name: String(row.name),
        project: String(row.project),
        members_count: Number(row.members_count),
        last_active,
        last_active_display: formatLastActive(last_active),
        labels: Array.isArray(row.labels) ? (row.labels as string[]) : [],
        avatar_url: row.avatar_url != null ? String(row.avatar_url) : null,
        unread_count: Number(row.unread_count ?? 0),
        has_alert: Boolean(row.has_alert),
        created_at: row.created_at != null ? String(row.created_at) : undefined,
      };
    });
    return { groups, source: "supabase" };
  } catch {
    const groups = MOCK_GROUPS.map((g) => ({ ...g, last_active_display: formatLastActive(g.last_active) }));
    return { groups, source: "mock" };
  }
}
