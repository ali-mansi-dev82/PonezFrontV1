import React from "react";
import PostCard from "../../../components/post_card";
import { Link } from "react-router-dom";
import icons from "../../../../category/category_icons";
import SideFilter from "../side_filter";
import { ArrowRight } from "lucide-react";
import BasicLayoutDesktop from "../../../../../layouts/desktop/basic_layout";
import PostCardSkeleton from "../../../components/post_card_skeleton";
import TextSkeleton from "../../../components/text_skeleton";

function FilterPostDesktop({
  slug,
  city,
  data,
  isPending,
  categoryData,
  categoryIsPending,
}) {
  return (
    <BasicLayoutDesktop>
      <div className="flex flex-col gap-6 h-full w-1/5 sticky top-24">
        <span className="text-xs text-gray-500">دسته ها</span>
        {categoryIsPending ? (
          "0"
            .repeat(3)
            .split("")
            .map(() => <TextSkeleton />)
        ) : slug ? (
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
              to={`/s/${categoryData?.slug}`}
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
                    to={`/s/${value.slug}`}
                    className="flex flex-row items-center gap-2 text-gray-400 hover:text-gray-800"
                  >
                    {value.icon !== "" && icons[value.icon]}
                    <span className="text-sm ">{value.name}</span>
                  </Link>
                ))}
            </div>
          </div>
        ) : (
          categoryData?.length > 0 &&
          categoryData?.map((value, index) => (
            <Link
              key={index}
              to={city ? `/s/${value.slug}` : `/${value.slug}`}
              className={`flex flex-row items-center gap-2 text-gray-400 hover:text-gray-800`}
            >
              {value.icon !== "" && icons[value.icon]}
              <span className="text-xs ">{value.name}</span>
            </Link>
          ))
        )}

        <SideFilter />
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
    </BasicLayoutDesktop>
  );
}

export default FilterPostDesktop;
