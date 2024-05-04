import React from "react";
import MainContainer from "../../../../../shared/components/container";
import PostCard from "../../../components/post_card";
import { Link } from "react-router-dom";
import icons from "../../../../category/category_icons";
import { CircularProgress } from "@mui/material";
import BasicLayoutMobile from "../../../../../layouts/mobile/basic_layout";

function FilterPostMobile({ slug, city, data, isPending, categoryData }) {
  return (
    <BasicLayoutMobile>
      <MainContainer
        className={`w-full flex flex-col justify-between gap-10 py-8`}
      >
        <div className="grid grid-cols-4 gap-y-8 h-max w-full">
          {categoryData?.link}
          {slug ? (
            <>
              <>
                {categoryData?.children?.map &&
                  categoryData?.children?.map((value, index) => (
                    <Link
                      key={index}
                      to={city ? `/s/${value.slug}` : `/${value.slug}`}
                      className="flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-800"
                    >
                      {categoryData?.icon !== "" && (
                        <span className="bg-gray-200 p-3 rounded-lg text-primary-default">
                          {icons[categoryData?.icon]}
                        </span>
                      )}
                      <span className="text-xs text-center text-gray-500">
                        {value.name}
                      </span>
                    </Link>
                  ))}
              </>
            </>
          ) : !isPending ? (
            <>
              {categoryData?.length > 0
                ? categoryData?.map((value, index) => (
                    <Link
                      key={index}
                      to={city ? `/s/${value.slug}` : `/${value.slug}`}
                      className={`flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-800`}
                    >
                      <span className="bg-gray-200 p-3 rounded-lg text-primary-default">
                        {value.icon !== "" && icons[value.icon]}
                      </span>
                      <span className="text-xs text-center text-gray-500">
                        {value.name}
                      </span>
                    </Link>
                  ))
                : ""}
            </>
          ) : (
            <div className="w-full flex justify-center items-center py-56 col-span-3">
              <CircularProgress />
            </div>
          )}
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
    </BasicLayoutMobile>
  );
}

export default FilterPostMobile;
