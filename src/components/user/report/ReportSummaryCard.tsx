import { ITotalReport } from "./reportHelpers";

interface ReportSummaryCardProps {
    total: ITotalReport;
}

export default function ReportSummaryCard({ total }: ReportSummaryCardProps) {
    const items = [
        { label: "ساعات کاری", value: total.totalActualTime },
        { label: "مرخصی", value: total.totalLeaveTime },
        { label: "اضافه‌کاری", value: total.totalOvertime },
        { label: "تاخیر", value: total.totalDelay },
        { label: "کسری", value: total.totalDeficit },
    ];

    return (
        <div className="bg-gradient-to-l from-primary to-primary/80 rounded-2xl p-5 text-white mb-4">
            <p className="text-sm font-bold text-right mb-4 opacity-90">خلاصه ماه</p>
            <div className="grid grid-cols-2 gap-3">
                {items.map((item) => (
                    <div key={item.label} className="bg-white/20 rounded-xl p-3 text-right">
                        <p className="text-lg font-bold">{item.value || "۰۰:۰۰"}</p>
                        <p className="text-xs opacity-80 mt-0.5">{item.label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}