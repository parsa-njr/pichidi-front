"use client";

import { RefreshCw, Bell } from "lucide-react";
import DashboardHeroShell from "@/components/shared/dashboard/DashboardHeroShell";
import { getInitial } from "@/utils/getInitial";

interface DashboardHeroProps {
    greeting: string;
    name?: string;
    avatarSrc?: string;
    refreshing: boolean;
    onRefresh: () => void;
}

export default function DashboardHero({ greeting, name, avatarSrc, refreshing, onRefresh }: DashboardHeroProps) {
    return (
        <DashboardHeroShell>
            <div className="relative flex items-center justify-between mb-5">
                <div className="relative flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {avatarSrc ? (
                            <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <span className="text-primary-foreground text-lg font-bold">{getInitial(name)}</span>
                        )}
                    </div>
                    <div className="text-right">
                        <p className="text-primary-foreground/70 text-xs mb-0.5">{greeting} 👋</p>
                        <p className="text-primary-foreground text-lg font-bold">{name ?? "کارفرما"}</p>
                    </div>
                </div>
                <button
                    onClick={onRefresh}
                    className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center active:scale-95 transition-transform border border-white/20"
                >
                    <RefreshCw className={`w-4 h-4 text-primary-foreground ${refreshing ? "animate-spin" : ""}`} />
                </button>
                {/* <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20">
                    <Bell className="w-4 h-4 text-primary-foreground" />
                </div> */}
            </div>

           
        </DashboardHeroShell>
    );
}