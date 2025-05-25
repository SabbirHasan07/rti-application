'use client';

import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RTIPdfDocument from './RTIPdfDocument';

const DownloadPdfButton = ({ data }) => {
  return (
    <PDFDownloadLink
      document={<RTIPdfDocument data={data} />}
      fileName="RTI_Application.pdf"
      className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      {({ loading }) => (loading ? 'Preparing PDF...' : 'Download PDF')}
    </PDFDownloadLink>
  );
};

export default DownloadPdfButton;
