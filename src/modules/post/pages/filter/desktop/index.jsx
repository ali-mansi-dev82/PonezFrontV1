import { MoveRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import React from "react";

import BasicLayoutDesktop from "../../../../../layouts/desktop/basic_layout";
import { CategoryIconsSm } from "../../../../category/category_icons";
import TextSkeleton from "../../../components/text_skeleton";
import CardsPreview from "../cards_preview";
import SpecialPost from "../special_post";

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
        {!slug && <SpecialPost />}
        <CardsPreview
          categoryData={categoryData}
          isPending={isPending}
          city={city}
          data={data}
        />
      </div>
    </BasicLayoutDesktop>
  );
}

export default FilterPostDesktop;
