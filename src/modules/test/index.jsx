import React from "react";
import MainContainer from "../../shared/components/container";
import { useResponsive } from "../../context/ResponsiveContext";

const Index = () => {
  const { isTabletOrMobile } = useResponsive();
  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });

  // const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  // const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  return (
    <MainContainer className={`w-full flex justify-center gap-5 py-12`}>
      <div>
        <h1>Device Test!</h1>
        {/* {isDesktopOrLaptop && <p>You are a desktop or laptop</p>} */}
        {/* {isBigScreen && <p>You have a huge screen</p>} */}
        {isTabletOrMobile ? (
          <p>You are a tablet or mobile phone</p>
        ) : (
          <p>You are a desktop or laptop</p>
        )}
        {/* <p>Your are in {isPortrait ? "portrait" : "landscape"} orientation</p> */}
        {/* {isRetina && <p>You are retina</p>} */}
      </div>
    </MainContainer>
  );
};

export default Index;
