'use client'
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { getSection } from '@/utils/getCorrespondingSection';

Font.register({
    family: 'SolaimanLipi',
    fonts: [
        {
            src: '/fonts/SolaimanLipi-Normal.ttf',
            fontWeight: 'normal',
        },
        {
            src: '/fonts/SolaimanLipi-Bold.ttf',
            fontWeight: 'bold',
        },
        {
            src: '/fonts/SolaimanLipi-Thin.ttf',
            fontWeight: 'thin',
        },
    ],
});

// Define styles

Font.registerHyphenationCallback(word => [word]);
const styles = StyleSheet.create({
    page: {
        padding: 72,
        fontSize: 13,
        fontFamily: 'SolaimanLipi',
    },
    section: {
        marginBottom: 10,
    },
    title: {
        marginBottom: 10,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

const AppealPdfDocument = ({ data }) => {
    const { appealData, feedbackData } = data;
    const formatBanglaDateFromISO = (isoDate) => {
        if (!isoDate) return '';

        const months = [
            'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
            'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর',
        ];

        const date = new Date(isoDate);
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear().toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);

        const dayBangla = day.toString().replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);

        return `${dayBangla} ${month}, ${year}`;
    };

    const getResponseOrInfoType = () => {
    if (feedbackData?.response === 'না') {
      return 'উত্তর দেওয়া হয়নি';
    }
    if (feedbackData?.response === 'আবেদন গৃহীত হয়নি') {
      return feedbackData?.response;
    }
    return feedbackData?.infoType
  }
    return <Document>
        <Page size="A4" style={styles.page}>
            <Text style={{
                marginBottom: 20,
                textAlign: 'center',
            }}>-রেজিষ্ট্রিকৃত ডাকযোগে প্রেরিত- </Text>
            <View style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, }}>
                <Text style={{ lineHeight: 0.8, }}>বরাবর, </Text>
            </View>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    lineHeight:1,
                }}
            >
                {appealData?.appealOfficer?.split(',')?.map((item, index) => (
                    <Text
                        key={index}
                        style={{
                            lineHeight: 1,
                            fontWeight: index === 0 ? 'bold' : 'normal',
                            maxWidth: 200,
                        }}
                    >
                        {item.trim()} {index === 0 ? ' ': ', '}
                    </Text>
                ))}
                <Text style={{ maxWidth: 200 }}>{appealData?.apealOfficerAddress}</Text>

            </View>
            <View style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.8, alignItems: 'flex-end', marginBottom: 20 }}>
                <Text style={{ lineHeight: 0.8 }}>তারিখ: {new Date().toLocaleDateString('bn-BD')} </Text>
            </View>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>বিষয়ঃ তথ্য অধিকার আইন, ২০০৯-এর ধারা-২৪ অনুযায়ী আপীল। </Text>
            <View style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 15, marginBottom: 30 }}>
                <Text>জনাব,  </Text>
                <Text>শুভেচ্ছা জানবেন।  </Text>
                <Text style={{}}>
                    নিম্নেস্বাক্ষরকারী গত, <Text>{formatBanglaDateFromISO(appealData?.application?.createdAt)}</Text> তারিখে  দায়িত্ব প্রাপ্ত তথ্য কর্মকর্তা, <Text style={{fontWeight: 'bold'}}>{appealData?.informationGivenOfficer}</Text> - বরাবর তথ্য অধিকার আইন, ২০০৯-এর ধারা ৮(৩) অনুযায়ী নির্ধারিত ফরমেটে <Text>{appealData?.application?.data?.infoType}</Text> তথ্য চেয়ে আবেদন জানায় (সংযুক্ত)।
                    {/* {`নিম্নেস্বাক্ষরকারী গত, ${formatBanglaDateFromISO(appealData?.application?.createdAt)} তারিখে  দায়িত্ব প্রাপ্ত তথ্য কর্মকর্তা, ${appealData?.informationGivenOfficer} - বরাবর তথ্য অধিকার আইন, ২০০৯-এর ধারা ৮(৩) অনুযায়ী নির্ধারিত ফরমেটে ${appealData?.application?.data?.infoType} তথ্য চেয়ে আবেদন জানায় (সংযুক্ত)। |`.split(' ').map((item, index) => <Text key={index}>{item}{' '}</Text>)} */}
                </Text>
                <Text style={{}}>
                    {getSection({ response: feedbackData?.response, infoType: feedbackData?.infoType, appealData: appealData })}   
                </Text>
                <Text style={{}}>
                    এমতাবস্থায় নিম্নস্বাক্ষরকারীতথ্য অধিকার আইন, ২০০৯-এর ধারা ২৪ অনুযায়ী <Text>{appealData?.appealOfficer}</Text> - এর আপীল কর্মকর্তা হিসেবে আপনার বরাবরে নির্ধারিত ফরমেটে আপীল আবেদন প্রেরণ করছে এবং ধারা ২৪ (৩) অনুযায়ী তথ্য সরবরাহের জন্য সংশ্লিষ্ট দায়িত্বপ্রাপ্ত কর্মকর্তাকে চাহিদা মাফিক তথ্যগুলি ১৫ দিনের মধ্যে নিম্নস্বাক্ষরকারী বরাবর প্রেরণের নির্দেশ প্রদানের জন্য আপনাকে অনুরোধ জানাচ্ছে।।
                    {/* {`এমতাবস্থায় নিম্নস্বাক্ষরকারীতথ্য অধিকার আইন, ২০০৯-এর ধারা ২৪ অনুযায়ী ${appealData?.appealOfficer
                        } - এর আপীল কর্মকর্তা হিসেবে আপনার বরাবরে নির্ধারিত ফরমেটে আপীল আবেদন প্রেরণ করছে এবং ধারা ২৪ (৩) অনুযায়ী তথ্য সরবরাহের জন্য সংশ্লিষ্ট দায়িত্বপ্রাপ্ত কর্মকর্তাকে চাহিদা মাফিক তথ্যগুলি ১৫ দিনের মধ্যে নিম্নস্বাক্ষরকারী বরাবর প্রেরণের নির্দেশ প্রদানের জন্য আপনাকে অনুরোধ জানাচ্ছে।`.split(' ').map((item, index) => <Text key={index}>{item}{' '}</Text>)} */}
                </Text>
            </View>
            <Text>বিনীত </Text>
            <Text>{appealData?.applicantName}</Text>
            <Text>সংযুক্তি: বর্ণনামতে </Text>
            <Text>অনুলিপি: সদয় অবগতি ও প্রয়োজনীয় ব্যবস্থা গ্রহণের জন্য প্রেরিত হলো  </Text>
            <Text>১। {appealData?.informationGivenOfficer} </Text>
        </Page>
        <Page size="A4" style={styles.page}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 50 }}>
                <Text style={{ lineHeight: 0.9 }}>ফরম ‘গ’ - আপীল আবেদন </Text>
                <Text style={{ lineHeight: 0.9, color: 'gray', fontSize: 10 }}>[তথ্য অধিকার (তথ্য প্রাপ্তি সংক্রান্ত) বিধিমালার বিধি ৩ দ্রষ্টব্য] </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', marginBottom: 15, gap: 5 }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>১) আপীলকারীর নাম ও ঠিকানা </Text>
                    <Text style={{ width: '50%' }}>: {appealData?.applicantName}  </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>২) আপীলের তারিখ </Text>
                    <Text style={{ width: '50%' }}>: {new Date().toLocaleDateString('bn-BD')} </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৩) যে আদেশের বিরুদ্ধে আপীল করা হইয়াছে </Text>
                    <Text style={{ width: '50%' }}>: সংযুক্ত </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৪) যাহার আদেশের বিরুদ্ধে আপীল করা হইয়াছে </Text>
                    <Text style={{ width: '50%' }}>: {appealData?.informationGivenOfficer}   </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৫) আপীলের সংক্ষিপ্ত বিবরণ </Text>
                    <Text style={{ width: '50%' }}>: {appealData?.details} </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৬) আদেশের বিরুদ্ধে সংক্ষুব্ধ হইবার কারণ </Text>
                    <Text style={{ width: '50%' }}>: প্রযোজ্য নয় </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৭) প্রার্থিত প্রতিকারের যুক্তি </Text>
                    <Text style={{ width: '50%' }}>: {getResponseOrInfoType()} </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৮) আপীলকারী কর্তৃক প্রত্যয়ন </Text>
                    <Text style={{ width: '50%' }}>: এই মর্মে প্রত্যয়ন করা যাচ্ছে যে, উপরে বর্ণিত সমস্ত তথ্য সত্য ও বিদ্বেষ প্রসূত নয় </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৯) অন্য কোন তথ্য </Text>
                    <Text style={{ width: '50%' }}>: প্রযোজ্য নয় </Text>
                </View>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginTop: 70 }}>
                <Text style={{}}>------------------------ </Text>
                <Text style={{}}>আবেদনকারীর স্বাক্ষর </Text>
                <Text style={{}}>তারিখ: {new Date().toLocaleDateString('bn-BD')} </Text>
            </View>
        </Page>
    </Document>
};

export default AppealPdfDocument;
