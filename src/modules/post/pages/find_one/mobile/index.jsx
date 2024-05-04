import React, { useState } from "react";
import { Copy, Share2Icon } from "lucide-react";
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Paper,
  Tooltip,
} from "@mui/material";
import SaveNote from "../../../../note/components/save_note";
import { dateFormate } from "../../../../../shared/util/dateFormat";
import PostOptions from "../options";
import PostDescription from "../description";
import PostBookmark from "../../../../bookmark/components/post_bookmark";
import PostBreadcrumbs from "../post_breadcrumbs";
import Images from "../images";
import SingleLayoutMobile from "../../../../../layouts/mobile/single_layout";
import MainContainer from "../../../../../shared/components/container";

const PostMobile = ({ loading, data }) => {
  const [showPhone, setShowPhone] = useState(false);

  return (
    <SingleLayoutMobile
      navbarActions={
        <div className="flex flex-row gap-3 pl-3">
          <Tooltip title={`اشتراک گذاری`} arrow>
            <IconButton >
              <Share2Icon size={16} />
            </IconButton>
          </Tooltip>
          <PostBookmark postId={data?.data?._id} />
        </div>
      }
      buttonNavigation={
        <Button
          fullWidth
          size="medium"
          variant="contained"
          disabled={showPhone}
          onClick={() => setShowPhone(true)}
        >
          اطلاعات تماس
        </Button>
      }
    >
      <MainContainer
        className={`w-full flex justify-between gap-5 !px-0 lg:py-6 h-max`}
      >
        {!loading && data?.data && data?.data?.title && data?.data?.user ? (
          <div className="w-full flex-col flex justify-between gap-6 ">
            {data?.data?.images[0] && <Images images={data?.data?.images} />}

            <div className="w-full flex flex-col lg:flex-row justify-between gap-2 px-4">
              <PostBreadcrumbs
                bread_crumb={[
                  data?.bread_crumb?.at && data?.bread_crumb?.at(-1),
                ]}
                title=""
              />
              <div className="flex flex-col gap-4 w-full">
                <h5 className="text-lg text-gray-900 leading-10">
                  {data?.data?.title}
                </h5>
                <span className="text-gray-400 text-xs Fanum">
                  {dateFormate(data?.data?.updatedAt)} در {data?.data?.district}
                </span>
                {data?.data?.isDelete && (
                  <Alert icon={<></>} severity="error">
                    آگهی حذف شده است
                  </Alert>
                )}

                <hr className="w-full" />
                <PostOptions
                  options={data?.data?.options}
                  amount={data?.data?.amount}
                />
                <PostDescription desription={data?.data?.content} />
              </div>
              <div className="flex flex-col gap-6 w-full pt-6">
                <SaveNote id={data?.data?._id} />
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center items-center py-64">
            <CircularProgress />
          </div>
        )}
        {/* {showPhone && (
        
      )} */}
        <Dialog
          open={showPhone}
          onClose={() => setShowPhone(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="p-4 mt-4 flex flex-col gap-4">
            <div className="flex justify-between gap-3 text-sm">
              <h6 className="">شمارهٔ موبایل</h6>

              <div className="flex gap-2 items-center">
                <p className="text-[#2F80C0] Fanum">
                  {data?.data?.user?.mobile}
                </p>
                <IconButton>
                  <Copy size={12} />
                </IconButton>
              </div>
            </div>
            <div className="flex flex-col gap-1 text-[10px] bg-blue-50 p-3 text-gray-500 rounded">
              <bold className="font-bold mb-2">هشدار پلیس</bold>
              <p className="leading-5">
                لطفاً پیش از انجام معامله و هر نوع پرداخت وجه، از صحت کالا یا
                خدمات ارائه‌شده، به‌صورت حضوری اطمینان حاصل نمایید.
              </p>
            </div>

            <Button
              fullWidth
              variant="contained"
              onClick={() => setShowPhone(false)}
            >
              بستن
            </Button>
          </div>
        </Dialog>
        {/* <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "0.5rem",
          }}
          elevation={3}
        >
          
        </Paper> */}
      </MainContainer>
    </SingleLayoutMobile>
  );
};
export default PostMobile;
