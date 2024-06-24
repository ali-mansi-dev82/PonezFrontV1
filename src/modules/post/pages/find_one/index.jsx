import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { FindPostbySlugFn } from "../../query";
import PostDesktop from "./desktop";
import PostMobile from "./mobile";

const Index = ({ isMobile }) => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  const postInfoQuery = useQuery({
    queryKey: ["post_info"],
    queryFn: FindPostbySlugFn.bind(this, slug),
  });

  useEffect(() => {
    if (postInfoQuery?.data) {
      setData(postInfoQuery?.data);
      setLoading(false);
      window.scrollTo(0, 0);
    }
  }, [postInfoQuery?.data]);

  useEffect(() => {
    setLoading(true);
  }, [slug]);

  return isMobile ? (
    <PostMobile data={data} loading={loading} />
  ) : (
    <PostDesktop data={data} loading={loading} />
  );
};
export default Index;
