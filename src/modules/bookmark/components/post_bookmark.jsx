import { IconButton, Tooltip } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { BookmarkIcon } from "lucide-react";
import { useSelector } from "react-redux";

import { SavePostBookmark } from "../mutation";
import { CheckPostisBookmark } from "../query";

const PostBookmark = ({ postId }) => {
  const { isAuthed } = useSelector((state) => state.auth);
  const [bookmark, setBookmark] = useState(false);

  const checkbookmarkPostMutation = useMutation({
    mutationKey: ["check_bookmark"],
    mutationFn: CheckPostisBookmark,
  });
  const bookmarkPostMutation = useMutation({
    mutationKey: ["bookmark_post"],
    mutationFn: SavePostBookmark,
  });

  const bookmarkBtnHandle = () => {
    bookmarkPostMutation.mutateAsync(postId, {
      onSuccess: (data) => {
        if (data.message === "saved") setBookmark(true);
        if (data.message === "deleted") setBookmark(false);
      },
    });
    setBookmark("loading");
  };
  useEffect(() => {
    if (postId && isAuthed) {
      checkbookmarkPostMutation.mutateAsync(postId, {
        onSuccess: (data) => {
          setBookmark(data);
        },
      });
    }
  }, [postId, isAuthed]);

  return (
    <Tooltip title={bookmark ? `نشان شد` : `نشان کردن`} arrow>
      <IconButton
        disabled={bookmark === "loading"}
        onClick={bookmarkBtnHandle}
        aria-label="delete"
      >
        <BookmarkIcon
          className={bookmark && `text-primary-default fill-current`}
          size={16}
        />
      </IconButton>
    </Tooltip>
  );
};
export default PostBookmark;
