export interface Group {
  id: string;
  name: string;
  project: string;
  members_count: number;
  last_active: string;
  /** Server-computed label to avoid hydration mismatch (e.g. "03:17", "Yesterday") */
  last_active_display?: string;
  labels: string[];
  avatar_url: string | null;
  unread_count: number;
  has_alert: boolean;
  created_at?: string;
}
