// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Home,
//   Search,
//   ShoppingCart,
//   CircleUserRound,
//   Menu,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// export default function UserBottomNav() {
//   const pathname = usePathname();

//   return (
//     <>
//       <nav
//         style={{ direction: "rtl" }}
//         className="sticky  flex w-full   bottom-0 left-0 right-0 z-50 border-t bg-white"
//       >
//         <ul
//           style={{ direction: "rtl" }}
//           className="flex w-full items-center justify-between px-2 py-2"
//         >
//           {/* Category (BUTTON, NOT LINK) */}
//           <li className="flex-1">
//             <button
//               //   onClick={() => setDrawerOpen(true)}
//               className="flex w-full flex-col items-center justify-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
//             >
//               <Menu className="h-6 w-6 font-bold text-gray-800 mb-1" />
//               <span>منو</span>
//             </button>
//           </li>

//           {/* Search */}
//           <NavLink
//             href="/search"
//             label="جستجو"
//             icon={Search}
//             active={pathname === "/search"}
//           />

//           {/* Home */}
//           <NavLink
//             href="/"
//             label="خانه"
//             icon={Home}
//             active={pathname === "/"}
//           />
//           {/* Cart */}
//           <NavLink
//             href="/cart"
//             label="سبد خرید"
//             icon={ShoppingCart}
//             active={pathname === "/cart"}
//           />

//           {/* Auth */}
//           <NavLink
//             href={"/profile/personal-info"}
//             label={"پروفایل"}
//             icon={CircleUserRound}
//             active={pathname === "/auth"}
//           />
//         </ul>
//       </nav>
//     </>
//   );
// }

// function NavLink({
//   href,
//   label,
//   icon: Icon,
//   active,
// }: {
//   href: string;
//   label: string;
//   icon: any;
//   active: boolean;
// }) {
//   return (
//     <li className="flex-1">
//       <Link
//         href={href}
//         className={cn(
//           "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
//           active
//             ? "text-primary"
//             : "text-muted-foreground hover:text-foreground"
//         )}
//       >
//         <Icon className="h-6 w-6 font-bold text-gray-700 mb-1" />
//         <span>{label}</span>
//       </Link>
//     </li>
//   );
// }
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, ClipboardList, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/user", label: "خانه", icon: Home, exact: true },
  { href: "/user/report", label: "گزارش", icon: FileText },
  { href: "/user/request", label: "درخواست", icon: ClipboardList },
  { href: "/user/profile", label: "پروفایل", icon: User },
];

export default function UserBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      dir="rtl"
      className="sticky bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-100 flex-shrink-0"
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
                  "w-10 h-10 flex items-center justify-center rounded-xl transition-all",
                  active ? "bg-primary/10" : ""
                )}>
                  <Icon className={cn(
                    "w-6 h-6 transition-all",
                    active ? "text-primary stroke-[2.5px]" : "text-gray-400"
                  )} />
                </div>
                <span className={cn(
                  "text-xs font-medium",
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