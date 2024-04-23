import React, { useState, useEffect } from "react";
import CheckOTP from "./checkOTP";
import SendOTP from "./sendOTP";
import { useAuth } from "../../../../context/AuthContext";

const AuthModal = ({ closeModal }) => {
  const [mobile, setMobile] = useState("");
  const [expireCode, setExpireCode] = useState(0);
  const [isSendOtpLevel, setIsSendOtpLevel] = useState(true);
  const { login } = useAuth();

  const handleLogin = () => {
    login();
  };

  useEffect(() => {
    document.getElementById("auth_modal").showModal();
  }, []);

  return (
    <>
      <dialog id="auth_modal" className="modal" onClick={closeModal}>
        <div
          className="modal-box rounded-md bg-white"
          onClick={(e) => e.stopPropagation()}
        >
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
          )}
        </div>
      </dialog>
    </>
  );
};
export default AuthModal;
