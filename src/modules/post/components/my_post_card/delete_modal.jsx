import { Button, Dialog, DialogContent } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { Info } from "lucide-react";
import React from "react";

import { DeletePostFn } from "../../mutation";

function DeleteModal({ onDelete, _id, open, setOpen }) {
  const handleClose = () => setOpen(false);

  const deleteMutation = useMutation({
    mutationFn: DeletePostFn.bind(this, _id),
  });
  const handleDelete = async () => {
    if (_id) {
      await deleteMutation.mutateAsync(_id);
      handleClose();
      onDelete();
    }
  };
  return (
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
  );
}

export default DeleteModal;
