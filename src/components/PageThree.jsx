'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageThree({ showButton = true }) {
  const [formData, setFormData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedData = sessionStorage.getItem('rtiForm')
    if (storedData) {
      setFormData(JSON.parse(storedData))
    }
  }, [])

  if (!formData) return null


  const handleContinue = () => {
    router.push('/completedForm')
  }

  return (
    <div>
  <div className="mb-4 text-sm space-y-4 p-6">
    {/* ৫ */}
    <div className="grid grid-cols-2 gap-4 items-start">
      <span className="text-base">৫। প্রযোজ্য ক্ষেত্রে সহায়তাকারীর নাম ও ঠিকানা</span>
      <span className="text-base">: প্রযোজ্য নয়।</span>
    </div>

    {/* ৬ */}
    <div className="grid grid-cols-2 gap-4 items-start">
      <span className="text-base">৬। তথ্য প্রদানকারী কর্তৃপক্ষের নাম ও ঠিকানা</span>
      <div>
        <span className="text-base">: জনাব</span>
        <p className="font-bold mt-2 text-base ml-2">{formData?.officerInfo?.name}</p>
        <p className='text-base ml-2'> {formData?.officerInfo?.designation}, {formData?.officerInfo?.district}</p>
      </div>
    </div>

    {/* ৭ */}
    <div className="grid grid-cols-2 gap-4 items-start pt-4">
      <span className="text-base">৭। আবেদনের তারিখ</span>
      <div className="flex justify-between w-full">
        <span className="text-base">: {new Date().toLocaleDateString('bn-BD')}</span>
        <span className="text-base mt-32">আবেদনকারীর স্বাক্ষর</span>
      </div>
    </div>

    {/* Note */}
    <p className="pt-4 text-base col-span-2">
      * তথ্য অধিকার (তথ্য প্রাপ্তি সংক্রান্ত ) বিধিমালা, ২০০৯ এর ৮ ধারা অনুযায়ী তথ্যের মূল্য পরিশোধ যোগ্য।
    </p>
  </div>

  {/* Button */}
  {showButton && (
    <div className="flex justify-center">
      <button
        onClick={handleContinue}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        সেভ অ্যান্ড কন্টিনিউ
      </button>
    </div>
  )}
</div>

  )
}
