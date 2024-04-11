import {object,string,number,date} from 'yup';

export const cuponSchema =object().shape({
    cuponName:string().required('Cupon Name is required'),
    cuponCode:string().required('Cupon Code is required'),
    description:string().required('Description is required'),
    discountValue:number().required('Discount Value is required'),
    validFrom:date().required('Valid From is required'),
    validUntil:date().required('Valid Until is required'),
    usagelimit:number().required('Usage Liimit is required'),

  });