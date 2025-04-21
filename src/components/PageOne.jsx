'use client'

import { useEffect, useState } from 'react'

export default function PageOne({ onNext, showButton = true }) {
  const [data, setData] = useState(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('rtiForm')
    if (stored) {
      setData(JSON.parse(stored))
    }
  }, [])

  if (!data) return <p className="text-center mt-10">লোড হচ্ছে...</p>

  const officeParts = data?.office?.split('|') || []

  return (
    <div>
      <div className="pt-11 mx-auto  p-6">
        <h1 className="text-center text-base">--রেজিষ্ট্রিকৃত ডাকযোগে প্রেরিত--</h1>

        <div className="my-9">
          <p className="font-bold text-base">বরাবর</p>
          {officeParts.map((line, index) => (
            <div key={index} className='text-base mt-2'>
              <p className={index === 0 ? 'font-bold' : ''}>{line.trim()}</p>
            </div>
          ))}

        </div>

        <div className="ml-auto text-right text-base">
          <p>তারিখ<span>: {new Date().toLocaleDateString('bn-BD')}</span></p>
          <p>সূত্র : বেলা-টাং/ আরটিআই/ ২০২৫-০২</p>
        </div>

        <div className="my-9">
          <p className="text-center text-base">বিষয় : তথ্য প্রদান প্রসঙ্গে।</p>
        </div>

        <div>
          <p className="my-6 text-base">জনাব,</p>
          <p className="text-base">
            শুভেচ্ছা ! তথ্য অধিকার আইন, ২০০৯-এর ধারা ৮(৩) অনুযায়ী নিম্ন স্বাক্ষরকারী
            <span className="font-bold"> {data?.infoType} </span>
            নিযুক্ত নির্ধারিত ফরমেটে (সংযুক্ত) তথ্য চেয়ে আবেদন জানাচ্ছে।
          </p>
        </div>

        <div className="my-6 text-base">
          <p>
            উল্লেখ্য যে, তথ্য অধিকার আইন, ২০০৯-এর ধারা ৯(২) অনুযায়ী অনুরোধকৃত তথ্যের সাথে একাধিক তথ্য প্রদানকারী ইউনিট বা কর্তৃপক্ষের সংশ্লিষ্টতা থাকলে উক্ত অনুরোধকৃত তথ্য অনধিক ৩০ (ত্রিশ) কার্য দিবসের মধ্যে প্রদানের বিধান রয়েছে।
          </p>
        </div>

        <div>
          <p className="my-6 text-base">বিনীত,</p>
          <p className="my-6 font-semibold text-base">{data?.name}</p>
        </div>

      </div>
      {showButton && (
        <div className="text-right text-base">
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
