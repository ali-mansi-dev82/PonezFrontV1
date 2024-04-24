import React, { useState } from "react";
import CheckOTP from "./checkOTP";
import SendOTP from "./sendOTP";
import { useAuth } from "../../../../context/AuthContext";
import { Dialog } from "@mui/material";

const AuthModal = ({ open, closeModal }) => {
  const [mobile, setMobile] = useState("");
  const [expireCode, setExpireCode] = useState(0);
  const [isSendOtpLevel, setIsSendOtpLevel] = useState(true);
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={closeModal}
        keepMounted
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="flex flex-col w-[400px] py-6 px-6">
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
                closeModal();
                handleLogin();
              }}
            />
          )}{" "}
        </div>
      </Dialog>
      {/* <dialog id="auth_modal" className="modal" onClick={closeModal}>
        <div
          className="modal-box rounded-md bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          
        </div>
      </dialog> */}
    </>
  );
};
export default AuthModal;
