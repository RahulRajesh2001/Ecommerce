import * as yup from 'yup'


export const editProfileSchema=yup.object().shape({
    email:yup.string().email("Please enter valid email!").required("Required!"),
    name:yup.string().required("Required!"),
})