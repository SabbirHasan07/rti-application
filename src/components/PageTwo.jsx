'use client'
import { useEffect, useState } from 'react'

export default function PageTwo({ onNext, showButton = true }) {
    const [formData, setFormData] = useState(null)

    useEffect(() => {
        const storedData = sessionStorage.getItem('rtiForm')
        if (storedData) {
            setFormData(JSON.parse(storedData))
        }
    }, [])

    if (!formData) return null

    return (
        <div>
            <div className="bg-white pb-6 py-4  p-6">
                <div className="max-w-4xl mx-auto bg-white">
                    <h2 className="text-center text-base font-bold mb-2">ফরম‘ক’</h2>
                    <h3 className="text-center text-base font-semibold mb-6">
                        তথ্য প্রাপ্তির আবেদন পত্র <br />
                        <span className="text-base font-normal">
                            [তথ্য অধিকার (তথ্য প্রাপ্তি সংক্রান্ত) বিধিমালার বিধি ৩ দ্রষ্টব্য]
                        </span>
                    </h3>

                    {/* আবেদনকারীর তথ্য */}
                    <div className="mb-4 text-base space-y-2">
                        <div className="flex"><span className="w-64">১। আবেদনকারীর নাম</span><span>: {formData.name}</span></div>
                        <div className="flex"><span className="w-64">পিতার নাম</span><span>: {formData.father}</span></div>
                        <div className="flex"><span className="w-64">মাতার নাম</span><span>: {formData.mother}</span></div>
                        <div className="flex"><span className="w-64">বর্তমান ঠিকানা</span><span>: {formData.presentAddress}</span></div>
                        <div className="flex"><span className="w-64">স্থায়ী ঠিকানা</span><span>: {formData.permanentAddress}</span></div>
                        <div className="flex"><span className="w-64">ফ্যাক্স, ই-মেইল, টেলিফোন</span><span>: {formData.email}</span></div>
                        <div className="flex"><span className="w-64">মোবাইল</span><span>: {formData.phone}</span></div>
                    </div>

                    {/* তথ্যের বিবরণ */}
                    <div className="mb-4">
                        <p className="text-base">২। কি ধরনের তথ্য</p>
                        <div className="text-base mt-1 whitespace-pre-line text-justify ml-3 p-2">
                            {formData.description}
                        </div>
                    </div>

                    {/* তথ্য পাওয়ার মাধ্যম */}
                    <div className="mb-4 text-base">
                        <div className="flex"><span className="w-64">৩।  কোন পদ্ধতিতে তথ্য পাইতে আগ্রহী</span><span>: {formData?.method}</span></div>
                    </div>

                    {/* তথ্য গ্রহণকারীর ঠিকানা */}
                    <div className="mb-4 text-base space-y-2">
                        <div className="flex"><span className="w-64">৪। তথ্য গ্রহণকারীর নাম ও ঠিকানা</span><span>: {formData.name}</span></div>
                        <div className="flex"><span className="w-64"></span><span>: {formData.presentAddress}</span></div>
                    </div>
                </div>


            </div>
            {showButton && (
                <div className="text-right">
                    <button
                        onClick={onNext}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-3"
                    >
                        পরবর্তী
                    </button>
                </div>
            )}
        </div>
    )
}
