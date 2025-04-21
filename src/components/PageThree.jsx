'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function PageThree( { showButton = true }) {
  const [formData, setFormData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedData = sessionStorage.getItem('rtiForm')
    if (storedData) {
      setFormData(JSON.parse(storedData))
    }
  }, [])

  if (!formData) return null

  const officeLines = formData.office?.split('|').map(line => line.trim()) || []
  const handleContinue = () => {
    router.push('/completedForm')
  }

  return (
    <div>
      <div className="mb-4 text-sm space-y-2 p-6">
        <div className="flex">
          <span className="w-84 text-base">৫। প্রযোজ্য ক্ষেত্রে সহায়তাকারীর নাম ও ঠিকানা</span>
          <span className='text-base'>: প্রযোজ্য নয়।</span>
        </div>

        <div className="flex">
          <span className="w-84 text-base">৬। তথ্য প্রদানকারী কর্তৃপক্ষের নাম ও ঠিকানা</span>
          <span>: জনাব</span>
        </div>
        {officeLines.map((line, index) => (
          <div className="flex" key={index}>
            <span className="w-84"></span>
            <span>: {line}</span>
          </div>
        ))}

        <div className="flex justify-between pt-4">
          <div className="flex">
            <span className="w-84 text-base">৭। আবেদনের তারিখ</span>
            <span className='text-base'>: {new Date().toLocaleDateString('bn-BD')}</span>
          </div>
          <span className='text-base'>আবেদনকারীর স্বাক্ষর</span>
        </div>

        <p className="pt-4 text-base">
          * তথ্য অধিকার (তথ্য প্রাপ্তি সংক্রান্ত ) বিধিমালা, ২০০৯ এর ৮ ধারা অনুযায়ী তথ্যের মূল্য পরিশোধ যোগ্য।
        </p>
      </div>

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
