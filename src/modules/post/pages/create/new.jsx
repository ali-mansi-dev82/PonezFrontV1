import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import OptionComponent from "../../components/option";
import UploadImages from "../../../image/components/upload_image";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CreatePostSchema } from "../../schema";
import { FindOptionbyCategorySlugFn } from "../../../option/query";
import { CreatePostFn } from "../../mutation";
import { uploadImageFn } from "../../../image/mutation";
import { Button, Snackbar } from "@mui/material";
import TextInput from "../../../../shared/components/input/textInput";

const New = ({ name, id, slug }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const optionQuery = useQuery({
    queryKey: ["category_options"],
    queryFn: FindOptionbyCategorySlugFn.bind(this, slug),
    enabled: false,
  });

  const UploadImageMutation = useMutation({
    mutationFn: CreatePostFn.bind(this),
  });

  useEffect(() => {
    if (slug) optionQuery.refetch();
  }, [slug]);

  const onSuccessMutation = (data) => {
    setOpen(true);
  };

  const onErorrMutation = (data) => {
    console.error(data);
  };

  const onSubmit = async (data) => {
    const postImages = await images
      .filter((value) => value.id !== "")
      .map((value) => value.id);

    const formData = {
      category: id,
      title: data?.title,
      content: data?.content,
      amount: data?.amount,
      images: postImages,
      province: "اصفهان",
      city: "اصفهان",
      district: "اصفهان",
      cordinate: [51.123654411, 35.123654411],
      options: {},
    };

    delete data?.title;
    delete data?.content;
    delete data?.amount;

    for (let key in data) {
      if (data[key] === "") {
        delete data[key];
      }
    }
    const options = [];
    for (let key in data) {
      const option = optionQuery?.data?.data?.filter(
        (value) => value._id === key
      )[0];
      options.push({
        _id: option._id,
        title: option.title,
        type: option.type,
        prefix: option.prefix,
        value: data[key],
      });
    }
    formData.options = options;
    try {
      UploadImageMutation.mutateAsync(formData, {
        onSuccess: onSuccessMutation,
        onError: onErorrMutation,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreatePostSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="text-xl text-gray-800">ثبت آگهی</div>
      <div className="flex flex-row justify-between items-center border border-gray-300 rounded-lg p-8">
        <p className="text-base text-gray-500 font-semibold">{name}</p>
        <Link to={"/new"}>
          <Button variant="contained">تغییر دسته بندی</Button>
        </Link>
      </div>
      <UploadImages
        images={images}
        setImages={setImages}
        uploadImageFn={uploadImageFn}
      />
      <TextInput
        label={"عنوان آگهی"}
        placeholder="عنوان آگهی"
        register={register("title")}
        helperText={`در عنوان آگهی به موارد مهمی مانند نوع ملک، متراژ و محله اشاره کنید.`}
        errorMessage={errors?.title?.message}
      />
      <TextInput
        label={"قیمت آگهی"}
        placeholder="قیمت آگهی"
        register={register("amount")}
        errorMessage={errors?.amount?.message}
        type="number"
        prefix={"تومان"}
      />
      <TextInput
        label={"توضیحات آگهی"}
        placeholder="توضیحات آگهی"
        register={register("content")}
        errorMessage={errors?.content?.message}
        helperText={`در توضیحات آگهی به مواردی مانند شرایط اجاره، جزئیات و ویژگی‌های قابل توجه، دسترسی‌های محلی و موقعیت قرارگیری ملک اشاره کنید.`}
        multiline
      />
      <div className="flex flex-col gap-2">
        {optionQuery?.data?.data?.length > 0 &&
          optionQuery?.data?.data?.map((value, index) => {
            return (
              <OptionComponent register={register} {...value} key={index} />
            );
          })}
      </div>
      <div className="flex flex-row gap-3 justify-end pt-4">
        <Button variant="outlined" onClick={() => navigate("/")}>
          انصراف
        </Button>
        <Button variant="contained" type="submit">
          ارسال اگهی
        </Button>
      </div>
      <Snackbar
        open={open}
        message="آگهی شما ثبت شد"
        action={
          <div className="w-full flex justify-between">
            <div className="w-44"></div>
            <Button
              onClick={() => navigate("/")}
              variant="text"
              size="small"
              className="!text-primary-default"
            >
              تایید
            </Button>
          </div>
        }
      />
    </form>
  );
};
export default New;
