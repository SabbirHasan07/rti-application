'use client';

import { useEffect, useState, useRef } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
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
    const [notificationVisible, setNotificationVisible] = useState(false);

    const doughnutChartRef = useRef(null);
    const barChartRef = useRef(null);

    const { logout } = useAuth();

    useEffect(() => {
        const allApplicationsRaw = localStorage.getItem('applications');
        const allApplicationsData = allApplicationsRaw ? JSON.parse(allApplicationsRaw) : [];
        setAllApplications(allApplicationsData);
    }, []);

    useEffect(() => {
        fetch('/api/cron/check-apps').then(res => res.json()).then(data => console.log(data)).catch(err => console.error(err))
    }, [])

    const complaintData = {
        labels: ['মামলা ১', 'মামলা ২', 'মামলা ৩', 'মামলা ৪'],
        datasets: [
            {
                data: [15, 30, 45, 10],
                backgroundColor: ['#FF6F61', '#6B8E23', '#FFD700', '#8A2BE2'],
                hoverBackgroundColor: ['#FF6F61', '#6B8E23', '#FFD700', '#8A2BE2'],
            },
        ],
    };

    const feedbackData = {
        labels: ['পুরোপুরি সন্তুষ্ট', 'সন্তুষ্ট', 'অসন্তুষ্ট', 'খুব অসন্তুষ্ট'],
        datasets: [
            {
                label: 'ফিডব্যাক রেকর্ড',
                data: [25, 50, 15, 10],
                backgroundColor: ['#FF6347', '#FF8C00', '#FFD700', '#8A2BE2'],
                borderColor: ['#FF6347', '#FF8C00', '#FFD700', '#8A2BE2'],
                borderWidth: 1,
            },
        ],
    };

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
                <ChartCard title="অভিযোগ রেকর্ড" chart={<Doughnut ref={doughnutChartRef} data={complaintData} />} />
                <ChartCard title="ফিডব্যাক রেকর্ড" chart={<Bar ref={barChartRef} data={feedbackData} />} />
            </div>

            <div className="flex justify-center p-6 mb-9 gap-4 mt-6 mx-auto">
                <button
                    onClick={() => downloadChartImage(doughnutChartRef)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Download Doughnut Chart
                </button>
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
