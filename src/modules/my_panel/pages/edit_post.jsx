import React, { useEffect, useState } from "react";
import MainContainer from "../../../shared/components/container";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FindPostbySlugFn } from "../../post/query";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreatePostSchema } from "../../post/schema";
import TextInput from "../../../shared/components/input/textInput";
import { Alert, Button, Chip, InputAdornment } from "@mui/material";
import Spinner from "../../../shared/components/spiner";
import UploadImages from "../../image/components/upload_image";
import { uploadImageFn } from "../../image/mutation";

const EditPost = () => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  // const [errore, setErrore] = useState(undefined);
  const [images, setImages] = useState([]);
  const { user } = useAuth();
  //     const [open, setOpen] = useState(false);
  //   const navigate = useNavigate();
  //   const [images, setImages] = useState([]);
  //   // const [coord, setCoord] = useState([51.41, 35.72]);

  const postInfoQuery = useMutation({
    mutationKey: ["post_info"],
    mutationFn: FindPostbySlugFn,
  });

  useEffect(() => {
    setLoading(true);
    if (slug) {
      postInfoQuery.mutateAsync(slug, {
        onSuccess: (data) => {
          //   setLoading(false);
          console.log(data?.data?.images);
        },
      });
    }
  }, []);

  useEffect(() => {
    const postUserId = postInfoQuery?.data?.data?.user?._id;
    if (user?._id && postUserId && user?._id === postUserId)
      return setLoading(false);
    // setErrore("شما دسترسی تغییر این اگهی را ندارید");
  }, [user, postInfoQuery?.data]);

  //   const optionQuery = useQuery({
  //     queryKey: ["category_options"],
  //     queryFn: FindOptionbyCategorySlugFn.bind(this, slug),
  //     enabled: false,
  //   });

  //   const UploadImageMutation = useMutation({
  //     mutationFn: CreatePostFn.bind(this),
  //   });

  //   useEffect(() => {
  //     if (slug) optionQuery.refetch();
  //   }, [slug]);

  //   const onSuccessMutation = (data) => {
  //     setOpen(true);
  //   };

  //   const onErorrMutation = (data) => {
  //     console.log(data);
  //   };

  const onSubmit = async (data) => {
    //   const postImages = await images
    //     .filter((value) => value.id !== "")
    //     .map((value) => value.id);

    const formData = {
      // category: id,
      title: data?.title,
      content: data?.content,
      amount: data?.amount,
      // images: postImages,
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
    formData.options = data;
    try {
      // UploadImageMutation.mutateAsync(formData, {
      //   onSuccess: onSuccessMutation,
      //   onError: onErorrMutation,
      // });
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
      <div className="flex flex-col w-[600px] gap-0">
        {/* {errore && (
          <Alert icon={<></>} severity="error">
            {errore}
          </Alert>
        )} */}

        {loading ? (
          <Spinner />
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
            {/* <div className="flex flex-col gap-2">
          {optionQuery?.data?.data?.length > 0 &&
            optionQuery?.data?.data?.map((value, index) => {
              return (
                <OptionComponent register={register} {...value} key={index} />
              );
            })}
        </div> */}
            <div className="flex flex-row gap-3 justify-end pt-4">
              <Link to={`/my-panel/my-post`}>
                <Button variant="outlined">انصراف</Button>
              </Link>
              <Button variant="contained" type="submit">
                ارسال اگهی
              </Button>
            </div>
            {/* <Snackbar
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
        /> */}
          </form>
        )}
      </div>
    </MainContainer>
  );
};

export default EditPost;
