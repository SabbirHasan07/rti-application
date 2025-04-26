"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi"
import { MdPhoneAndroid } from "react-icons/md"
import { FaIdCard } from "react-icons/fa"

const convertToBangla = (input) => {
  const englishToBanglaMap = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  }
  return input.replace(/[0-9]/g, (digit) => englishToBanglaMap[digit] || digit)
}

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
    const { name, value } = e.target

    // Allow only Bangla characters in the name field
    if (name === 'name') {
      const banglaRegex = /^[\u0980-\u09FF\s]*$/; // Matches Bangla characters and spaces
      if (!banglaRegex.test(value)) {
        return; // Do not update if the input contains non-Bangla characters
      }
    }

    // Handle phone number (11 digits)
    if (name === 'phone') {
      const phoneValue = value.replace(/[^\d]/g, '') // Remove any non-numeric characters
      if (phoneValue.length <= 11) {
        setForm({ ...form, [name]: phoneValue })
      }
    }

    // Handle NID (13 digits)
    if (name === 'nid') {
      const nidValue = value.replace(/[^\d]/g, '') // Remove any non-numeric characters
      if (nidValue.length <= 13) {
        setForm({ ...form, [name]: nidValue })
      }
    }

    // Convert phone and nid fields to Bangla
    if (name === 'phone' || name === 'nid') {
      const banglaValue = convertToBangla(value)
      setForm({ ...form, [name]: banglaValue })
    } else {
      // For name and password fields, just update the value
      setForm({ ...form, [name]: value })
    }

    setErrors({ ...errors, [name]: "" })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.name) newErrors.name = "নাম অবশ্যই দিতে হবে"
    if (!form.phone) newErrors.phone = "মোবাইল নম্বর আবশ্যক"
    else if (form.phone.length !== 11) newErrors.phone = "মোবাইল নম্বর ১১ অঙ্কের হতে হবে"
    if (!form.nid) newErrors.nid = "NID নম্বর আবশ্যক"
    else if (form.nid.length > 13) newErrors.nid = "NID নম্বর সর্বোচ্চ ১৩ অঙ্কের হতে হবে"
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

    const existingUsersRaw = localStorage.getItem("registeredUsers")
    const existingUsers = existingUsersRaw ? JSON.parse(existingUsersRaw) : []

    const userData = {
      email: form.email,
      phone: form.phone,
      password: form.password,
      name: form.name,
      role: "user"
    }

    // Check if user already exists based on email
    const userExists = existingUsers.some(user => user.email === userData.email)

    if (userExists) {
      toast.error("এই ইমেইলটি ইতোমধ্যেই রেজিস্টার করা হয়েছে!", {
        position: "top-right",
        autoClose: 3000,
      })
      return
    }

    // Add user to list and save
    const updatedUsers = [...existingUsers, userData]
    localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers))
    localStorage.setItem("loggedInUser", JSON.stringify(userData))

    toast.success("রেজিস্ট্রেশন সফল হয়েছে!", {
      position: "top-right",
      autoClose: 500,
      onClose: () => router.push("/userDashboard"), // or any route after successful login
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
              placeholder="বাংলা নাম"
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
            রেজিস্ট্রেশন করুন
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
