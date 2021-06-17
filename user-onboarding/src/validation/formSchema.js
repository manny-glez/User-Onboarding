import * as yup from "yup"

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name Must be longer than 2 chars"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is to short must be 8 chars minimum"),
  agree: yup
  .boolean()
  .oneOf([true], "You Must agree to terms of service"),
})

export default formSchema