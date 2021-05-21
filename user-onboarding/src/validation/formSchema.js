import * as yup from 'yup'

const formSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    // .required("Must give a name")
    .min(8, "Name must be at least 8 characters"),
  email: yup
    .string()
    .email("Must be a valid email address")
    // .required("Email is required")
    .trim(),
    
  // username: yup
  //   .string()
  //   // .required("Must provide a username")
  //   .min(8, "Username must be at least 5 characters"),

  password: yup
    .string()
    // .required("Must provide a password")
    .min(8, "Password must be at least 8 characters"),
  terms: yup
    // .required()
    .boolean()
})

export default formSchema