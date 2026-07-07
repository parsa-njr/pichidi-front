"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * AppPortal
 * 
 * به جای رندر کردن داخل <body>، همه چیز رو داخل #app-container رندر می‌کنه.
 * این باعث میشه modal/overlay/bottomsheet از container بیرون نزنه.
 * 
 * استفاده:
 *   <AppPortal>
 *     <div className="absolute inset-0 ...">...</div>
 *   </AppPortal>
 */
export default function AppPortal({ children }: { children: React.ReactNode }) {
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
        setContainer(document.getElementById("app-container"));
    }, []);

    if (!container) return null;
    return createPortal(children, container);
}