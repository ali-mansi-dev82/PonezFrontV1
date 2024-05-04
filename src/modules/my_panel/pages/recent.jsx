import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UserSeenFn } from "../../user/query";
import MyRecentMobile from "./mobile/recent";
import MyRecentDesktop from "./desktop/recent";

const Index = ({ isMobile }) => {
  const myPostQuery = useQuery({
    queryKey: ["my_seen"],
    queryFn: UserSeenFn.bind(this),
  });
  return isMobile ? (
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
