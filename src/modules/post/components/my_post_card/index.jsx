import {
  ImageOffIcon,
  PenLineIcon,
  StarOffIcon,
  Share2Icon,
  TrashIcon,
  StarIcon,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Alert, Button } from "@mui/material";
import { RWebShare } from "react-web-share";
import React, { memo } from "react";

import { tomanCurrencyFormat } from "../../../../shared/util/numberFormat";
import { dateFormate } from "../../../../shared/util/dateFormat";
import { API_UPLOADED_IMAGES_URL } from "../../../../config";
import useToggle from "../../../../hooks/useToggle";
import SpecialModal from "./special_modal";
import DeleteModal from "./delete_modal";

function MyPostCard({
  onDelete,
  _id,
  title,
  images,
  district,
  slug,
  amount,
  createdAt,
  isDelete = false,
  special,
}) {
  const navigate = useNavigate();
  const navigateEditHandle = (e) => {
    e.preventDefault();
    navigate(`/my-panel/my-post/edit/${slug}`);
  };
  const [deleteModelOpen, toggleDeleteModelOpen] = useToggle(false);
  const [promoteModelOpen, togglePromoteModelOpen] = useToggle(false);

  const handleEdit = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };
  return (
    <>
      <Link
        to={`/v/${slug}`}
        className="relative flex flex-col gap-6 p-4 border border-gray-200 rounded-2xl  cursor-pointer h-max"
      >
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col justify-between w-max h-[130px] max-w-[50%]">
            <h1 className="text-gray-700 text-sm font-semibold w-full leading-7 line-clamp-1">
              {title}
            </h1>
            <div className="flex flex-col gap-1">
              <div className="text-gray-400 text-xs py-1">
                {amount && amount > 0 ? tomanCurrencyFormat(amount) : "توافقی"}
              </div>
              <span className="text-gray-400 text-xs Fanum">
                {dateFormate(createdAt)} در {district}
              </span>
            </div>
          </div>
          <div className="relative w-[130px] h-[130px] pb-2/3 rounded-md">
            {images[0] ? (
              <img
                className="absolute w-[130px] h-full inset-0 object-cover object-top rounded-xl"
                src={`${API_UPLOADED_IMAGES_URL}${images[0]}`}
                alt={title}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 rounded-md flex justify-center items-center text-gray-400">
                <ImageOffIcon size={32} />
              </div>
            )}
            {special && (
              <div className="absolute top-2 left-2 bg-white bg-opacity-80 p-[6px] rounded-lg text-yellow-500">
                <StarIcon className="stroke-[1.5px] fill-current" size={18} />
              </div>
            )}
          </div>
        </div>
        {isDelete ? (
          <Alert icon={<></>} severity="error">
            آگهی حذف شده است
          </Alert>
        ) : (
          <div className="flex flex-col gap-3" onClick={handleEdit} F>
            <div className="w-full flex flex-row lg:flex-row gap-3">
              <RWebShare
                data={{
                  url: `/v/${slug}`,
                  title: `${title}`,
                }}
              >
                <Button
                  variant="outlined"
                  size="small"
                  className="!w-full"
                  startIcon={<Share2Icon className="!stroke-[1px]" size={16} />}
                >
                  اشتراک
                </Button>
              </RWebShare>
              <Button
                onClick={navigateEditHandle}
                variant="outlined"
                size="small"
                className="!w-full"
                startIcon={<PenLineIcon className="!stroke-[1px]" size={16} />}
              >
                ویرایش
              </Button>
              <Button
                onClick={toggleDeleteModelOpen}
                variant="outlined"
                size="small"
                className="!w-full"
                startIcon={<TrashIcon className="!stroke-[1px]" size={16} />}
              >
                حذف
              </Button>
            </div>
            <div className="w-full flex flex-row lg:flex-row gap-3">
              <Button
                onClick={togglePromoteModelOpen}
                variant="outlined"
                size="small"
                className="!w-full"
                startIcon={
                  special ? (
                    <StarOffIcon
                      className="!stroke-[1px] text-yellow-600"
                      size={18}
                    />
                  ) : (
                    <StarIcon
                      className="!stroke-[1px] text-yellow-600"
                      size={18}
                    />
                  )
                }
                type="link"
                href={`/my-panel/my-post/edit/${slug}`}
              >
                {special ? `غیر ویژه کردن آگهی` : `ویژه کردن آگهی`}
              </Button>
            </div>
          </div>
        )}
      </Link>
      <DeleteModal
        _id={_id}
        onDelete={onDelete}
        open={deleteModelOpen}
        setOpen={toggleDeleteModelOpen}
      />
      <SpecialModal
        _id={_id}
        onDelete={onDelete}
        open={promoteModelOpen}
        setOpen={togglePromoteModelOpen}
        special={special}
      />
    </>
  );
}

export default memo(MyPostCard);
