
'use client'
import React, { useState } from 'react';

const districts = [
  "ঢাকা", "ফরিদপুর", "গাজীপুর", "গোপালগঞ্জ", "কিশোরগঞ্জ", "মাদারীপুর", "মানিকগঞ্জ", "মুন্সীগঞ্জ", "নারায়ণগঞ্জ", "নরসিংদী", "রাজবাড়ী", "শরীয়তপুর", "টাঙ্গাইল",
  "চট্টগ্রাম", "কক্সবাজার", "বান্দরবান", "ব্রাহ্মণবাড়িয়া", "চাঁদপুর", "কুমিল্লা", "ফেনী", "খাগড়াছড়ি", "লক্ষ্মীপুর", "নোয়াখালী", "রাঙ্গামাটি",
  "খুলনা", "বাগেরহাট", "চুয়াডাঙ্গা", "যশোর", "ঝিনাইদহ", "কুষ্টিয়া", "মাগুরা", "মেহেরপুর", "নড়াইল", "সাতক্ষীরা",
  "রাজশাহী", "বগুড়া", "জয়পুরহাট", "নওগাঁ", "নাটোর", "চাঁপাইনবাবগঞ্জ", "পাবনা", "সিরাজগঞ্জ",
  "রংপুর", "দিনাজপুর", "গাইবান্ধা", "কুড়িগ্রাম", "লালমনিরহাট", "নীলফামারী", "পঞ্চগড়", "ঠাকুরগাঁও",
  "সিলেট", "হবিগঞ্জ", "মৌলভীবাজার", "সুনামগঞ্জ",
  "বরিশাল", "বরগুনা", "ভোলা", "ঝালকাঠি", "পটুয়াখালী", "পিরোজপুর", 
  "ময়মনসিংহ", "জামালপুর", "নেত্রকোণা", "শেরপুর"
];

const OfficerProfileForm = () => {
    const [errors, setErrors] = useState({ name: '', designation: '', district: '' });
    const [formData, setFormData] = useState({ name: '', designation: '', district: '' });
  
    const validateBangla = (text) => /^[\u0980-\u09FF\s]+$/.test(text);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
      setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on input
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      let valid = true;
      let newErrors = { name: '', designation: '', district: '' };
  
      if (!formData.name || !validateBangla(formData.name)) {
        newErrors.name = 'শুধুমাত্র বাংলায় নাম লিখুন';
        valid = false;
      }
  
      if (!formData.designation || !validateBangla(formData.designation)) {
        newErrors.designation = 'শুধুমাত্র বাংলায় পদবী লিখুন';
        valid = false;
      }
  
      if (!formData.district) {
        newErrors.district = 'জেলা নির্বাচন করুন';
        valid = false;
      }
  
      setErrors(newErrors);
  
      if (valid) {
        // এখানে আপনি সাবমিট করলে যা করতে চান তা করবেন
        alert('ফর্ম সফলভাবে জমা হয়েছে!');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="max-w-md mt-9 mx-auto p-4 bg-white rounded-xl shadow-md  space-y-4">
        <h2 className="text-xl font-bold text-center text-green-700">অফিসার প্রোফাইল</h2>
  
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">নাম</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="আপনার নাম লিখুন"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>
  
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">পদবী</label>
          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="আপনার পদবী লিখুন"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
          />
          {errors.designation && <p className="text-red-600 text-sm mt-1">{errors.designation}</p>}
        </div>
  
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">জেলা</label>
          <select
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
          >
            <option value="">জেলা নির্বাচন করুন</option>
            {districts.map((district, index) => (
              <option key={index} value={district}>{district}</option>
            ))}
          </select>
          {errors.district && <p className="text-red-600 text-sm mt-1">{errors.district}</p>}
        </div>
  
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          সাবমিট করুন
        </button>
      </form>
    );
  };
export default OfficerProfileForm;
