import DashboardHeroShell from "@/components/shared/dashboard/DashboardHeroShell";

interface DashboardHeroProps {
    greeting: string;
    Icon: React.ElementType;
    name?: string;
    avatarSrc?: string;
    dateLabel: string;
}

export default function DashboardHero({ greeting, Icon, name, avatarSrc, dateLabel }: DashboardHeroProps) {
    return (
        <DashboardHeroShell>
            <div className="relative flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/25 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {avatarSrc ? (
                        <img src={avatarSrc} alt="" className="w-full h-full object-cover" />
                    ) : (
                        <Icon className="w-6 h-6 text-primary-foreground" />
                    )}
                </div>
                <div className="text-right">
                    <p className="text-primary-foreground/70 text-xs mb-0.5">
                        {greeting}{name ? ` ${name.split(" ")[0]}` : ""} 👋
                    </p>
                    <p className="text-primary-foreground text-lg font-bold">{dateLabel}</p>
                </div>
            </div>
        </DashboardHeroShell>
    );
}