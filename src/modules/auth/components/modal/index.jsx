import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { X } from "lucide-react";

import { useResponsive } from "../../../../context/ResponsiveContext";
import { useAuth } from "../../../../context/AuthContext";
import CheckOTP from "./checkOTP";
import SendOTP from "./sendOTP";

const AuthModal = ({
  open,
  onClose,
}) => {
  const [mobile, setMobile] = useState("");
  const [expireCode, setExpireCode] = useState(0);
  const [isSendOtpLevel, setIsSendOtpLevel] = useState(true);
  const { login } = useAuth();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
  };
  const handleClose = () => {
    if (onClose) return onClose();
    navigate(`/s/`);
  };

  return (
    <Dialog
      fullScreen={isMobile}
      open={open}
      onClose={handleClose}
      keepMounted
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="scroll-dialog-title"
        className="flex flex-row justify-between items-center gap-1 border-b border-gray-300  !py-[20px]"
      >
        <h1 className="text-base  text-gray-800">ورود با حساب کاربری</h1>
        <IconButton onClick={handleClose}>
          <X size={16} />
        </IconButton>
      </DialogTitle>
      {isSendOtpLevel ? (
        <SendOTP
          setMobile={setMobile}
          nextLevel={() => {
            setIsSendOtpLevel(false);
          }}
          setExpireCode={setExpireCode}
        />
      ) : (
        <CheckOTP
          mobile={mobile}
          expireCode={expireCode}
          authSuccess={() => {
            handleLogin();
            if (onClose) return onClose();
          }}
        />
      )}
    </Dialog>
  );
};
export default AuthModal;
