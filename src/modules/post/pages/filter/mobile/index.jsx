import React from "react";
import PostCard from "../../../components/post_card";
import { Link } from "react-router-dom";
import icons from "../../../../category/category_icons";
import BasicLayoutMobile from "../../../../../layouts/mobile/basic_layout";
import PostCardSkeleton from "../../../components/post_card_skeleton";
import TextSkeleton from "../../../components/text_skeleton";

function FilterPostMobile({
  slug,
  city,
  data,
  isPending,
  categoryData,
  categoryIsPending,
}) {
  return (
    <BasicLayoutMobile>
      <div className="grid grid-cols-4 gap-y-8 gap-x-1 h-max w-full">
        {categoryIsPending ? (
          <div className="col-span-4">
            <TextSkeleton />
          </div>
        ) : slug ? (
          categoryData?.children?.map &&
          categoryData?.children?.map((value, index) => (
            <Link
              key={index}
              to={city ? `/s/${value.slug}` : `/${value.slug}`}
              className="flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-800"
            >
              {value.icon !== "" && (
                <span className="bg-gray-200 p-3 rounded-lg text-primary-default">
                  {value.icon !== "" && icons[value.icon]}
                </span>
              )}
              <span className="text-xs text-center text-gray-500">
                {value.name}
              </span>
            </Link>
          ))
        ) : (
          categoryData?.length > 0 &&
          categoryData?.map((value, index) => (
            <Link
              key={index}
              to={city ? `/s/${value.slug}` : `/${value.slug}`}
              className={`flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-800`}
            >
              {value.icon !== "" && (
                <span className="bg-gray-200 p-3 rounded-lg text-primary-default">
                  {value.icon !== "" && icons[value.icon]}
                </span>
              )}
              <span className="text-xs text-center text-gray-500">
                {value.name}
              </span>
            </Link>
          ))
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full w-full lg:w-4/5 gap-5">
        {isPending
          ? "0"
              .repeat(12)
              .split("")
              .map(() => <PostCardSkeleton />)
          : data?.result?.length > 0
          ? data?.result?.map((value, index) => (
              <PostCard key={index} {...value} />
            ))
          : "هیچ اگهی وجود ندارد"}
      </div>
    </BasicLayoutMobile>
  );
}

export default FilterPostMobile;
