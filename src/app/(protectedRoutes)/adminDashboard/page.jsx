'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { useRouter } from 'next/navigation';
import { FaBell, FaWpforms, FaDatabase } from 'react-icons/fa';
import { ApplicationList } from '../../../components/AdminDashboard/ApplicationList';
import { Pagination } from '../../../components/AdminDashboard/Pagination';


import { ChartCard } from '../../../components/AdminDashboard/ChartCard';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { useAuth } from '@/context/AuthContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter();
    const [allApplications, setAllApplications] = useState([]);
    const [allFeedbacks, setAllFeedbacks] = useState([]);

    const pieChartRef = useRef(null);

    const { logout } = useAuth();

    const feedbackData = useMemo(() => {
        if (allFeedbacks) {
            // মোট আবেদন সংখ্যা
            const totalApplications = allApplications?.length || 0;

            // সম্পূর্ণ তথ্য
            const fullInfoReceived = allFeedbacks.filter(fb => fb.infoType === 'সম্পূর্ণ তথ্য')?.length || 0

            // আংশিক তথ্য
            const partialInfoReceived = allFeedbacks.filter(fb => fb.infoType === 'আংশিক তথ্য')?.length || 0

            // কোন তথ্য দেওয়া হয়নি
            const noInfoReceived = allFeedbacks.filter(fb => fb.infoType === 'তথ্য প্রদান না করা')?.length || 0

            // আবেদন গৃহীত হয়নি
            const responseNotReceivedApplication = allFeedbacks.filter(fb => fb.response === 'আবেদন গৃহীত হয়নি')?.length || 0;

            // ফিডব্যাক দেওয়া হয়নি
            const notGivenFeedback = allApplications?.filter(item => item?.hasGivenFeedback === false)?.length || 0;

            const labels = [`মোট আবেদন সংখ্যা: ${totalApplications}`, `সম্পূর্ণ তথ্য: ${fullInfoReceived}`, `আংশিক তথ্য: ${partialInfoReceived}`, `কোন তথ্য দেওয়া হয়নি: ${noInfoReceived}`, `আবেদন গৃহীত হয়নি: ${responseNotReceivedApplication}`, `ফিডব্যাক দেওয়া হয়নি: ${notGivenFeedback}`];

            const datasets = [
                {
                    label: 'ফিডব্যাক রেকর্ড',
                    data: [totalApplications, fullInfoReceived, partialInfoReceived, noInfoReceived, responseNotReceivedApplication, notGivenFeedback],
                    backgroundColor: [
                        '#4B9CD3', // Calm Blue - totalApplications
                        '#F4A261', // Soft Orange - partialInfoReceived
                        '#2A9D8F', // Teal - fullInfoReceived
                        '#E76F51', // Warm Red - noInfoReceived
                        '#E9C46A', // Muted Yellow - type4
                        '#FAF9F6'  // Deep Grayish Blue - type5
                    ],
                    borderColor: [
                        '#4B9CD3',
                        '#F4A261',
                        '#2A9D8F',
                        '#E76F51',
                        '#E9C46A',
                        '#FAF9F6'
                    ],
                    borderWidth: 1,
                    hoverOffset: 4
                }

            ]
            return {
                labels,
                datasets,
            }
        }
    }, [allFeedbacks, allApplications])

    const downloadChartImage = (chartRef) => {
        const chartCanvas = chartRef.current?.canvas;
        if (chartCanvas) {
            const url = chartCanvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = url;
            link.download = 'chart.png';
            link.click();
        }
    };

    useEffect(() => {
        fetch('/api/application').then(res => res.json()).then(data => setAllApplications(data)).catch(err => console.error(err))
    }, []);
    useEffect(() => {
        fetch('/api/feedback').then(res => res.json()).then(data => setAllFeedbacks(data?.feedbacks)).catch(err => console.error(err))
    }, [])

    return (
        <div className=" mx-auto p-6 font-sans text-[#212529] relative">
            {/* Header Buttons */}
            <div className="absolute top-6 right-6 flex items-center gap-4">
                <button
                    onClick={() => router.push('/database-update')}
                    className="bg-gray-100 text-indigo-600 p-2 rounded-full hover:bg-gray-200"
                    title="Database Update"
                >
                    <FaDatabase size={20} />
                </button>

                {/* Logout */}
                <button
                    onClick={() => {
                        logout();
                        router.push('/login');
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    লগআউট
                </button>
            </div>

            <h1 className="text-3xl font-bold text-[#008037] mb-8 border-b pb-4">অ্যাডমিন ড্যাশবোর্ড</h1>

            <ApplicationList
                allApplications={allApplications}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
            />

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(allApplications.length / itemsPerPage)}
            />
            <div className="flex items-center justify-center text-center">
                {allFeedbacks && (
                    <ChartCard
                        title="ফিডব্যাক রেকর্ড"
                        chart={<Pie ref={pieChartRef} data={feedbackData} />}
                    />
                )}
            </div>


            <div className="flex justify-center mx-auto">
                <button
                    onClick={() => downloadChartImage(pieChartRef)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Download Bar Chart
                </button>
            </div>




        </div>
    );
};

export default AdminDashboard;
