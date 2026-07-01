import { requireUnAuth } from "@/features/auth/action/SignWithGoogle";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireUnAuth();
  return (
    <div>
      <div>{children}</div>
    </div>
  );
}
