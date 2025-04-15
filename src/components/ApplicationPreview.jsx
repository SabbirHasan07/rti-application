import html2pdf from "html2pdf.js"
import { useRouter } from "next/navigation"
import { useRef } from "react"


export default function ApplicationPreview({ data }) {
    const printRef = useRef()
    const router = useRouter()

    const handleDownload = () => {
        const element = printRef.current
        const opt = {
            margin: 0.5,
            filename: 'rti-application.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        }

        html2pdf().set(opt).from(element).save()
    }

    const handleBack = () => {
        router.back()
    }

    if (!data) return null

    return (
        <div className="bg-gray-50 p-4 rounded shadow">
            <div className="flex justify-between mt-4 mb-4">
                <button
                    onClick={handleBack}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                    ফিরে যান
                </button>
                <button
                    onClick={handleDownload}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    PDF ডাউনলোড করুন
                </button>
            </div>
            <div ref={printRef} className="space-y-2 text-[16px] leading-7 bg-white p-4 rounded border">
                <p>আবেদনকারীর নাম: {data.name}</p>
                <p>পিতার নাম: {data.father}</p>
                <p>মাতার নাম: {data.mother}</p>
                <p>বর্তমান ঠিকানা: {data.presentAddress}</p>
                <p>স্থায়ী ঠিকানা: {data.permanentAddress}</p>
                <p>তথ্য চাওয়া দপ্তর: {data.office}</p>
                <p>তথ্যের ধরন: {data.infoType}</p>
                <p>তথ্যের বিবরণ: {data.description}</p>
                <p>তথ্য গ্রহণ পদ্ধতি: {data.method}</p>
                <p>মোবাইল নম্বর: {data.phone}</p>
                <p>ই-মেইল: {data.email}</p>
            </div>


        </div>
    )
}
