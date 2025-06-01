'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function AppealForm() {
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('applicationId');
  const [applicationData, setApplicationData] = useState();
  const [feedbackData, setFeedbackData] = useState();
  const [loadingData, setLoadingData] = useState(true);
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    applicantName: '',
    address: '',
    phone: '',
    referenceNo: '',
    officerName: '',
    apealOfficerAddress: '',
    appealOfficer: '',
    responseDate: '',
    subject: '',
    details: '',
    reason: '',
    informationGivenOfficer: '', // ✅ নতুন ফিল্ড
  });


  const [placeholders, setPlaceholders] = useState({});
  const [loading, setLoading] = useState(false);
  const userId = typeof window !== 'undefined' ? user?.id : null;
  const router = useRouter();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!userId) return alert('User ID পাওয়া যায়নি!');

    setLoading(true);
    try {
      const res = await fetch('/api/appeal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId, applicationId }),
      });
      const data = await res.json();
      // console.log(data)
      if (res.ok) {
        alert('আপীল সফলভাবে জমা হয়েছে!');
        setFormData({
          applicantName: '',
          address: '',
          phone: '',
          referenceNo: '',
          officerName: '',
          appealOfficer: '',
          apealOfficerAddress:'',
          responseDate: '',
          subject: '',
          details: '',
          reason: '',
          informationGivenOfficer: '', // ✅ reset
        });
        router.push(`/reviewAppeal?appealId=${data?.appeal?.id}&applicationId=${applicationId}`);
      } else {
        alert(data.message || 'সার্ভার সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('Error submitting appeal:', error);
      alert('সার্ভার সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };
  function formatBanglaDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const enToBn = n => n.toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
    const day = enToBn(date.getDate());
    const month = enToBn(date.getMonth() + 1);
    const year = enToBn(date.getFullYear());
    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    if (userId) {
     setLoadingData(true)
      fetch(`/api/appeal?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.appeals.length > 0) {
            const latestAppeal = data.appeals[0];
            setPlaceholders(latestAppeal);
          }
        })
        .catch(err => console.error('Error fetching appeal:', err));
      fetch(`/api/application?applicationId=${applicationId}`).then(res => res.json()).then(data => {
        setApplicationData(data?.[0]?.data)
        fetch(`/api/feedback?applicationId=${applicationId}`).then(res => res.json()).then(data => setFeedbackData(data?.feedbacks?.[0]))
        setLoadingData(false)
      })
    }
  }, [userId]);

  useEffect(() => {
    if (applicationData) {
      let updatedReason = formData.reason;

      if (feedbackData?.response === 'না') {
        updatedReason = 'উত্তর দেওয়া হয়নি';
      }

      if (feedbackData?.response === 'আবেদন গৃহীত হয়নি') {
        updatedReason = feedbackData?.response;
      }

      setFormData({
        ...formData,
        applicantName: applicationData?.name,
        address: applicationData?.presentAddress,
        phone: applicationData?.phone,
        informationGivenOfficer: `${applicationData?.officerInfo?.name}, ${applicationData?.officerInfo?.designation}, ${applicationData?.officerInfo?.district}`,
        subject: feedbackData?.infoType || '',
        reason: updatedReason
      });
       
    }
  }, [applicationData, feedbackData]);


  if (loadingData) {
  return (
    <div className="flex justify-center items-center min-h-[300px]">
      <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
      </svg>
      <span className="ml-3 text-blue-600 font-medium">তথ্য লোড হচ্ছে...</span>
    </div>
  );
}
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-2 text-center text-blue-700">আপীল আবেদন ফর্ম</h1>
      <h2 className="text-center text-blue-700 mb-6">(আবেদনের জন্য শুধুমাত্র বাংলা ব্যবহার করুন)</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="আপীলকারীর নাম" name="applicantName" value={formData.applicantName} onChange={handleChange} placeholder={placeholders.applicantName} disabled={true} />
        <Input disabled={true} label="ঠিকানা" name="address" value={formData.address} onChange={handleChange} placeholder={placeholders.address} />
        <Input disabled={true} label="মোবাইল নম্বর" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder={placeholders.phone} />
        <Input label="তথ্য প্রদানকারী কর্মকর্তার দপ্তর থেকে প্রেরিত পত্রের স্মারক নং" name="referenceNo" value={formData.referenceNo} onChange={handleChange} placeholder={placeholders.referenceNo} />
        <Input label=" আপিল কর্মকর্তার  নাম ও পদবী *"
        
        name="appealOfficer" value={formData.appealOfficer} onChange={handleChange} placeholder="নাম ,পদবী"
        required
        />
        <Input label=" আপিল কর্মকর্তার ঠিকানা *"
        
        name="apealOfficerAddress" value={formData.apealOfficerAddress} onChange={handleChange} placeholder={placeholders.apealOfficerAddress}
        required
        />
        <Input disabled={true} label="তথ্য প্রদানকারী কর্মকর্তা" name="informationGivenOfficer" value={formData.informationGivenOfficer} onChange={handleChange} placeholder={placeholders.informationGivenOfficer} />
        <Input
          disabled={true}
          label="আপীলের বিষয়বস্তু"
          name="subject"
          value={feedbackData?.response === "না" || feedbackData?.response === "আবেদন গৃহীত হয়নি" ? formData?.reason : formData?.subject}
          onChange={handleChange}
          placeholder={placeholders.subject}
        />

        {!(feedbackData?.response === 'না' || feedbackData?.response === 'আবেদন গৃহীত হয়নি') && <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">উত্তরের তারিখ *</label>
          <input
            type="date"
            name="responseDate"
            value={formData.responseDate || ' '}
            onChange={handleChange}
            required
            className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* ✅ তারিখ প্রদর্শন বাংলা ফরম্যাটে */}
          {formData.responseDate && (
            <span className="text-sm text-green-600 mt-1">
              বাংলা তারিখ: {formatBanglaDate(formData.responseDate)}
            </span>
          )}
        </div>}

        {formData.subject !== "কোন তথ্য প্রদান করেনি" && (
          <Textarea
            label="আপীলের সংক্ষিপ্ত বিবরণ"
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder={placeholders.details}
          />
        )}

        {formData.subject === "কোন তথ্য প্রদান করেনি" && (
          <Textarea
            label="তথ্য প্রদানে অস্বীকৃতি জানিয়ে থাকলে তার কারণ"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder={placeholders.reason}
          />
        )}



        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'লোড হচ্ছে...' : 'জমা দিন'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, name, type = 'text', value, onChange, placeholder, disabled }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 font-medium text-gray-700">{label} </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        inputMode={type === 'tel' ? 'numeric' : 'text'}
        placeholder={placeholder || ''}
        className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={disabled}
      />
    </div>
  );
}

function Textarea({ label, name, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col md:col-span-2">
      <label className="mb-1 font-medium text-gray-700">{label} </label>
      <textarea
        name={name}
        rows="3"
        value={value}
        onChange={onChange}
        placeholder={placeholder || ''}
        className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
