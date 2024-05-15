import { ImageOffIcon, Share2Icon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { tomanCurrencyFormat } from "../../../shared/util/numberFormat";
import { truncateString } from "../../../shared/util/string";
import { API_UPLOADED_IMAGES_URL } from "../../../config";
import Button from "../../../shared/components/button";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { SavePostBookmark } from "../mutation";
import { dateFormate } from "../../../shared/util/dateFormat";

function MyPostCard({
  onDelete,
  _id,
  title,
  images,
  district,
  slug,
  amount,
  createdAt,
}) {
  const [open, setOpen] = useState(false);

  const removeMutation = useMutation({
    mutationFn: SavePostBookmark,
  });

  const handleDelete = async () => {
    if (_id) await removeMutation.mutateAsync(_id);
    await handleClose();
    onDelete();
  };

  const handleDeleteBtn = (event) => {
    event.preventDefault();
    handleOpen();
  };

  const handleClose = setOpen.bind(this, false);
  const handleOpen = setOpen.bind(this, true);

  return (
    <>
      <Link
        to={`/v/${slug}`}
        className="flex flex-col gap-4 p-4 border border-gray-200 rounded-md  cursor-pointer h-max"
      >
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-col justify-between w-max h-full max-w-[50%]">
            <h1 className="text-gray-700 text-sm h-[70px] font-semibold w-full leading-7">
              {truncateString(title, 40)}
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
          <div className="relative w-[130px] h-[130px] pb-2/3  rounded-md">
            {images[0] ? (
              <img
                className="absolute w-[130px] h-full inset-0 object-cover object-top rounded-md"
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
        <div className="w-full flex flex-row gap-4 ">
          <Button
            onClick={handleDeleteBtn}
            variant="secondary"
            size="small"
            className="!w-1/2"
            leftIcon={<Share2Icon size={12} />}
          >
            اشتراک گذاری
          </Button>
          <Button
            onClick={handleDeleteBtn}
            variant="secondary"
            size="small"
            className="!w-1/2"
            leftIcon={<TrashIcon size={12} />}
          >
            حذف نشان
          </Button>
        </div>
      </Link>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ paddingX: 8, paddingTop: 4 }}
        >
          <p className="text-base">از حذف نشان آگهی مطمئنید؟</p>
        </DialogTitle>
        <DialogActions
          sx={{ justifyContent: "center", gap: "0.5rem", padding: "1rem" }}
        >
          <Button onClick={handleClose} variant="secondary" size="small">
            انصراف
          </Button>
          <Button onClick={handleDelete} variant="secondary" size="small">
            بله حذف کن
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default MyPostCard;
