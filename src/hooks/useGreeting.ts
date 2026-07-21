"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Sunrise, LucideIcon } from "lucide-react";

interface Greeting {
    text: string;
    Icon: LucideIcon;
}

export function useGreeting(): Greeting {
    const [greeting, setGreeting] = useState<Greeting>({ text: "سلام", Icon: Sun });

    useEffect(() => {
        const h = new Date().getHours();
        if (h < 12) setGreeting({ text: "صبح بخیر", Icon: Sunrise });
        else if (h < 18) setGreeting({ text: "ظهر بخیر", Icon: Sun });
        else setGreeting({ text: "عصر بخیر", Icon: Moon });
    }, []);

    return greeting;
}