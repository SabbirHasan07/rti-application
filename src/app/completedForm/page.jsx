'use client'

import { useEffect, useRef, useState } from "react"
import PageOne from "../../components/PageOne"
import PageTwo from "../../components/PageTwo"
import PageThree from "../../components/PageThree"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

export default function CompletedForm() {
  const [formData, setFormData] = useState(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const data = sessionStorage.getItem("rtiForm")
    if (data) {
      setFormData(JSON.parse(data))
    }
  }, [])

  const generatePDF = async () => {
    const input = contentRef.current
    const pages = input.querySelectorAll('.pdf-page')
    const pdf = new jsPDF('p', 'mm', 'a4')

    for (let i = 0; i < pages.length; i++) {
      const canvas = await html2canvas(pages[i], {
        scale: 3, // High resolution
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
  }

  const printForm = () => {
    window.print()
  }

  if (!formData) return <p className="text-center">লোড হচ্ছে...</p>

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6 font-serif">
      {/* স্ক্রিনে শুধুমাত্র হেডার */}
      <h1 className="text-2xl font-bold text-center mb-6 print:hidden">
        আপনার পূর্ণাঙ্গ আবেদন ফর্ম
      </h1>

      {/* ফর্ম কন্টেন্ট */}
      <div ref={contentRef} className="space-y-10">
        <div className="pdf-page bg-white p-10 text-[18px] leading-relaxed">
          <PageOne data={formData} showButton={false} />
        </div>
        <div className="pdf-page bg-white p-10 text-[18px] leading-relaxed">
          <PageTwo data={formData} showButton={false} />
        </div>
        <div className="pdf-page bg-white p-10 text-[18px] leading-relaxed">
          <PageThree data={formData} showButton={false} />
        </div>
      </div>

      {/* শুধু স্ক্রিনে দেখাবে */}
      <div className="flex justify-center gap-4 mt-6 print:hidden">
        <button
          onClick={generatePDF}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          ডাউনলোড PDF
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
