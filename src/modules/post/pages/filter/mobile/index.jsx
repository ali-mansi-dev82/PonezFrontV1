import React from "react";
import { Link } from "react-router-dom";
import icons from "../../../../category/category_icons";
import BasicLayoutMobile from "../../../../../layouts/mobile/basic_layout";
import TextSkeleton from "../../../components/text_skeleton";
import CardsPreview from "../cards_preview";
import SpecialPost from "../special_post";

function FilterPostMobile({
  slug,
  city,
  data,
  isPending,
  categoryData,
  categoryIsPending,
}) {
  return (
    <BasicLayoutMobile
      searchText={categoryData?.name}
      filter={
        categoryData?.name && [{ value: categoryData?.name, key: "دسته" }]
      }
    >
      {categoryIsPending ? (
        <div className="col-span-4">
          <TextSkeleton />
        </div>
      ) : slug ? (
        categoryData?.children?.length > 0 && (
          <div className="grid grid-cols-4 gap-y-8 gap-x-1 h-max w-full">
            {categoryData?.children?.map((value, index) => (
              <Link
                key={index}
                to={city ? `/s/${value.slug}` : `/${value.slug}`}
                className="flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-800"
              >
                {value.icon !== "" && (
                  <span className="bg-gray-100 p-4 rounded-full text-primary-default">
                    {value.icon !== "" && icons[value.icon]}
                  </span>
                )}
                <span className="text-xs text-center text-gray-500">
                  {value.name}
                </span>
              </Link>
            ))}
          </div>
        )
      ) : (
        <div className="grid grid-cols-4 gap-y-8 gap-x-1 h-max w-full">
          {categoryData?.length > 0 &&
            categoryData?.map((value, index) => (
              <Link
                key={index}
                to={city ? `/s/${value.slug}` : `/${value.slug}`}
                className={`flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-800`}
              >
                {value.icon !== "" && (
                  <span className="bg-gray-100 p-4 rounded-full text-primary-default">
                    {value.icon !== "" && icons[value.icon]}
                  </span>
                )}
                <span className="text-xs text-center text-gray-500">
                  {value.name}
                </span>
              </Link>
            ))}
        </div>
      )}
      {!slug && <SpecialPost />}
      <CardsPreview
        categoryData={categoryData}
        isPending={isPending}
        city={city}
        data={data}
      />
    </BasicLayoutMobile>
  );
}

export default FilterPostMobile;
