'use client';

import AppealPdfDocument from '@/components/PDFs/AppealPdfDocument';
import { useAuth } from '@/context/AuthContext';
import { getSection } from '@/utils/getCorrespondingSection';
import { pdf } from '@react-pdf/renderer';
import { useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect, useRef, useState } from 'react';

export default function AppealReview() {
  const searchParams = useSearchParams();
  const appealId = searchParams.get('appealId');
  const applicationId = searchParams.get('applicationId');
  const [appealData, setAppealData] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null)
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const userId = user?.id;

    if (userId) {
      const fetchAppeal = fetch(`/api/appeal?appealId=${appealId}`).then(res => res.json());
      const fetchFeedback = fetch(`/api/feedback?applicationId=${applicationId}`).then(res => res.json());

      Promise.all([fetchAppeal, fetchFeedback])
        .then(([appeal, feedback]) => {
          setAppealData(appeal?.appeals[0]);
          setFeedbackData(feedback?.feedbacks[0]);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    } else {
      console.warn('User ID not found');
      setLoading(false);
    }
  }, []);
  // function handleDownloadPDF() {
  //   if (!contentRef.current) return;
  //   const opt = {
  //     margin: 0.5,
  //     filename: 'appeal_review.pdf',
  //     image: { type: 'jpeg', quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  //   };
  //   html2pdf().from(contentRef.current).set(opt).save();
  // }

  const handleDownload = async () => {
      if (!appealData || !feedbackData) {
        alert('ডেটা লোড হয়নি');
        return;
    }
        try{
          const blob = await pdf(<AppealPdfDocument data={{appealData,feedbackData}} />).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'RTI_Appeal_Application.pdf';
        a.click();
        URL.revokeObjectURL(url);
        } catch (err) {
          console.error(err);
        }
         router.push('/userDashboard')
    };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-green-600 border-dashed rounded-full animate-spin"></div>
        <p className="text-green-700 mt-4 text-lg">লোড হচ্ছে, অনুগ্রহ করে অপেক্ষা করুন...</p>
      </div>
    );
  }

  if (!appealData || !feedbackData) {
    return <p className="text-center text-red-600 mt-10">ডেটা পাওয়া যায়নি।</p>;
  }

  function formatBanglaDateFromISO(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    const enToBn = n => n.toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
    const day = enToBn(date.getDate());
    const year = enToBn(date.getFullYear());
    const banglaMonths = [
      'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
      'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
    ];
    const monthName = banglaMonths[date.getMonth()];
    return `${day} ${monthName}, ${year}`;
  }

  
  return (
    <div className="max-w-5xl mx-auto p-18 bg-white shadow rounded text-[17px] leading-[2.3rem] font-[Kalpurush]" ref={contentRef}>
      <div className="flex justify-center mb-11">
        <button
          onClick={handleDownload}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow"
        >
          PDF ডাউনলোড করুন
        </button>
      </div>
      <h2 className="text-center text-xl  mb-11">-  রেজিষ্ট্রিকৃত ডাকযোগে প্রেরিত -</h2>

      <p className='mb-2 text-lg'>বরাবর,</p>
      <div className="space-y-1">
        {appealData?.appealOfficer
          ?.split(',')
          .map((item, index) => (
            <p
              key={index}
              className={`leading-tight ${index === 0 ? 'font-bold' : ''}`}
            >
              {item.trim()}
            </p>
          ))}
      </div>


      <p className="mt-4 text-right">তারিখ: {new Date().toLocaleDateString('bn-BD')}</p>

      <p className="font-bold mt-4 text-center">বিষয়ঃ তথ্য অধিকার আইন, ২০০৯-এর ধারা-২৪ অনুযায়ী আপীল।</p>

      <p className="mt-4 font-bold">জনাব,</p>
      <p>শুভেচ্ছা জানবেন।</p>
      <p>নিম্নেস্বাক্ষরকারী গত, {formatBanglaDateFromISO(appealData?.application?.createdAt)} তারিখে  দায়িত্ব প্রাপ্ত তথ্য কর্মকর্তা <span className='font-bold'>{appealData?.informationGivenOfficer}</span> - বরাবর তথ্য অধিকার আইন, ২০০৯-এর ধারা ৮(৩) অনুযায়ী নির্ধারিত ফরমেটে {appealData?.application?.data?.infoType} তথ্য চেয়ে আবেদন জানায় (সংযুক্ত)।</p>
      <p>{getSection({ response: feedbackData?.response, infoType: feedbackData?.infoType, appealData })}</p>
      <p>এমতাবস্থায় নিম্নস্বাক্ষরকারীতথ্য অধিকার আইন, ২০০৯-এর ধারা ২৪ অনুযায়ী <span className='font-bold'>{appealData?.appealOfficer}</span> - এর আপীল কর্মকর্তা হিসেবে আপনার বরাবরে নির্ধারিত ফরমেটে আপীল আবেদন প্রেরণ করছে এবং ধারা ২৪ (৩) অনুযায়ী তথ্য সরবরাহের জন্য সংশ্লিষ্ট দায়িত্বপ্রাপ্ত কর্মকর্তাকে চাহিদা মাফিক তথ্যগুলি ১৫ দিনের মধ্যে নিম্নস্বাক্ষরকারী বরাবর প্রেরণের নির্দেশ প্রদানের জন্য আপনাকে অনুরোধ জানাচ্ছে।</p>
      <p></p>



      <p className="mt-6">বিনীত,</p>
      <p className=' font-bold'>{appealData?.applicantName}</p>

      <p className="">সংযুক্তি: বর্ণনামতে</p>

      <p className="mt-2 ">অনুলিপিঃ  সদয় অবগতি ও প্রয়োজনীয় ব্যবস্থা গ্রহণের জন্য প্রেরিত হলো</p>
      <p>{appealData.copyTo}</p>
      <p>১। {appealData?.informationGivenOfficer}</p>

      <hr className="my-6 border" />

      <h2 className="text-center font-bold text-lg mb-2">ফরম ‘গ’ - আপীল আবেদন</h2>
      <p className="italic text-sm text-gray-600 text-center">[তথ্য অধিকার (তথ্য প্রাপ্তি সংক্রান্ত) বিধিমালার বিধি-৬ দ্রষ্টব্য]</p>

      <div className="mt-4 space-y-3">
        <div className="mt-4 space-y-3">
          <div className="flex gap-2">
            <p className="w-[300px]  ">১) আপীলকারীর নাম ও ঠিকানা:</p>
            <p>: <span className='font-bold'>{appealData?.applicantName}</span></p>
          </div>
          <div className="flex gap-2">
            <p className="w-[300px]  ">২) আপীলের তারিখ:</p>
            <p>: {new Date().toLocaleDateString('bn-BD')}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[300px] ">৩) যে আদেশের বিরুদ্ধে আপীল করা হইয়াছে:</p>
            <p>: {feedbackData?.infoType}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[300px]  ">৪) যাহার আদেশের বিরুদ্ধে আপীল করা হইয়াছে</p>
            <p>: প্রযোজ্য নয়</p>
          </div>
          <div>
            <p className="">৫) আপীলের সংক্ষিপ্ত বিবরণ:</p>
            <p className="whitespace-pre-line leading-relaxed ml-6">
              {appealData?.details}
            </p>
          </div>
          <div className="flex gap-2">
            <p className="w-[300px]  ">৬) আদেশের বিরুদ্ধে সংক্ষুব্ধ হইবার কারণ:</p>
            <p>: প্রযোজ্য নয়</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[300px]  ">৭) প্রার্থিত প্রতিকারের যুক্তি</p>
            <p>: {feedbackData?.infoType}</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[300px] ">৮) আপীলকারী কর্তৃক প্রত্যয়ন</p>
            <p>: এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, উপরে বর্ণিত সমস্ত তথ্য সত্য ও বিদ্বেষ প্রসূত নয়</p>
          </div>
          <div className="flex gap-2">
            <p className="w-[300px] ">৯) অন্য কোন তথ্য:</p>
            <p>: প্রযোজ্য নয়</p>
          </div>
        </div>

      </div>

      <p className="mt-18 text-right">----------------------<br />
        আবেদনকারীর স্বাক্ষর <br />
        আবেদন তারিখঃ {new Date().toLocaleDateString('bn-BD')}</p>
    </div>
    
  );
}
