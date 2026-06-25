"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  ShoppingCart,
  CircleUserRound,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CustomerBottomNav() {
  const pathname = usePathname();

  return (
    <>
      <nav
        style={{ direction: "rtl" }}
        className="sticky   flex w-full   bottom-0 left-0 right-0 z-50 border-t bg-white"
      >
        <ul
          style={{ direction: "rtl" }}
          className="flex w-full items-center justify-between px-2 py-2"
        >
          {/* Category (BUTTON, NOT LINK) */}
          <li className="flex-1">
            <button
              //   onClick={() => setDrawerOpen(true)}
              className="flex w-full flex-col items-center justify-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Menu className="h-6 w-6 font-bold text-gray-800 mb-1" />
              <span>منو</span>
            </button>
          </li>

          {/* Search */}
          <NavLink
            href="/search"
            label="جستجو"
            icon={Search}
            active={pathname === "/search"}
          />

          {/* Home */}
          <NavLink
            href="/"
            label="خانه"
            icon={Home}
            active={pathname === "/"}
          />
          {/* Cart */}
          <NavLink
            href="/cart"
            label="سبد خرید"
            icon={ShoppingCart}
            active={pathname === "/cart"}
          />

          {/* Auth */}
          <NavLink
            href={"/profile/personal-info"}
            label={"پروفایل"}
            icon={CircleUserRound}
            active={pathname === "/auth"}
          />
        </ul>
      </nav>
    </>
  );
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: any;
  active: boolean;
}) {
  return (
    <li className="flex-1">
      <Link
        href={href}
        className={cn(
          "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
          active
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        <Icon className="h-6 w-6 font-bold text-gray-700 mb-1" />
        <span>{label}</span>
      </Link>
    </li>
  );
}
