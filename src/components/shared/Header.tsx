"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { User, LogOut, ChevronDown } from "lucide-react";
import { useMe } from "@/api/auth/queries";
import { useLogout } from "@/api/auth/queries";
import { resolveImageUrl } from "@/utils/resolveImageUrl";
import NotificationBell from "./NotificationBell";
import { getInitial } from "@/utils/getInitial";
import Image from "next/image";



export default function Header() {
    const router = useRouter();
    const { data } = useMe();
    const logout = useLogout();
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const user = data?.user;
    const role = data?.role;

    const goToProfile = () => {
        setOpen(false);
        router.push(role === "customer" ? "/customer/profile" : "/user/profile");
    };

    const handleLogout = () => {
        setOpen(false);
        logout.mutate();
    };
    const pathname = usePathname();
    const inDashboard = pathname === "/user" || pathname === "/customer"


    return (
        <header
            dir="rtl"
            className={`sticky flex justify-between top-0 z-20 flex-shrink-0 bg-primary border-b border-primary/20 ${!inDashboard && "rounded-b-2xl"} `}
            style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.12)" }}
        >  <div className="relative h-20 w-20 flex-shrink-0"> {/* ابعاد ثابت باکس لوگو */}
                <Image
                    src="/images/pichidiLogo.svg"
                    alt="Logo"
                    fill
                    className="object-contain"
                    priority
                />
            </div>
            <div className="flex items-center justify-between px-5 py-3">
                {/* Brand mark */}
                {/* Brand mark */}
               
                {/* <Image
                    src="/images/pichidiLogo.svg"
                    alt="Logo"
                    width={64}
                    height={36}
                /> */}
              
                <div className="flex gap-2 items-center">

                    {/* Profile trigger */}
                    <div className="relative" ref={containerRef}>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="flex items-center gap-2.5 pl-1 pr-1.5 py-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                            <ChevronDown
                                className={`w-4 h-4 text-primary-foreground/70 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                            />
                            <div className="text-right leading-tight">
                                <p className="text-sm font-semibold text-primary-foreground max-w-[110px] truncate">
                                    {user?.name ?? "کاربر"}
                                </p>
                                <p className="text-[11px] text-primary-foreground/70">
                                    {role === "customer" ? "کارفرما" : "کارمند"}
                                </p>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-primary-foreground text-sm font-bold border border-white/25 overflow-hidden">
                                {user?.profileImage ? (
                                    <img
                                        src={resolveImageUrl(user.profileImage)}
                                        alt={user?.name ?? ""}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    getInitial(user?.name)
                                )}
                            </div>
                        </button>

                        {/* Dropdown */}
                        <div
                            className={`absolute left-0 top-[calc(100%+10px)] w-48 bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden origin-top-left transition-all duration-150 ${open
                                ? "opacity-100 scale-100 pointer-events-auto"
                                : "opacity-0 scale-95 pointer-events-none"
                                }`}
                        >
                            <div className="px-4 py-3 border-b border-gray-50">
                                <p className="text-sm font-semibold text-gray-800 truncate">{user?.name ?? "کاربر"}</p>
                                <p className="text-xs text-gray-400 truncate mt-0.5">{user?.phone ?? "—"}</p>
                            </div>

                            <button
                                onClick={goToProfile}
                                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:bg-primary/5 transition-colors"
                            >
                                <User className="w-4 h-4 text-primary" />
                                پروفایل من
                            </button>

                            <button
                                onClick={handleLogout}
                                disabled={logout.isPending}
                                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
                            >
                                <LogOut className="w-4 h-4" />
                                {logout.isPending ? "در حال خروج..." : "خروج از حساب"}
                            </button>
                        </div>
                    </div>
                    <NotificationBell />
                </div>

            </div>
        </header>
    );
}