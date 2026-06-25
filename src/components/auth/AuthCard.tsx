"use client";

import { Card } from "@/components/ui/card";

export default function AuthCard({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4">
            <Card className="w-full max-w-md p-6 backdrop-blur-xl bg-white/5 border-white/10 shadow-2xl rounded-2xl">
                <h1 className="text-center text-white text-2xl font-semibold mb-6">
                    {title}
                </h1>
                {children}
            </Card>
        </div>
    );
}