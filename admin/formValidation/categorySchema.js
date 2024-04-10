import * as yup from 'yup';


export const categorySchema = yup.object().shape({
    title: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
  });