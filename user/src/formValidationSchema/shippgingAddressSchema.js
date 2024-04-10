import * as yup from 'yup';


export const shippingAddressSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  pincode: yup
    .string()
    .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits')
    .required('Pincode is required'),
  phone1: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  phone2: yup
    .string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .notRequired()
    .nullable(),
  street: yup.string().required('Street is required'),
  landmark: yup.string().required('Landmark is required'),
})
