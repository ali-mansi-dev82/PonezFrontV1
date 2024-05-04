import React, { useEffect, useState } from "react";
import PostDesktop from "./desktop";
import PostMobile from "./mobile";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FindPostbySlugFn } from "../../query";

const Index = ({isMobile}) => {
  const { slug } = useParams();
  const [loading, setLoading] = useState(true);

  const postInfoQuery = useMutation({
    mutationKey: ["post_info"],
    mutationFn: FindPostbySlugFn.bind(this, slug),
  });

  useEffect(() => {
    if (slug) {
      postInfoQuery.mutateAsync(null, {
        onSuccess: () => {
          setLoading(false);
          window.scrollTo(0, 0);
        },
      });
    }
  }, []);

  return isMobile ? (
    <PostMobile data={postInfoQuery?.data} loading={loading} />
  ) : (
    <PostDesktop data={postInfoQuery?.data} loading={loading} />
  );
};
export default Index;
