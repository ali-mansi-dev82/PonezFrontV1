import React, { useState, useEffect, useRef } from "react";
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
import {
  Button,
  Chip,
  DialogActions,
  DialogContent,
  InputAdornment,
} from "@mui/material";

const CheckOTP = ({ mobile, expireCode, authSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [second, setSeconds] = useState(0);
  const [errore, setErrore] = useState("");
  const { login } = useAuth();
  const inputRef = useRef(null);

  useEffect(() => inputRef.current?.focus(), []);

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
      console.error(err);
    }
  };

  const CheckMutation = useMutation({
    mutationFn: async (data) => {
      return await axios.post(`${API_AUTH_URL}/check-otp/`, data);
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <DialogContent className="w-auto lg:!w-[430px] h-[calc(100%-65px)] lg:!max-h-[50vh] !py-14">
          <h3 className="font-bold text-base text-gray-700 mb-6">تایید کد</h3>
          <p className="pt-2 pb-6 text-sm text-gray-400 leading-7 Fanum">
            کد ارسال شده به شماره {mobile} را وارد کنید
          </p>
          <TextInput
            inputRef={inputRef}
            register={register("code")}
            type="number"
            placeholder="کد ورود"
            errorMessage={errors?.mobile?.message || errore || undefined}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <Chip label="کد ورود" size="small" sx={{ marginLeft: 1 }} />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </DialogContent>
        <DialogActions className="gap-2 border-t border-gray-300 !p-3">
          <Button className="w-max" disabled>
            {second > 0 ? secontTommss(second) : ""}
          </Button>
          <Button
            fullWidth
            variant="contained"
            disabled={loading}
            loading={loading}
            type="submit"
          >
            ورود
          </Button>
        </DialogActions>
      </form>
    </>
  );
};
export default CheckOTP;
