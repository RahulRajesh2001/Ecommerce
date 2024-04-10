import * as yup from 'yup';


export const otpSchema = yup.object().shape({
  otp: yup
    .string()
    .matches(/^\d{6}$/, 'OTP must be exactly 6 digits')
    .required('OTP is required'),
});
