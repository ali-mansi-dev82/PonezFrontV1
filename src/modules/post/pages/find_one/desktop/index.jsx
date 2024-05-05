import React, { useState } from "react";
import { Share2Icon } from "lucide-react";
import Images from "../images";
import {
  Alert,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import SaveNote from "../../../../note/components/save_note";
import { dateFormate } from "../../../../../shared/util/dateFormat";
import PostBookmark from "../../../../bookmark/components/post_bookmark";
import PostOptions from "../options";
import PostDescription from "../description";
import PostBreadcrumbs from "../post_breadcrumbs";
import BasicLayoutDesktop from "../../../../../layouts/desktop/basic_layout";

const PostDesktop = ({ loading, data }) => {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <BasicLayoutDesktop>
      {!loading && data?.data && data?.data?.title && data?.data?.user ? (
        <div className="w-full flex-col flex justify-between gap-6 px-44">
          <PostBreadcrumbs
            bread_crumb={data?.bread_crumb}
            title={data?.data?.title}
          />
          <div className="w-full flex justify-between gap-36">
            <div className="flex flex-col gap-4 w-1/2">
              <h5 className="text-2xl text-gray-900 leading-10">
                {data?.data?.title}
              </h5>
              <span className="text-gray-400 text-xs Fanum">
                {dateFormate(data?.data?.updatedAt)} در {data?.data?.district}
              </span>
              <hr className="w-full" />
              {data?.data?.isDelete ? (
                <Alert icon={<></>} severity="error">
                  آگهی حذف شده است
                </Alert>
              ) : (
                <div className="w-full flex justify-between">
                  <div className="flex flex-row gap-3 ">
                    <Button
                      size="medium"
                      variant="contained"
                      disabled={showPhone}
                      onClick={() => setShowPhone(true)}
                    >
                      اطلاعات تماس
                    </Button>
                  </div>
                  <div className="flex flex-row gap-3 ">
                    <PostBookmark postId={data?.data?._id} />
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
                    {data?.data?.user?.mobile}
                  </p>
                </div>
              )}
              <hr className="w-full" />
              <PostOptions
                options={data?.data?.options}
                amount={data?.data?.amount}
              />
              <PostDescription desription={data?.data?.content} />
            </div>
            <div className="flex flex-col gap-6 w-1/2">
              {data?.data?.images[0] && <Images images={data?.data?.images} />}
              <SaveNote id={data?.data?._id} />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center py-64">
          <CircularProgress />
        </div>
      )}
    </BasicLayoutDesktop>
  );
};
export default PostDesktop;
