import * as yup from 'yup';



export const cuponSchema = yup.object().shape({
    cuponName: yup.string().required('Cupon Name is required'),
    cuponCode: yup.string().required('Cupon Code is required'),
    description: yup.string().required('Description is required'),
    discountValue: yup.number().required('Discount Value is required'),
    validFrom: yup.date().required('Valid From is required'),
    validUntil: yup.date().required('Valid Until is required'),
    usagelimit: yup.number().required('Usage Liimit is required'),

  });