// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import Link from "next/link";
// import React, { FC, HTMLAttributes } from "react";
// // import MobileSidebar from "./MobileSidebar";
// import MobileSearchBar from "./MobileSearchBar";
// import MobileSidebar from "./MobileSidebar";
// import { getAllProducts } from "@/constant/apiUrl";

// // type MobileNavProps = HTMLAttributes<HTMLDivElement>;
// interface MobileNavProps extends HTMLAttributes<HTMLDivElement> {
//   userLogin: boolean;
// }

// const MobileNav: FC<MobileNavProps> = async ({
//   className,
//   userLogin,
//   ...props
// }) => {
//   // const response = await fetch(getAllProducts, {
//   //   cache: "no-cache",
//   // });

//   const data = null;
//   // const data = await response.json();
//   return (
//     <nav
//       className={cn(
//         "bg-mobile-nav-bg fixed bottom-0 left-0 right-0 h-[16vw] sm:hidden bg-[length:100%_100%] bg-center flex",
//         className
//       )}
//       {...props}
//     >
//       <div className="mx-auto">
//         <MobileSidebar
//           userLogin={userLogin}
//           data={data}
//           className="w-[70px] flex flex-col items-center justify-center ml-12"
//         >
//           <svg
//             width="30"
//             height="30"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M5 7H19"
//               stroke="rgb(57, 57, 57)"
//               strokeWidth="2"
//               strokeLinecap="round"
//             ></path>
//             <path
//               d="M5 12H19"
//               stroke="rgb(57, 57, 57)"
//               strokeWidth="2"
//               strokeLinecap="round"
//             ></path>
//             <path
//               d="M5 17H19"
//               stroke="rgb(57, 57, 57)"
//               strokeWidth="2"
//               strokeLinecap="round"
//             ></path>
//           </svg>
//           <p className="text-xs">دسته بندی</p>
//         </MobileSidebar>
//         {/* <MobileSearchBar className="w-[70px] flex flex-col items-center justify-center">
//           <svg
//             className="mb-2"
//             xmlns="http://www.w3.org/2000/svg"
//             width="21px"
//             height="20px"
//           >
//             <path
//               fillRule="evenodd"
//               fill="rgb(57, 57, 57)"
//               d="M17.209,16.147 C13.720,19.621 8.195,19.829 4.460,16.775 L1.509,19.716 C1.160,20.063 0.593,20.063 0.244,19.716 C-0.106,19.367 -0.106,18.802 0.244,18.454 L3.190,15.517 C0.065,11.797 0.252,6.253 3.762,2.758 C7.475,-0.940 13.496,-0.940 17.209,2.758 C20.922,6.455 20.922,12.449 17.209,16.147 ZM15.793,4.172 C12.864,1.240 8.114,1.240 5.185,4.172 C2.255,7.106 2.255,11.861 5.185,14.794 C8.114,17.725 12.864,17.725 15.793,14.794 C18.722,11.861 18.722,7.106 15.793,4.172 Z"
//             ></path>
//           </svg>
//           <p className="text-xs">جست و جو</p>
//         </MobileSearchBar> */}
//       </div>
//       <div className="absolute mb-5 left-1/2 bottom-[1vw] -translate-x-1/2">
//         <Image
//           src="/icons/shabdaLogo.svg"
//           alt="چاپ شبدا"
//           width={64}
//           height={59}
//           className="size-[12vw]"
//         />
//         {/* <Image
//           src="/images/favicon.svg"
//           alt="چاپ شبدا"
//           width={64}
//           height={59}
//           className="size-[12vw]"
//         /> */}
//       </div>

