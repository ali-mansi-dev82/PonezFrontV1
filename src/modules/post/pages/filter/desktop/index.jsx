import React from "react";
import MainContainer from "../../../../../shared/components/container";
import PostCard from "../../../components/post_card";
import { Link } from "react-router-dom";
import icons from "../../../../category/category_icons";
import SideFilter from "../side_filter";
import { ArrowRight } from "lucide-react";
import { CircularProgress } from "@mui/material";
import BasicLayoutDesktop from "../../../../../layouts/desktop/basic_layout";

function FilterPostDesktop({ slug, city, data, isPending, categoryData }) {
  return (
    <BasicLayoutDesktop>
      <MainContainer className={`w-full flex justify-between gap-5 py-8`}>
        <div className="flex flex-col gap-6 h-full w-1/5 sticky top-24">
          {categoryData?.link}
          <span className="text-xs text-gray-500">دسته ها</span>
          {slug ? (
            <div className="flex flex-col gap-4">
              <Link
                to={
                  !categoryData?.parent
                    ? `/s/`
                    : `/s/${categoryData?.parent?.slug}`
                }
                className={`flex flex-row items-center text-sm gap-2 text-gray-400 hover:text-gray-800 `}
              >
                <ArrowRight size={12} />
                <span>
                  {!categoryData?.parent
                    ? "همه اگهی ها"
                    : `بازگشت ${categoryData?.parent?.name}`}
                </span>
              </Link>
              <Link
                to={
                  city ? `/s/${categoryData?.slug}` : `/${categoryData?.slug}`
                }
                className="flex flex-row items-center gap-3 text-gray-800"
              >
                {categoryData?.icon !== "" && icons[categoryData?.icon]}
                <span className="text-sm ">{categoryData?.name}</span>
              </Link>
              <div className="flex flex-col gap-6 pr-8 py-3">
                {categoryData?.children?.map &&
                  categoryData?.children?.map((value, index) => (
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
          ) : !isPending ? (
            <>
              {categoryData?.length > 0
                ? categoryData?.map((value, index) => (
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full w-full lg:w-4/5 gap-5">
          {!isPending ? (
            <>
              {data?.result?.length > 0
                ? data?.result?.map((value, index) => (
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
    </BasicLayoutDesktop>
  );
}

export default FilterPostDesktop;
