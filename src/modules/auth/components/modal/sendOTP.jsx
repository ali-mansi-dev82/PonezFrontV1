import { Button, DialogActions, DialogContent } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import TextInput from "../../../../shared/components/input/textInput";
import { send_otp } from "../../../../features/auth/action";
import { sendOtpSchema } from "./schemas";

const SendOTP = ({ setMobile, nextLevel, setExpireCode }) => {
  const [loading, setLoading] = useState(false);
  const [errore, setErrore] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  
  useEffect(() => inputRef.current?.focus(), []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sendOtpSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const { payload } = await dispatch(
        send_otp({
          mobile: "0" + data?.mobile,
        })
      );

      if (payload?.statusCode && payload?.statusCode === 200) {
        setLoading(false);
        setMobile("0" + data?.mobile);
        setExpireCode(payload?.expiresIn);
        nextLevel();
      } else {
        setLoading(false);
        if (payload === " last code not expire") {
          setErrore("کد ارسال شده به دستگاه شما هنوز منقضی نشده است");
        }
      }
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <DialogContent className="w-auto lg:!w-[430px] h-[calc(100%-70px)] lg:!max-h-[50vh] !py-14">
        <h3 className="text-lg text-gray-700 mb-4">
          شماره موبایل خود را وارد کنید
        </h3>
        <p className=" pb-6 text-sm text-gray-400 leading-7">
          قبل از ثبت آگهی، لطفاً وارد حساب خود شوید. کد تأیید به این شماره پیامک
          می‌شود.
        </p>

        <TextInput
          inputRef={inputRef}
          type="number"
          register={register("mobile")}
          placeholder="شماره موبایل"
          errorMessage={errors?.mobile?.message || errore || undefined}
          prefix={"۹۸+"}
          label={"موبایل"}
          fullWidth
          autoFocus
        />
        <div className="text-sm pb-4 mt-2">
          <span className="text-primary-default">شرایط استفاده از خدمات</span>
          {"  و  "}
          <span className="text-primary-default"> حریم خصوصی</span> پونز را
          می‌پذیرم.
        </div>
      </DialogContent>
      <DialogActions className="gap-2 border-t border-gray-300 !p-4">
        <Button
          fullWidth
          variant="contained"
          disabled={loading}
          loading={loading}
          type="submit"
        >
          تایید
        </Button>
      </DialogActions>
    </form>
  );
};
export default SendOTP;
