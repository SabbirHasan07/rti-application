'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FiMail, FiPhone, FiUser, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import useApi from '../../../hooks/officeApi';
import { useAuth } from '@/context/AuthContext';

const FORM_INITIAL_STATE = {
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
}

export default function RtiForm() {
  const router = useRouter();
  const { user } = useAuth();
  const { offices, loading: officeLoading, error, fetchOffices } = useApi();
  const [allDivisions, setAllDivisions] = useState([]);
  const [allDistricts, setAllDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
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
  const [sameAsPresent, setSameAsPresent] = useState(false);

  // manual office info input
  const [customOfficeName, setCustomOfficeName] = useState('');
  const [customOfficer, setCustomOfficer] = useState('');
  const [customAddress, setCustomAddress] = useState('');
  const [customDesignation, setCustomDesignation] = useState('');
  const [customDistrict, setCustomDistrict] = useState('');
  const [customDivision, setCustomDivision] = useState('');

  const methodOptions = ['ফটোকপি', 'লিখিত', 'ই-মেইল', 'ফ্যাক্স'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === 'presentAddress' && sameAsPresent) {
        updated.permanentAddress = value;
      }
      return updated;
    });

    if (name === 'office') {
      if (value === '') {
        setAllDivisions([]);
        setForm((prev) => ({ ...prev, officer: '' }));
        setAllDistricts([]);
        setOfficers([]);
        setSelectedDivision('');
        setSelectedDistrict('');
        return;
      }
      const divisions = offices
        .filter(o => o.officeType === value)
        .map(o => o.division)
        .filter((v, i, a) => a.indexOf(v) === i)
      setAllDivisions(divisions);
      setAllDistricts([]);
      setOfficers([]);
      setSelectedDivision('');
      setSelectedDistrict('');
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
          addres: selectedOfficer.addres,
          division: selectedOfficer.division,
          officeType: selectedOfficer.officeType,
        }
        : null;

      const customOfficerInfo = {
        name: customOfficer,
        designation: customDesignation,
        district: customDistrict,
        addres: customAddress,
        division: customDivision,
        officeType: customOfficeName,
      }

      if (form.office !== 'অন্যান্য') {
        if (!officerInfo) {
          alert('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।');
          sessionStorage.removeItem('rtiForm')
          setForm(FORM_INITIAL_STATE)
          setAllDivisions([])
          setAllDistricts([])
          setSelectedDivision('')
          setSelectedDistrict('')
          setOfficers([])
          return;
        }
      }

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

      const finalApp = form.office === 'অন্যান্য' ? { ...newApp, officerInfo: customOfficerInfo, office: customOfficeName, officer: customOfficer } : newApp


      // console.log({ finalApp })
      sessionStorage.setItem('rtiForm', JSON.stringify(finalApp));

      router.push('/preview');
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('আবেদন জমা দিতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।');
      sessionStorage.removeItem('rtiForm')
      setForm(FORM_INITIAL_STATE)
      setAllDivisions([])
      setAllDistricts([])
      setSelectedDivision('')
      setSelectedDistrict('')
      setOfficers([])

    } finally {
      setSubmitting(false);
    }
  };

  const handleDivisionChange = (e) => {
    const division = e.target.value
    setSelectedDivision(division)
    const districts = offices
      .filter(o => o.division === division)
      .map(o => o.district)
      .filter((v, i, a) => a.indexOf(v) === i)
    setAllDistricts(districts);
    setSelectedDistrict('');
  }

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district)
    const officers = offices.filter(
      o => o.division === selectedDivision && o.district === district
    )
    setOfficers(officers);
    setForm((prev) => ({ ...prev, officer: '' }));
  }

  useEffect(() => {
    const saved = sessionStorage.getItem('rtiForm');
    const name = user?.fullName || '';
    const email = user?.email || '';
    const phone = user?.phone || '';

    if (saved) {
      const parsed = JSON.parse(saved);
      setForm((prev) => ({ ...prev, ...parsed }));

      if (parsed?.office?.length > 0) {
        const divisions = offices
          .filter(o => o.officeType === parsed?.office)
          .map(o => o.division)
          .filter((v, i, a) => a.indexOf(v) === i)
        const districts = offices
          .filter(o => o.division === parsed?.officerInfo?.division)
          .map(o => o.district)
          .filter((v, i, a) => a.indexOf(v) === i)
        const officers = offices.filter(
          o => o.division === selectedDivision && o.district === parsed?.officerInfo?.district
        )
        setAllDivisions(divisions);
        setAllDistricts(districts);
        setOfficers(officers)
        setSelectedDivision(parsed?.officerInfo?.division)
        setSelectedDistrict(parsed?.officerInfo?.district)
      }
    } else {
      setForm((prev) => ({ ...prev, name, email, phone }));
    }

  }, [user, offices]);

  useEffect(() => {
    fetchOffices();
  }, [fetchOffices]);

  const uniqueOffices = useMemo(() => {
    if (offices?.length > 0) {
      const res = [...new Set(offices.map(item => item?.officeType))]
      return res
    }
    return;
  }, [offices])

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
            <FiPhone className="mr-2" />
            <input name="phone" value={form.phone} readOnly className="flex-1 focus:outline-none" placeholder="মোবাইল নম্বর" />
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMapPin className="mr-2" />
            <input name="presentAddress" value={form.presentAddress} onChange={handleChange} className="flex-1 focus:outline-none" placeholder="বর্তমান ঠিকানা - ( গ্রাম/এলাকা,থানা,জেলা )" required />
          </div>
          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMail className="mr-2" />
            <input name="email" value={form.email} readOnly className="flex-1 focus:outline-none" placeholder="ই-মেইল" />
          </div>
          <div className="md:col-span-2 flex items-center text-green-700">
            <input
              type="checkbox"
              id="sameAsPresent"
              checked={sameAsPresent}
              onChange={(e) => {
                const checked = e.target.checked;
                setSameAsPresent(checked);
                if (checked) {
                  setForm((prev) => ({ ...prev, permanentAddress: prev.presentAddress }));
                }
              }}
              className="mr-2"
            />
            <label htmlFor="sameAsPresent">স্থায়ী ঠিকানা ও বর্তমান ঠিকানা একই</label>
          </div>

          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMapPin className="mr-2" />
            <input name="permanentAddress" value={form.permanentAddress} onChange={handleChange}
              readOnly={sameAsPresent}
              className="flex-1 focus:outline-none" placeholder="স্থায়ী ঠিকানা - ( গ্রাম/এলাকা,থানা,জেলা )" required />
          </div>
          <div className="flex items-center border p-2 rounded text-green-700">
            <FiMail className="mr-2" />
            <input name="infoType" value={form.infoType} onChange={handleChange} className="flex-1 focus:outline-none" placeholder="কি বিষয়ক তথ্য চান" />
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
              {
                uniqueOffices?.map((item, index) => <option key={index} value={item}>{item}</option>)
              }
              <option value="অন্যান্য">অন্যান্য</option>
            </select>
          </div>

          <>
            {form.office !== 'অন্যান্য' ? <>
              {/*বিভাগ নির্বাচন  */}
              {
                allDivisions?.length > 0 && <div className="md:col-span-2">
                  <label className="text-green-700">বিভাগ নির্বাচন করুন:</label>
                  <select
                    value={selectedDivision}
                    onChange={handleDivisionChange}
                    className="w-full p-2 border rounded text-green-700"
                  >
                    <option value="">-- বিভাগ নির্বাচন করুন --</option>
                    {
                      allDivisions?.map((item, index) => <option key={index} value={item}>{item}</option>)
                    }
                  </select>
                </div>
              }

              {/*জেলা নির্বাচন  */}
              {
                allDistricts?.length > 0 && <div className="md:col-span-2">
                  <label className="text-green-700">জেলা নির্বাচন করুন:</label>
                  <select
                    value={selectedDistrict}
                    onChange={handleDistrictChange}
                    className="w-full p-2 border rounded text-green-700"
                  >
                    <option value="">-- জেলা নির্বাচন করুন --</option>
                    {
                      allDistricts?.map((item, index) => <option key={index} value={item}>{item}</option>)
                    }
                  </select>
                </div>
              }

              {form.office && officers?.length > 0 && (
                <div className="md:col-span-2">
                  <label className="text-green-700">অফিসার নির্বাচন করুন:</label>
                  <select name="officer" value={form.officer} onChange={handleChange} className="w-full p-2 border rounded text-green-700">
                    <option value="">-- একজন নির্বাচন করুন --</option>
                    {officers
                      .filter((officer) => officer.officeType === form.office)
                      .map((officer) => (
                        <option key={officer.id} value={officer.name}>
                          {officer.name} ({officer.designation},{officer.addres} , {officer.district})
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </> : <>
              <div className="">
                <label className="text-green-700 block">অফিসারের নাম: </label>
                <div className="flex items-center border p-2 rounded text-green-700">
                  <input value={customOfficer} onChange={(e) => setCustomOfficer(e.target.value)} className="flex-1 focus:outline-none" placeholder="অফিসারের নাম" />
                </div>
              </div>
              <div className="">
                <label className="text-green-700 block">অফিসারের পদবী: </label>
                <div className="flex items-center border p-2 rounded text-green-700">
                  <input value={customDesignation} onChange={(e) => setCustomDesignation(e.target.value)} className="flex-1 focus:outline-none" placeholder="অফিসারের পদবী" />
                </div>
              </div>
              <div className="">
                <label className="text-green-700 block">দপ্তর: </label>
                <div className="flex items-center border p-2 rounded text-green-700">
                  <input value={customOfficeName} onChange={(e) => setCustomOfficeName(e.target.value)} className="flex-1 focus:outline-none" placeholder="অফিসের নাম" />
                </div>
              </div>

              <div className="">
                <label className="text-green-700 block">ঠিকানা: </label>
                <div className="flex items-center border p-2 rounded text-green-700">
                  <input value={customAddress} onChange={(e) => setCustomAddress(e.target.value)} className="flex-1 focus:outline-none" placeholder="অফিসের ঠিকানা" />
                </div>
              </div>

              <div className="">
                <label className="text-green-700 block">জেলা: </label>
                <div className="flex items-center border p-2 rounded text-green-700">
                  <input value={customDistrict} onChange={(e) => setCustomDistrict(e.target.value)} className="flex-1 focus:outline-none" placeholder="জেলা" />
                </div>
              </div>
              <div className="">
                <label className="text-green-700 block">বিভাগ: </label>
                <div className="flex items-center border p-2 rounded text-green-700">
                  <input value={customDivision} onChange={(e) => setCustomDivision(e.target.value)} className="flex-1 focus:outline-none" placeholder="বিভাগ" />
                </div>
              </div>
            </>}
          </>

          <div className="md:col-span-2">
            <label className="text-green-700 mb-2 block">আপনি কোন কোন পদ্ধতিতে তথ্য পেতে চান?</label>
            <div className="flex flex-wrap gap-4">
              {methodOptions.map((method) => (
                <label key={method} className="text-green-700 flex items-center">
                  <input type="checkbox" checked={form.method.includes(method)} onChange={() => handleMethodCheckbox(method)} className="mr-1" />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-3 border rounded text-green-700" placeholder="কি কি তথ্য চান তার বিস্তারিত বিবরণ লিখুন" required />
          </div>





          <div className="md:col-span-2">
            <button type="submit" disabled={submitting} className="w-full bg-[#008037] hover:bg-green-700 text-white py-3 rounded text-lg font-semibold">
              {submitting ? 'আবেদন তৈরি করা হচ্ছে...' : 'আবেদন তৈরি করুন'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
