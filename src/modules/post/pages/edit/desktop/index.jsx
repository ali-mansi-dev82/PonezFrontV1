import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TextInput from "../../../../../shared/components/input/textInput";
import {
  Button,
  CircularProgress,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import UploadImages from "../../../../image/components/upload_image";
import { uploadImageFn } from "../../../../image/mutation";
import OptionComponent from "../../../components/option";
import BasicLayoutDesktop from "../../../../../layouts/desktop/basic_layout";
import { CategoryIconsXs } from "../../../../category/category_icons";
import { ChevronLeftIcon } from "lucide-react";

const EditPostDesktop = ({
  loading,
  onSubmit,
  images,
  setImages,
  register,
  errors,
  data,
  optionData,
  snackbarOpen,
}) => {
  const navigate = useNavigate();

  return (
    <BasicLayoutDesktop>
      <div className="flex flex-col w-[600px] gap-0">
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col gap-10">
            <TextField
              label={"دسته بندی"}
              focused
              value={data?.data?.category?.name}
              className="!text-sm"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {CategoryIconsXs[data?.data?.category?.icon]}
                  </InputAdornment>
                ),
                endAdornment: (
                  <div
                    to={"/new"}
                    className="bg-primary-default text-white text-xs flex items-center w-max py-2 px-4 gap-2 pl-2 rounded-lg"
                  >
                    <span className="w-max">تغییر دسته بندی </span>
                    <ChevronLeftIcon size={16} />
                  </div>
                ),
              }}
            />
            <UploadImages
              images={images}
              setImages={setImages}
              uploadImageFn={uploadImageFn}
            />
            <TextInput
              label={"عنوان آگهی"}
              placeholder="عنوان آگهی"
              register={register("title")}
              errorMessage={errors?.title?.message}
              value={data?.data?.title}
            />
            <TextInput
              label={"قیمت آگهی"}
              placeholder="قیمت آگهی"
              register={register("amount")}
              errorMessage={errors?.amount?.message}
              type="number"
              value={data?.data?.amount}
              prefix={"تومان"}
            />
            <TextInput
              label={"توضیحات آگهی"}
              placeholder="توضیحات آگهی"
              register={register("content")}
              errorMessage={errors?.content?.message}
              multiline
              value={data?.data?.content}
            />
            <div className="flex flex-col gap-2">
              {optionData?.data?.length > 0 &&
                optionData?.data?.map((value, index) => {
                  return (
                    <OptionComponent
                      register={register}
                      defaultValue={
                        data?.data?.options?.filter(
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
              <Button fullWidth variant="contained" type="submit">
                ارسال اگهی
              </Button>
              <Link className="w-full" to={`/my-panel/my-post`}>
                <Button fullWidth variant="outlined">
                  انصراف
                </Button>
              </Link>
            </div>
            <Snackbar
              open={snackbarOpen}
              message="آگهی شما ثبت شد"
              action={
                <div className="w-full flex justify-between">
                  <div className="w-44"></div>
                  <Button
                    onClick={navigate.bind(this, "/my-panel/my-post")}
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
    </BasicLayoutDesktop>
  );
};

export default EditPostDesktop;
