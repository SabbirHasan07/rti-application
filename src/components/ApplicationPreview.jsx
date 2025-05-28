'use client'

import { useState } from 'react'
import PageOne from './PageOne'
import PageTwo from './PageTwo'
import PageThree from './PageThree'

export default function ApplicationPreview({ data }) {
  const [step, setStep] = useState(1)

  const nextStep = () => setStep(prev => prev + 1)
  const showReview = () => setStep(4)

  return (
    <div>
      {step === 1 && <PageOne data={data} onNext={nextStep} />}
      {step === 2 && <PageTwo data={data} onNext={nextStep} />}
      {step === 3 && <PageThree data={data} onConfirm={showReview} />}
    </div>
  )
}
