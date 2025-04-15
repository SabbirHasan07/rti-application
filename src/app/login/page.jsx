"use client"
import { useState } from "react"
import Link from "next/link"
import Input from "@/components/Input"
import Button from "@/components/Button"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [form, setForm] = useState({
    identifier: "", // phone or email
    password: "",
  })
  const router = useRouter()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login Form Data:", form)
    router.push("/apply")
    // এখান থেকে API call করে লগইন করতে পারো
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">লগইন করুন</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="identifier"
          placeholder="মোবাইল নম্বর বা ইমেইল"
          value={form.identifier}
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          placeholder="পাসওয়ার্ড"
          value={form.password}
          onChange={handleChange}
        />
        <Button type="submit">লগইন করুন</Button>
      </form>

      {/* 🔗 Register Link */}
      <p className="text-sm mt-4 text-center">
        এখনো রেজিস্টার করেননি?{" "}
        <Link href="/" className="text-blue-600 hover:underline">
          রেজিস্ট্রেশন করুন
        </Link>
      </p>
    </div>
  )
}
