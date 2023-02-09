import * as yup from "yup";

yup.addMethod(yup.string, "isSame", function (msg) {
  return this.test("isSame", msg, function (value) {
    const password = this.parent.password;
    if (password) {
      if (value) return password === value;
      return false;
    }
    return true;
  });
});

export const userRegisterValidationSchema = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup
    .string()
    .min(4, "Weak Password")
    .required("Password is required"),
  confirmPassword: yup.string().isSame("Password doesn't match"),
});
