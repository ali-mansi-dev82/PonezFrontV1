import React from "react";
import MainContainer from "../../shared/components/container";
import { useResponsive } from "../../context/ResponsiveContext";

const Index = () => {
  const { isMobile } = useResponsive();
  return (
    <MainContainer className={`w-full flex justify-center gap-5 py-12`}>
      <div>
        <h1>Device Test!</h1>
        {isMobile ? (
          <p>You are a tablet or mobile phone</p>
        ) : (
          <p>You are a desktop or laptop</p>
        )}
      </div>
    </MainContainer>
  );
};

export default Index;
