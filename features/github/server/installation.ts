import { GithubInstallationStatus } from "@/features/dashboard/lib/types";
import prisma from "@/lib/db";
import { getGithubApp } from "../utils/github-app";

function getAccountLogin(
  account: { login?: string; slug?: string } | null | undefined
) {
  if (!account) {
    return null;
  }
  if (account.login && "login" in account) {
    return account.login;
  }
  if (account.slug) {
    return account.slug;
  }
  return null;
}

function buildDisconnectStatus(): GithubInstallationStatus {
  return { connected: false, accountLogin: null, installedAt: null };
}

export async function getInstallationStatus(userId: string) {
  const installation = await prisma.githubInstallation.findUnique({
    where: {
      userId,
    },
  });
  if (!installation) return buildDisconnectStatus();
  return {
    connected: true,
    accountLogin: installation.accountLogin,
    installedAt: installation.createdAt.toISOString(),
  };
}

export async function saveInstallation(userId: string, installationId: number) {
  const app = getGithubApp();
  const { data } = await app.octokit.request(
    "GET /app/installations/{installation_id}",
    {
      installation_id: installationId,
    }
  );
  const accountLogin = getAccountLogin(data.account);
  if (!accountLogin) {
    throw new Error("GitHub account login is missing");
  }

  await prisma.githubInstallation.upsert({
    where: { userId },
    create: {
      userId,
      installationId,
      accountLogin,
      accountType: data.target_type ?? null,
    },
    update: {
      installationId,
      accountLogin,
      accountType: data.target_type ?? null,
    },
  });
}

export async function DeleteInstallation(userId: string) {
  await prisma.githubInstallation.delete({
    where: {
      userId,
    },
  });
  return buildDisconnectStatus();
}

export async function getUserByInstallationId(installation_id: number) {
  const installation = await prisma.githubInstallation.findFirst({
    where: {
      installationId: installation_id,
    },
  });
  if (!installation) return null;
  return installation.userId;
}

export async function getUserInstallationId(userId: string) {
  const user = await prisma.githubInstallation.findUnique({
    where: {
      userId,
    },
    select: {
      installationId: true,
    },
  });
  if (!user) return null;
  return user.installationId;
}
