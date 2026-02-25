# Periskope — WhatsApp Group Management UI

Next.js app for managing WhatsApp groups: sidebar with profile and nav, top bar, groups table (scrollable, clickable rows), and a right-hand side panel with group details.

---

## 1. Setup instructions (run locally)

1. **Clone and install**

   ```bash
   git clone <repo-url>
   cd periskope
   npm install
   ```

2. **Configure environment variables**

   Copy the example env file and add your values:

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with:

   - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL  
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon / publishable key  

   Both are available in Supabase Dashboard → **Project → Settings → API**.

3. **Create the database table and seed data** (optional; the app falls back to mock data if skipped)

   In Supabase → **SQL Editor**, run the contents of `supabase/schema.sql`. This:

   - Creates the `public.groups` table
   - Enables Row Level Security on `groups`
   - Adds a simple public read policy for demo
   - Inserts a set of seed rows

4. **Run the app**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) and go to **Groups** in the sidebar.

---

## 2. Tech stack

- **Framework:** Next.js 13+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (Postgres + RLS)

---

## 3. Layout and current flow

### 3.1 Page structure

The app uses a single full-height row:

- **Left:** Sidebar (fixed width), full viewport height.
- **Right:** Column containing the **top bar** (header) and the **main** content area.

The **sidebar profile block** and the **top bar** share the same height (`h-16`) so they align on the first row.

### 3.2 Sidebar (left)

- **Profile section (top):** Green “P” logo, “Periskope”, “bharat@hashlabs.dev”, and a dropdown chevron. Height matches the top bar.
- **Nav (middle):** Dashboard, Chats (with “99+” badge), Groups, Contacts, Logs, Files, Settings. Each item has an icon; the active route is highlighted (e.g. Groups when on `/groups`).
- **Footer:** “Help & Support” with a WhatsApp-style icon, linking to `/help`.

Only `/`, `/groups`, and `/help` are implemented; other nav links are placeholders.

### 3.3 Top bar (header)

- **Left:** Grid icon and the label “groups”.
- **Right:** Docs (with document icon), phone number “+91 90043 89372” (with phone icon), and a circular profile/avatar icon.

The top bar spans only the content area (to the right of the sidebar). Search is **not** in the top bar; it lives in the **Groups** table toolbar (see below).

### 3.4 Main content (by route)

- **`/` (Dashboard):** Simple landing with a link to Groups.
- **`/groups`:**  
  - **Toolbar row:** “# groups”, Supabase/Mock data badge, **Q Search** (search input with magnifying glass), Filter, Bulk message, Group Actions.  
  - **Table:** Scrollable list of groups (checkbox, name, project, labels, members, last active). Rows are clickable; the selected row is highlighted.  
  - **Right panel:** Shows details for the selected group (icon, name, Refresh). Tabs: Overview (active), Members, Logs. Overview shows last active, disappearing messages, send permission, project, labels, Export Chat, Exit Group, and an issue card (e.g. PER-011). All actions are UI-only.
- **`/help`:** Help & Support page with WhatsApp support card, contact details, and FAQ.

### 3.5 Data flow (Groups screen)

1. **Server:** `app/groups/page.tsx` calls `getGroups()` from `lib/groups.ts`.
2. **getGroups():** If Supabase env vars are set and the API returns rows, it loads `public.groups`, adds `last_active_display`, and returns `{ groups, source: "supabase" }`. Otherwise it returns mock groups and `{ source: "mock" }`.
3. **Page** renders `<GroupsView initialGroups={groups} dataSource={source} />`.
4. **GroupsView (client):** Holds `selectedGroup` state. Renders `GroupsTable` (toolbar + table, with search in the toolbar) and `GroupSidePanel` (selected group details). Table row click updates `selectedGroup`.

---

## 4. Project structure

```text
app/
  layout.tsx          # Sidebar | (Header + main); no full-width header above sidebar
  page.tsx            # Dashboard landing
  groups/page.tsx     # Groups screen (SSR getGroups + GroupsView)
  help/page.tsx       # Help & Support
  globals.css         # Global styles + Tailwind

components/
  Header.tsx          # Top bar: "groups" + grid icon (left), Docs + phone + profile (right)
  Sidebar.tsx         # Profile block (logo, Periskope, email) + nav with icons + Help & Support
  GroupsView.tsx      # Client: table + side panel + selection state
  GroupsTable.tsx     # Toolbar (# groups, badge, Q Search, Filter, Bulk message, Group Actions) + table
  GroupSidePanel.tsx  # Right panel: selected group header, tabs, overview, actions, issue card

lib/
  supabase.ts         # Supabase client factory
  groups.ts           # getGroups(): Supabase or mock, returns { groups, source }
  format.ts           # formatLastActive() for "last active" labels

supabase/
  schema.sql          # groups table, RLS, seed data

types/
  group.ts            # Group interface (includes last_active_display)
```

---

## 5. Required environment variables (.env.example)

Use `.env.example` as a template; copy it to `.env.local` and fill in the values:

| Variable                         | Description                                  |
|----------------------------------|----------------------------------------------|
| `NEXT_PUBLIC_SUPABASE_URL`       | Supabase project URL (e.g. `https://xxxx.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Supabase anon (publishable) API key          |

Example (from [.env.example](.env.example)):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

If these are not set, the app runs entirely on mock data.

---

## 6. Notes and assumptions

- **Navigation:** Only `/`, `/groups`, and `/help` are implemented. Other sidebar links are UI-only.
- **Search / Filter / Actions:** Q Search, Filter, Bulk message, Group Actions, Export Chat, Exit Group, and Add Label are UI-only (no backend).
- **Auth:** None. RLS on `groups` allows public read for demo; restrict in production.
- **Single context:** UI assumes one phone/workspace; no multi-tenant switching.

---

## 7. Scripts

| Command          | Description               |
|------------------|---------------------------|
| `npm run dev`    | Start development server  |
| `npm run build`  | Production build          |
| `npm run start`  | Start production server   |
| `npm run lint`   | Run ESLint                |
