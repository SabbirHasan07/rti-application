"use client"
import { useState } from "react"
import Link from "next/link"
import Input from "@/components/Input"
import Button from "@/components/Button"

export default function Home() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    nid: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Register Form Data:", form)
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">রেজিস্ট্রেশন করুন</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="পুরো নাম" value={form.name} onChange={handleChange} />
        <Input name="phone" placeholder="মোবাইল নম্বর" value={form.phone} onChange={handleChange} />
        <Input name="nid" placeholder="NID নম্বর" value={form.nid} onChange={handleChange} />
        <Input name="password" type="password" placeholder="পাসওয়ার্ড" value={form.password} onChange={handleChange} />
        <Input name="confirmPassword" type="password" placeholder="পাসওয়ার্ড কনফার্ম করুন" value={form.confirmPassword} onChange={handleChange} />
        <Button type="submit">রেজিস্টার করুন</Button>
      </form>

      {/* 🔗 Login Link */}
      <p className="text-sm mt-4 text-center">
        আগে থেকেই অ্যাকাউন্ট আছে?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          লগইন করুন
        </Link>
      </p>
    </div>
  )
}
