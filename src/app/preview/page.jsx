"use client"
import { useEffect, useState } from "react"
import ApplicationPreview from "@/components/ApplicationPreview"

export default function PreviewPage() {
  const [formData, setFormData] = useState(null)

  useEffect(() => {
    const stored = sessionStorage.getItem("rtiForm")
    if (stored) {
      setFormData(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-xl font-bold mb-4">আবেদনের প্রিভিউ</h1>
      {formData ? (
        <ApplicationPreview data={formData} />
      ) : (
        <p>তথ্য পাওয়া যায়নি। অনুগ্রহ করে ফর্ম পূরণ করুন।</p>
      )}
    </div>
  )
}
