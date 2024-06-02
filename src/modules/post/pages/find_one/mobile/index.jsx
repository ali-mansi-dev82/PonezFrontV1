import {
  CircularProgress,
  SwipeableDrawer,
  IconButton,
  Button,
  Alert,
} from "@mui/material";
import { Mail, Phone, Share2Icon } from "lucide-react";
import { RWebShare } from "react-web-share";
import React, { useState } from "react";

import { tomanCurrencyFormat } from "../../../../../shared/util/numberFormat";
import SingleLayoutMobile from "../../../../../layouts/mobile/single_layout";
import PostBookmark from "../../../../bookmark/components/post_bookmark";
import { dateFormate } from "../../../../../shared/util/dateFormat";
import SaveNote from "../../../../note/components/save_note";
import PostBreadcrumbs from "../post_breadcrumbs";
import PostDescription from "../description";
import PostOptions from "../options";
import Images from "../images";

const PostMobile = ({ loading, data }) => {
  const [showPhone, setShowPhone] = useState(false);
  const url = `${window.location.origin}${window.location.pathname}`;
  const smsContent = `${data?.data?.title} ${url}`;

  return (
    <SingleLayoutMobile
      navbarActions={
        <div className="flex flex-row gap-3 ">
          <PostBookmark postId={data?.data?._id} />
          <RWebShare
            data={{
              url: `${window.location.pathname}`,
              title: `${data?.data?.title}`,
            }}
          >
            <IconButton>
              <Share2Icon size={16} />
            </IconButton>
          </RWebShare>
        </div>
      }
      buttonNavigation={
        data?.data?.isDelete ? (
          <Alert icon={<></>} severity="error" className="w-full">
            آگهی حذف شده است
          </Alert>
        ) : (
          <Button
            fullWidth
            size="medium"
            variant="contained"
            disabled={showPhone}
            onClick={setShowPhone.bind(this, true)}
          >
            اطلاعات تماس
          </Button>
        )
      }
      container="off"
    >
      {!loading && data?.data && data?.data?.title && data?.data?.user ? (
        <div className="w-full flex-col flex justify-between gap-6">
          {data?.data?.images[0] && <Images images={data?.data?.images} />}
          <div className="w-full flex flex-col lg:flex-row justify-between gap-2 px-3">
            <PostBreadcrumbs
              bread_crumb={data?.bread_crumb}
              title={data?.data?.title}
            />
            <div className="flex flex-col gap-3 w-full">
              <h5 className="text-lg text-gray-900 leading-10">
                {data?.data?.title}
              </h5>
              <div className="Fanum text-sm lg:text-md w-2/3 text-right text-gray-600">
                {data?.data?.amount && data?.data?.amount > 0
                  ? tomanCurrencyFormat(data?.data?.amount)
                  : "توافقی"}
              </div>
              <span className="text-gray-400 text-xs Fanum">
                {dateFormate(data?.data?.updatedAt)} در {data?.data?.district}
              </span>

              <hr className="w-full" />
              <PostOptions options={data?.data?.options} />
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
      <SwipeableDrawer
        anchor={"bottom"}
        open={showPhone}
        onClose={setShowPhone.bind(this, false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="p-1"
      >
        <div className="flex flex-col gap-3 p-4">
          <div className="w-full flex justify-center">
            <span className="h-1 w-10 rounded-md bg-gray-300"></span>
          </div>
          <h5>شماره تماس</h5>
          <div className="bg-teal-100 text-teal-700 rounded-lg p-3">
            <h6 className="text-sm">هشدار</h6>
            <p className="text-xs">
              برای جلوگیری از هر گونه کلاهبرداری، قبل از انجام معامله و پرداخت
              وجه از صحت کالا یا خدمات ارائه شده به صورت حضوری اطمینان حاصل
              کنید.
            </p>
          </div>
          <a
            href={`tel:${data?.data?.user?.mobile}`}
            className="w-full flex text-sm justify-start gap-2 items-center px-5 py-3"
          >
            <Phone className="!stroke-[1px]" size={20} /> تماس با{" "}
            <span className="Fanum">{data?.data?.user?.mobile}</span>
          </a>
          <a
            href={`sms:${data?.data?.user?.mobile}?body=${encodeURIComponent(
              smsContent
            )}`}
            className="w-full flex text-sm justify-start gap-2 items-center px-5 py-3"
          >
            <Mail className="!stroke-[1px]" size={20} /> پیامک با{" "}
            <span className="Fanum">{data?.data?.user?.mobile}</span>
          </a>
        </div>
      </SwipeableDrawer>
    </SingleLayoutMobile>
  );
};
export default PostMobile;
