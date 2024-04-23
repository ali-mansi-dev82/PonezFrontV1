import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MainContainer from "../../../../shared/components/container";
import { useMutation } from "@tanstack/react-query";
import { BookmarkIcon, Share2Icon } from "lucide-react";
import Images from "./images";
import { tomanCurrencyFormat } from "../../../../shared/util/numberFormat";
import { FindPostbySlugFn } from "../../query";
import {
  Alert,
  Breadcrumbs,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import { SavePostBookmark } from "../../../bookmark/mutation";
import { CheckPostisBookmark } from "../../../bookmark/query";
import { useAuth } from "../../../../context/AuthContext";
import SaveNote from "../../../note/components/save_note";
import { dateFormate } from "../../../../shared/util/dateFormat";

const Index = () => {
  const { slug } = useParams();
  const [showPhone, setShowPhone] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const [bookmark, setBookmark] = useState(false);

  const postInfoQuery = useMutation({
    mutationKey: ["post_info"],
    mutationFn: FindPostbySlugFn.bind(this, slug),
  });
  const checkbookmarkPostMutation = useMutation({
    mutationKey: ["check_bookmark"],
    mutationFn: CheckPostisBookmark,
  });
  const bookmarkPostMutation = useMutation({
    mutationKey: ["bookmark_post"],
    mutationFn: SavePostBookmark.bind(this, postInfoQuery?.data?.data?._id),
  });

  useEffect(() => {
    if (postInfoQuery?.data?.data) {
      setLoading(false);
      if (isAuthenticated)
        checkbookmarkPostMutation.mutateAsync(postInfoQuery?.data?.data?._id);
    }
  }, [postInfoQuery?.data?.data]);

  useEffect(() => {
    setLoading(true);
    if (slug) {
      postInfoQuery.mutateAsync(null, {
        onSuccess: () => {
          setLoading(false);
        },
      });
      checkbookmarkPostMutation.mutateAsync();
    }
  }, []);

  useEffect(() => {
    if (slug) {
      postInfoQuery.mutateAsync(null, {
        onSuccess: () => {
          setLoading(false);
          if (isAuthenticated)
            checkbookmarkPostMutation.mutateAsync(postInfoQuery?.data?._id);
        },
      });
      checkbookmarkPostMutation.mutateAsync();
    }
  }, [slug]);

  useEffect(() => {
    if (checkbookmarkPostMutation?.data === true) setBookmark(true);
  }, [checkbookmarkPostMutation?.data]);

  const bookmarkBtnHandle = () => {
    bookmarkPostMutation.mutateAsync();
    setBookmark(!bookmark);
  };

  return (
    <MainContainer className={`w-full flex justify-between gap-5 py-9`}>
      {!loading &&
      postInfoQuery?.data?.data &&
      postInfoQuery?.data?.data?.title &&
      postInfoQuery?.data?.data?.user ? (
        <div className="w-full flex-col flex justify-between gap-6 px-44">
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            {postInfoQuery?.data?.bread_crumb?.map((value, index) => (
              <div key={index}>
                <Link
                  to={`/s/${value?.slug}`}
                  className="text-gray-800 text-xs"
                >
                  {value?.name}
                </Link>
              </div>
            ))}
            <div className="text-gray-400 text-xs">
              {postInfoQuery?.data?.data?.title}
            </div>
          </Breadcrumbs>
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
                      sx={{ paddingX: 2 }}
                    >
                      اطلاعات تماس
                    </Button>
                    <Button
                      styleVariant="secondary"
                      variant="outlined"
                      sx={{ paddingX: 5 }}
                    >
                      چت
                    </Button>
                  </div>

                  <div className="flex flex-row gap-3 ">
                    <Tooltip title={bookmark ? `نشان شد` : `نشان کردن`} arrow>
                      <IconButton
                        onClick={bookmarkBtnHandle}
                        aria-label="delete"
                      >
                        <BookmarkIcon
                          className={
                            bookmark && `text-primary-default fill-current`
                          }
                          size={16}
                        />
                      </IconButton>
                    </Tooltip>
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
              {postInfoQuery?.data?.data?.options &&
                Object.keys(postInfoQuery?.data?.data?.options).map(
                  (key, index) => (
                    <div
                      key={index}
                      className="w-full flex justify-between items-center border-b border-gray-200 pb-4"
                    >
                      <div className="text-gray-400 text-md">{key}</div>
                      <div className="Fanum text-md">
                        {postInfoQuery?.data?.data?.options[key]}
                      </div>
                    </div>
                  )
                )}
              <div className="w-full flex justify-between items-center border-b border-gray-200 pb-4">
                <div className="text-gray-400 text-md">قیمت</div>
                <div className="Fanum text-md">
                  {postInfoQuery?.data?.data?.amount &&
                  postInfoQuery?.data?.data?.amount > 0
                    ? tomanCurrencyFormat(postInfoQuery?.data?.data?.amount)
                    : "توافقی"}
                </div>
              </div>
              {postInfoQuery?.data?.data?.content &&
                postInfoQuery?.data?.data?.content.length > 0 && (
                  <div className="flex flex-col gap-1 w-full h-max">
                    <h6 className="text-gray-700 text-md font-semibold">
                      توضیحات
                    </h6>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: postInfoQuery?.data?.data?.content.replaceAll(
                          "\n",
                          "<br />"
                        ),
                      }}
                      className="text-gray-600 text-base leading-8 max-w-[500px] vazir font-Vazir Fanum"
                    ></p>
                  </div>
                )}
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
