import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        Dashboard
      </h1>
      <p className="text-zinc-500 dark:text-zinc-400">
        <Link href="/groups" className="text-brand hover:underline dark:text-brand">
          Go to Groups
        </Link>{" "}
        to manage WhatsApp groups.
      </p>
    </div>
  );
}
