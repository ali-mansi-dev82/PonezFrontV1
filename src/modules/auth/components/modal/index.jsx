import React, { useState } from "react";
import CheckOTP from "./checkOTP";
import SendOTP from "./sendOTP";
import { useAuth } from "../../../../context/AuthContext";
import { Dialog, DialogTitle, IconButton } from "@mui/material";
import { useResponsive } from "../../../../context/ResponsiveContext";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AuthModal = ({
  open,
  onClose,
  onSuccess = () => {
    return;
  },
}) => {
  const [mobile, setMobile] = useState("");
  const [expireCode, setExpireCode] = useState(0);
  const [isSendOtpLevel, setIsSendOtpLevel] = useState(true);
  const { login } = useAuth();
  const { isTabletOrMobile } = useResponsive();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
  };
  const handleClose = () => {
    if (onClose) return onClose();
    navigate(`/s/`);
  };

  return (
    <>
      <Dialog
        fullScreen={isTabletOrMobile}
        open={open}
        onClose={handleClose}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          className="flex flex-row justify-between items-center gap-1 border-b border-gray-300 shadow"
        >
          <h1 className="text-base font-bold text-gray-800">
            ورود با حساب کاربری
          </h1>
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
              onSuccess();
              handleLogin();
            }}
          />
        )}
      </Dialog>
    </>
  );
};
export default AuthModal;
