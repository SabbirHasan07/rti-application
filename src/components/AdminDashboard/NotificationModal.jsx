export const NotificationModal = ({ setNotificationVisible }) => (
    <div className="fixed inset-0 bg-gray-300 opacity-96 flex items-center justify-center z-50">
        <div className="bg-white p-9 rounded-2xl w-full max-w-2xl relative">
            <button
                onClick={() => setNotificationVisible(false)}
                className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-[#008037]"
            >
                &times;
            </button>
            <h3 className="text-2xl font-bold text-[#008037] mb-4 text-center">নোটিফিকেশন</h3>
            <div className='flex px-24 py-6 space-x-24'>
                <ul className="space-y-2">
                    <li><strong>আবেদন নম্বর:</strong> 89947417714</li>
                    <li><strong>নাম:</strong> SABBIR HASAN</li>
                </ul>
                <ul className="space-y-2">
                    <li><strong>তারিখ ও সময়:</strong> 5/8/2025</li>
                    <li><strong>জেলা:</strong> টাঙ্গাইল</li>
                </ul>
            </div>
        </div>
    </div>
);
