'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail, FiPhone, FiUser, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import useApi from '../../../hooks/officeApi';

export default function RtiForm() {
  const router = useRouter();
  const { offices, loading, error, fetchOffices } = useApi();

  const [form, setForm] = useState({
    name: '',
    father: '',
    mother: '',
    presentAddress: '',
    permanentAddress: '',
    office: '',
    officer: '',
    infoType: '',
    description: '',
    method: [],
    email: '',
    phone: '',
  });

  const [officers, setOfficers] = useState([]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const allRaw = localStorage.getItem('applications');
    const allApplications = allRaw ? JSON.parse(allRaw) : [];
    if (form.method.length === 0) {
      alert('কমপক্ষে একটি তথ্য প্রাপ্তির পদ্ধতি নির্বাচন করুন।');
      return;
    }

    // Officer full info
    const selectedOfficer = officers.find((o) => o.name === form.officer);
    const officerInfo = selectedOfficer
      ? {
        name: selectedOfficer.name,
        designation: selectedOfficer.designation,
        district: selectedOfficer.district,
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
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('rtiForm');
    const name = localStorage.getItem('name') || '';
    const email = localStorage.getItem('email') || '';
    const phone = localStorage.getItem('phone') || '';

    if (saved) {
      const parsed = JSON.parse(saved);
      setForm((prev) => ({ ...prev, ...parsed }));
    } else {
      setForm((prev) => ({ ...prev, name, email, phone }));
    }
  }, []);

  useEffect(() => {
    fetchOffices();
  }, [fetchOffices]);

  return (
    <div className="bg-green-[300px]">
      <div className="max-w-3xl mx-auto p-10 md:p-24 shadow">
        <h1 className="text-xl text-green-700 font-bold text-center mb-6">তথ্য অধিকার আবেদন ফর্ম</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="flex items-center border p-2 rounded text-green-700">
            <FiUser className="mr-2" />
            <input
              name="name"
              value={form.name}
              readOnly
              className="flex-1 focus:outline-none focus:border-transparent"
              placeholder="নাম"
              required
            />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiUser className="mr-2" />
            <input
              name="father"
              value={form.father}
              onChange={handleChange}
              className="flex-1 focus:outline-none focus:border-transparent"
              placeholder="পিতার নাম"
              required
            />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiUser className="mr-2" />
            <input
              name="mother"
              value={form.mother}
              onChange={handleChange}
              className="flex-1 focus:outline-none focus:border-transparent"
              placeholder="মাতার নাম"
              required
            />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMapPin className="mr-2" />
            <input
              name="presentAddress"
              value={form.presentAddress}
              onChange={handleChange}
              className="flex-1 focus:outline-none focus:border-transparent"
              placeholder="বর্তমান ঠিকানা"
              required
            />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMapPin className="mr-2" />
            <input
              name="permanentAddress"
              value={form.permanentAddress}
              onChange={handleChange}
              className="flex-1 focus:outline-none focus:border-transparent"
              placeholder="স্থায়ী ঠিকানা"
              required
            />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMail className="mr-2" />
            <input
              name="infoType"
              value={form.infoType}
              onChange={handleChange}
              className="flex-1 focus:outline-none focus:border-transparent"
              placeholder="কি ধরনের তথ্য চান"
            />
          </div>

          <div className="col-span-2">
            <label className="text-green-700">দপ্তর নির্বাচন করুন:</label>
            <select
              name="office"
              value={form.office}
              onChange={handleChange}
              className="w-full p-2 border rounded text-green-700"
            >
              <option value="">-- নির্বাচন করুন --</option>
              {loading ? (
                <option>লোড হচ্ছে...</option>
              ) : error ? (
                <option>{error}</option>
              ) : (
                [...new Set(offices.map((o) => o.officeType))].map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))
              )}
            </select>
          </div>

          {officers.length > 0 && (
            <div className="col-span-2">
              <label className="text-green-700">অফিসার নির্বাচন করুন:</label>
              <select
                name="officer"
                value={form.officer}
                onChange={handleChange}
                className="w-full p-2 border rounded text-green-700"
              >
                <option value="">-- একজন নির্বাচন করুন --</option>
                {officers.map((officer) => (
                  <option key={officer.id} value={officer.name}>
                    {officer.name} ({officer.designation}, {officer.district})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="col-span-2">
            <label className="text-green-700 mb-2 block">আপনি কোন কোন পদ্ধতিতে তথ্য পেতে চান?</label>
            <div className="flex flex-wrap gap-4">
              {methodOptions.map((method) => (
                <label key={method} className="text-green-700 flex items-center">
                  <input
                    type="checkbox"
                    checked={form.method.includes(method)}
                    onChange={() => handleMethodCheckbox(method)}
                    className="mr-1"
                      
                  />
                  <FiCheckCircle className="mr-1" />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-3 border rounded text-green-700 focus:outline-none focus:border-transparent"
              placeholder="তথ্যের বিস্তারিত বর্ণনা লিখুন"
              required
            />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMail className="mr-2" />
            <input
              name="email"
              value={form.email}
              readOnly
              className="flex-1 focus:outline-none focus:border-transparent"
              placeholder="ই-মেইল"
              
            />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiPhone className="mr-2" />
            <input
              name="phone"
              value={form.phone}
              readOnly
              className="flex-1 focus:outline-none focus:border-transparent"
              placeholder="ফোন নম্বর"
            />
          </div>

          <div className="col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 transition"
            >
              আবেদন জমা দিন
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
