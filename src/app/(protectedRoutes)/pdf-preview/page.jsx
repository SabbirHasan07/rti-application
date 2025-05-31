// app/pdf-preview/page.jsx or components/PdfPreview.jsx
'use client';

import React, { useEffect, useState } from 'react';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import RTIPdfDocument from '@/components/PDFs/RTIPdfDocument';
import AppealPdfDocument from '@/components/PDFs/AppealPdfDocument';
import ApplicationPdfDocument from '@/components/PDFs/ApplicationPdfDocument';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';


const PdfPreview = () => {
    const searchParams = useSearchParams();
    const appealId = searchParams.get('appealId');
    const applicationId = searchParams.get('applicationId');
    const [appealData, setAppealData] = useState(null);
    const [feedbackData, setFeedbackData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const handleDownload = async () => {
        const blob = await pdf(<AppealPdfDocument data={{appealData,feedbackData}}/>).toBlob();
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

    // useEffect(() => {
    //     try {
    //         fetch(`/api/application?applicationId=${applicationId}`).then(res => res.json()).then(data => {
    //             setApplicationData(data?.[0]?.data)
    //             setLoadingData(false)
    //         })
    //     } catch (e) {
    //         setLoadingData(false)
    //         console.error(e)
    //     }
    // }, []);

    useEffect(() => {
        const userId = user?.id;

        if (userId) {
            const fetchAppeal = fetch(`/api/appeal?appealId=${appealId}`).then(res => res.json());
            const fetchFeedback = fetch(`/api/feedback?applicationId=${applicationId}`).then(res => res.json());

            Promise.all([fetchAppeal, fetchFeedback])
                .then(([appeal, feedback]) => {
                    setAppealData(appeal?.appeals[0]);
                    setFeedbackData(feedback?.feedbacks[0]);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setLoading(false);
                });
        } else {
            console.warn('User ID not found');
            setLoading(false);
        }
    }, []);

    if (loading) return <p className="text-center">লোড হচ্ছে...</p>;

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
                    {/* <RTIPdfDocument data={applicationData} /> */}
                    <AppealPdfDocument data={{appealData,feedbackData}}/>
                </PDFViewer>
            </div>
        </div>
    );
};

export default PdfPreview;
