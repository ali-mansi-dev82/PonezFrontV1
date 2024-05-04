import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_AUTH_URL } from "../../../../config";
import { sendOtpSchema } from "./schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../../../shared/components/input/textInput";
import { Button, DialogActions, DialogContent } from "@mui/material";

const SendOTP = ({ setMobile, nextLevel, setExpireCode }) => {
  const [loading, setLoading] = useState(false);
  const [errore, setErrore] = useState("");
  const inputRef = useRef(null);

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

      await SendMutation.mutateAsync(
        {
          mobile: "0" + data?.mobile,
        },
        {
          onSuccess: async (result) => {
            setLoading(false);
            setMobile("0" + data?.mobile);
            setExpireCode(result.data.expiresIn);
            nextLevel();
          },
          onError: async (result) => {
            if (
              result &&
              result?.response &&
              result?.response?.data?.message &&
              result?.response?.data?.message === " last code not expire"
            ) {
              setErrore("کد ارسال شده به دستگاه شما هنوز منقضی نشده است");
            }
            setLoading(false);
          },
        }
      );
    } catch (err) {
      setLoading(false);
    }
  };

  const SendMutation = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`${API_AUTH_URL}/send-otp/`, data);
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="h-full">
      <DialogContent className="w-auto lg:!w-[430px] h-[calc(100%-65px)] lg:!max-h-[50vh] !py-14">
        <h3 className="font-bold text-base text-gray-700 mb-6">
          شماره موبایل خود را وارد کنید
        </h3>
        <p className="pt-2 pb-6 text-sm text-gray-400 leading-7">
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
          fullWidth
          autoFocus
        />
        <div className="text-sm pb-4">
          <span className="text-primary-default">شرایط استفاده از خدمات</span>
          {"  و  "}
          <span className="text-primary-default"> حریم خصوصی</span> پونز را
          می‌پذیرم.
        </div>
      </DialogContent>
      <DialogActions className="gap-2 border-t border-gray-300 !p-3">
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
