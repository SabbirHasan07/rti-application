"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import { MdPhoneAndroid } from "react-icons/md"
import toast, { Toaster } from "react-hot-toast"
import { useAuth } from "@/context/AuthContext"

// English to Bangla digit converter
const engToBanglaDigits = (input) => {
  const engDigits = "0123456789"
  const banglaDigits = "০১২৩৪৫৬৭৮৯"
  return input
    .split("")
    .map((ch) => {
      const index = engDigits.indexOf(ch)
      return index !== -1 ? banglaDigits[index] : ch
    })
    .join("")
}

export default function LoginPage() {
  const [form, setForm] = useState({
    phone: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "phone") {
      let converted = engToBanglaDigits(value)
      converted = converted.replace(/[^০-৯]/g, "")
      if (converted.length > 11) {
        converted = converted.slice(0, 11)
      }
      setForm({ ...form, phone: converted })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const togglePassword = () => setShowPassword(!showPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

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
      setLoading(false)

      if (response.ok) {
        await login(data.token)
      } else {
        toast.error(data.message || "লগইন ব্যর্থ")
      }
    } catch (error) {
      setLoading(false)
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
              inputMode="numeric"
              pattern="[০-৯]{11}"
              maxLength={11}
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
            className="w-full bg-[#008037] hover:bg-[#006f2f] text-white font-semibold py-2.5 rounded-md transition text-sm flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-4 border-t-4 border-t-white border-gray-200 rounded-full animate-spin" />
              </div>
            )}
            {loading ? "প্রসেসিং..." : "লগইন করুন"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          এখনো রেজিস্টার করেননি?
          <br className="md:hidden" />
          <Link href="/registration" className="text-[#008037] font-medium hover:underline ml-1">
            রেজিস্ট্রেশন করুন
          </Link>
        </div>
        <div className="mt-2 text-center text-sm">
          পাসওয়ার্ড ভুলে গেছেন?
          <br className="md:hidden" />
          <Link href="/forget-password" className="text-[#008037] font-medium hover:underline ml-1">
            পরিবর্তন করুন
          </Link>
        </div>
      </div>
    </div>
  )
}
