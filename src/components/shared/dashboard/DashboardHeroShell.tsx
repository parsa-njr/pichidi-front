interface DashboardHeroShellProps {
    children: React.ReactNode;
}

export default function DashboardHeroShell({ children }: DashboardHeroShellProps) {
    return (
        <div className="bg-gradient-to-br from-primary via-primary to-primary/85 px-5 pt-6 pb-16 rounded-b-[32px] relative overflow-hidden animate-in fade-in-0 slide-in-from-top-2 duration-500">
            <div className="absolute -left-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
            <div className="absolute right-10 top-16 w-20 h-20 rounded-full bg-white/5" />
            {children}
        </div>
    );
}