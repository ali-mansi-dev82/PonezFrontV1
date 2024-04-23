import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_AUTH_URL } from "../../../../config";
import { sendOtpSchema } from "./schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextInput from "../../../../shared/components/input/textInput";
import { Button, Chip, InputAdornment } from "@mui/material";

const SendOTP = ({ setMobile, nextLevel, setExpireCode }) => {
  const [loading, setLoading] = useState(false);
  const [errore, setErrore] = useState("");

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
    <>
      <h3 className="font-bold text-base text-gray-700">ورود به حساب کاربری</h3>
      <p className="py-4 text-sm">شماره موبایل خود را وارد کنید.</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          register={register("mobile")}
          placeholder="شماره موبایل"
          errorMessage={errors?.mobile?.message || errore || undefined}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Chip label="۹۸+" size="small" sx={{ marginLeft: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        <div className="w-full justify-end flex gap-3 pt-6">
          <Button
            variant="contained"
            disabled={loading}
            loading={loading}
            type="submit"
          >
            تایید
          </Button>
        </div>
      </form>
    </>
  );
};
export default SendOTP;
