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

// export default function CustomerBottomNav() {
//   const pathname = usePathname();

//   return (
//     <>
//       <nav
//         style={{ direction: "rtl" }}
//         className="sticky   flex w-full   bottom-0 left-0 right-0 z-50 border-t bg-white"
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
import {
  Home, Users, MapPin, Clock,
  FileText, ClipboardList, User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/customer", label: "خانه", icon: Home },
  { href: "/customer/staff", label: "کارمندان", icon: Users },
  { href: "/customer/location", label: "موقعیت", icon: MapPin },
  { href: "/customer/shift", label: "شیفت", icon: Clock },
  { href: "/customer/report", label: "گزارش", icon: FileText },
  { href: "/customer/request", label: "درخواست", icon: ClipboardList },
  { href: "/customer/profile", label: "پروفایل", icon: User },
];

export default function CustomerBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      dir="rtl"
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-white border-t border-gray-100 shadow-lg"
    >
      <ul className="flex items-center justify-around px-1 py-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/customer" && pathname.startsWith(href));
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 py-1 transition-colors",
                  active ? "text-primary" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <Icon className={cn("w-5 h-5", active && "stroke-[2.5px]")} />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}