'use client'
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { getSection } from '@/utils/getCorrespondingSection';

Font.register({
    family: 'kalpurush',
    src: '/fonts/kalpurush.ttf',
    //   fonts: [
    //     {
    //       src: '/fonts/kalpurush ANSI.ttf',
    //       fontWeight: 'normal',
    //     },
    //     // {
    //     //   src: '/fonts/Anek Bangla SemiBold.ttf',
    //     //   fontWeight: 'semibold',
    //     // },
    //   ],
});

// Define styles

Font.registerHyphenationCallback(word => [word]);
const styles = StyleSheet.create({
    page: {
        padding: 50,
        fontSize: 12,
        fontFamily: 'kalpurush',
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

const AppealPdfDocument = ({data}) => {
    // const [data, setData] = useState();
    // useEffect(() => {
    //     const stored = sessionStorage.getItem('rtiForm')
    //     if (stored) {
    //         setData(JSON.parse(stored))
    //     }
    // }, [])

    // console.log(data)
    return <Document>
        <Page size="A4" style={styles.page}>
            <Text style={{
                marginBottom: 20,
                textAlign: 'center',
                fontWeight: 'semibold',
            }}>-রেজিষ্ট্রিকৃত ডাকযোগে প্রেরিত- </Text>
            <View style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.8, }}>
                <Text style={{ lineHeight: 0.8, fontWeight: 700 }}>বরাবর </Text>
                <Text style={{ lineHeight: 0.8 }}>সাব্বির হাসান </Text>
                <Text style={{ lineHeight: 0.8 }}>চেয়ারম্যান </Text>
                <Text style={{ lineHeight: 0.8, maxWidth: 200 }}>বাংলাদেশ কেমিক্যাল ইন্ডাস্ট্রিজ কর্পোরেশন (বিসিআইসি),টাঙ্গাইল-১৯০০</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.8, alignItems: 'flex-end', marginBottom: 20 }}>
                <Text style={{ lineHeight: 0.8, backgroundColor: 'yellow' }}>তারিখ: {new Date().toLocaleDateString('bn-BD')} </Text>
            </View>
            <Text style={{ textAlign: 'center' }}>বিষয়ঃ তথ্য অধিকার আইন, ২০০৯-এর ধারা-২৪ অনুযায়ী আপীল। </Text>
            <View style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: 10, marginBottom: 30 }}>
                <Text>জনাব,</Text>
                <Text>শুভেচ্ছা জানবেন।</Text>
                <Text style={{}}>
                    {`নিম্নেস্বাক্ষরকারী গত, {formatBanglaDateFromISO(appealData?.application?.createdAt)} তারিখে বাংলাদেশ কেমিক্যাল ইন্ডাস্ট্রিজ কর্পোরেশন (বিসিআইসি) দায়িত্ব প্রাপ্ত তথ্য কর্মকর্তা, আল মামুন, উপপরিচালক, মানিকগজ - বরাবর তথ্য অধিকার আইন, ২০০৯-এর ধারা ৮(৩) অনুযায়ী নির্ধারিত ফরমেটে নেকোণা জেলার ইটভাটা বিষয়ে তথ্য চেয়ে আবেদন জানায় (সংযুক্ত)।`.split(' ').map((item, index) => <Text key={index}>{item}{' '}</Text>)}
                </Text>
                <Text style={{}}>
                    {`${getSection({ response: '', infoType: 'তথ্য প্রদান না করা' })}`.split(' ').map((item, index) => <Text key={index}>{item}{' '}</Text>)}
                </Text>
                <Text style={{}}>
                    {`এমতাবস্থায় নিম্নস্বাক্ষরকারীতথ্য অধিকার আইন, ২০০৯-এর ধারা ২৪ অনুযায়ী সাব্বির হাসান,চেয়ারম্যান,বাংলাদেশ কেমিক্যাল ইন্ডাস্ট্রিজ কর্পোরেশন (বিসিআইসি),টাঙ্গাইল-১৯০০ - এর আপীল কর্মকর্তা হিসেবে আপনার বরাবরে নির্ধারিত ফরমেটে আপীল আবেদন প্রেরণ করছে এবং ধারা ২৪ (৩) অনুযায়ী তথ্য সরবরাহের জন্য সংশ্লিষ্ট দায়িত্বপ্রাপ্ত কর্মকর্তাকে চাহিদা মাফিক তথ্যগুলি ১৫ দিনের মধ্যে নিম্নস্বাক্ষরকারী বরাবর প্রেরণের নির্দেশ প্রদানের জন্য আপনাকে অনুরোধ জানাচ্ছে।`.split(' ').map((item, index) => <Text key={index}>{item}{' '}</Text>)}
                </Text>
            </View>
            <Text>বিনীত </Text>
            <Text>সাব্বির হাসান </Text>
            <Text>সংযুক্তি: বর্ণনামতে </Text>
            <Text>অনুলিপি: সদয় অবগতি ও প্রয়োজনীয় ব্যবস্থা গ্রহণের জন্য প্রেরিত হলো </Text>
            <Text>১। মুহাদ আব্দুল্লাহ আল মামুন, উপপরিচালক, মানিকগজ </Text>
        </Page>
        <Page size="A4" style={styles.page}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 50 }}>
                <Text style={{ lineHeight: 0.9 }}>ফরম ‘গ’ - আপীল আবেদন </Text>
                <Text style={{ lineHeight: 0.9, color:'gray', fontSize: 10 }}>[তথ্য অধিকার (তথ্য প্রাপ্তি সংক্রান্ত) বিধিমালার বিধি ৩ দ্রষ্টব্য] </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', marginBottom: 15, gap: 5 }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>১) আপীলকারীর নাম ও ঠিকানা </Text>
                    <Text style={{ width: '50%' }}>: সাব্বির হাসান </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>২) আপীলের তারিখ </Text>
                    <Text style={{ width: '50%' }}>: সাব্বির হাসান </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৩) যে আদেশের বিরুদ্ধে আপীল করা হইয়াছে </Text>
                    <Text style={{ width: '50%' }}>: সাব্বির হাসান </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৪) যাহার আদেশের বিরুদ্ধে আপীল করা হইয়াছে </Text>
                    <Text style={{ width: '50%' }}>: প্রযোজ্য নয়   </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৫) আপীলের সংক্ষিপ্ত বিবরণ </Text>
                    <Text style={{ width: '50%' }}>: সাব্বির হাসান </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৬) আদেশের বিরুদ্ধে সংক্ষুব্ধ হইবার কারণ </Text>
                    <Text style={{ width: '50%' }}>: প্রযোজ্য নয় </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>৭) প্রার্থিত প্রতিকারের যুক্তি </Text>
                    <Text style={{ width: '50%' }}>: সাব্বির হাসান </Text>
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
                <Text style={{ }}>----------------- </Text>
                <Text style={{ }}>আবেদনকারীর স্বাক্ষর </Text>
                <Text style={{ }}>তারিখ: {new Date().toLocaleDateString('bn-BD')} </Text>
            </View>
        </Page>
    </Document>
};

export default AppealPdfDocument;
