'use client'

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from "react-hot-toast";

export default function PageThree({ data: formData, showButton = true }) {
  const router = useRouter()
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    await saveToDatabase();
  }

  const saveToDatabase = async () => {
    try {
      const userId = user?.id;
      if (!userId) {
        toast.error("ব্যবহারকারীর তথ্য পাওয়া যায়নি।");
        return;
      }

      const res = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData,
          userId,
        }),
      });

      if (!res.ok) throw new Error("সার্ভারে সংরক্ষণ ব্যর্থ হয়েছে।");
      sessionStorage.removeItem('rtiForm')
      const result = await res.json();
      router.push(`/completedForm?applicationId=${result?.id}`)
    } catch (err) {
      toast.error("ডেটা সংরক্ষণে সমস্যা হয়েছে।");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!formData) return null

  return (
    <div>
      <div className="mb-4 text-sm space-y-4 p-6">
        {/* ৫ */}
        <div className="grid grid-cols-2 gap-4 items-start">
          <span className="text-base">৫। প্রযোজ্য ক্ষেত্রে সহায়তাকারীর নাম ও ঠিকানা</span>
          <span className="text-base">: প্রযোজ্য নয়।</span>
        </div>

        {/* ৬ */}
        <div className="grid grid-cols-2 gap-4 items-start">
          <span className="text-base">৬। তথ্য প্রদানকারী কর্তৃপক্ষের নাম ও ঠিকানা</span>
          <div>
            <span className="text-base">: জনাব</span>
            <p className="font-bold mt-2 text-base ml-2">{formData?.officerInfo?.name}</p>
            <p className='text-base ml-2'> {formData?.officerInfo?.designation}, {formData?.officerInfo?.district}</p>
            <p className='text-base ml-2'> {formData?.officerInfo?.addres}, {formData?.officerInfo?.district}</p>

          </div>
        </div>

        {/* ৭ */}
        <div className="grid grid-cols-2 gap-4 items-start pt-4">
          <span className="text-base">৭। আবেদনের তারিখ</span>
          <div className="flex justify-between w-full">
            <span className="text-base">: {new Date().toLocaleDateString('bn-BD')}</span>
            <span className="text-base mt-32">আবেদনকারীর স্বাক্ষর</span>
          </div>
        </div>

        {/* Note */}
        <p className="pt-4 text-base col-span-2">
          * তথ্য অধিকার (তথ্য প্রাপ্তি সংক্রান্ত ) বিধিমালা, ২০০৯ এর ৮ ধারা অনুযায়ী তথ্যের মূল্য পরিশোধ যোগ্য।
        </p>
      </div>

      {/* Button */}
      {showButton && (
        <div className="flex justify-center">
          <button
            disabled={loading}
            onClick={handleContinue}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            সেভ অ্যান্ড কন্টিনিউ
          </button>
        </div>
      )}
    </div>

  )
}
