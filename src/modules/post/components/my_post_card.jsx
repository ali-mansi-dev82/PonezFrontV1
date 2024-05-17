import {
  ImageOffIcon,
  Info,
  PenLineIcon,
  Share2Icon,
  TrashIcon,
} from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tomanCurrencyFormat } from "../../../shared/util/numberFormat";
import { API_UPLOADED_IMAGES_URL } from "../../../config";
import { Alert, Button, Dialog, DialogContent } from "@mui/material";
import { dateFormate } from "../../../shared/util/dateFormat";
import { useMutation } from "@tanstack/react-query";
import { DeletePostFn } from "../mutation";
import { RWebShare } from "react-web-share";

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
}) {
  const [open, setOpen] = useState(false);
  const deleteHandle = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const deleteMutation = useMutation({
    mutationFn: DeletePostFn.bind(this, _id),
  });
  const handleDelete = async () => {
    if (_id) {
      await deleteMutation.mutateAsync(_id);
      onDelete();
      handleClose();
    }
  };
  const handleEdit = (event) => {
    event.stopPropagation();
    event.preventDefault();
  };
  return (
    <>
      <Link
        to={`/v/${slug}`}
        className="flex flex-col gap-6 p-4 border border-gray-200 rounded-2xl  cursor-pointer h-max"
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
          </div>
        </div>
        {isDelete ? (
          <Alert icon={<></>} severity="error">
            آگهی حذف شده است
          </Alert>
        ) : (
          <div
            className="w-full flex flex-row lg:flex-row gap-2"
            onClick={handleEdit}
          >
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
              onClick={handleEdit}
              variant="outlined"
              size="small"
              className="!w-full"
              startIcon={<PenLineIcon className="!stroke-[1px]" size={16} />}
              type="link"
              href={`/my-panel/my-post/edit/${slug}`}
            >
              ویرایش
            </Button>
            <Button
              onClick={deleteHandle}
              variant="outlined"
              size="small"
              className="!w-full"
              startIcon={<TrashIcon className="!stroke-[1px]" size={16} />}
            >
              حذف
            </Button>
          </div>
        )}
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{ justifyContent: "center", gap: "0.5rem", padding: "1rem" }}
        >
          <div className="w-[74vw] lg:w-[300px] items-center flex flex-col gap-8">
            <div className="w-full flex flex-col items-center gap-4">
              <span className="text-gray-400">
                <Info size={36} />
              </span>

              <p className="text-base">از حذف آگهی مطمئن هستید؟</p>
            </div>
            <div className="flex flex-row gap-4">
              <Button
                onClick={handleClose}
                variant="contained"
                color="error"
                size="small"
              >
                نه، لغو
              </Button>
              <Button onClick={handleDelete} variant="outlined" size="small">
                بله من مطمئن هستم
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MyPostCard;
