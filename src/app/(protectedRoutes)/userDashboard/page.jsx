'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from 'axios';

const UserDashboard = () => {
    const [localUser, setLocalUser] = useState(null);
    const [userApplications, setUserApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const storedUserRaw = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const userName = localStorage.getItem('name');

        if (role === "ADMIN") {
            router.push("/adminDashboard");
        }

        if (storedUserRaw) {
            setLocalUser(userName);
            fetchUserApplications();
        } else {
            router.push("/login");
        }
    }, []);

    const fetchUserApplications = async () => {
        setLoading(true);
        try {
            const userId = localStorage.getItem('userId');
            const response = await axios.get(`/api/application?userId=${userId}`);

            if (response.data) {
                setUserApplications(response.data);
            }
        } catch (error) {
            console.error("Error fetching user applications:", error);
            toast.error("আপনার আবেদন তথ্য লোড করতে সমস্যা হয়েছে।");
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        toast.success('আপনি সফলভাবে লগআউট হয়েছেন।');
        setTimeout(() => {
            router.push('/login');
        }, 500);
    };
    console.log(userApplications)
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10 font-sans">
            <ToastContainer position="top-center" />
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 relative">
                <button
                    onClick={handleLogout}
                    className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    লগআউট
                </button>

                <h1 className="text-4xl font-bold text-center text-[#008037] mb-6">ইউজার ড্যাশবোর্ড</h1>
                <p className="text-center text-lg font-medium mb-10">
                    স্বাগতম, <span className="font-bold">{localUser || 'ইউজার'}</span>!
                </p>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-[#008037] border-dashed rounded-full animate-spin"></div>
                    </div>
                ) : userApplications.length > 0 ? (
                    <div className="grid gap-6">
                        {userApplications.map((application) => (
                            <div
                                key={application.id}
                                className="border border-gray-200 rounded-lg shadow-sm p-6 transition hover:shadow-md bg-gray-50"
                            >
                                <div className="space-y-2 py-4">
                                    <div className="mt-4 text-right">
                                        <button
                                            onClick={() => router.push("/update")}
                                            className="bg-[#008037] text-white px-4 py-2 rounded hover:bg-[#006f2f] transition"
                                        >
                                            আপডেট করুন
                                        </button>
                                    </div>

                                    <div className="flex gap-24 text-gray-600">
                                        <span>আবেদনকারীর নাম</span>
                                        <span>: {application.data.name}</span>
                                    </div>
                                    <div className="flex gap-48 text-gray-600">
                                        <span>বিষয়</span>
                                        <span>: {application.data.infoType}</span>
                                    </div>
                                    <div className="flex gap-30 text-gray-600">
                                        <span>অফিসারের নাম</span>
                                        <span>: {application.data.officer}</span>
                                    </div>
                                    <div className="flex gap-45 text-gray-600">
                                        <span>অফিস</span>
                                        <span>: {application.data.office || 'প্রযোজ্য নয়'}</span>
                                    </div>
                                    <div className="flex gap-41 text-gray-600">
                                        <span>প্রতিক্রিয়া</span>
                                        <span>: {application.data.feedback || 'এখনো প্রতিক্রিয়া নেই'}</span>
                                    </div>
                                    
                                </div>


                            </div>
                        ))}
                    </div>

                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500 text-xl mb-6">আপনার কোন আবেদন নেই</p>
                    </div>
                )}
            </div>
            <div className="text-center mt-10">
                <Link href="/apply">
                    <button className="bg-[#008037] text-white px-6 py-3 rounded hover:bg-[#006f2f] transition">
                        আবেদন করুন
                    </button>
                </Link>
            </div>
        </div>
    );
};

// comment

export default UserDashboard;
