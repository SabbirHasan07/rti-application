'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const sections = [
  {
    title: '১. রেজিস্ট্রেশন ও লগইন',
    content: [
      '**নাম**: আপনার পূর্ণ নাম প্রদান করুন।',
      '**ইমেইল**: ঐচ্ছিক, তবে আপনি আপডেট পাবেন।',
      '**মোবাইল নম্বর**: আপনার বর্তমান নম্বর দিন।',
      '**জাতীয় পরিচয়পত্র নম্বর (NID)**: আপনার জাতীয় পরিচয়পত্র নম্বর লিখুন।',
      '**পাসওয়ার্ড**: একটি শক্তিশালী পাসওয়ার্ড তৈরি করুন এবং নিশ্চিত করুন।',
    ],
  },
  {
    title: '২. আবেদন ফরম পূরণ',
    content: [
      '**আবেদনকারীর নাম**: আপনার বা প্রতিনিধি নাম লিখুন।',
      '**ঠিকানা**: বর্তমান এবং স্থায়ী ঠিকানা প্রদান করুন।',
      "**মাতার নাম**: আপনার মাতার নাম লিখুন।",
      '**বিভাগ নির্বাচন**: বিভাগ নির্বাচন করুন (যেমন, ডিসি অফিস)।',
      '**তথ্যের ধরন**: তথ্যের ধরন নির্বাচন করুন।',
      '**বিস্তারিত বিবরণ**: বিস্তারিত লিখুন।',
      '**তথ্য প্রাপ্তির মাধ্যম**: ইমেইল, পোস্ট ইত্যাদি মাধ্যমে তথ্য চান।',
    ],
  },
  {
    title: '৩. আবেদন তৈরি',
    content: [
      'ফরম সাবমিট করলে আবেদন স্বয়ংক্রিয়ভাবে বাংলা ভাষায় তৈরি হবে।',
      'ডাউনলোডের আগে প্রিভিউ দেখানো হবে।',
      'ইমেইল এবং এসএমএস মাধ্যমে নিশ্চিতকরণ পাঠানো হবে।',
    ],
  },
  {
    title: '৪. ফিডব্যাক ও ফলোআপ',
    content: [
      '২০ কার্যদিবস পর একটি রিমাইন্ডার পাঠানো হবে।',
      'বিলম্ব হলে আপনি পুনরায় আবেদন করতে পারেন বা যোগাযোগ করতে পারেন।',
    ],
  },
  {
    title: '৫. নিরাপত্তা ব্যবস্থা',
    content: [
      'আপনার ব্যক্তিগত তথ্য সুরক্ষিত থাকবে।',
      'অথেন্টিকেশন এবং এনক্রিপশন নিশ্চিত করা হয়েছে।',
    ],
  },
  {
    title: '৬. যোগাযোগ তথ্য',
    content: [
      '**ইমেইল**: sabbirhasan.engr@gmail.com',
      '**ফোন**: 01603729796',
      'যোগাযোগ করতে মুক্ত মনে করুন।',
    ],
  },
];

const RTIGuidelines = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const router = useRouter();

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleGenerateClick = () => {
    router.push('/login')
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 text-[#212529] font-sans">
      <h1 className="text-3xl font-bold text-center text-[#008037] mb-8 border-b pb-4">
        RTI নির্দেশিকা
      </h1>

      <div className="space-y-4">
        {sections.map((section, idx) => (
          <div key={idx} className="border border-[#ccc] rounded-lg overflow-hidden">
            <button
              onClick={() => toggle(idx)}
              className="flex justify-between items-center w-full text-left px-5 py-4 bg-[#f5f5f5] hover:bg-[#e1f3eb] text-lg font-semibold text-[#008037] transition rounded-t-lg hover:cursor-pointer"
            >
              {section.title} {openIndex === idx ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {openIndex === idx && (
              <div className="px-6 py-4 text-[16px] bg-white text-[#333] leading-relaxed transition-all duration-300 ease-in-out">
                <ul className="list-disc list-inside space-y-2">
                  {section.content.map((item, i) => (
                    <li
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: item.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                      }}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* RTI আবেদন তৈরি করুন button */}
      <div className="text-center mt-10">
        <button
          onClick={handleGenerateClick}
          className="bg-[#008037] text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-[#006f2f] transition"
        >
          RTI আবেদন তৈরি করুন
        </button>
      </div>
    </div>
  );
};

export default RTIGuidelines;
