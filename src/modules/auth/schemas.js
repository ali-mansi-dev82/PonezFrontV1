import * as yup from "yup";

export const sendOtpSchema = yup.object().shape({
  mobile: yup
    .string()
    .matches(/^9[0-9]{9}$/, "موبایل به درستی وارد نشده است.")
    .required("موبایل را وارد کنید."),
});

export const checkOtpSchema = yup.object().shape({
  code: yup
    .string()
    .matches(/^[0-9]{6}$/, "کد ورود به درستی وارد نشده است.")
    .required("کد ورود را وارد کنید."),
});
