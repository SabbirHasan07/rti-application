"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { faUser, faAddressCard, faPhone, faEnvelope, faInfoCircle, faHome } from "@fortawesome/free-solid-svg-icons"

export default function RtiFormPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "", father: "", mother: "",
    presentAddress: "", permanentAddress: "",
    office: "", infoType: "", description: "",
    method: "ছাপানো কপি",
    email: "", phone: ""
  })

  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("rtiForm")
    const localUser = localStorage.getItem("loggedInUser")

    let defaultData = {
      name: "", email: "", phone: ""
    }

    if (localUser) {
      const parsedUser = JSON.parse(localUser)
      setUser(parsedUser)
      defaultData = {
        name: parsedUser?.name || "",
        email: parsedUser?.email || "",
        phone: parsedUser?.phone || ""
      }
    }

    if (stored) {
      const parsedStored = JSON.parse(stored)
      setForm({ ...defaultData, ...parsedStored })
    } else {
      setForm(prev => ({ ...prev, ...defaultData }))
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const loggedInUserRaw = localStorage.getItem("loggedInUser");
    const loggedInUser = loggedInUserRaw ? JSON.parse(loggedInUserRaw) : null;

    if (!loggedInUser) {
      toast.error("লগইন করতে হবে আবেদন জমা দেওয়ার জন্য");
      router.push("/login");
      return;
    }

    const allApplicationsRaw = localStorage.getItem('applications');
    const allApplicationsData = allApplicationsRaw ? JSON.parse(allApplicationsRaw) : [];

    const formWithUser = {
      ...form,
      application_id: allApplicationsData.length + 1,
      createdBy: loggedInUser.email,
      createdAt: new Date().toISOString(), // Optional: timestamp
      appealed: false,
      feedback: 'পরীক্ষাধীন',
      timeTaken: '২৮ দিন',
      status: 'পেন্ডিং',
    };

    // Save to sessionStorage for preview
    sessionStorage.setItem("rtiForm", JSON.stringify(formWithUser));

    // Save to applications array in localStorage
    const existingAppsRaw = localStorage.getItem("applications");
    const existingApps = existingAppsRaw ? JSON.parse(existingAppsRaw) : [];

    const updatedApps = [...existingApps, formWithUser];
    localStorage.setItem("applications", JSON.stringify(updatedApps));

    router.push("/preview");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg border border-gray-200">
      <h1 className="text-md mb-9 font-semibold text-center mb-6 ">তথ্য অধিকার আবেদন ফর্ম</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm ">
        <Input name="name" placeholder="আবেদনকারীর নাম" value={form.name} onChange={() => { }} icon={faUser} disabled />
        <Input name="father" placeholder="পিতার নাম" value={form.father} onChange={handleChange} icon={faAddressCard} />
        <Input name="mother" placeholder="মাতার নাম" value={form.mother} onChange={handleChange} icon={faAddressCard} />
        <Input name="presentAddress" placeholder="বর্তমান ঠিকানা" value={form.presentAddress} onChange={handleChange} icon={faHome} />
        <Input name="permanentAddress" placeholder="স্থায়ী ঠিকানা" value={form.permanentAddress} onChange={handleChange} icon={faHome} />
        <Input name="infoType" placeholder="কি ধরেনর তথ্য চান" value={form.infoType} onChange={handleChange} icon={faInfoCircle} />

        <div className="col-span-2">
          <select
            name="office"
            value={form.office}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">-- দপ্তর নির্বাচন করুন --</option>
            <option value="শাহনূর রহমান | দায়িত্ব প্রাপ্ত তথ্য প্রদানকারী কর্মকর্তা | জেলা প্রশাসকের কার্যালয়, নেত্রকোণা">জনাব শাহনূর রহমান | জেলা প্রশাসকের কার্যালয়, নেত্রকোণা</option>
            <option value="শরীফা হক | দায়িত্ব প্রাপ্ত তথ্য প্রদানকারী কর্মকর্তা | জেলা প্রশাসকের কার্যালয়, টাঙ্গাইল">শরীফা হক | জেলা প্রশাসকের কার্যালয়, টাঙ্গাইল</option>
          </select>
        </div>

        <div className="col-span-2">
          <select
            name="method"
            value={form.method}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="যে পদ্ধতিতে তথ্য পাইেত আগ্রহী">-- যে পদ্ধতিতে তথ্য পাইেত আগ্রহী --</option>
            <option value="ফটোকপি">ফটোকপি</option>
            <option value="লিখিত">লিখিত</option>
            <option value="ই-মেইল">ই-মেইল</option>
            <option value="ফ্যাক্স">ফ্যাক্স</option>
          </select>
        </div>

        <div className="col-span-2">
          <textarea
            name="description"
            placeholder="আপনার তথ্যের বিস্তারিত বিবরণ"
            value={form.description}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none text-sm"
          ></textarea>
        </div>

        <Input name="email" value={form.email} onChange={() => { }} disabled icon={faEnvelope} />
        <Input name="phone" value={form.phone} onChange={() => { }} disabled icon={faPhone} />

        <div className="col-span-2 text-center">
          <Button type="submit" className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 text-sm">
            আবেদন তৈরি করুন
          </Button>
        </div>
      </form>
    </div>
  )
}
