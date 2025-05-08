export const ApplicantDetailModal = ({ selected, setSelected, allApplications, setAllApplications }) => {
    const deleteApplication = () => {
        const newArr = allApplications.filter(app => app.application_id !== selected.application_id);
        localStorage.setItem('applications', JSON.stringify(newArr));
        setAllApplications(newArr);
        setSelected(null);
    };

    const approveApplication = () => {
        const newArr = allApplications.map(app =>
            app.application_id === selected.application_id ? { ...app, status: 'সম্পন্ন' } : app
        );
        localStorage.setItem('applications', JSON.stringify(newArr));
        setSelected(newArr.find(app => app.application_id === selected.application_id));
    };

    return (
        <div className="fixed inset-0 bg-gray-300 opacity-96 flex items-center justify-center z-50">
            <div className="bg-white p-9 rounded-2xl w-full max-w-2xl relative">
                <button
                    onClick={() => setSelected(null)}
                    className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-[#008037]"
                >
                    &times;
                </button>
                <h3 className="text-2xl font-bold text-[#008037] mb-4 text-center">আবেদনকারীর বিবরণ</h3>
                <ul className="space-y-2 mb-6">
                    <li><strong>আবেদন নম্বর:</strong> {selected?.application_id}</li>
                    <li><strong>নাম:</strong> {selected?.name}</li>
                    <li><strong>স্ট্যাটাস:</strong> {selected?.status}</li>
                    <li><strong>তারিখ ও সময়:</strong> {new Date(selected?.createdAt).toLocaleString()}</li>
                    <li><strong>আপিল করেছেন?</strong> {selected?.appealed ? 'হ্যাঁ' : 'না'}</li>
                    <li><strong>ফিডব্যাক:</strong> {selected?.feedback}</li>
                    <li><strong>তথ্য কমিশনের সময়কাল:</strong> {selected?.timeTaken}</li>
                </ul>
                <div className="flex justify-between">
                    <button onClick={deleteApplication} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                        আবেদন ডিলিট করুন
                    </button>
                    <button onClick={approveApplication} disabled={selected?.status === 'সম্পন্ন'} className="bg-[#008037] text-white px-4 py-2 rounded hover:bg-[#006f2f]">
                        অনুমোদন করুন
                    </button>
                </div>
            </div>
        </div>
    );
};
