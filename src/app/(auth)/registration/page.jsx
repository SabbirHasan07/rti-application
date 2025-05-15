'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { FiUser, FiLock, FiMail, FiEye, FiEyeOff } from "react-icons/fi"
import { MdPhoneAndroid } from "react-icons/md"

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
    fullName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false) 

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'fullName') {
      const banglaRegex = /^[\u0980-\u09FF\s]*$/; 
      if (!banglaRegex.test(value)) {
        return; 
      }
    }

    if (name === 'phone') {
      const phoneValue = value.replace(/[^\d]/g, '') 
      if (phoneValue.length <= 11) {
        setForm({ ...form, [name]: phoneValue })
      }
    }

    if (name === 'phone') {
      const banglaValue = convertToBangla(value)
      setForm({ ...form, [name]: banglaValue })
    } else {
      setForm({ ...form, [name]: value })
    }

    setErrors({ ...errors, [name]: "" })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!form.fullName) newErrors.fullName = "নাম অবশ্যই দিতে হবে"
    if (!form.phone) newErrors.phone = "মোবাইল নম্বর আবশ্যক"
    else if (form.phone.length !== 11) newErrors.phone = "মোবাইল নম্বর ১১ অঙ্কের হতে হবে"
    
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

  const handleSubmit = async (e) => {
    e.preventDefault()
  
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
  
    const userData = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      password: form.password,
    }
  
    setLoading(true)
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
  
        // Check for duplicate account error
        if (errorData.message.includes("already exists")) {
          toast.error('এই অ্যাকাউন্টটি ইতিমধ্যে রয়েছে। দয়া করে লগ ইন করুন।', {
            position: "top-center",
            autoClose: 3000,
          })
        } else {
          toast.error('ত্রুটি ঘটেছে! দয়া করে আবার চেষ্টা করুন।', {
            position: "top-center",
            autoClose: 3000,
          })
        }
        setLoading(false)
        return
      }
  
      const result = await response.json()
     console.log(result)
      if (result.token) {
        localStorage.setItem('token', result.token)
        localStorage.setItem('userId', result.id)
        localStorage.setItem('name', result.fullName)
        localStorage.setItem('email', result.email)
        localStorage.setItem('phone', result.phone)
        localStorage.setItem('role', result.role)
        toast.success("রেজিস্ট্রেশন সফল হয়েছে!", {
          position: "top-center",
          autoClose: 500,
          onClose: () => router.push("/userDashboard"),
        })
      }
    } catch (error) {
      toast.error('এই অ্যাকাউন্টটি ইতিমধ্যে রয়েছে বা রেজিস্ট্রেশন করতে গিয়ে একটি ত্রুটি ঘটেছে ', {
        position: "top-center",
        autoClose: 3000,
      })
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4">
      <ToastContainer />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-[#008037] mb-6">রেজিস্ট্রেশন করুন</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div className="relative">
            <FiUser className="absolute top-3.5 left-3 text-gray-400" size={20} />
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="বাংলা নাম"
              className={`w-full pl-10 pr-4 py-2.5 rounded-md border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:ring-2 focus:ring-[#008037] text-sm`}
            />
            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
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
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-[#008037] text-white rounded-md hover:bg-green-700 transition duration-200"
            disabled={loading} 
          >
            {loading ? (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-4 border-t-4 border-t-white border-gray-200 rounded-full animate-spin" />
              </div>
            ) : (
              "রেজিস্টার করুন"
            )}
          </button>

          <p className="text-center text-sm text-gray-600">
            আপনার কি অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="text-[#008037]">লগ ইন করুন</Link>
          </p>
        </form>
      </div>
    </div>
  )
}