export const ChartCard = ({ title, chart, totalApplications, totalFeedbacks }) => (
    <div className="bg-white shadow-md rounded-2xl p-4 h-[424px]">
        <h2 className="text-xl font-semibold mb-4 text-[#008037]">{title}</h2>
        <p className="text-sm text-gray-500 mb-4">মোট {totalApplications} টি আবেদন রয়েছে এবং {totalFeedbacks} টি ফিডব্যাক রয়েছে</p>
        <div className="h-[350px]">
            {chart}
        </div>
    </div>
);
