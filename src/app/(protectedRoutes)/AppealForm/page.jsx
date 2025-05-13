import React from "react";

export default function AppealForm() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">আপীল আবেদন ফর্ম</h1>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">আপীলকারীর নাম</label>
          <input type="text" placeholder="নাম লিখুন" className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">ঠিকানা</label>
          <input type="text" placeholder="ঠিকানা লিখুন" className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">মোবাইল নম্বর</label>
          <input type="tel" placeholder="মোবাইল নম্বর লিখুন" className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">স্মারক নং</label>
          <input type="text" placeholder="স্মারক নং লিখুন" className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">তথ্য প্রদানকারী কর্মকর্তার নাম</label>
          <input type="text" placeholder="তথ্য প্রদানকারী কর্মকর্তার নাম লিখুন" className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">আপিল কর্মকর্তার নাম</label>
          <input type="text" placeholder="আপিল কর্মকর্তার নাম লিখুন" className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">উত্তরের তারিখ</label>
          <input type="date" className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-medium text-gray-700">আপীলের সংক্ষিপ্ত বিবরণ</label>
          <textarea rows="3" placeholder="আপীলের বিবরণ লিখুন" className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        

        

        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-medium text-gray-700">তথ্য প্রদানে অস্বীকৃতি জানিয়ে থাকলে তার কারণ</label>
          <textarea rows="3" placeholder="কারণ লিখুন" className="p-2 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
        </div>

        

        
        
       

        <div className="md:col-span-2">
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            জমা দিন
          </button>
        </div>
      </form>
    </div>
  );
}
