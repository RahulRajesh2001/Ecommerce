import * as yup from 'yup'


export const offerSchema = yup.object().shape({
    offerName: yup.string().required('Offer is required'),
    description: yup.string().required('Description is required'),
    discountValue: yup.number().required('Discount Value is required'),
    validFrom: yup.date().required('Valid From is required'),
    validUntil: yup.date().required('Valid Until is required'),
  });