import React from "react";
import { useQuery } from "@tanstack/react-query";
import { UserSavedFn } from "../../user/query";
import MySavedMobile from "./mobile/my_saved";
import MySavedDesktop from "./desktop/my_saved";

const MySaved = ({isMobile}) => {
  const myPostQuery = useQuery({
    queryKey: ["my_saved"],
    queryFn: UserSavedFn.bind(this),
  });

  const onDeletHandle = () => {
    myPostQuery.refetch();
  };
  return isMobile ? (
    <MySavedMobile
      isPending={myPostQuery?.isPending}
      data={myPostQuery?.data}
      handleOnDelete={onDeletHandle}
    />
  ) : (
    <MySavedDesktop
      isPending={myPostQuery?.isPending}
      data={myPostQuery?.data}
      handleOnDelete={onDeletHandle}
    />
  );
};

export default MySaved;
