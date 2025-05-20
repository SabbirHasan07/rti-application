'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ForgotPasswordPage() {
    const [step, setStep] = useState(1);
    const [phone, setPhone] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const sendCode = async () => {
        try {
            await axios.post('/api/auth/send-code', { phone });
            setStep(2);
        } catch (err) {
            setMessage(err.response?.data?.error || 'Failed to send code.');
        }
    };

    const verifyCode = async () => {
        try {
            await axios.post('/api/auth/verify-code', { phone, code });
            setStep(3);
        } catch (err) {
            setMessage(err.response?.data?.error || 'Invalid code.');
        }
    };

    const resetPassword = async () => {
        if (newPassword !== confirmPassword) {
            return setMessage('Passwords do not match.');
        }
        try {
            await axios.post('/api/auth/reset-password', { phone, newPassword });
            setMessage('Password reset successful.');
            setStep(4);
        } catch (err) {
            setMessage(err.response?.data?.error || 'Reset failed.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 space-y-4 p-6 border rounded ">
            {step === 1 && (
                <>
                    <h2 className="text-xl font-bold">আপনার ফোন নম্বর লিখুন</h2>
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="ফোন নম্বর"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button onClick={sendCode} className="w-full bg-[#008037] text-white p-2 rounded">
                        কোড পাঠান</button>
                </>
            )}
            {step === 2 && (
                <>
                    <h2 className="text-xl font-bold">যাচাইকরণ কোড লিখুন</h2>
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                    />
                    <button onClick={verifyCode} className="w-full bg-[#008037] text-white p-2 rounded">পরবর্তী</button>
                </>
            )}
            {step === 3 && (
                <>
                    <h2 className="text-xl font-bold">পাসওয়ার্ড রিসেট করুন</h2>
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="New Password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <input
                        className="w-full border p-2 rounded"
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button onClick={resetPassword} className="w-full bg-[#008037] text-white p-2 rounded">রিসেট করুন</button>
                </>
            )}
            {message && <p className="text-sm text-red-500">{message}</p>}
            {step === 4 && <p className="text-green-600">পাসওয়ার্ড সফলভাবে রিসেট!</p>}
        </div>
    );
}
