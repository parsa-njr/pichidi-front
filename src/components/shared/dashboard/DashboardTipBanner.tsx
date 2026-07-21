import { TrendingUp } from "lucide-react";

interface DashboardTipBannerProps {
    title: string;
    message: string;
    animationDelay?: string;
}

export default function DashboardTipBanner({ title, message, animationDelay }: DashboardTipBannerProps) {
    return (
        <div
            className="bg-gradient-to-l from-primary to-primary/80 rounded-2xl p-5 text-white flex items-start gap-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
            style={animationDelay ? { animationDelay, animationFillMode: "backwards" } : undefined}
        >
            <TrendingUp className="w-5 h-5 opacity-80 flex-shrink-0 mt-0.5" />
            <div className="text-right">
                <p className="text-sm font-bold mb-1">{title}</p>
                <p className="text-xs opacity-90 leading-6">{message}</p>
            </div>
        </div>
    );
}