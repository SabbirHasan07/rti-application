'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function FeedbackForm() {
  const [response, setResponse] = useState('');
  const [details, setDetails] = useState('');
  const [wantToAppeal, setWantToAppeal] = useState('');
  const [showAppeal, setShowAppeal] = useState(false);
  const [appealEnabled, setAppealEnabled] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('applicationId');

  const userId = typeof window !== 'undefined' ? user?.id : null;

  const handleResponseChange = (value) => {
    setResponse(value);
    setError('');
    setAppealEnabled(false);
    setDetails('');
    setWantToAppeal('');
    if (value === 'না') {
      setShowAppeal(true);
    } else {
      setShowAppeal(false);
    }
  };

  const handleDetailsChange = (value) => {
    setDetails(value);
    setError('');
    setAppealEnabled(false);
    setWantToAppeal('');
    if (value === 'আংশিক তথ্য' || value === 'কোন তথ্য প্রদান করেনি') {
      setShowAppeal(true);
    } else {
      setShowAppeal(false);
    }
  };

  const handleSaveFeedback = async () => {
    if (!response) {
      setError('অনুগ্রহ করে উত্তর পাওয়ার তথ্য নির্বাচন করুন।');
      return;
    }
    if (response === 'হ্যা' && !details) {
      setError('অনুগ্রহ করে প্রাপ্ত তথ্যের ধরন নির্বাচন করুন।');
      return;
    }

    if (!userId) {
      setError('ইউজার আইডি পাওয়া যায়নি। লগইন করুন।');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          response,
          infoType: response === 'হ্যা' ? details : null,
          applicationId,
          appealId: null,
          isAppeal: false,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'কিছু ভুল হয়েছে');
      } else {
        setAppealEnabled(true);
        alert('ফিডব্যাক সফলভাবে জমা হয়েছে');
      }
    } catch (err) {
      console.error(err);
      setError('সার্ভার ত্রুটি');
    } finally {
      setLoading(false);
    }
    router.push("/userDashboard")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10 text-[#212529] font-sans">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold text-center text-[#008037]">ফিডব্যাক ফর্ম</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded border border-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="block mb-2 font-semibold">
            উক্ত আবেদনের প্রেক্ষিতে কোন উত্তর পেয়েছেন কি না?
          </label>
          <select
            className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#008037]"
            value={response}
            onChange={(e) => handleResponseChange(e.target.value)}
          >
            <option value="">-- নির্বাচন করুন --</option>
            <option value="হ্যা">হ্যা</option>
            <option value="না">না</option>
            <option value="আবেদন গৃহীত হয়নি">আবেদন গৃহীত হয়নি</option>
          </select>
        </div>

        {response === 'হ্যা' && (
          <div>
            <label className="block mb-2 font-semibold">আপনি কেমন তথ্য পেয়েছেন?</label>
            <select
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#008037]"
              value={details}
              onChange={(e) => handleDetailsChange(e.target.value)}
            >
              <option value="">-- নির্বাচন করুন --</option>
              <option value="আংশিক তথ্য">আংশিক তথ্য</option>
              <option value="সম্পূর্ণ তথ্য">সম্পূর্ণ তথ্য</option>
              <option value="কোন তথ্য প্রদান করেনি">কোন তথ্য প্রদান করেনি</option>
            </select>
          </div>
        )}

        {/* {showAppeal && (
          <div>
            <label className="block mb-2 font-semibold">আপনি কি আপিল করতে চান?</label>
            <select
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#008037]"
              value={wantToAppeal}
              onChange={(e) => setWantToAppeal(e.target.value)}
            >
              <option value="">-- নির্বাচন করুন --</option>
              <option value="হ্যাঁ">হ্যাঁ</option>
              <option value="না">না</option>
            </select>
          </div>
        )} */}

        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <button
            onClick={handleSaveFeedback}
            disabled={loading}
            className="bg-[#008037] hover:bg-[#006f2f] text-white font-bold px-6 py-2 rounded shadow"
          >
            {loading ? 'লোড হচ্ছে...' : 'সংরক্ষণ করুন'}
          </button>
        </div>
      </div>
    </div>
  );
}
