'use client';

import { useEffect, useState, useRef, useMemo } from 'react';
import { Bar, Doughnut, Pie } from 'react-chartjs-2';
import { useRouter } from 'next/navigation';
import { FaBell, FaWpforms, FaDatabase } from 'react-icons/fa';
import { ApplicationList } from '../../../components/AdminDashboard/ApplicationList';
import { Pagination } from '../../../components/AdminDashboard/Pagination';
import { NotificationModal } from '../../../components/AdminDashboard/NotificationModal';
import { ApplicantDetailModal } from '../../../components/AdminDashboard/ApplicantDetailModal';
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
    const [selected, setSelected] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const router = useRouter();
    const [allApplications, setAllApplications] = useState([]);
    const [allFeedbacks, setAllFeedbacks] = useState([]);
    const [notificationVisible, setNotificationVisible] = useState(false);

    const doughnutChartRef = useRef(null);
    const barChartRef = useRef(null);

    const { logout } = useAuth();

    useEffect(() => {
        fetch('/api/application').then(res => res.json()).then(data => setAllApplications(data)).catch(err => console.error(err))
        fetch('/api/feedback').then(res => res.json()).then(data => setAllFeedbacks(data?.feedbacks)).catch(err => console.error(err))
    }, []);

    const handleData = async () => {
        const res = await fetch('/api/application')
        const data = await res.json();
        console.log({ data })
    }

    console.log({ allApplications, allFeedbacks })

    const applicationData = {
        labels: ['মামলা ১', 'মামলা ২', 'মামলা ৩', 'মামলা ৪'],
        datasets: [
            {
                data: [15, 30, 45, 10],
                backgroundColor: ['#FF6F61', '#6B8E23', '#FFD700', '#8A2BE2'],
                hoverBackgroundColor: ['#FF6F61', '#6B8E23', '#FFD700', '#8A2BE2'],
            },
        ],
    };

    const feedbackData = useMemo(() => {
        if (allFeedbacks) {
            const labels = ['মোট আবেদন সংখ্যা', 'সম্পূর্ণ তথ্য', 'আংশিক তথ্য', 'কোন তথ্য দেওয়া হয়নি', 'আবেদন গৃহীত হয়নি'];

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

            const datasets = [
                {
                    label: 'ফিডব্যাক রেকর্ড',
                    data: [totalApplications, fullInfoReceived, partialInfoReceived, noInfoReceived, responseNotReceivedApplication],
                    backgroundColor: [
                        '#4B9CD3', // Calm Blue - totalApplications
                        '#F4A261', // Soft Orange - partialInfoReceived
                        '#2A9D8F', // Teal - fullInfoReceived
                        '#E76F51', // Warm Red - noInfoReceived
                        '#E9C46A', // Muted Yellow - type4
                        '#264653'  // Deep Grayish Blue - type5
                    ],
                    borderColor: [
                        '#4B9CD3',
                        '#F4A261',
                        '#2A9D8F',
                        '#E76F51',
                        '#E9C46A',
                        '#264653'
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

    console.log({ feedbackData })

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

    return (
        <div className="max-w-7xl mx-auto p-6 font-sans text-[#212529] relative">
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
                setSelected={setSelected}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
            />

            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={Math.ceil(allApplications.length / itemsPerPage)}
            />

            <div className="flex justify-between gap-4 mt-6">
                {/* {allApplications && <ChartCard title="অভিযোগ রেকর্ড" chart={<Doughnut ref={doughnutChartRef} data={applicationData} />} />} */}
                {allFeedbacks && <ChartCard title="ফিডব্যাক রেকর্ড" chart={<Pie ref={barChartRef} data={feedbackData} />} />}
            </div>

            <div className="flex justify-center p-6 mb-9 gap-4 mt-6 mx-auto">
                <button
                    onClick={() => downloadChartImage(barChartRef)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Download Bar Chart
                </button>
            </div>

            {notificationVisible && (
                <NotificationModal setNotificationVisible={setNotificationVisible} />
            )}

            {selected && (
                <ApplicantDetailModal
                    selected={selected}
                    setSelected={setSelected}
                    allApplications={allApplications}
                    setAllApplications={setAllApplications}
                />
            )}
        </div>
    );
};

export default AdminDashboard;