//       <div className="gap-2 flex ">
//         <Link
//           href="cart"
//           className="w-[65px] flex flex-col items-center justify-center"
//         >
//           <svg
//             className="mb-2"
//             width="22"
//             height="18"
//             viewBox="0 0 22 18"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M22 7.80554V8.41665C22 8.92292 21.5896 9.33332 21.0833 9.33332H20.7778L19.7804 16.3148C19.6514 17.218 18.8779 17.8889 17.9655 17.8889H4.03448C3.12213 17.8889 2.34862 17.218 2.21956 16.3148L1.22222 9.33332H0.916667C0.4104 9.33332 4.76837e-07 8.92292 4.76837e-07 8.41665V7.80554C4.76837e-07 7.29927 0.4104 6.88887 0.916667 6.88887H3.48872L7.56712 1.28113C7.96415 0.735253 8.7285 0.61452 9.27445 1.01155C9.82037 1.40858 9.94106 2.17297 9.54403 2.71888L6.51127 6.88887H15.4887L12.456 2.71884C12.0589 2.17297 12.1797 1.40854 12.7256 1.01151C13.2714 0.614482 14.0359 0.735177 14.4329 1.28109L18.5113 6.88887H21.0833C21.5896 6.88887 22 7.29927 22 7.80554ZM11.9167 14.5278V10.25C11.9167 9.74372 11.5063 9.33332 11 9.33332C10.4937 9.33332 10.0833 9.74372 10.0833 10.25V14.5278C10.0833 15.034 10.4937 15.4444 11 15.4444C11.5063 15.4444 11.9167 15.034 11.9167 14.5278ZM16.1944 14.5278V10.25C16.1944 9.74372 15.784 9.33332 15.2778 9.33332C14.7715 9.33332 14.3611 9.74372 14.3611 10.25V14.5278C14.3611 15.034 14.7715 15.4444 15.2778 15.4444C15.784 15.4444 16.1944 15.034 16.1944 14.5278ZM7.63889 14.5278V10.25C7.63889 9.74372 7.22849 9.33332 6.72222 9.33332C6.21596 9.33332 5.80556 9.74372 5.80556 10.25V14.5278C5.80556 15.034 6.21596 15.4444 6.72222 15.4444C7.22849 15.4444 7.63889 15.034 7.63889 14.5278Z"
//               fill="rgb(57, 57, 57)"
//             ></path>
//           </svg>
//           <p className="text-[0.6rem]">سبد خرید</p>
//         </Link>

//         <Link
//           href={userLogin ? "/profile" : "/register"}
//           className="w-[70px] flex flex-col items-center justify-center"
//         >
//           <svg
//             className="mb-2"
//             width="22"
//             height="22"
//             viewBox="0 0 24 24"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <circle
//               cx="12"
//               cy="12"
//               r="11"
//               stroke="rgb(57, 57, 57)"
//               strokeWidth="2"
//             ></circle>
//             <path
//               d="M19.0835 19.7432C18.6656 18.5737 17.745 17.5403 16.4643 16.8032C15.1835 16.0662 13.6143 15.6667 12 15.6667C10.3857 15.6667 8.81648 16.0662 7.53576 16.8032C6.25503 17.5403 5.33437 18.5737 4.91655 19.7432"
//               stroke="rgb(57, 57, 57)"
//               strokeWidth="2"
//               strokeLinecap="round"
//             ></path>
//             <circle
//               cx="12"
//               cy="8.33333"
//               r="3.66667"
//               stroke="rgb(57, 57, 57)"
//               strokeWidth="2"
//               strokeLinecap="round"
//             ></circle>
//           </svg>
//           <p className="text-[0.6rem]">
//             {userLogin ? "داشبورد" : "ورود / ثبت نام"}
//           </p>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default MobileNav;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Home,
  Search,
  ShoppingCart,
  LayoutGrid,
  User,
  CircleUserRound,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
// import { CategoryDrawer } from "./CategoryDrawer";

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <>
      <nav
        style={{ direction: "rtl" }}
        className="fixed  flex w-full sm:hidden  bottom-0 left-0 right-0 z-50 border-t bg-white"
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

      {/* Right Drawer */}
      {/* <CategoryDrawer
        open={isCategoryOpen}
        onOpenChange={setIsCategoryOpen}
      /> */}
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
