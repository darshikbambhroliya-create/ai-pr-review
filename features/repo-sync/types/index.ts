export type RepoFile = {
  filePath: string;
  content: string;
};

export type repoSyncStatus = "pending" | "syncing" | "synced" | "failed";
