import * as yup from 'yup'

const passwordRules=/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/

export const signupSchema=yup.object().shape({
    name:yup.string().required("Required!"),
    email:yup.string().email("Please enter valid email!").required("Required!"),
    password:yup.string().min(8).matches(passwordRules,{message:"Please create a stronger password!"}).required("Required!"),
    confirmPassword:yup.string().min(8).matches(passwordRules,{message:"Please create a stronger password!"}).required("Required!")
})