import React from 'react';
import { useRouter } from 'next/navigation';

export const ApplicationList = ({ allApplications, currentPage, itemsPerPage }) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = allApplications.slice(startIndex, startIndex + itemsPerPage);
  const router = useRouter();

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-6 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4 text-[#008037]">আবেদনের তালিকা</h2>

      <table className="min-w-full text-sm text-left border rounded-lg">
        <thead className="bg-[#008037] text-white">
          <tr>
            <th className="px-4 py-2">অ্যাপ্লিকেশন আইডি</th>
            <th className="px-4 py-2">নাম</th>
            <th className="px-4 py-2">বিষয়</th>
            <th className="px-4 py-2">অফিসারের নাম</th>
            <th className="px-4 py-2">তারিখ ও সময়</th>
            <th className="px-4 py-2 text-center">বিবরণ</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {paginatedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.data.name}</td>
              <td className="px-4 py-2">{item.data.infoType}</td>
              <td className="px-4 py-2">{item.data.officer}</td>
              <td className="px-4 py-2">{new Date(item.data.createdAt).toLocaleString()}</td>
              <td className="px-4 py-2 text-center">
                <button
                  disabled={item?.hasGivenFeedback}
                  onClick={() => router.push(`/update?applicationId=${item?.id}`)}
                  className={item?.hasGivenFeedback ? "bg-gray-300 text-gray-600 cursor-not-allowed py-1 rounded w-full" : "bg-[#008037] text-white px-3 py-1 rounded hover:bg-[#006f2f] w-full"}
                >
                  {item?.hasGivenFeedback ? 'ফিডব্যাক সম্ভব নয়' : 'ফিডব্যাক আপডেট করুন'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
