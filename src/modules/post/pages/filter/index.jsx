import React, { useEffect } from "react";
import MainContainer from "../../../../shared/components/container";
import PostCard from "../../components/post_card";
import { useMutation } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { useCity } from "../../../../context/CityContext";
import icons from "../../../category/category_icons";
import { FindPostFn } from "../../mutation";
import { FindChildrenCategorybySlugFn } from "../../../category/query";
import SideFilter from "./side_filter";
import { ArrowRight } from "lucide-react";
import { CircularProgress } from "@mui/material";

function NewPost() {
  const { city } = useCity();
  const { slug } = useParams();

  const categoryQuery = useMutation({
    mutationFn: FindChildrenCategorybySlugFn.bind(this),
  });

  useEffect(() => {
    try {
      categoryQuery.mutate(slug ?? "root");
    } catch (error) {
      console.error(error);
    }
  }, [slug]);

  const postsQuery = useMutation({
    mutationKey: ["findallposts"],
    mutationFn: FindPostFn.bind(this, slug, city),
  });

  useEffect(() => {
    try {
      postsQuery.mutateAsync();
    } catch (error) {
      console.error(error);
    }
  }, [slug, city]);

  return (
    <MainContainer className={`w-full flex justify-between gap-5 py-12`}>
      <div className="flex flex-col gap-6 h-full w-1/5 sticky top-24">
        {categoryQuery?.data?.link}
        <span className="text-xs text-gray-500">دسته ها</span>
        {slug ? (
          <div className="flex flex-col gap-4">
            <Link
              to={
                !categoryQuery?.data?.parent
                  ? `/s/`
                  : `/s/${categoryQuery?.data?.parent?.slug}`
              }
              className={`flex flex-row items-center text-sm gap-2 text-gray-400 hover:text-gray-800 `}
            >
              <ArrowRight size={12} />
              <span>
                {!categoryQuery?.data?.parent
                  ? "همه اگهی ها"
                  : `بازگشت ${categoryQuery?.data?.parent?.name}`}
              </span>
            </Link>
            <Link
              to={
                city
                  ? `/s/${categoryQuery?.data?.slug}`
                  : `/${categoryQuery?.data?.slug}`
              }
              className="flex flex-row items-center gap-3 text-gray-800"
            >
              {categoryQuery?.data?.icon !== "" &&
                icons[categoryQuery?.data?.icon]}
              <span className="text-sm ">{categoryQuery?.data?.name}</span>
            </Link>
            <div className="flex flex-col gap-6 pr-8 py-3">
              {categoryQuery?.data?.children?.map &&
                categoryQuery?.data?.children?.map((value, index) => (
                  <Link
                    key={index}
                    to={city ? `/s/${value.slug}` : `/${value.slug}`}
                    className="flex flex-row items-center gap-2 text-gray-400 hover:text-gray-800"
                  >
                    {value.icon !== "" && icons[value.icon]}
                    <span className="text-sm ">{value.name}</span>
                  </Link>
                ))}
            </div>
          </div>
        ) : !categoryQuery?.isPending ? (
          <>
            {categoryQuery?.data?.length > 0
              ? categoryQuery?.data?.map((value, index) => (
                  <Link
                    key={index}
                    to={city ? `/s/${value.slug}` : `/${value.slug}`}
                    className={`flex flex-row items-center gap-2 text-gray-400 hover:text-gray-800`}
                  >
                    {value.icon !== "" && icons[value.icon]}
                    <span className="text-xs ">{value.name}</span>
                  </Link>
                ))
              : ""}
          </>
        ) : (
          <div className="w-full flex justify-center items-center py-56 col-span-3">
            <CircularProgress />
          </div>
        )}

        <SideFilter />
      </div>
      
      <div className="grid grid-cols-3 h-full w-4/5 gap-5">
        {!postsQuery?.isPending ? (
          <>
            {postsQuery?.data?.result?.length > 0
              ? postsQuery?.data?.result?.map((value, index) => (
                  <PostCard key={index} {...value} />
                ))
              : "هیچ اگهی وجود ندارد"}
          </>
        ) : (
          <div className="w-full flex justify-center items-center py-56 col-span-3">
            <CircularProgress />
          </div>
        )}
      </div>
    </MainContainer>
  );
}

export default NewPost;
