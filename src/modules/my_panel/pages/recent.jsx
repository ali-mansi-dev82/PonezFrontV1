import { useQuery } from "@tanstack/react-query";
import React from "react";

import MyRecentDesktop from "./desktop/recent";
import { UserSeenFn } from "../../user/query";
import MyRecentMobile from "./mobile/recent";

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
