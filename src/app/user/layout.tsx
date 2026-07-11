import AuthGate from "@/components/auth/AuthGate";
import UserBottomNav from "@/components/user/UserBottomNav";
import NextTopLoader from "nextjs-toploader";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGate role="user">
        <NextTopLoader showSpinner={false} />
        <main className="flex-1 overflow-y-auto">{children}</main>

        <UserBottomNav />
      </AuthGate>
    </>
  );
}
