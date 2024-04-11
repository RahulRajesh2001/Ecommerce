import {object,string,date,number} from 'yup';

export const offerSchema = object().shape({
    offerName: string().required('Offer is required'),
    description: string().required('Description is required'),
    discountValue: number().required('Discount Value is required'),
    validFrom: date().required('Valid From is required'),
    validUntil: date().required('Valid Until is required'),
  });