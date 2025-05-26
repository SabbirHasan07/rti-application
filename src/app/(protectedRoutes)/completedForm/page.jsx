"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import PageOne from "../../../components/PageOne";
import PageTwo from "../../../components/PageTwo";
import PageThree from "../../../components/PageThree";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import RTIPdfDocument from "@/components/PDFs/RTIPdfDocument";
import { pdf } from "@react-pdf/renderer";

export default function CompletedForm() {
  const [formData, setFormData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const contentRef = useRef(null);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const data = sessionStorage.getItem("rtiForm");
    if (data) {
      setFormData(JSON.parse(data));
    }
  }, []);

  // Save data to database
  const saveToDatabase = async () => {
    try {
      const userId = user?.id;
      if (!userId) {
        toast.error("ব্যবহারকারীর তথ্য পাওয়া যায়নি।");
        return;
      }

      const res = await fetch("/api/application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: formData,
          userId,
        }),
      });

      if (!res.ok) throw new Error("সার্ভারে সংরক্ষণ ব্যর্থ হয়েছে।");
      toast.success("আবেদনটি সংরক্ষণ করা হয়েছে।");
    } catch (err) {
      toast.error("ডেটা সংরক্ষণে সমস্যা হয়েছে।");
      console.error(err);
    }
  };


  const printForm = async () => {
    window.print();
    await saveToDatabase();
    router.push("/userDashboard");
  };

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      const blob = await pdf(<RTIPdfDocument />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "RTI_Application.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setIsGenerating(false);
      toast.success("PDF সফলভাবে তৈরি হয়েছে!");
      await saveToDatabase();
      router.push("/userDashboard");
    } catch (err) {
      setIsGenerating(false);
      toast.error("PDF তৈরি ব্যর্থ হয়েছে!");
    }
  };

  if (!formData) return <p className="text-center">লোড হচ্ছে...</p>;

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

      <div ref={contentRef} className="space-y-4 font-[Kalpurush]">
        <div className="pdf-page w-[794px] space-y-4 mx-auto bg-white p-[40px] text-[16px] leading-relaxed">
          <div className=" bg-white text-[18px] leading-relaxed">
            <PageOne data={formData} showButton={false} />
          </div>
        </div>
        <div className="pdf-page w-[794px] space-y-4 mx-auto bg-white p-[40px] text-[16px] leading-relaxed">
          <div className=" bg-white text-[18px] leading-relaxed">
            <PageTwo data={formData} showButton={false} />
          </div>
          <div className=" bg-white text-[18px] leading-relaxed">
            <PageThree data={formData} showButton={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
