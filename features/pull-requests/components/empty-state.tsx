import { FaGithub } from "react-icons/fa";

export function EmptyState() {
  return (
    <div className="rounded-xl border p-12 text-center">
      <FaGithub className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

      <h2 className="text-xl font-semibold">No Pull Requests</h2>

      <p className="mt-2 text-muted-foreground">
        Open a Pull Request after installing the GitHub App.
      </p>
    </div>
  );
}
