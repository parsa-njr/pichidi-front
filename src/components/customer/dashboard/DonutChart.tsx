interface DonutChartProps {
    present: number;
    absent: number;
    late: number;
}

export default function DonutChart({ present, absent, late }: DonutChartProps) {
    const total = present + absent + late || 1;
    const radius = 50;
    const cx = 64;
    const cy = 64;
    const circumference = 2 * Math.PI * radius;

    const segments = [
        { value: present, color: "#34D399", label: "حاضر" },
        { value: late, color: "#FBBF24", label: "با تاخیر" },
        { value: absent, color: "#F87171", label: "غایب" },
    ];

    let offset = 0;
    const arcs = segments.map((seg) => {
        const pct = seg.value / total;
        const dash = pct * circumference;
        const gap = circumference - dash;
        const arc = { ...seg, dash, gap, offset };
        offset += dash;
        return arc;
    });

    return (
        <div className="flex items-center gap-5">
            <svg width="128" height="128" viewBox="0 0 128 128">
                <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#f3f4f6" strokeWidth="16" />
                {arcs.map((arc, i) => (
                    <circle
                        key={i} cx={cx} cy={cy} r={radius} fill="none"
                        stroke={arc.color} strokeWidth="16" strokeLinecap="round"
                        strokeDasharray={`${arc.dash} ${arc.gap}`}
                        strokeDashoffset={-arc.offset + circumference * 0.25}
                        style={{ transition: "stroke-dasharray 0.6s ease" }}
                    />
                ))}
                <text x={cx} y={cy - 4} textAnchor="middle" fill="#1f2937" fontSize="20" fontWeight="800">{total}</text>
                <text x={cx} y={cy + 15} textAnchor="middle" fill="#9ca3af" fontSize="10">کل کارمندان</text>
            </svg>
            <div className="flex flex-col gap-2.5">
                {segments.map((seg) => (
                    <div key={seg.label} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: seg.color }} />
                        <span className="text-xs text-gray-500">{seg.label}</span>
                        <span className="text-xs font-bold text-gray-800 mr-0.5">{seg.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}