import { ImageOffIcon, Info, NotebookPenIcon, TrashIcon } from "lucide-react";
import { Button, Dialog, DialogContent, IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import { API_UPLOADED_IMAGES_URL } from "../../../config";
import { DeleteNoteFn } from "../mutation";

function MyNotePostCard({
  onDelete,
  _id,
  savedContent,
  title,
  images,
  district,
  slug,
  createdAt,
}) {
  const [open, setOpen] = useState(false);

  const deletePostMutation = useMutation({
    mutationFn: DeleteNoteFn,
  });
  const handleDelete = async (event) => {
    event.preventDefault();
    if (_id) {
      await deletePostMutation.mutateAsync(_id);
      onDelete();
    }
  };
  const handleClose = setOpen.bind(this, false);
  const handleOpen = (event) => {
    event.preventDefault();
    setOpen(true);
  };
  return (
    <>
      <Link
        to={`/v/${slug}`}
        className="flex flex-row gap-4 p-3 border border-gray-200 rounded-2xl  cursor-pointer relative h-max"
      >
        <div className="relative w-[80px] h-[80px] pb-2/3  rounded-md">
          {images[0] ? (
            <img
              className="absolute w-[80px] h-full inset-0 object-cover object-top rounded-xl"
              src={`${API_UPLOADED_IMAGES_URL}${images[0]}`}
              alt={title}
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-md flex justify-center items-center text-gray-400">
              <ImageOffIcon size={32} />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between h-full w-[calc(100%-80px)] ">
          <h1 className="text-gray-700 text-sm h-max font-semibold w-full leading-7 line-clamp-1">
            {title}
          </h1>
          <div className="flex flex-row items-center gap-1 text-gray-500 text-xs pt-8">
            <NotebookPenIcon size={12} className="stroke-[1px]" />
            <p className="line-clamp-1">{savedContent}</p>
          </div>
          <div className=" absolute bottom-2 left-2" onClick={handleOpen}>
            <IconButton size="medium">
              <TrashIcon className="stroke-[1px]" size={16} />
            </IconButton>
          </div>
        </div>
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
export default MyNotePostCard;
