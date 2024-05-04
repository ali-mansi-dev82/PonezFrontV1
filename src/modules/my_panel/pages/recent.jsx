import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UserSeenFn } from "../../user/query";
import MyRecentMobile from "./mobile/recent";
import { useResponsive } from "../../../context/ResponsiveContext";
import MySavedDesktop from "./desktop/my_saved";
import MyRecentDesktop from "./desktop/recent";

const Index = () => {
  const myPostQuery = useQuery({
    queryKey: ["my_seen"],
    queryFn: UserSeenFn.bind(this),
  });
const { isTabletOrMobile } = useResponsive();
return isTabletOrMobile ? (
  <MyRecentMobile
    isPending={myPostQuery?.isPending}
    data={myPostQuery?.data}
  />
) : (
  <MyRecentDesktop
    isPending={myPostQuery?.isPending}
    data={myPostQuery?.data}
  />
);
};

export default Index;
