import { useParams } from "react-router-dom";
import React, { useEffect } from "react";

import { useCity } from "../../../../context/CityContext";
import FilterPostDesktop from "./desktop";
import FilterPostMobile from "./mobile";
import { useGetPostsQuery } from "../../../../services/postService";
import { useGetCategorysQuery } from "../../../../services/categoryService";

function NewPost({ isMobile }) {
  const { city } = useCity();
  const { slug } = useParams();

  useEffect(() => window.scrollTo(0, 0), []);

  const {
    data: PostData,
    isLoading: PostLoading,
    refetch: PostRefetch,
  } = useGetPostsQuery({ slug, city });

  const {
    data: CategoryData,
    isLoading: CategoryLoading,
    refetch: CategoryRefetch,
  } = useGetCategorysQuery(slug);

  useEffect(() => {
    try {
      CategoryRefetch();
    } catch (error) {
      console.error(error);
    }
  }, [slug, CategoryRefetch]);

  useEffect(() => {
    try {
      PostRefetch();
    } catch (error) {
      console.error(error);
    }
  }, [slug, city, PostRefetch]);

  const props = {
    city,
    slug,
    data: PostData,
    isPending: PostLoading,
    categoryData: CategoryData,
    categoryIsPending: CategoryLoading,
  };

  return isMobile ? (
    <FilterPostMobile {...props} />
  ) : (
    <FilterPostDesktop {...props} />
  );
}

export default NewPost;
