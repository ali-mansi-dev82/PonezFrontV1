import React from "react";
import Navbar from "../../modules/auth/components/navbar/navbar";
import { useAuth } from "../../context/AuthContext";
import ButtonNavigation from "../../modules/auth/components/button_navigation/button_navigaton";
import MainContainer from "../../shared/components/container";
// import { Settings2Icon, X } from "lucide-react";

const BasicLayoutMobile = ({ children, searchText, filter = [] }) => {
  const { isAuthenticated, user } = useAuth();
  return (
    <>
      <Navbar
        userData={user}
        isAuthenticated={isAuthenticated}
        searchText={searchText}
      />
      <main className={`${filter?.length > 0 ? `mt-[122px]` : `mt-[72px]`} mb-[65px]`}>
        {filter?.length > 0 && (
          <div className="fixed top-[72px] right-0 left-0 flex flex-row gap-2 border-b border-gray-300 px-3 py-2 bg-white z-40">
            {/* <span className="flex flex-row gap-2 items-center bg-primary-default text-white w-max h-max text-xs px-3 py-2 rounded-full">
              <Settings2Icon size={16} />
              فیلتر
            </span> */}
            {filter?.map((value, index) => (
              <span
                key={index}
                className=" flex flex-row gap-2 items-center justify-center border border-primary-default text-primary-default w-max h-max text-xs px-3 py-2 rounded-full"
              >
                {value.key}: {value.value}
                {/* <X size={16} /> */}
              </span>
            ))}
          </div>
        )}
        <MainContainer
          className={`w-full flex flex-col justify-center gap-8 py-8 `}
        >
          {children}
        </MainContainer>
      </main>
      <ButtonNavigation />
    </>
  );
};

export default BasicLayoutMobile;
