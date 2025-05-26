'use client'
import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

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

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
    fontFamily: 'SolaimanLipi',
  },
  section: {
    marginBottom: 10,
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableColHeader: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    backgroundColor: '#008037',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  tableCellHeader: {
    fontSize: 10,
    color: 'white',
    padding: 4,
  },
  tableCell: {
    fontSize: 10,
    padding: 4,
  },
});


const ApplicationPdfDocument = ({ data }) => (
  <Document>
    <Page size={{ width: 841.89, height: 595.28 }} orientation="landscape" style={styles.page}>
      <Text style={{ fontSize: 16, color: '#008037', marginBottom: 10 }}>আবেদনের তালিকা</Text>
      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>নাম</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>বিষয়</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>অফিসারের নাম</Text></View>
          <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>তারিখ ও সময়</Text></View>
        </View>

        {/* Table Body */}
        {data.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.data.name}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.data.infoType}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.data.officer}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{new Date(item.data.createdAt).toLocaleString()}</Text></View>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default ApplicationPdfDocument;
