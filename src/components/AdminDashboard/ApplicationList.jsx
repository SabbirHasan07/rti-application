import React from 'react';

export const ApplicationList = ({ allApplications, setSelected, currentPage, itemsPerPage }) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = allApplications.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="bg-white shadow-md rounded-2xl p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-[#008037]">আবেদনকারীর তালিকা</h2>
            <div className="space-y-3 max-h-[350px] overflow-y-auto">
                {paginatedData.map((item, index) => (
                    <div key={index} className="border p-3 rounded-lg flex justify-between">
                        <div>
                            <p><strong>অ্যাপ্লিকেশন আইডি: </strong> {item.application_id}</p>
                            <p><strong>নাম:</strong> {item.name}</p>
                            <p><strong>তারিখ ও সময়: </strong> {new Date(item.createdAt).toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => setSelected(item)}
                            className="mt-2 bg-[#008037] text-white px-3 py-1 rounded hover:bg-[#006f2f] w-48 text-center h-11"
                        >
                            আবেদনকারীর বিবরণ
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
