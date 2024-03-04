import * as yup from 'yup'


export const productSchema = yup.object().shape({
    title: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    brand: yup.string().required('Brand is required'),
  });