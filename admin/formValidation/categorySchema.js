import {object,string} from 'yup';

export const categorySchema = object().shape({
    title: string().required('Name is required'),
    description: string().required('Description is required'),
  });