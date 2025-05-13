'use client'
import React, { useState, useEffect } from 'react';

const districts = ["ঢাকা", "ফরিদপুর", "গাজীপুর", "গোপালগঞ্জ", "কিশোরগঞ্জ", "মাদারীপুর", "মানিকগঞ্জ", "মুন্সীগঞ্জ", "নারায়ণগঞ্জ", "নরসিংদী", "রাজবাড়ী", "শরীয়তপুর", "টাঙ্গাইল",
  "চট্টগ্রাম", "কক্সবাজার", "বান্দরবান", "ব্রাহ্মণবাড়িয়া", "চাঁদপুর", "কুমিল্লা", "ফেনী", "খাগড়াছড়ি", "লক্ষ্মীপুর", "নোয়াখালী", "রাঙ্গামাটি",
  "খুলনা", "বাগেরহাট", "চুয়াডাঙ্গা", "যশোর", "ঝিনাইদহ", "কুষ্টিয়া", "মাগুরা", "মেহেরপুর", "নড়াইল", "সাতক্ষীরা",
  "রাজশাহী", "বগুড়া", "জয়পুরহাট", "নওগাঁ", "নাটোর", "চাঁপাইনবাবগঞ্জ", "পাবনা", "সিরাজগঞ্জ",
  "রংপুর", "দিনাজপুর", "গাইবান্ধা", "কুড়িগ্রাম", "লালমনিরহাট", "নীলফামারী", "পঞ্চগড়", "ঠাকুরগাঁও",
  "সিলেট", "হবিগঞ্জ", "মৌলভীবাজার", "সুনামগঞ্জ",
  "বরিশাল", "বরগুনা", "ভোলা", "ঝালকাঠি", "পটুয়াখালী", "পিরোজপুর",
  "ময়মনসিংহ", "জামালপুর", "নেত্রকোণা", "শেরপুর"];

const OfficerProfileForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    district: '',
    officeType: ''
  });
  const [errors, setErrors] = useState({});
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(false);

  const validateBangla = (text) => /^[\u0980-\u09FF\s]+$/.test(text);

  const fetchOffices = async () => {
    try {
      const res = await fetch('/api/office');
      const data = await res.json();
      setOffices(data);
    } catch (err) {
      console.error('Fetching offices failed:', err);
    }
  };

  useEffect(() => {
    fetchOffices();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name || !validateBangla(formData.name)) {
      newErrors.name = 'শুধুমাত্র বাংলায় নাম লিখুন';
    }
    if (!formData.designation || !validateBangla(formData.designation)) {
      newErrors.designation = 'শুধুমাত্র বাংলায় পদবী লিখুন';
    }
    if (!formData.district) {
      newErrors.district = 'জেলা নির্বাচন করুন';
    }
    if (!formData.officeType) {
      newErrors.officeType = 'কার্যালয় নির্বাচন করুন';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/office', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      setFormData({ name: '', designation: '', district: '' });
      fetchOffices();
    } catch (error) {
      console.error('Submit Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('আপনি কি নিশ্চিতভাবে এই অফিসার মুছে ফেলতে চান?')) return;

    try {
      const res = await fetch('/api/office', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.error);

      fetchOffices();
    } catch (err) {
      console.error('Delete Error:', err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded-xl shadow space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold text-center text-green-700">অফিসার প্রোফাইল</h2>

        <div>
          <label className="block mb-1 text-sm">নাম</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="নাম লিখুন"
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm">পদবী</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="পদবী লিখুন"
            className="w-full border rounded px-3 py-2"
          />
          {errors.designation && <p className="text-red-600 text-sm mt-1">{errors.designation}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm">জেলা</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">জেলা নির্বাচন করুন</option>
            {districts.map((district, idx) => (
              <option key={idx} value={district}>{district}</option>
            ))}
          </select>
          {errors.district && <p className="text-red-600 text-sm mt-1">{errors.district}</p>}
        </div>
        <div>
          <label className="block mb-1 text-sm">কার্যালয়</label>
          <select
            name="officeType"
            value={formData.officeType}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">কার্যালয় নির্বাচন করুন</option>
            <option value="পরিবেশ অধিদপ্তর">পরিবেশ অধিদপ্তর</option>
            <option value="জেলা প্রশাসকের কার্যালয়">জেলা প্রশাসকের কার্যালয়</option>
          </select>
          {errors.officeType && <p className="text-red-600 text-sm mt-1">{errors.officeType}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? 'লোড হচ্ছে...' : 'জমা দিন'}
        </button>
      </form>

      {offices.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">অফিসারের তালিকা</h3>
          <table className="w-full border text-sm text-left text-gray-700">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">নাম</th>
                <th className="px-3 py-2 border">পদবী</th>
                <th className="px-3 py-2 border">জেলা</th>
                <th className="px-3 py-2 border">কার্যালয়</th>

                <th className="px-3 py-2 border">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {offices.map((entry) => (
                <tr key={entry.id} className="border-t">
                  <td className="px-3 py-2 border">{entry.name}</td>
                  <td className="px-3 py-2 border">{entry.designation}</td>
                  <td className="px-3 py-2 border">{entry.district}</td>
                  <td className="px-3 py-2 border">{entry.officeType}</td>

                  <td className="px-3 py-2 border text-center">
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="text-white bg-red-600 px-2 py-1 rounded hover:bg-red-700"
                    >
                      ডিলিট
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OfficerProfileForm;
