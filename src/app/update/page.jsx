'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FeedbackForm() {
  const [response, setResponse] = useState('');
  const [details, setDetails] = useState('');
  const [showAppeal, setShowAppeal] = useState(false);
  const [appealEnabled, setAppealEnabled] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleResponseChange = (value) => {
    setResponse(value);
    setError('');
    setAppealEnabled(false);
    setDetails('');
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
    if (value === 'আংশিক তথ্য' || value === 'কোন তথ্য দেয় নি') {
      setShowAppeal(true);
    } else {
      setShowAppeal(false);
    }
  };

  const handleSaveFeedback = () => {
    if (!response) {
      setError('অনুগ্রহ করে উত্তর পাওয়ার তথ্য নির্বাচন করুন।');
      return;
    }
    if (response === 'হ্যা' && !details) {
      setError('অনুগ্রহ করে প্রাপ্ত তথ্যের ধরন নির্বাচন করুন।');
      return;
    }

    setError('');
    setAppealEnabled(true);
    // You can add data saving logic here
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
              <option value="কোন তথ্য দেয় নি">কোন তথ্য দেয় নি</option>
            </select>
          </div>
        )}

        <div className="flex flex-wrap gap-4 justify-center mt-4">
          <button
            onClick={handleSaveFeedback}
            className="bg-[#008037] hover:bg-[#006f2f] text-white font-bold px-6 py-2 rounded shadow"
          >
            সংরক্ষণ করুন এবং চালিয়ে যান
          </button>

          {showAppeal && (
            <button
              onClick={() => {
                if (appealEnabled) {
                  router.push('/AppealForm');
                }
              }}
              disabled={!appealEnabled}
              className={`${
                appealEnabled ? 'bg-gray-700 hover:bg-gray-900' : 'bg-red-300 cursor-not-allowed'
              } text-white font-bold px-6 py-2 rounded shadow`}
            >
              আপিলের জন্য আবেদন করুন
            </button>
          )}

          <button
            onClick={() => router.push('/userDashboard')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded shadow"
          >
            পিছনে যান
          </button>
        </div>
      </div>
    </div>
  );
}
