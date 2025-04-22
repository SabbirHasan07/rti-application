'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const UserDashboard = () => {
    const [application, setApplication] = useState(null);
    const [localUser, setLocalUser] = useState(null);
    const [showDetails, setShowDetails] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedApplication = sessionStorage.getItem('rtiForm');
        const storedUser = localStorage.getItem('registeredUser');

        if (storedApplication) {
            setApplication(JSON.parse(storedApplication));
        }

        if (storedUser) {
            setLocalUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        localStorage.clear();
        setApplication(null);
        setLocalUser(null);

        toast.success('আপনি সফলভাবে লগআউট হয়েছেন।');
        setTimeout(() => {
            router.push('/login');
        }, 500);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-10 text-[#212529] font-sans">
            <ToastContainer position="top-center" />

            <div className="text-3xl font-bold text-[#008037] mb-6 text-center">
                ইউজার ড্যাশবোর্ড
            </div>

            <button
                onClick={handleLogout}
                className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
                লগআউট
            </button>

            <p className="text-lg font-semibold mb-4">
                স্বাগতম, {localUser?.name || 'ইউজার'}!
            </p>

            {!application ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 text-xl mb-6">আপনার কোন আবেদন নেই</p>
                    <Link href="/apply">
                        <button className="bg-[#008037] text-white px-6 py-3 rounded hover:bg-[#006f2f]">
                            আবেদন করুন
                        </button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white shadow-md rounded-2xl p-6 space-y-4 w-full max-w-2xl">
                    <div className="flex justify-between items-center">
                        <div className="space-y-2 mb-4 p-6">
                            <div className="flex gap-4">
                                <span className="w-11 font-semibold">নাম:</span>
                                <span>{application.name}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="w-11 font-semibold">বিষয়:</span>
                                <span>{application.infoType}</span>
                            </div>
                            <div className="flex gap-4">
                                <span className="w-11 font-semibold">তারিখ:</span>
                                <span>২২ এপ্রিল ২০২৫</span>
                            </div>
                        </div>


                        <button
                            onClick={() => setShowDetails(true)}
                            className="bg-[#008037] text-white px-4 py-2 rounded hover:bg-[#006f2f]"
                        >
                            বিস্তারিত দেখুন
                        </button>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Link href="/apply">
                            <button className="bg-[#008037] text-white px-6 py-3 rounded hover:bg-[#006f2f]">
                                আবেদন করুন
                            </button>
                        </Link>
                        <button
                            className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed"
                            disabled
                        >
                            আপডেট করুন
                        </button>
                    </div>
                </div>
            )}

            {showDetails && (
                <div className="fixed inset-0 bg-gray-300 bg-opacity-95 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl max-w-2xl w-full relative shadow-lg">
                        <button
                            onClick={() => setShowDetails(false)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="text-xl font-bold text-[#008037] mb-6 text-center">
                            আবেদনের বিস্তারিত
                        </h2>
                        <div className="grid grid-cols-2 gap-y-2 text-sm">
                            <div className="font-semibold">নাম :</div>
                            <div>{application.name}</div>

                            <div className="font-semibold">বিষয় :</div>
                            <div>{application?.infoType}</div>

                            <div className="font-semibold">তথ্য প্রদানকারী কর্তৃপক্ষ :</div>
                            <div>{application?.office}</div>

                            <div className="font-semibold">তারিখ :</div>
                            <div>২২ এপ্রিল ২০২৫</div>

                            <div className="font-semibold">স্ট্যাটাস :</div>
                            <div>pending</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;
