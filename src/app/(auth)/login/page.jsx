"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { MdPhoneAndroid } from "react-icons/md"
import toast, { Toaster } from "react-hot-toast"

export default function LoginPage() {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const togglePassword = () => setShowPassword(!showPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: form.phone,
          password: form.password,
        }),
      })

      const data = await response.json()
      console.log(data)

      if (response.ok) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("userId", data.id)
        localStorage.setItem("name", data.fullName)
        localStorage.setItem("email", data.email)
        localStorage.setItem("phone", data.phone)
        localStorage.setItem("role", data.role)
        toast.success("লগইন সফল")
       
          if (data.role === "ADMIN") {
            router.push("/adminDashboard")
          } else {
            router.push("/userDashboard")
          }
        
      } else {
        toast.error(data.message || "লগইন ব্যর্থ")
      }
    } catch (error) {
      toast.error("কিছু ত্রুটি ঘটেছে")
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
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="মোবাইল নম্বর"
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008037] transition text-sm"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="পাসওয়ার্ড"
              className="w-full pl-10 pr-10 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008037] transition text-sm"
            />
            <span
              className="absolute top-3.5 right-3 text-gray-500 cursor-pointer"
              onClick={togglePassword}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
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
