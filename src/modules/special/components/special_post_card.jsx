import { ImageOffIcon, ImagesIcon } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

import { tomanCurrencyFormat } from "../../../shared/util/numberFormats";
import { API_UPLOADED_IMAGES_URL } from "../../../config";

const SpecialPostCard = ({ post }) => {
  return (
    <Link className="" to={`/v/${post?.slug}`}>
      <div className="relative w-full h-[230px] overflow-hidden rounded-xl">
        {post?.images[0] ? (
          <img
            className="absolute w-full h-full inset-0 object-cover object-top "
            src={`${API_UPLOADED_IMAGES_URL}${post?.images[0]}`}
            alt={post?.title}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-md flex justify-center items-center text-gray-400">
            <ImageOffIcon size={32} />
          </div>
        )}

        <div className="absolute top-0 left-0 right-0 bottom-0 px-4 py-4 bg-gradient-to-t from-gray-800 to-transparent liner flex flex-col items-start justify-end gap-2">
          <div className="">
            <div className="bg-gray-700 ">
              <span className="absolute top-2 left-2 text-white bg-gray-600 text-xs px-2 p-1 inline-flex items-center flex-row-reverse gap-1 rounded-md bg-opacity-75">
                <ImagesIcon size={12} />
                <span className="text-xs Fanum">{post?.images?.length}</span>
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="text-white text-base line-clamp-1">{post?.title}</h6>
            <div className="text-gray-300 text-xs">
              {post?.amount && post?.amount > 0
                ? tomanCurrencyFormat(post?.amount)
                : "توافقی"}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default SpecialPostCard;
