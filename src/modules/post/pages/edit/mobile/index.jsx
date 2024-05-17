import React from "react";
import TextInput from "../../../../../shared/components/input/textInput";
import {
  Button,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import UploadImages from "../../../../image/components/upload_image";
import { uploadImageFn } from "../../../../image/mutation";
import OptionComponent from "../../../components/option";
import SingleLayoutMobile from "../../../../../layouts/mobile/single_layout";
import { CategoryIconsXs } from "../../../../category/category_icons";
import { CheckCircle, ChevronLeftIcon } from "lucide-react";
import { Link } from "react-router-dom";

const EditPostMobile = ({
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
  return (
    <form onSubmit={onSubmit}>
      <SingleLayoutMobile
        buttonNavigation={
          <>
            <Button className="!w-full" variant="contained" type="submit">
              ارسال اگهی
            </Button>
            <Button
              className="!w-full z-40"
              href={`/my-panel/my-post`}
              variant="outlined"
            >
              انصراف
            </Button>
          </>
        }
        title="ویرایش آگهی"
      >
        <div className="flex flex-col w-[600px] gap-0">
          {loading ? (
            <div className="w-full h-full flex justify-center items-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="flex flex-col gap-10">
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

              {snackbarOpen && (
                <div className="fixed flex flex-col gap-4 bottom-4 left-4 right-4 z-50 border lg:max-w-[200px] border-green-400 bg-white p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle size={16} />
                    <span className="text-sm">آگهی شما با موفقیت ثبت شد.</span>
                  </div>
                  <Link
                    to={"/"}
                    className="bg-green-700 text-white px-4 py-2 w-max text-sm rounded-lg"
                  >
                    تایید
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </SingleLayoutMobile>
    </form>
  );
};

export default EditPostMobile;
