import React from "react";
import PostCard from "../../../components/post_card";
import { Link } from "react-router-dom";
import { CategoryIconsSm } from "../../../../category/category_icons";
import BasicLayoutDesktop from "../../../../../layouts/desktop/basic_layout";
import PostCardSkeleton from "../../../components/post_card_skeleton";
import TextSkeleton from "../../../components/text_skeleton";
import { MoveRightIcon } from "lucide-react";
import EmptyState from "../empty_state";

function FilterPostDesktop({
  slug,
  city,
  data,
  isPending,
  categoryData,
  categoryIsPending,
}) {
  return (
    <BasicLayoutDesktop containerClass="">
      <div className="w-full h-full flex flex-col gap-12">
        <div className="grid grid-cols-8 gap-y-8 gap-x-1 h-max w-full">
          {categoryIsPending ? (
            <div className="col-span-4">
              <TextSkeleton />
            </div>
          ) : slug ? (
            <>
              <Link
                to={
                  !categoryData?.parent
                    ? `/s/`
                    : `/s/${categoryData?.parent?.slug}`
                }
                className="flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-800"
              >
                <span className="bg-gray-100 p-4 rounded-full text-primary-default">
                  <MoveRightIcon size={24} className="!stroke-[1px]" />
                </span>
                <span className="text-xs text-center text-gray-500">
                  {!categoryData?.parent
                    ? "همه اگهی ها"
                    : `بازگشت ${categoryData?.parent?.name}`}
                </span>
              </Link>
              {categoryData?.children?.map &&
                categoryData?.children?.map((value, index) => (
                  <Link
                    key={index}
                    to={city ? `/s/${value.slug}` : `/${value.slug}`}
                    className="flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-800"
                  >
                    {value.icon !== "" && (
                      <span className="bg-gray-100 p-4 rounded-full text-primary-default">
                        {value.icon !== "" && CategoryIconsSm[value.icon]}
                      </span>
                    )}
                    <span className="text-xs text-center text-gray-500">
                      {value.name}
                    </span>
                  </Link>
                ))}
            </>
          ) : (
            categoryData?.length > 0 &&
            categoryData?.map((value, index) => (
              <Link
                key={index}
                to={city ? `/s/${value.slug}` : `/${value.slug}`}
                className={`flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-800`}
              >
                {value.icon !== "" && (
                  <span className="bg-gray-100 p-4 rounded-full text-primary-default">
                    {value.icon !== "" && CategoryIconsSm[value.icon]}
                  </span>
                )}
                <span className="text-xs text-center text-gray-500">
                  {value.name}
                </span>
              </Link>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full w-full gap-5">
          {categoryData?.name && (
            <div className="text-xs col-span-3 text-gray-800">
              {categoryData?.name} در{" "}
              <span className="text-gray-400">{city}</span>
            </div>
          )}
          {isPending ? (
            "0"
              .repeat(12)
              .split("")
              .map(() => <PostCardSkeleton />)
          ) : data?.result?.length > 0 ? (
            data?.result?.map((value, index) => (
              <PostCard key={index} {...value} />
            ))
          ) : (
            <div className="col-span-3 py-20">
              <EmptyState />
            </div>
          )}
        </div>
      </div>
    </BasicLayoutDesktop>
  );
}

export default FilterPostDesktop;
