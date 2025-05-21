'use client';
import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';  

const engToBanglaDigits = (input) => {
  const engDigits = '0123456789';
  const banglaDigits = '০১২৩৪৫৬৭৮৯';
  return input
    .split('')
    .map((ch) => {
      const index = engDigits.indexOf(ch);
      return index !== -1 ? banglaDigits[index] : ch;
    })
    .join('');
};

export default function ForgotPasswordPage() {
  const router = useRouter();  

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleBanglaPhoneInput = (e) => {
    let value = e.target.value;
    value = engToBanglaDigits(value);
    value = value.replace(/[^০-৯]/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    setPhone(value);
  };

  const sendCode = async () => {
    setLoading(true);
    try {
      await axios.post('/api/auth/send-code', { phone });
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.error || 'কোড পাঠাতে ব্যর্থ হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    setLoading(true);
    try {
      await axios.post('/api/auth/verify-code', { phone, code });
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.error || 'কোড সঠিক নয়।');
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('পাসওয়ার্ড মিলছে না।');
      return;
    }
    setLoading(true);
    try {
      await axios.post('/api/auth/reset-password', { phone, newPassword });
      toast.success('পাসওয়ার্ড সফলভাবে রিসেট হয়েছে।');

      setTimeout(() => {
        router.push('/login');  
      }, 1500); 

      setStep(4);
    } catch (err) {
      toast.error(err.response?.data?.error || 'রিসেট ব্যর্থ হয়েছে।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100 space-y-6">
        {step === 1 && (
          <>
            <h2 className="text-xl font-bold text-[#008037] text-center">ফোন নম্বর দিন</h2>
            <input
              type="text"
              inputMode="numeric"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm"
              placeholder="বাংলা মোবাইল নম্বর"
              value={phone}
              onChange={handleBanglaPhoneInput}
              maxLength={11}
            />
            <button
              onClick={sendCode}
              disabled={loading}
              className="w-full bg-[#008037] hover:bg-[#006f2f] text-white font-semibold py-2.5 rounded-md transition"
            >
              {loading ? 'প্রসেসিং...' : 'কোড পাঠান'}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-xl font-bold text-[#008037] text-center">যাচাইকরণ কোড দিন</h2>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm"
              placeholder="প্রাপ্ত কোড লিখুন"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button
              onClick={verifyCode}
              disabled={loading}
              className="w-full bg-[#008037] hover:bg-[#006f2f] text-white font-semibold py-2.5 rounded-md transition"
            >
              {loading ? 'প্রসেসিং...' : 'পরবর্তী'}
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-xl font-bold text-[#008037] text-center">নতুন পাসওয়ার্ড দিন</h2>
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm"
              placeholder="নতুন পাসওয়ার্ড"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm"
              placeholder="পাসওয়ার্ড নিশ্চিত করুন"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              onClick={resetPassword}
              disabled={loading}
              className="w-full bg-[#008037] hover:bg-[#006f2f] text-white font-semibold py-2.5 rounded-md transition"
            >
              {loading ? 'প্রসেসিং...' : 'রিসেট করুন'}
            </button>
          </>
        )}

      </div>
    </div>
  );
}
