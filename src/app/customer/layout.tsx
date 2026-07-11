import AuthGate from "@/components/auth/AuthGate";
import CustomerBottomNav from "@/components/customer/CustomerBottomNav";
import NextTopLoader from "nextjs-toploader";

export default async function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthGate role="customer">
        <NextTopLoader showSpinner={false} />
        <main className="flex-1 overflow-y-auto">{children}</main>

        <CustomerBottomNav />
      </AuthGate>
    </>
  );
}
