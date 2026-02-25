export default function HelpPage() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
          Help & Support
        </h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Get assistance with Periskope and WhatsApp group management.
        </p>
      </div>

      <section className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-2xl dark:bg-emerald-900/50">
            💬
          </div>
          <div>
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
              WhatsApp Support
            </h2>
            <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              Reach us on WhatsApp for quick help with groups and messaging.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
            >
              <span>Open in WhatsApp</span>
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          Contact
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
          <li className="flex items-center gap-2">
            <span className="text-zinc-400 dark:text-zinc-500">Phone:</span>
            <span>+91 90043 89372</span>
          </li>
          <li className="flex items-center gap-2">
            <span className="text-zinc-400 dark:text-zinc-500">Email:</span>
            <span>bharat@hashlabs.dev</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-50">
          FAQ
        </h2>
        <ul className="mt-3 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
          <li className="rounded-lg border border-zinc-200 py-3 px-4 dark:border-zinc-800">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">How do I add a new group?</span>
            <p className="mt-1 text-zinc-500 dark:text-zinc-500">Use Group Actions in the Groups page to connect a WhatsApp group.</p>
          </li>
          <li className="rounded-lg border border-zinc-200 py-3 px-4 dark:border-zinc-800">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Where are my messages stored?</span>
            <p className="mt-1 text-zinc-500 dark:text-zinc-500">Messages are synced with your connected WhatsApp account.</p>
          </li>
          <li className="rounded-lg border border-zinc-200 py-3 px-4 dark:border-zinc-800">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">How do I export a chat?</span>
            <p className="mt-1 text-zinc-500 dark:text-zinc-500">Select a group and use Export Chat in the overview panel.</p>
          </li>
        </ul>
      </section>
    </div>
  );
}
