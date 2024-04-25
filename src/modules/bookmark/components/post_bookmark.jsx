import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { BookmarkIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { SavePostBookmark } from "../mutation";
import { CheckPostisBookmark } from "../query";
import { useAuth } from "../../../context/AuthContext";

const PostBookmark = ({ postId }) => {
  const { isAuthenticated } = useAuth();
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
    if (postId && isAuthenticated) {
      checkbookmarkPostMutation.mutateAsync(postId, {
        onSuccess: (data) => {
          setBookmark(data);
        },
      });
    }
  }, [postId, isAuthenticated]);
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
