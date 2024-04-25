import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainContainer from "../../../../shared/components/container";
import { useMutation } from "@tanstack/react-query";
import { Share2Icon } from "lucide-react";
import Images from "./images";
import { FindPostbySlugFn } from "../../query";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import SaveNote from "../../../note/components/save_note";
import { dateFormate } from "../../../../shared/util/dateFormat";
import PostBookmark from "../../../bookmark/components/post_bookmark";
import PostOptions from "./options";
import PostDescription from "./description";
import PostBreadcrumbs from "./post_breadcrumbs";

const Index = () => {
  const { slug } = useParams();
  const [showPhone, setShowPhone] = useState(false);
  const [loading, setLoading] = useState(true);

  const postInfoQuery = useMutation({
    mutationKey: ["post_info"],
    mutationFn: FindPostbySlugFn.bind(this, slug),
  });

  useEffect(() => {
    if (slug) {
      postInfoQuery.mutateAsync(null, {
        onSuccess: () => {
          setLoading(false);
        },
      });
    }
  }, [slug]);

  return (
    <MainContainer className={`w-full flex justify-between gap-5 py-9`}>
      {!loading &&
      postInfoQuery?.data?.data &&
      postInfoQuery?.data?.data?.title &&
      postInfoQuery?.data?.data?.user ? (
        <div className="w-full flex-col flex justify-between gap-6 px-44">
          <PostBreadcrumbs
            bread_crumb={postInfoQuery?.data?.bread_crumb}
            title={postInfoQuery?.data?.data?.title}
          />
          <div className="w-full flex justify-between gap-36">
            <div className="flex flex-col gap-4 w-1/2">
              <h5 className="text-2xl text-gray-900 leading-10">
                {postInfoQuery?.data?.data?.title}
              </h5>
              <span className="text-gray-400 text-xs Fanum">
                {dateFormate(postInfoQuery?.data?.data?.updatedAt)} در{" "}
                {postInfoQuery?.data?.data?.district}
              </span>
              <hr className="w-full" />
              {postInfoQuery?.data?.data?.isDelete ? (
                <Alert icon={<></>} severity="error">
                  آگهی حذف شده است
                </Alert>
              ) : (
                <div className="w-full flex justify-between">
                  <div className="flex flex-row gap-3 ">
                    <Button
                      size="small"
                      variant="contained"
                      disabled={showPhone}
                      onClick={() => setShowPhone(true)}
                      sx={{ padding: "0.7rem 1rem" }}
                    >
                      اطلاعات تماس
                    </Button>
                    {/* <Button variant="outlined" sx={{ paddingX: 5 }}>
                      چت
                    </Button> */}
                  </div>
                  <div className="flex flex-row gap-3 ">
                    <PostBookmark postId={postInfoQuery?.data?.data?._id} />
                    <Tooltip title={`اشتراک گذاری`} arrow>
                      <IconButton>
                        <Share2Icon size={16} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </div>
              )}
              {showPhone && (
                <div className="p-0 mt-4 flex justify-between">
                  <h6>شمارهٔ موبایل</h6>
                  <p className="text-[#2F80C0] Fanum">
                    {postInfoQuery?.data?.data?.user?.mobile}
                  </p>
                </div>
              )}
              <hr className="w-full" />
              <PostOptions
                options={postInfoQuery?.data?.data?.options}
                amount={postInfoQuery?.data?.data?.amount}
              />
              <PostDescription
                desription={postInfoQuery?.data?.data?.content}
              />
            </div>
            <div className="flex flex-col gap-6 w-1/2">
              {postInfoQuery?.data?.data?.images[0] && (
                <Images images={postInfoQuery?.data?.data?.images} />
              )}
              <SaveNote id={postInfoQuery?.data?.data?._id} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center py-64">
          <CircularProgress />
        </div>
      )}
    </MainContainer>
  );
};
export default Index;
