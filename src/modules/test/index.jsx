import React from "react";
import MainContainer from "../../shared/components/container";
import { Button } from "@mui/material";

const Index = () => {
  return (
    <MainContainer className={`w-full flex justify-center gap-5 py-12`}>
      <div className="flex flex-col gap-4 w-full">
        <Button fullWidth variant="contained">
          تایید
        </Button>
        <Button fullWidth variant="outlined">
          انصراف
        </Button>
      </div>
    </MainContainer>
  );
};

export default Index;
