import {
  InputAdornment,
  DialogActions,
  DialogContent,
  Button,
  Chip,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { setAccessTokenCookies } from "../../../../shared/util/accessTokenCookie";
import TextInput from "../../../../shared/components/input/textInput";
import { secontTommss } from "../../../../shared/util/functions";
import { check_otp } from "../../../../features/auth/action";
import { log_in } from "../../../../features/auth/authSlice";
import { checkOtpSchema } from "./schemas";

const CheckOTP = ({ mobile, expireCode, authSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [second, setSeconds] = useState(0);
  const [errore, setErrore] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();

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
  }, [expireCode, second]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { payload } = await dispatch(
        check_otp({
          mobile,
          code: data?.code,
        })
      );
      if (payload?.statusCode && payload?.statusCode === 200) {
        setLoading(false);
        if (payload?.token) {
          setAccessTokenCookies(payload?.token);
          dispatch(
            log_in({
              userToken: payload?.token,
              userInfo: payload?.user,
            })
          );
          authSuccess();
        }
      } else {
        setLoading(false);
        if (payload === "code is  notCorrect") {
          setErrore("کد وارد شده اشتباه است");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="h-full">
        <DialogContent className="w-auto lg:!w-[430px] h-[calc(100%-100px)] lg:!max-h-[50vh] !py-14">
          <h3 className="text-lg text-gray-700 mb-4">کد تایید را وارد کنید</h3>
          <p className=" pb-6 text-sm text-gray-400 leading-7">
            کد ارسال شده به شماره <span className="Fanum">{mobile}</span> را
            وارد کنید
          </p>
          <TextInput
            inputRef={inputRef}
            register={register("code")}
            type="number"
            placeholder="کد ورود"
            label="کد ورود"
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
        <DialogActions className="felx flex-col gap-2 border-t border-gray-300 !p-4">
          <div className="text-xs text-gray-400 w-max">
            <span className="Fanum">
              {second > 0 ? secontTommss(second) : ""}
            </span>{" "}
            مانده تا تلاش مجدد
          </div>
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
    </>
  );
};
export default CheckOTP;
