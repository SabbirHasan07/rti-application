"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiLock } from "react-icons/fi"
import { MdPhoneAndroid } from "react-icons/md"
import toast, { Toaster } from "react-hot-toast"

export default function LoginPage() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  })
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const isAdmin =
      (form.identifier === "admin@rti.com" || form.identifier === "01700000000") &&
      form.password === "Admin@123"

    const storedUser = JSON.parse(localStorage.getItem("registeredUser"))
    const isGeneralUser =
      storedUser &&
      (storedUser.email === form.identifier || storedUser.phone === form.identifier) &&
      storedUser.password === form.password

    if (isAdmin) {
      // লোকাল স্টোরেজে admin তথ্য সংরক্ষণ
      localStorage.setItem(
        "admin",
        JSON.stringify({ name: "admin", role: "admin" })
      )
      toast.success("অ্যাডমিন হিসেবে লগইন সফল")
      setTimeout(() => {
        router.push("/adminDashboard")
      }, 1500)
    } else if (isGeneralUser) {
      toast.success("সাধারণ ইউজার হিসেবে লগইন সফল")
      setTimeout(() => {
        router.push("/apply")
      }, 1500)
    } else {
      toast.error("ভুল মোবাইল/ইমেইল অথবা পাসওয়ার্ড")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <Toaster />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-[#008037] mb-6">Log in</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <MdPhoneAndroid className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type="text"
              name="identifier"
              value={form.identifier}
              onChange={handleChange}
              placeholder="মোবাইল নম্বর বা ইমেইল"
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008037] transition text-sm"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="পাসওয়ার্ড"
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008037] transition text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#008037] hover:bg-[#006f2f] text-white font-semibold py-2.5 rounded-md transition text-sm"
          >
            লগইন করুন
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          এখনো রেজিস্টার করেননি?
          <br className="md:hidden" />
          <Link href="/registration" className="text-[#008037] font-medium hover:underline ml-1">
            রেজিস্ট্রেশন করুন
          </Link>
        </div>
      </div>
    </div>
  )
}
