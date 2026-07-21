interface StatTileProps {
    label: string;
    value: number;
    icon: React.ElementType;
    tone: "emerald" | "red" | "amber" | "blue";
    delay: number;
}

const TONES = {
    emerald: { bg: "bg-emerald-50", text: "text-emerald-600", ring: "ring-emerald-100" },
    red: { bg: "bg-red-50", text: "text-red-500", ring: "ring-red-100" },
    amber: { bg: "bg-amber-50", text: "text-amber-500", ring: "ring-amber-100" },
    blue: { bg: "bg-blue-50", text: "text-blue-500", ring: "ring-blue-100" },
};

export default function StatTile({ label, value, icon: Icon, tone, delay }: StatTileProps) {
    const tones = TONES[tone];

    return (
        <div
            className="relative bg-white rounded-2xl p-4 border border-gray-100 overflow-hidden animate-in fade-in-0 slide-in-from-bottom-2"
            style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
        >
            <div className={`absolute -left-3 -top-3 w-16 h-16 rounded-full ${tones.bg} opacity-60`} />
            <div className="relative flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${tones.bg} ring-4 ${tones.ring} flex items-center justify-center`}>
                    <Icon className={`w-4.5 h-4.5 ${tones.text}`} />
                </div>
                <p className="text-2xl font-extrabold text-gray-800">{value}</p>
            </div>
            <p className="relative text-xs text-gray-500 mt-2.5 text-right">{label}</p>
        </div>
    );
}