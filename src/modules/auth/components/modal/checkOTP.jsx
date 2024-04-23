import React, { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { checkOtpSchema } from "./schemas";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setAccessTokenCookies } from "../../../../shared/util/accessTokenCookie";
import { API_AUTH_URL } from "../../../../config";
import { secontTommss } from "../../../../shared/util/functions";
import { useAuth } from "../../../../context/AuthContext";
import TextInput from "../../../../shared/components/input/textInput";
import { Button, Chip, InputAdornment } from "@mui/material";

const CheckOTP = ({ mobile, expireCode, authSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [second, setSeconds] = useState(0);
  const [errore, setErrore] = useState("");
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(checkOtpSchema),
  });

  useEffect(() => {
    setSeconds(Math.floor((expireCode - Date.now()) / 1000));
    const intervalId = setInterval(() => {
      setSeconds(Math.floor((expireCode - Date.now()) / 1000));
      if (second < 0) {
        clearInterval(intervalId);
        return;
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await CheckMutation.mutateAsync(
        {
          mobile,
          code: data?.code,
        },
        {
          onSuccess: async (result) => {
            setLoading(false);
            if (result?.data?.token) {
              setAccessTokenCookies(result?.data?.token);
              login(result?.data?.token);
              authSuccess();
            }
          },
          onError: async (result) => {
            setErrore(result?.message);
            if (
              result &&
              result?.response &&
              result?.response?.data?.message &&
              result?.response?.data?.message === "code is  notCorrect"
            ) {
              setErrore("کد وارد شده اشتباه است");
            }
            setLoading(false);
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const CheckMutation = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`${API_AUTH_URL}/check-otp/`, data);
    },
  });

  return (
    <>
      <h3 className="font-bold text-base text-gray-700">تایید کد</h3>
      <p className="py-4 text-sm">
        کد ارسال شده به شماره {mobile} را وارد کنید
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          register={register("code")}
          placeholder="کد ورود"
          errorMessage={errors?.mobile?.message || errore || undefined}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <Chip label="کد ورود" size="small" sx={{ marginLeft: 1 }} />
              </InputAdornment>
            ),
          }}
        />
        <div className="w-full justify-end flex gap-3 pt-6">
          <Button className="w-max" disabled styleVariant="secondary">
            {second > 0 ? secontTommss(second) : ""}
          </Button>
          <Button
            variant="contained"
            className="w-max"
            type="submit"
            loading={loading}
          >
            ورود
          </Button>
        </div>
      </form>
    </>
  );
};
export default CheckOTP;
