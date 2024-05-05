import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useCity } from "../../../../context/CityContext";
import { FindPostFn } from "../../mutation";
import { FindChildrenCategorybySlugFn } from "../../../category/query";
import FilterPostDesktop from "./desktop";
import FilterPostMobile from "./mobile";

function NewPost({ isMobile }) {
  const { city } = useCity();
  const { slug } = useParams();
  // const [loading, setLoading] = useState(true);

  const categoryQuery = useMutation({
    mutationFn: FindChildrenCategorybySlugFn.bind(this, slug ?? "root"),
  });

  useEffect(() => window.scrollTo(0, 0), []);

  useEffect(() => {
    try {
      categoryQuery.mutate();
    } catch (error) {
      console.error(error);
    }
  }, [slug]);

  const postsQuery = useQuery({
    queryKey: ["findallposts"],
    queryFn: FindPostFn.bind(this, slug, city),
  });

  useEffect(() => {
    try {
      postsQuery.refetch();
    } catch (error) {
      console.error(error);
    }
  }, [slug, city]);

  const props = {
    city,
    slug,
    data: postsQuery?.data,
    isPending: postsQuery?.isPending,
    categoryData: categoryQuery?.data,
    categoryIsPending: categoryQuery?.isPending,
  };

  return isMobile ? (
    <FilterPostMobile {...props} />
  ) : (
    <FilterPostDesktop {...props} />
  );
}

export default NewPost;
