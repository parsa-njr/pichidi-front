
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, MapPin, Clock, FileText, ClipboardList, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/customer", label: "خانه", icon: Home, exact: true },
  { href: "/customer/staff", label: "کارمندان", icon: Users },
  { href: "/customer/location", label: "موقعیت", icon: MapPin },
  { href: "/customer/shift", label: "شیفت", icon: Clock },
  { href: "/customer/report", label: "گزارش", icon: FileText },
  { href: "/customer/request", label: "درخواست", icon: ClipboardList },
  // { href: "/customer/profile", label: "پروفایل", icon: User },
];

export default function CustomerBottomNav() {
  const pathname = usePathname();

  return (
    // sticky bottom-0 داخل flex column layout — از container بیرون نمیزنه
    <nav
      dir="rtl"
      className="sticky bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 flex-shrink-0 rounded-t-3xl"
      style={{ boxShadow: "0 -4px 12px rgba(0,0,0,0.06)" }}
    >
      <ul className="flex items-center justify-around py-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon, exact }) => {
          const active = exact
            ? pathname === href
            : pathname === href || pathname.startsWith(href + "/");

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className="flex flex-col items-center justify-center gap-0.5 py-1.5"
              >
                <div className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-xl transition-all",
                  active ? "bg-primary/10" : ""
                )}>
                  <Icon className={cn(
                    "w-5 h-5 transition-all",
                    active ? "text-primary stroke-[2.5px]" : "text-gray-400"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-medium",
                  active ? "text-primary" : "text-gray-400"
                )}>
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}