import React, { useEffect, useState } from "react";
import MainContainer from "../../../shared/components/container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FindPostbySlugFn } from "../../post/query";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreatePostSchema } from "../../post/schema";
import TextInput from "../../../shared/components/input/textInput";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import UploadImages from "../../image/components/upload_image";
import { uploadImageFn } from "../../image/mutation";
import { FindOptionbyCategoryIdFn } from "../../option/query";
import OptionComponent from "../../post/components/option";
import { API_UPLOADED_IMAGES_URL } from "../../../config";
import { UpdatePostFn } from "../../post/mutation";

const EditPost = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [errore, setErrore] = useState(undefined);
  const [images, setImages] = useState([]);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const optionQuery = useMutation({
    mutationKey: ["category_options"],
    mutationFn: FindOptionbyCategoryIdFn,
  });

  const postInfoQuery = useMutation({
    mutationKey: ["post_info"],
    mutationFn: FindPostbySlugFn,
  });

  const updatePostQuery = useMutation({
    mutationFn: UpdatePostFn,
  });

  useEffect(() => {
    setLoading(true);
    if (slug) {
      postInfoQuery.mutateAsync(slug, {
        onSuccess: (data) => {
          optionQuery.mutateAsync(data?.data?.category?._id);
          setImages(
            data?.data?.images?.map((value) => {
              return {
                name: value,
                blob: `${API_UPLOADED_IMAGES_URL}${value}`,
                uploaded: true,
                id: value,
                percent: 100,
              };
            })
          );
        },
      });
    }
  }, []);

  useEffect(() => {
    const postUserId = postInfoQuery?.data?.data?.user?._id;
    if (user?._id && postUserId) {
      setLoading(user?._id !== postUserId);
    }
  }, [user, postInfoQuery?.data]);

  const onSuccessMutation = (data) => {
    setOpen(true);
  };

  const onErorrMutation = (data) => {
    console.log(data);
  };

  const onSubmit = async (data) => {
    const postImages = await images
      .filter((value) => value.id !== "")
      .map((value) => value.id);

    const formData = {
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
    console.log(formData);
    try {
      updatePostQuery.mutateAsync(
        { id: postInfoQuery?.data?.data?._id, body: formData },
        {
          onSuccess: onSuccessMutation,
          onError: onErorrMutation,
        }
      );
    } catch (error) {
      console.log(error);
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
    <MainContainer
      className={`w-full flex justify-center gap-8 py-12  h-full min-h-[calc(100vh-65px)]`}
    >
      {errore}
      <div className="flex flex-col w-[600px] gap-0">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="text-xl text-gray-800">ثبت آگهی</div>
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
              value={postInfoQuery?.data?.data?.title}
            />
            <TextInput
              label={"قیمت آگهی"}
              placeholder="قیمت آگهی"
              register={register("amount")}
              errorMessage={errors?.amount?.message}
              type="number"
              value={postInfoQuery?.data?.data?.amount}
              prefix={"تومان"}
            />
            <TextInput
              label={"توضیحات آگهی"}
              placeholder="توضیحات آگهی"
              register={register("content")}
              errorMessage={errors?.content?.message}
              helperText={`در توضیحات آگهی به مواردی مانند شرایط اجاره، جزئیات و ویژگی‌های قابل توجه، دسترسی‌های محلی و موقعیت قرارگیری ملک اشاره کنید.`}
              multiline
              value={postInfoQuery?.data?.data?.content}
            />
            <div className="flex flex-col gap-2">
              {optionQuery?.data?.data?.length > 0 &&
                optionQuery?.data?.data?.map((value, index) => {
                  return (
                    <OptionComponent
                      register={register}
                      defaultValue={
                        postInfoQuery?.data?.data?.options?.filter(
                          (item) => item._id === value._id
                        )[0]?.value || ""
                      }
                      {...value}
                      key={index}
                    />
                  );
                })}
            </div>
            <div className="flex flex-row gap-3 justify-end pt-4">
              <Link to={`/my-panel/my-post`}>
                <Button variant="outlined">انصراف</Button>
              </Link>
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
        )}
      </div>
    </MainContainer>
  );
};

export default EditPost;
