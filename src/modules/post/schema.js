import * as yup from "yup";

export const CreatePostSchema = yup.object().shape({
  title: yup.string().required("عنوان اگهی الزامی است!"),
  amount: yup.number("قیمت را درست وارد کنید."),
  content: yup.string(""),
});
