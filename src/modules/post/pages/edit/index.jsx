import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FindOptionbyCategoryIdFn } from "../../../option/query";
import { API_UPLOADED_IMAGES_URL } from "../../../../config";
import { useAuth } from "../../../../context/AuthContext";
import { CreatePostSchema } from "../../schema";
import { FindPostbySlugFn } from "../../query";
import { UpdatePostFn } from "../../mutation";
import EditPostDesktop from "./desktop";
import EditPostMobile from "./mobile";

const EditPost = ({ isMobile }) => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

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
    console.error(data);
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
    try {
      updatePostQuery.mutateAsync(
        { id: postInfoQuery?.data?.data?._id, body: formData },
        {
          onSuccess: onSuccessMutation,
          onError: onErorrMutation,
        }
      );
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
  
  const props = {
    loading: loading,
    onSubmit: handleSubmit(onSubmit),
    images: images,
    setImages: setImages,
    register: register,
    errors: errors,
    data: postInfoQuery?.data,
    optionData: optionQuery?.data,
    snackbarOpen: open,
  };

  return isMobile ? (
    <EditPostMobile {...props} />
  ) : (
    <EditPostDesktop {...props} />
  );
};

export default EditPost;
