"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Input from "@/components/Input"
import Button from "@/components/Button"

export default function RtiFormPage() {
  const router = useRouter()

  const defaultForm = {
    name: "", father: "", mother: "",
    presentAddress: "", permanentAddress: "",
    office: "", infoType: "", description: "",
    method: "ছাপানো কপি",
    email: "user@email.com",
    phone: "01XXXXXXXXX"
  }

  const [form, setForm] = useState(defaultForm)

  // ✅ Load data from sessionStorage if exists
  useEffect(() => {
    const stored = sessionStorage.getItem("rtiForm")
    if (stored) {
      setForm(JSON.parse(stored))
    }
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    sessionStorage.setItem("rtiForm", JSON.stringify(form))
    router.push("/preview")
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">তথ্য অধিকার আবেদন ফর্ম</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="name" placeholder="আবেদনকারীর নাম" value={form.name} onChange={handleChange} />
        <Input name="father" placeholder="পিতার নাম" value={form.father} onChange={handleChange} />
        <Input name="mother" placeholder="মাতার নাম" value={form.mother} onChange={handleChange} />
        <Input name="presentAddress" placeholder="বর্তমান ঠিকানা" value={form.presentAddress} onChange={handleChange} />
        <Input name="permanentAddress" placeholder="স্থায়ী ঠিকানা" value={form.permanentAddress} onChange={handleChange} />
        <select name="office" value={form.office} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="">-- দপ্তর নির্বাচন করুন --</option>
          <option value="DC অফিস">DC অফিস</option>
          <option value="DoE অফিস">DoE অফিস</option>
        </select>
        <Input name="infoType" placeholder="তথ্যের ধরন" value={form.infoType} onChange={handleChange} />
        <textarea name="description" placeholder="আপনার তথ্যের বিস্তারিত বিবরণ" value={form.description} onChange={handleChange} className="col-span-2 w-full p-2 border rounded h-24"></textarea>
        <select name="method" value={form.method} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="ছাপানো কপি">ছাপানো কপি</option>
          <option value="ফটোকপি">ফটোকপি</option>
          <option value="লিখিত">লিখিত</option>
          <option value="ই-মেইল">ই-মেইল</option>
          <option value="ফ্যাক্স">ফ্যাক্স</option>
          <option value="CD">CD</option>
        </select>
        <Input name="email" value={form.email} onChange={() => {}} disabled />
        <Input name="phone" value={form.phone} onChange={() => {}} disabled />
        <div className="col-span-2">
          <Button type="submit">আবেদন তৈরি করুন</Button>
        </div>
      </form>
    </div>
  )
}
