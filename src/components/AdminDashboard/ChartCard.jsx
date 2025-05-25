export const ChartCard = ({ title, chart }) => (
    <div className="bg-white shadow-md rounded-2xl p-4 h-[424px]">
        <h2 className="text-xl font-semibold mb-4 text-[#008037]">{title}</h2>
        <div className="h-[350px]">
            {chart}
        </div>
    </div>
);
