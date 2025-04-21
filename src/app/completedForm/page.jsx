'use client'

import { useEffect, useRef, useState } from "react"
import PageOne from "../../components/PageOne"
import PageTwo from "../../components/PageTwo"
import PageThree from "../../components/PageThree"
import toast, { Toaster } from "react-hot-toast"

export default function CompletedForm() {
  const [formData, setFormData] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    const data = sessionStorage.getItem("rtiForm")
    if (data) {
      setFormData(JSON.parse(data))
    }
  }, [])

  const generatePDF = async () => {
    setIsGenerating(true)
    const html2canvas = (await import("html2canvas")).default
    const jsPDF = (await import("jspdf")).default
    const input = contentRef.current
    const pages = input.querySelectorAll('.pdf-page')
    const pdf = new jsPDF('p', 'mm', 'a4')

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 3,
        useCORS: true
      })
      const imgData = canvas.toDataURL('image/png')
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

      if (i !== 0) pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    }

    pdf.save("RTI-Application.pdf")
    setIsGenerating(false)
    toast.success("PDF সফলভাবে তৈরি হয়েছে!")
  }

  const printForm = () => {
    window.print()
  }

  if (!formData) return <p className="text-center">লোড হচ্ছে...</p>

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6 font-serif">
      <Toaster />
      <h1 className="text-2xl font-bold text-center mb-6 print:hidden">
        আপনার পূর্ণাঙ্গ আবেদন ফর্ম
      </h1>

      <div ref={contentRef} className="space-y-10">
        <div className="pdf-page bg-white p-28 text-[18px] leading-relaxed">
          <PageOne data={formData} showButton={false} />
        </div>
        <div className="pdf-page bg-white p-28 text-[18px] leading-relaxed">
          <PageTwo data={formData} showButton={false} />
        </div>
        <div className="pdf-page bg-white p-28 text-[18px] leading-relaxed">
          <PageThree data={formData} showButton={false} />
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-6 print:hidden">
        <button
          onClick={generatePDF}
          className="relative px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-60"
          disabled={isGenerating}
        >
          {isGenerating && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {isGenerating ? "PDF তৈরি হচ্ছে..." : "ডাউনলোড PDF"}
        </button>

        <button
          onClick={printForm}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          প্রিন্ট করুন
        </button>
      </div>
    </div>
  )
}
