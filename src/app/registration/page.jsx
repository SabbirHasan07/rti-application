"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi"
import { MdPhoneAndroid } from "react-icons/md"
import { FaIdCard } from "react-icons/fa"

export default function RegisterPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    nid: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.name) newErrors.name = "নাম অবশ্যই দিতে হবে"
    if (!form.phone) newErrors.phone = "মোবাইল নম্বর আবশ্যক"
    if (!form.nid) newErrors.nid = "NID নম্বর আবশ্যক"
    if (!form.password) newErrors.password = "পাসওয়ার্ড আবশ্যক"
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(form.password)
    ) {
      newErrors.password =
        "পাসওয়ার্ডে ৮ অক্ষর, বড় ও ছোট হাতের নাম্বার এবং স্পেশাল ক্যারেক্টার থাকতে হবে"
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "পাসওয়ার্ড মিলে না"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const userData = {
      email: form.email,
      phone: form.phone,
      password: form.password,
      name: form.name,
    }

    localStorage.setItem("registeredUser", JSON.stringify(userData))

    toast.success("রেজিস্ট্রেশন সফল হয়েছে!", {
      position: "top-right",
      autoClose: 2000,
      onClose: () => router.push("/login"),
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-[#008037] mb-6">রেজিস্ট্রেশন করুন</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="relative">
            <FiUser className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="পুরো নাম"
              className={`w-full pl-10 pr-4 py-2.5 rounded-md border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div className="relative">
            <MdPhoneAndroid className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="মোবাইল নম্বর"
              className={`w-full pl-10 pr-4 py-2.5 rounded-md border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <FiMail className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ইমেইল (ঐচ্ছিক)"
              className="w-full pl-10 pr-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm"
            />
          </div>

          {/* NID */}
          <div className="relative">
            <FaIdCard className="absolute top-3.5 left-3 text-gray-400" size={18} />
            <input
              type="text"
              name="nid"
              value={form.nid}
              onChange={handleChange}
              placeholder="NID নম্বর"
              className={`w-full pl-10 pr-4 py-2.5 rounded-md border ${
                errors.nid ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm`}
            />
            {errors.nid && <p className="text-red-500 text-xs mt-1">{errors.nid}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="পাসওয়ার্ড"
              className={`w-full pl-10 pr-10 py-2.5 rounded-md border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm`}
            />
            <div
              className="absolute top-3.5 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FiLock className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="পাসওয়ার্ড কনফার্ম করুন"
              className={`w-full pl-10 pr-10 py-2.5 rounded-md border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm`}
            />
            <div
              className="absolute top-3.5 right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#008037] hover:bg-[#006f2f] text-white font-semibold py-2.5 rounded-md transition text-sm"
          >
            রেজিস্টার করুন
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          আগে থেকেই অ্যাকাউন্ট আছে?
          <Link href="/login" className="text-[#008037] font-medium hover:underline ml-1">
            লগইন করুন
          </Link>
        </div>
      </div>
    </div>
  )
}
