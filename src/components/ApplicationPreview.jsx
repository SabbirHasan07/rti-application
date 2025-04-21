'use client'

import { useState } from 'react'
import PageOne from './PageOne'
import PageTwo from './PageTwo'
import PageThree from './PageThree'

export default function ApplicationContainer({ sessionData }) {
  const [step, setStep] = useState(1)

  const nextStep = () => setStep(prev => prev + 1)
  const showReview = () => setStep(4)

  return (
    <div>
      {step === 1 && <PageOne data={sessionData} onNext={nextStep} />}
      {step === 2 && <PageTwo data={sessionData} onNext={nextStep} />}
      {step === 3 && <PageThree data={sessionData} onConfirm={showReview} />}
    </div>
  )
}
