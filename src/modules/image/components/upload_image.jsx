import React from "react";
import { ImageUpIcon } from "lucide-react";
import Image from "./preview_image";
import { useMutation } from "@tanstack/react-query";
import { makeBlob } from "../../../shared/util/blob";
import { uploadImageFn } from "../mutation";

const UploadImages = ({ images, setImages, uploadImageFn: noname }) => {
  const UploadImageMutation = useMutation({
    mutationFn: uploadImageFn.bind(this),
  });
  async function handleChange(e) {
    const inputFiles = e.target.files;
    if (inputFiles.length > 0) {
      Array.from(inputFiles).forEach(async (file) => {
        const blob = await makeBlob(file);
        setImages([
          ...images,
          {
            name: file.name,
            blob,
            uploaded: false,
            id: "",
            percent: 0,
          },
        ]);
        const formData = new FormData();
        formData.append("image", file);
        const onUploadProgressFn = (e) => {
          setImages([
            ...images.filter((item) => item.name !== file.name),
            {
              name: file.name,
              blob,
              uploaded: false,
              id: "",
              percent: e,
            },
          ]);
        };
        try {
          UploadImageMutation.mutateAsync(
            { data: formData, onUploadProgressFn },
            {
              onSuccess: (data) => {
                if (data) {
                  setImages([
                    ...images.filter((item) => item.name !== file.name),
                    {
                      name: file.name,
                      blob,
                      uploaded: true,
                      id: data.data.name,
                      percent: 100,
                    },
                  ]);
                }
              },
              onError: (error) => {
                console.error(error);
              },
            }
          );
        } catch (error) {
          console.error(error);
        }
      });
    }
  }

  return (
    <section className="flex flex-col gap-4 w-full">
      <div className="label">
        <span className="label-text text-primary-70 text-xs pb-1">
          عکس آگهی
        </span>
      </div>
      <div className="flex flex-row gap-3 flex-wrap">
        <label
          className="flex w-24 h-24 cursor-pointer appearance-none justify-center rounded-md border border-dashed border-spacing-[2rem] border-gray-300 bg-white px-3 py-6 text-sm transition hover:border-gray-400 focus:border-solid focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:opacity-75"
          tabIndex="0"
        >
          <span
            htmlFor="photo-dropbox"
            className="flex items-center space-x-2 text-[#2F80C0]"
          >
            <ImageUpIcon />
          </span>
          <input
            id="photo-dropbox"
            type="file"
            multiple
            accept="image/jpeg,image/png"
            className="sr-only"
            onChange={handleChange}
          />
        </label>
        {images?.length > 0 &&
          images.map((value, index) => {
            return (
              <Image
                key={index}
                {...value}
              />
            );
          })}
      </div>

      <div className="label">
        <span className="text-gray-400 text-xs">
          تعداد عکس‌های انتخاب شده نباید بیشتر از ۲۰ باشد.
        </span>
      </div>
    </section>
  );
};
export default UploadImages;
