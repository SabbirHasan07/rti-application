'use client'
import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

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

const RTIPdfDocument = ({ data }) => {

    // console.log(data?.infoType)

    return <Document>
        <Page size="A4" style={styles.page}>
            <Text style={{
                marginBottom: 20,
                textAlign: 'center',
            }}>-রেজিষ্ট্রিকৃত ডাকযোগে প্রেরিত- </Text>
            <View style={{ display: 'flex', flexDirection: 'column', }}>
                <Text style={{ fontWeight: 'bold' }}>বরাবর </Text>
                <Text style={{ fontWeight: 'bold' }}>{data?.officerInfo?.name}  </Text>
                <Text style={{ maxWidth: 200 }}>{data?.officerInfo?.designation}  </Text>
                <Text style={{ maxWidth: 200 }}>{data?.officerInfo?.addres}  </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', lineHeight: 0.8, alignItems: 'flex-end', marginBottom: 20 }}>
                <Text style={{ lineHeight: 0.8 }}>তারিখ: {new Date().toLocaleDateString('bn-BD')} </Text>
            </View>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>বিষয়: তথ্য প্রদান প্রসঙ্গে।</Text>
            <View style={{ marginBottom: 30 }}>
                <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>জনাব,</Text>
                <Text style={{ marginBottom: 20 }}>
                    শুভেচ্ছা ! তথ্য অধিকার আইন, ২০০৯-এর ধারা ৮(৩) অনুযায়ী নিম্ন স্বাক্ষরকারী <Text style={{ fontWeight: 'bold' }}>{data?.infoType}</Text> নির্ধারিত ফরমেটে (সংযুক্ত) তথ্য চেয়ে আবেদন জানাচ্ছে।।
                </Text>
                <Text style={{}}>
                    {'উল্লেখ্য যে, তথ্য অধিকার আইন, ২০০৯-এর ধারা ৯(২) অনুযায়ী অনুরোধকৃত তথ্যের সাথে একাধিক তথ্য প্রদানকারী ইউনিট বা কর্তৃপক্ষের সংশ্লিষ্টতা থাকলে উক্ত অনুরোধকৃত তথ্য অনধিক ৩০ (ত্রিশ) কার্যদিবসের মধ্যে প্রদানের বিধান রয়েছে। '.split(' ').map((item, index) => <Text key={index}>{item}{' '}</Text>)}  
                </Text>
            </View>
            <Text style={{ marginBottom: 30 }}>বিনীত </Text>
            <Text style={{ fontWeight: 'bold' }}>{data?.name}</Text>
        </Page>
        <Page size="A4" style={styles.page}>
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 50 }}>
                <Text style={{ lineHeight: 0.9 }}>ফরম‘ক’ </Text>
                <Text style={{ lineHeight: 0.9 }}>তথ্য প্রপ্তির আবেদন পত্র </Text>
                <Text style={{ lineHeight: 0.9 }}>[তথ্য অধিকার (তথ্য প্রাপ্তি সংক্রান্ত) বিধিমালার বিধি ৩ দ্রষ্টব্য] </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'column', marginBottom: 15, gap: 5 }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>১। আবেদনকারীর নাম </Text>
                    <Text style={{ width: '50%' }}>: {data?.name} </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>পিতার নাম </Text>
                    <Text style={{ width: '50%' }}>: {data?.father} </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>মাতার নাম </Text>
                    <Text style={{ width: '50%' }}>: {data?.mother} </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>বর্তমান ঠিকানা </Text>
                    <Text style={{ width: '50%' }}>: {data?.presentAddress}   </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>স্থায়ী ঠিকানা </Text>
                    <Text style={{ width: '50%' }}>: {data?.permanentAddress}  </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}>ফ্যাক্স,ই-মেইল,টেলিফোন ও মোবাইল ফোন নম্বর   </Text>
                    <Text style={{ width: '50%' }}>: {data?.email || ' '} </Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={{ width: '50%' }}></Text>
                    <Text style={{ width: '50%' }}>মোবাইল: {data?.phone} </Text>
                </View>
            </View>
            <Text style={{ marginBottom: 10 }}>২। কি ধরনের তথ্য </Text>
            <View style={{ display: 'flex', flexDirection: 'column', marginLeft: 10, marginRight: 20, marginBottom: 15, gap: 5 }}>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text>১. </Text>
                    <Text style={{}}>
                        {`${data?.description}`.split(' ').map((item, index) => <Text key={index}>{item}{' '}</Text>)}
                    </Text>
                </View>
            </View>
            <Text style={{ marginBottom: 15 }}>৩। কোন পদ্ধতিতে তথ্য পাইতে আগ্রহী (ছাপানো/ফটোকপি): {data?.method?.join('/')}  </Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ width: '60%' }}>৪। তথ্য গ্রহনকারীর নাম ও ঠিকানা </Text>
                <Text style={{ width: '40%' }}>: {data?.name} </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
                <Text style={{ width: '60%' }}></Text>
                <Text style={{ width: '40%' }}> {data?.presentAddress}  </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 15 }}>
                <Text style={{ width: '60%' }}>৫। প্রযোজ্য ক্ষেত্রে সহায়তাকারীর নাম ও ঠিকানা </Text>
                <Text style={{ width: '40%' }}>: প্রযোজ্য নয়। </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ width: '60%' }}>৬। তথ্য প্রদানকারী কর্তৃপক্ষের নাম ও ঠিকানা </Text>
                <Text style={{ width: '40%' }}>: {data?.officerInfo?.name} </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', }}>
                <Text style={{ width: '61%' }}></Text>
                <Text style={{ width: '39%' }}>{data?.officerInfo?.designation}  </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: 70 }}>
                <Text style={{ width: '61%' }}></Text>
                <Text style={{ width: '39%' }}>{data?.officerInfo?.addres}  </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ width: '60%' }}>৭। আবেদনের তারিখ: <Text>{new Date().toLocaleDateString('bn-BD')}</Text> </Text>
                <Text>আবেদনকারীর স্বাক্ষর </Text>
            </View>
            <Text style={{ marginTop: 50, textAlign: 'center' }}>* তথ্য অধিকার (তথ্য প্রাপ্তি সংক্রান্ত ) বিধিমালা, ২০০৯ এর ৮ ধারা অনুযায়ী তথ্যের মূল্য পরিশোধ যোগ্য। </Text>
        </Page>
    </Document>
};

export default RTIPdfDocument;
