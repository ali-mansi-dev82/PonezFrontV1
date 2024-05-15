import { ImageOffIcon, ImagesIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { tomanCurrencyFormat } from "../../../shared/util/numberFormat";
import { truncateString } from "../../../shared/util/string";
import { API_UPLOADED_IMAGES_URL } from "../../../config";
import { dateFormate } from "../../../shared/util/dateFormat";

function PostCard({ title, images, district, slug, amount, updatedAt }) {
  return (
    <Link
      to={`/v/${slug}`}
      className="flex p-4 border border-gray-200 justify-between rounded-md gap-2 cursor-pointer min-w-[310px]"
    >
      <div className="flex flex-col justify-between w-max h-full max-w-[50%]">
        <h1 className="text-gray-700 text-sm h-[70px] font-semibold w-full leading-7">
          {truncateString(title, 40)}
        </h1>
        <div className="flex flex-col">
          <div className="text-gray-400 text-xs py-1">
            {amount && amount > 0 ? tomanCurrencyFormat(amount) : "توافقی"}
          </div>
          <span className="text-gray-400 text-xs ">
            <span className="Fanum">{dateFormate(updatedAt)}</span> در{" "}
            {district}
          </span>
        </div>
      </div>
      <div className="relative w-[130px] h-[130px] pb-2/3  rounded-md">
        {images[0] ? (
          <>
            <img
              className="absolute w-[130px] h-full inset-0 object-cover object-top rounded-md"
              src={`${API_UPLOADED_IMAGES_URL}${images[0]}`}
              srcSet={`${API_UPLOADED_IMAGES_URL}${images[0]}`}
              alt={title}
              loading="lazy"
            />
            <span className="absolute top-1 left-1 text-white bg-gray-600 text-xs px-2 p-1 inline-flex items-center flex-row-reverse gap-1 rounded-md bg-opacity-75">
              <ImagesIcon size={12} />
              <span className="text-xs Fanum">{images.length}</span>
            </span>
          </>
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-md flex justify-center items-center text-gray-400">
            <ImageOffIcon size={32} />
          </div>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
