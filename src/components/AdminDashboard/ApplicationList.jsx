import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ApplicationPdfDocument from "../PDFs/ApplicationPdfDocument";
import { pdf } from "@react-pdf/renderer";

export const ApplicationList = ({
  allApplications,
  allFeedbacks,
  currentPage,
  itemsPerPage,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = allApplications.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log(paginatedData?.data?.hasAppealed);
  const handleDownload = async () => {
    try {
      setLoading(true);
      const blob = await pdf(
        <ApplicationPdfDocument data={allApplications} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "RTI_Application_table.pdf";
      a.click();
      URL.revokeObjectURL(url);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-6 overflow-x-auto">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold mb-4 text-[#008037]">
          আবেদনের তালিকা
        </h2>

        <button
          onClick={handleDownload}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          {loading ? "PDF ডাউনলোড হচ্ছে" : "PDF ডাউনলোড করুন"}
        </button>
      </div>

      <table className="min-w-full text-sm text-left border rounded-lg">
        <thead className="bg-[#008037] text-white">
          <tr>
            <th className="px-1 py-2">অ্যাপ্লিকেশন আইডি</th>
            <th className="px-4 py-2">নাম</th>
            <th className="px-4 py-2">আবেদনকারীর মোবাইল নম্বর</th>
            <th className="px-4 py-2">বিষয়</th>
            <th className="px-4 py-2">অফিসারের নাম</th>
            <th className="px-4 py-2">অফিস এবং জেলা</th>
            <th className="px-4 py-2">প্রতিক্রিয়া তথ্য</th>
            <th className="px-4 py-2">আপিল</th>
            <th className="px-4 py-2">তারিখ ও সময়</th>
            <th className="px-4 py-2 text-center">বিবরণ</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {paginatedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-1 py-2">{item?.id}</td>
              <td className="px-4 py-2">{item?.data?.name}</td>
              <td className="px-4 py-2">{item?.data?.phone}</td>
              <td className="px-4 py-2">{item?.data?.infoType}</td>
              <td className="px-4 py-2">{item?.data?.officer}</td>
              <td className="px-4 py-2">{item?.data?.officerInfo?.officeType},{item?.data?.officerInfo?.
                district}</td>
              <td className="px-4 py-2">
                {item.feedbacks && item.feedbacks.length > 0 ? (
                  item.feedbacks.map((fb, i) => (
                    <div key={i}>
                      {fb.response === "না"
                        ? "কোনো উত্তর প্রদান করেনি"
                        : fb.response === "আবেদন গৃহীত হয়নি"
                          ? "আবেদন গৃহীত হয়নি"
                          : fb.infoType}
                    </div>
                  ))
                ) : (
                  "কোনো ফিডব্যাক নেই"
                )}
              </td>
              <td className="px-4 py-2">
                {item?.data?.hasAppealed ? "হ্যাঁ" : "না"}
              </td>


              <td className="px-4 py-2">
                {new Date(item.data.createdAt).toLocaleString()}
              </td>
              <td className="px-4 py-2 text-center">
                <button
                  disabled={item?.hasGivenFeedback}
                  onClick={() =>
                    router.push(`/update?applicationId=${item?.id}`)
                  }
                  className={
                    item?.hasGivenFeedback
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed py-1 rounded w-full"
                      : "bg-[#008037] text-white px-3 py-1 rounded hover:bg-[#006f2f] w-full"
                  }
                >
                  {item?.hasGivenFeedback
                    ? "ফিডব্যাক সম্ভব নয়"
                    : "ফিডব্যাক আপডেট করুন"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
