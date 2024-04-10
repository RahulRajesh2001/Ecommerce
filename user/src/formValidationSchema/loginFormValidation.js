import * as yup from 'yup';


const passwordRules=/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).{8,}$/

export const loginSchema=yup.object().shape({
    email:yup.string().email("Please enter valid email!").required("Required!"),
    password:yup.string().min(8).matches(passwordRules,{message:"Please create a stronger password!"}).required("Required!")
})