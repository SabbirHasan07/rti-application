import axios from 'axios';

function convertBanglaToEnglishDigits(banglaNumber) {
  const banglaDigits = '০১২৩৪৫৬৭৮৯';
  return banglaNumber.replace(/[০-৯]/g, d => banglaDigits.indexOf(d));
}


export async function sendSMS(phone, code) {
  const token = process.env.BD_SMS_API_TOKEN;
  const message = `Your verification code is ${code}`;
  const englishPhone = convertBanglaToEnglishDigits(phone);

  const params = new URLSearchParams();
  params.append('token', token);
  params.append('to', englishPhone);
  params.append('message', message);

  try {
    const { data } = await axios.post('https://api.bdbulksms.net/api.php', params);

    const success = data?.status === 'success' || typeof data === 'string';

    return {
      success,
      data,
    };
  } catch (error) {
    console.error('SMS sending failed:', error);
    return { success: false, error };
  }
}
