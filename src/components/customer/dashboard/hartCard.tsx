import DonutChart from "./DonutChart";

interface ChartCardProps {
    present: number;
    absent: number;
    late: number;
}

export default function ChartCard({ present, absent, late }: ChartCardProps) {
    return (
        <div
            className="bg-white rounded-2xl p-5 border border-gray-100 animate-in fade-in-0 slide-in-from-bottom-2 duration-500"
            style={{ animationDelay: "220ms", animationFillMode: "backwards" }}
        >
            <p className="text-sm font-bold text-gray-700 text-right mb-4">وضعیت حضور امروز</p>
            <div className="flex justify-center">
                <DonutChart present={present} absent={absent} late={late} />
            </div>
        </div>
    );
}