'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const UserDashboard = () => {
  const [localUser, setLocalUser] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { logout, user } = useAuth();

  useEffect(() => {
    if (user) {
      setLocalUser(user?.fullName);
      fetchUserApplications();
      fetchUserFeedbacks();
    } else {
      router.push("/login");
    }
  }, []);

  const fetchUserApplications = async () => {
    try {
      const response = await axios.get(`/api/application?userId=${user?.id}`);
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

  const fetchUserFeedbacks = async () => {
    try {
      const response = await axios.get(`/api/feedback?userId=${user?.id}`);
      if (response.data?.feedbacks) {
        setFeedbacks(response.data.feedbacks);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const handleLogout = () => {
    sessionStorage.clear();
    logout();
    toast.success('আপনি সফলভাবে লগআউট হয়েছেন।');
    setTimeout(() => {
      router.push('/login');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <ToastContainer position="top-center" />
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-8 relative">
        {/* Desktop logout button */}
        <div className="hidden sm:block absolute top-4 right-4">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm"
          >
            লগআউট
          </button>
        </div>

        <h1 className="text-3xl font-bold text-center text-[#008037] mb-2">ইউজার ড্যাশবোর্ড</h1>
        <p className="text-center text-gray-600 mb-4">
          স্বাগতম, <span className="font-semibold">{localUser || 'ইউজার'}</span>!
        </p>

        {/* Mobile logout button */}
        <div className="block sm:hidden text-center mb-6">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm"
          >
            লগআউট
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#008037] border-dashed rounded-full animate-spin"></div>
          </div>
        ) : userApplications.length > 0 ? (
          <div className="space-y-6">
            {userApplications.map((application) => {
              // সবসময় আপডেট করার অনুমতি
              const canUpdateByTime = true;

              const feedback = feedbacks.find(
                (f) => f.applicationId === application.id
              );

              const hasFeedback = application?.hasGivenFeedback;
              const responseText = hasFeedback ? feedback?.response : "প্রতিক্রিয়া নেই";



              return (
                <div
                  key={application.id}
                  className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-5 sm:p-6"
                >
                  <div className="flex justify-end mb-4 gap-2">
                    <button
                      onClick={() => router.push(`/update?applicationId=${application.id}`)}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition ${hasFeedback
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-[#008037] text-white hover:bg-[#006f2f]"
                        }`}
                      disabled={hasFeedback}
                    >
                      {hasFeedback ? "ফিডব্যাক সম্ভব নয়" : "ফিডব্যাক"}
                    </button>
                    <button
                      onClick={() => {
                        if (!application?.hasAppealed) {
                          router.push(`/AppealForm?applicationId=${application?.id}`);
                        }
                      }}
                      disabled={application?.hasAppealed || responseText === 'প্রতিক্রিয়া নেই' || feedback?.response === 'আবেদন গৃহীত হয়নি'}
                      className={`${application?.hasAppealed || responseText === 'প্রতিক্রিয়া নেই' || feedback?.response === 'আবেদন গৃহীত হয়নি'
                        ? 'bg-red-300 cursor-not-allowed'
                        : 'bg-gray-700 hover:bg-gray-900'
                        } text-white font-bold px-6 py-2 rounded shadow`}
                    >
                      {application?.hasAppealed ? 'আপিল সম্ভব নয়' : 'আপিল করুন'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-y-3 gap-x-6 text-sm sm:text-base">
                    <div className="sm:col-span-4 font-semibold text-gray-700">আবেদনকারীর নাম</div>
                    <div className="sm:col-span-8 text-gray-800">: {application.data.name}</div>

                    <div className="sm:col-span-4 font-semibold text-gray-700">বিষয়</div>
                    <div className="sm:col-span-8 text-gray-800">: {application.data.infoType}</div>

                    <div className="sm:col-span-4 font-semibold text-gray-700">অফিসারের নাম</div>
                    <div className="sm:col-span-8 text-gray-800">: {application.data.officer},{application.data.office},{application.data.division}</div>

                    <div className="sm:col-span-4 font-semibold text-gray-700">তারিখ</div>
                    <div className="sm:col-span-8 text-gray-800">
                      : {application.createdAt ? new Date(application.createdAt).toLocaleDateString() : "প্রযোজ্য নয়"}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">আপনার কোন আবেদন নেই</p>
          </div>
        )}
      </div>

      <div className="text-center mt-8">
        <Link href="/apply">
          <button className="bg-[#008037] text-white px-6 py-3 rounded-md hover:bg-[#006f2f] transition">
            নতুন আবেদন করুন
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;
