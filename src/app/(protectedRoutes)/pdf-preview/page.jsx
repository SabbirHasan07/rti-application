// app/pdf-preview/page.jsx or components/PdfPreview.jsx
'use client';

import React from 'react';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import RTIPdfDocument from '@/components/PDFs/RTIPdfDocument';
import AppealPdfDocument from '@/components/PDFs/AppealPdfDocument';
import ApplicationPdfDocument from '@/components/PDFs/ApplicationPdfDocument';


const PdfPreview = () => {

    const handleDownload = async () => {
        const blob = await pdf(<RTIPdfDocument data={mockData} />).toBlob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'RTI_Application.pdf';
        a.click();
        URL.revokeObjectURL(url);
    };

    const mockData = [
        {
            id: 'A001',
            data: {
                name: 'গৌতম চন্দ্র চন্দ',
                infoType: 'জমির খতিয়ান সম্পর্কিত তথ্য',
                officer: 'জনাব শাহনূর রহমান',
                createdAt: '2025-05-01T10:30:00',
                hasGivenFeedback: false,
            },
        },
        {
            id: 'A002',
            data: {
                name: 'শারমিন আক্তার',
                infoType: 'সরকারি অনুদান সংক্রান্ত তথ্য',
                officer: 'জনাবা ফারহানা ইয়াসমিন',
                createdAt: '2025-05-02T14:20:00',
                hasGivenFeedback: true,
            },
        },
        {
            id: 'A003',
            data: {
                name: 'মোঃ রফিকুল ইসলাম',
                infoType: 'পৌরসভার ঠিকাদারি তথ্য',
                officer: 'জনাব জহুরুল হক',
                createdAt: '2025-05-03T09:15:00',
                hasGivenFeedback: false,
            },
        },
        {
            id: 'A004',
            data: {
                name: 'লিপি রানী দে',
                infoType: 'বিদ্যালয়ের শিক্ষক নিয়োগ তথ্য',
                officer: 'জনাবা সানজিদা রহমান',
                createdAt: '2025-05-04T11:45:00',
                hasGivenFeedback: false,
            },
        },
        {
            id: 'A005',
            data: {
                name: 'মোঃ হাবিবুর রহমান',
                infoType: 'ইটভাটার লাইসেন্স সংক্রান্ত তথ্য',
                officer: 'জনাব আসিফ হোসেন',
                createdAt: '2025-05-05T13:00:00',
                hasGivenFeedback: true,
            },
        },
    ];


    return (
        <div className="flex flex-col items-start gap-6 p-6">
            <div className="w-full lg:w-1/3 flex flex-col items-start">
                <button
                    onClick={handleDownload}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    ডাউনলোড করুন
                </button>
            </div>
            <div className="w-full h-[80vh] border rounded shadow">
                <PDFViewer width="100%" height="100%">
                    <AppealPdfDocument data={{ appealData:{}, feedbackData:{} }}/>
                </PDFViewer>
            </div>
        </div>
    );
};

export default PdfPreview;
