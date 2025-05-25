'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail, FiPhone, FiUser, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import useApi from '../../../hooks/officeApi';
import { useAuth } from '@/context/AuthContext';

export default function RtiForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { offices, loading: officeLoading, error, fetchOffices } = useApi();
  const [form, setForm] = useState({
    name: '',
    father: '',
    mother: '',
    presentAddress: '',
    permanentAddress: '',
    office: '',
    officer: '',
    division: '',
    infoType: '',
    description: '',
    method: [],
    email: '',
    phone: '',
  });

  const [officers, setOfficers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const methodOptions = ['ফটোকপি', 'লিখিত', 'ই-মেইল', 'ফ্যাক্স'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === 'office') {
      const filteredOfficers = offices.filter((o) => o.officeType === value);
      setOfficers(filteredOfficers);
      setForm((prev) => ({ ...prev, officer: '' }));
    }
  };

  const handleMethodCheckbox = (value) => {
    setForm((prev) => {
      const methods = prev.method.includes(value)
        ? prev.method.filter((m) => m !== value)
        : [...prev.method, value];
      return { ...prev, method: methods };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/application');
      const data = await res.json();
      const allApplications = data ? data : [];

      if (form.method.length === 0) {
        alert('কমপক্ষে একটি তথ্য প্রাপ্তির পদ্ধতি নির্বাচন করুন।');
        setSubmitting(false);
        return;
      }

      const selectedOfficer = officers.find((o) => o.name === form.officer);
      const officerInfo = selectedOfficer
        ? {
            name: selectedOfficer.name,
            designation: selectedOfficer.designation,
            district: selectedOfficer.district,
            division: selectedOfficer.division,
            officeType: selectedOfficer.officeType,
          }
        : null;

      const newApp = {
        ...form,
        officerInfo,
        application_id: allApplications.length + 1,
        createdAt: new Date().toISOString(),
        appealed: false,
        feedback: 'পরীক্ষাধীন',
        timeTaken: '২৮ দিন',
        status: 'পেন্ডিং',
      };

      localStorage.setItem('applications', JSON.stringify([...allApplications, newApp]));
      sessionStorage.setItem('rtiForm', JSON.stringify(newApp));

      router.push('/preview');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।');
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('rtiForm');
    const name = user?.fullName || '';
    const email = user?.email || '';
    const phone = user?.phone || '';

    if (saved) {
      const parsed = JSON.parse(saved);
      setForm((prev) => ({ ...prev, ...parsed }));
    } else {
      setForm((prev) => ({ ...prev, name, email, phone }));
    }
  }, [user]);

  useEffect(() => {
    fetchOffices();
  }, [fetchOffices]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white px-4 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#008037] mb-6">
          তথ্য অধিকার আবেদন ফর্ম
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="flex items-center border p-2 rounded text-green-700">
            <FiUser className="mr-2" />
            <input name="name" value={form.name} readOnly className="flex-1 focus:outline-none" placeholder="নাম" required />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiUser className="mr-2" />
            <input name="father" value={form.father} onChange={handleChange} className="flex-1 focus:outline-none" placeholder="পিতার নাম" required />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiUser className="mr-2" />
            <input name="mother" value={form.mother} onChange={handleChange} className="flex-1 focus:outline-none" placeholder="মাতার নাম" required />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMapPin className="mr-2" />
            <input name="presentAddress" value={form.presentAddress} onChange={handleChange} className="flex-1 focus:outline-none" placeholder="বর্তমান ঠিকানা" required />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMapPin className="mr-2" />
            <input name="permanentAddress" value={form.permanentAddress} onChange={handleChange} className="flex-1 focus:outline-none" placeholder="স্থায়ী ঠিকানা" required />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMail className="mr-2" />
            <input name="infoType" value={form.infoType} onChange={handleChange} className="flex-1 focus:outline-none" placeholder="কি ধরনের তথ্য চান" />
          </div>

          

        
            <div className="md:col-span-2">
              <label className="text-green-700">দপ্তর নির্বাচন করুন:</label>
              <select
                name="office"
                value={form.office}
                onChange={handleChange}
                className="w-full p-2 border rounded text-green-700"
              >
                <option value="">-- দপ্তর নির্বাচন করুন --</option>
                <option value="পরিবেশ অধিদপ্তর">পরিবেশ অধিদপ্তর</option>
                <option value="জেলা প্রশাসকের কার্যালয়">জেলা প্রশাসকের কার্যালয়</option>
              </select>
            </div>
       

          {form.office && officers.length > 0 && (
            <div className="md:col-span-2">
              <label className="text-green-700">অফিসার নির্বাচন করুন:</label>
              <select name="officer" value={form.officer} onChange={handleChange} className="w-full p-2 border rounded text-green-700">
                <option value="">-- একজন নির্বাচন করুন --</option>
                {officers
                  .filter((officer) => officer.officeType === form.office)
                  .map((officer) => (
                    <option key={officer.id} value={officer.name}>
                      {officer.name} ({officer.designation}, {officer.district})
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className="md:col-span-2">
            <label className="text-green-700 mb-2 block">আপনি কোন কোন পদ্ধতিতে তথ্য পেতে চান?</label>
            <div className="flex flex-wrap gap-4">
              {methodOptions.map((method) => (
                <label key={method} className="text-green-700 flex items-center">
                  <input type="checkbox" checked={form.method.includes(method)} onChange={() => handleMethodCheckbox(method)} className="mr-1" />
                  <FiCheckCircle className="mr-1" />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-3 border rounded text-green-700" placeholder="তথ্যের বিস্তারিত বর্ণনা লিখুন" required />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMail className="mr-2" />
            <input name="email" value={form.email} readOnly className="flex-1 focus:outline-none" placeholder="ই-মেইল" />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiPhone className="mr-2" />
            <input name="phone" value={form.phone} readOnly className="flex-1 focus:outline-none" placeholder="মোবাইল নম্বর" />
          </div>

          <div className="md:col-span-2">
            <button type="submit" disabled={submitting} className="w-full bg-[#008037] hover:bg-green-700 text-white py-3 rounded text-lg font-semibold">
              {submitting ? 'জমা দেওয়া হচ্ছে...' : 'আবেদন জমা দিন'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
