import {object,string} from 'yup';

export const productSchema = object().shape({
    title: string().required('Name is required'),
    description: string().required('Description is required'),
    brand: string().required('Brand is required'),
  });