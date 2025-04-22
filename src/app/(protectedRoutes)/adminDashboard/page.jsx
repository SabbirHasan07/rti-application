'use client';

import { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import { useRouter } from 'next/navigation';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const adminDashboard = () => {
    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter();
    const [allApplications, setAllApplications] = useState([]);

    const rtiData = [
        {
            id: 1,
            application_id: "RTI_10001",
            name: 'গৌতম চন্দ্র চন্দ',
            phone: '01712345678',
            email: 'goutom@gmail.com',
            presentAddress: 'ঢাকা রোড, বিশ্বাস বেতকা, আমিন বাজার',
            submittedAt: '২০২৫-০৪-২০',
            status: 'পেন্ডিং',
            appealed: false,
            feedback: '',
            timeTaken: '',
        },
        {
            id: 2,
            application_id: "RTI_10002",
            name: 'সাদিয়া আক্তার',
            phone: '01898765432',
            email: 'sadia@example.com',
            presentAddress: 'মিরপুর, ঢাকা',
            submittedAt: '২০২৫-০৪-১৮',
            status: 'সম্পন্ন',
            appealed: true,
            feedback: 'সন্তোষজনক উত্তর',
            timeTaken: '২০ দিন',
        },
        {
            id: 3,
            application_id: "RTI_10003",
            name: 'আবরার হোসেন',
            phone: '01567583921',
            email: 'abrar@example.com',
            presentAddress: 'চট্টগ্রাম, বাংলাদেশ',
            submittedAt: '২০২৫-০৪-১৫',
            status: 'সম্পন্ন',
            appealed: false,
            feedback: 'তথ্য অপ্রতুল',
            timeTaken: '২৫ দিন',
        },
        {
            id: 4,
            application_id: "RTI_10004",
            name: 'নুসরাত জাহান',
            phone: '01923456789',
            email: 'nusrat@example.com',
            presentAddress: 'উত্তরা, ঢাকা',
            submittedAt: '২০২৫-০৪-۱۰',
            status: 'পেন্ডিং',
            appealed: false,
            feedback: 'অপেক্ষমাণ',
            timeTaken: '১০ দিন',
        },
        {
            id: 5,
            application_id: "RTI_10005",
            name: 'তাহমিদ রহমান',
            phone: '01711223344',
            email: 'tahmid@example.com',
            presentAddress: 'সিলেট, বাংলাদেশ',
            submittedAt: '২০২৫-০৪-০৫',
            status: 'সম্পন্ন',
            appealed: true,
            feedback: 'অতিরিক্ত ব্যাখ্যা প্রয়োজন',
            timeTaken: '৩০ দিন',
        },
        {
            id: 6,
            application_id: "RTI_10006",
            name: 'মেহেদী হাসান',
            phone: '01855667788',
            email: 'mehedi@example.com',
            presentAddress: 'খুলনা, বাংলাদেশ',
            submittedAt: '২০২৫-০৪-১২',
            status: 'পেন্ডিং',
            appealed: false,
            feedback: 'প্রক্রিয়াধীন',
            timeTaken: '১২ দিন',
        },
        {
            id: 7,
            application_id: "RTI_10007",
            name: 'ফারহান কবির',
            phone: '01933445566',
            email: 'farhan@example.com',
            presentAddress: 'রাজশাহী, বাংলাদেশ',
            submittedAt: '২০২৫-০৪-০৮',
            status: 'সম্পন্ন',
            appealed: true,
            feedback: 'অর্ধেক তথ্য প্রদান',
            timeTaken: '১৮ দিন',
        },
        {
            id: 8,
            application_id: "RTI_10008",
            name: 'নাহিদা ইসলাম',
            phone: '01599887766',
            email: 'nahida@example.com',
            presentAddress: 'নোয়াখালী, বাংলাদেশ',
            submittedAt: '২০২৫-০৪-০৭',
            status: 'পেন্ডিং',
            appealed: false,
            feedback: 'প্রতিস্থাপনযোগ্য তথ্য',
            timeTaken: '২২ দিন',
        },
        {
            id: 9,
            application_id: "RTI_10009",
            name: 'মোস্তফা কামাল',
            phone: '01744556677',
            email: 'mostofa@example.com',
            presentAddress: 'বরিশাল, বাংলাদেশ',
            submittedAt: '২০২৫-০৪-০৩',
            status: 'সম্পন্ন',
            appealed: true,
            feedback: 'পরীক্ষাধীন',
            timeTaken: '২৮ দিন',
        }];

    const feedbackData = {
        labels: ['তথ্য পেয়েছেন', 'আংশিক পেয়েছেন', 'পাননি', 'আপিল করেছেন', 'আপিল করেননি', 'সন্তোষজনক উত্তর', 'অসন্তোষজনক উত্তর'],
        datasets: [
            {
                label: 'Feedback Status',
                data: [60, 25, 15, 40, 60, 70, 30],
                backgroundColor: '#008037',
                borderColor: '#006f2f',
                borderWidth: 1,
            },
        ],
    };

    const complaintData = {
        labels: ['মোট অভিযোগ', 'সমাধান হয়েছে', 'সমাধান হয়নি'],
        datasets: [
            {
                data: [12, 8, 4],
                backgroundColor: ['#f39c12', '#2ecc71', '#e74c3c'],
                borderWidth: 1,
            },
        ],
    };

    const totalPages = Math.ceil(rtiData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = rtiData.slice(startIndex, startIndex + itemsPerPage);

    useEffect(() => {
        const allApplicationsRaw = localStorage.getItem('applications');
        const allApplicationsData = allApplicationsRaw ? JSON.parse(allApplicationsRaw) : [];
        setAllApplications(allApplicationsData)
    }, [])

    return (
        <div className="max-w-7xl mx-auto p-6 font-sans text-[#212529] relative">
            <div className="absolute top-6 right-6">
                <button
                    onClick={() => {
                        localStorage.removeItem('loggedInUser')
                        router.push('/login')
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    লগআউট
                </button>
            </div>
            <h1 className="text-3xl font-bold text-center text-[#008037] mb-8 border-b pb-4">অ্যাডমিন ড্যাশবোর্ড</h1>

            {/* আবেদনকারীর তালিকা */}
            <div className="bg-white shadow-md rounded-2xl p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-[#008037]">আবেদনকারীর তালিকা</h2>
                <div className="space-y-3 max-h-[350px] overflow-y-auto">
                    {allApplications.map((item, index) => (
                        <div key={index} className="border p-3 rounded-lg flex justify-between">
                            <div>
                                <p><strong>অ্যাপ্লিকেশন আইডি: </strong> {index + 1}</p>
                                <p><strong>নাম:</strong> {item.name}</p>
                                <p><strong>তারিখ ও সময়: </strong> {new Date(item.createdAt).toLocaleString()}</p>
                            </div>
                            <button
                                onClick={() => setSelected(item)}
                                className="mt-2 bg-[#008037] text-white px-3 py-1 rounded hover:bg-[#006f2f] w-48 text-center h-11"
                            >
                                আবেদনকারীর বিবরণ
                            </button>
                        </div>
                    ))}
                </div>

                {/* Pagination Buttons */}
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded ${page === currentPage ? 'bg-[#008037] text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>

            {/* চার্ট সেকশন */}
            <div className='flex justify-between gap-4'>
                <div className="bg-white shadow-md rounded-2xl p-4 w-full h-[424px]">
                    <h2 className="text-xl font-semibold mb-4 text-[#008037]">অভিযোগ রেকর্ড</h2>
                    <div className="h-[350px]">
                        <Doughnut data={complaintData} />
                    </div>
                </div>
                <div className="bg-white shadow-md rounded-2xl p-4 mb-6 w-full">
                    <h2 className="text-xl font-semibold mb-4 text-[#008037]">ফিডব্যাক রেকর্ড</h2>
                    <div className="h-[350px]">
                        <Bar data={feedbackData} />
                    </div>
                </div>
            </div>

            {/* আবেদনকারীর বিবরণ Modal */}
            {selected && (
                <div className="fixed inset-0 bg-gray-300 opacity-96 flex items-center justify-center z-50">
                    <div className="bg-white p-9 rounded-2xl w-full max-w-2xl  relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-2 right-2 text-2xl font-bold text-gray-500 hover:text-[#008037]"
                        >
                            &times;
                        </button>

                        <h3 className="text-2xl font-bold text-[#008037] mb-4 text-center">আবেদনকারীর বিবরণ</h3>
                        <ul className="space-y-2 mb-6">
                            <li><strong>আবেদন নম্বর:</strong> {selected?.application_id}</li>
                            <li><strong>আবেদন নম্বর:</strong> {selected?.name}</li>
                            <li><strong>স্ট্যাটাস:</strong> {selected.status}</li>
                            <li><strong>তারিখ ও সময়:</strong> {new Date(selected.createdAt).toLocaleString()}</li>
                            <li><strong>আপিল করেছেন?</strong> {selected.appealed ? 'হ্যাঁ' : 'না'}</li>
                            <li><strong>ফিডব্যাক:</strong> {selected.feedback}</li>
                            <li><strong>তথ্য কমিশনের সময়কাল:</strong> {selected.timeTaken}</li>
                        </ul>
                        <div className="flex justify-between">
                            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                আবেদন ডিলিট করুন
                            </button>
                            <button disabled={selected.status === 'সম্পন্ন'} onClick={() => {
                                const newArr = allApplications.map(app => app.application_id === selected.application_id ? { ...app, status: 'সম্পন্ন' } : app)
                                localStorage.setItem('applications', JSON.stringify(newArr))
                                const newApp = newArr.find(app => app.application_id === selected.application_id)
                                setSelected(newApp)
                            }} className="bg-[#008037] text-white px-4 py-2 rounded hover:bg-[#006f2f]">
                                অনুমোদন করুন
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default adminDashboard;
