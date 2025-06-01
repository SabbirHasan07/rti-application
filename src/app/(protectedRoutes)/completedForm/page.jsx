"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PageOne from "../../../components/PageOne";
import PageTwo from "../../../components/PageTwo";
import PageThree from "../../../components/PageThree";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import RTIPdfDocument from "@/components/PDFs/RTIPdfDocument";
import { pdf } from "@react-pdf/renderer";

export default function CompletedForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const applicationId = searchParams.get('applicationId');
  const [applicationData, setApplicationData] = useState();
  const [loadingData, setLoadingData] = useState(true);


  const printForm = async () => {
    window.print();
    router.push("/userDashboard");
  };

  const handleDownload = async () => {
    if (!applicationData) {
      toast.error('কিছু সময় অপেক্ষা করুন')
      return;
    }
    try {
      setIsGenerating(true);
      const blob = await pdf(<RTIPdfDocument data={applicationData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "RTI_Application.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setIsGenerating(false);
      toast.success("PDF সফলভাবে তৈরি হয়েছে!");
      router.push("/userDashboard");
    } catch (err) {
      setIsGenerating(false);
      toast.error("PDF তৈরি ব্যর্থ হয়েছে!");
    }
  };

  useEffect(() => {
    try {
      fetch(`/api/application?applicationId=${applicationId}`).then(res => res.json()).then(data => {
        setApplicationData(data?.[0]?.data)
        setLoadingData(false)
      })
    } catch (e) {
      setLoadingData(false)
      console.error(e)
    }
  }, []);

  if (loadingData) return <p className="text-center">লোড হচ্ছে...</p>;

  if (!applicationData && !loadingData) return <p className="text-center">এখন অ্যাপ্লিকেশন ডেটা লোড করা যাচ্ছে না। দয়া করে পরে আবার চেষ্টা করুন।</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6 font-[Kalpurush]">
      <Toaster />
      <h1 className="text-2xl font-bold text-center mb-6 print:hidden">
        আপনার পূর্ণাঙ্গ আবেদন ফর্ম
      </h1>

      <div className="flex justify-center gap-4 mt-6 print:hidden">
        <button
          onClick={handleDownload}
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
      <div className="flex justify-center border-2 py-4 text-center text-2xl mt-11 ">
        <p className="text-red-500">" আবেদন ফর্মটি প্রিন্ট করে তথ্য প্রদানকারী কর্মকর্তা বরাবর ডাকযোগে প্রেরণ করুন। "</p>
      </div>
      <div ref={contentRef} className="space-y-4 font-[Kalpurush]">
        <div className="pdf-page w-[794px] space-y-4 mx-auto bg-white p-[40px] text-[16px] leading-relaxed">
          <div className=" bg-white text-base leading-relaxed">
            <PageOne data={applicationData} showButton={false} />
          </div>
        </div>
        <div className="pdf-page w-[794px] space-y-4 mx-auto bg-white p-[40px] text-[16px] leading-relaxed">
          <div className=" bg-white text-base leading-relaxed">
            <PageTwo data={applicationData} showButton={false} />
          </div>
          <div className=" bg-white text-base leading-relaxed">
            <PageThree data={applicationData} showButton={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
