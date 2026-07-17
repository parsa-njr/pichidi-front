"use client";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useMe } from "@/api/auth/queries";

export default function AuthGate({
    role,
    children,
}: {
    role: "user" | "customer";
    children: ReactNode;
}) {
    const router = useRouter();
    const { data, isLoading, isError } = useMe();

    useEffect(() => {
        if (isError) router.replace("/");
        else if (data && data.role !== role) {
            router.replace(data.role === "customer" ? "/customer" : "/user");
        }
    }, [data, isError, role, router]);

    // if (isLoading || !data || data.role !== role) {
    //     return (
    //         <div className="flex items-center justify-center min-h-dvh">
    //             <Loader2 className="w-6 h-6 text-primary animate-spin" />
    //         </div>
    //     );
    // }
    return <>{children}</>;
}