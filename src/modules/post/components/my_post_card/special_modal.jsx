import {
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Button,
  Dialog,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import React from "react";

import { CreateSpecialFn, DeleteSpecialFn } from "../../../special/mutation";
import Image from "./special.png";

function SpecialModal({ onDelete, _id, open, setOpen, special }) {
  const handleClose = () => setOpen(false);

  const createMutation = useMutation({
    mutationFn: CreateSpecialFn,
  });
  const deleteMutation = useMutation({
    mutationFn: DeleteSpecialFn,
  });
  const handleCreate = async () => {
    if (_id) {
      await createMutation.mutateAsync({ postId: _id });
      console.log("onDelete");
      handleClose();
      onDelete();
    }
  };
  const handleDelete = async () => {
    if (_id) {
      await deleteMutation.mutateAsync(_id);
      console.log("onDelete");
      handleClose();
      onDelete();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle
        className="border-b items-center justify-between"
        sx={{
          m: 0,
          p: 2,
          width: "100%",
          display: "flex",
        }}
      >
        <span className="text-base">
          {special ? `از ویژه درآوردن` : `ویژه کردن آگهی`}
        </span>
        <IconButton onClick={handleClose}>
          <X size={16} />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{ justifyContent: "center", gap: "0.5rem", padding: "1rem" }}
      >
        <div className="flex flex-col justify-center items-center gap-2 pt-4 w-[70vw] lg:w-[380px]">
          {special ? (
            <p className="w-full text-sm leading-6 text-gray-500">
              با اینکار، آگهی شما از جایگاه ویژه درمی آید.
            </p>
          ) : (
            <>
              <p className="text-sm leading-6 text-gray-500">
                با اینکار، آگهی شما در جایگاه ویژه قرار میگیرد و اول از همه آگهی
                ها نمایش داده میشود.
              </p>
              <img src={Image} alt="" loading="lazy" width={300} />
            </>
          )}
        </div>
      </DialogContent>
      <DialogActions
        className="border-t items-center justify-between"
        sx={{
          m: 0,
          p: 2,
          width: "100%",
          display: "flex",
        }}
      >
        {special ? (
          <Button
            color="error"
            onClick={handleDelete}
            fullWidth
            variant="contained"
          >
            قبول میکنم
          </Button>
        ) : (
          <Button onClick={handleCreate} fullWidth variant="contained">
            قبول میکنم
          </Button>
        )}

        <Button
          color="error"
          onClick={handleClose}
          fullWidth
          variant="outlined"
        >
          نه لغو
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SpecialModal;
