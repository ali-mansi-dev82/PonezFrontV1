import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronLeftIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { FindCategoryFn } from "../../../../category/query";
import { Link } from "react-router-dom";
import { CategoryIconsXs } from "../../../../category/category_icons";
import Button from "../../../../../shared/components/button";
import Spinner from "../../../../../shared/components/spiner";

const Categories = ({ isCategoryOpen, toggle_category }) => {
  const [category, setCategory] = useState();

  const categoryQuery = useQuery({
    queryKey: ["drop_categories"],
    queryFn: FindCategoryFn.bind(this),
  });

  useEffect(() => {
    if (categoryQuery?.data?.length > 0) setCategory(categoryQuery?.data[0]);
  }, [categoryQuery?.data]);

  return (
    <>
      <section className="relative">
        <Button
          size="small"
          variant="textonly"
          className={isCategoryOpen && `!bg-gray-100`}
          rightIcon={
            <ChevronDownIcon
              className={isCategoryOpen && `rotate-180`}
              size={"12px"}
            />
          }
          onClick={toggle_category}
        >
          دسته ها
        </Button>
        {isCategoryOpen && (
          <>
            <div
              onClick={toggle_category}
              className="fixed top-[64px] left-0 right-0 bottom-0 bg-black bg-opacity-25 z-0"
            ></div>
            <div className="absolute top-[130%] flex gap-4 right-0 bg-white z-30 w-[50vw] rounded-md p-6 drop-shadow-modal">
              {categoryQuery?.data ? (
                <>
                  <div className="w-1/4 flex flex-col gap-2 border-l pl-3">
                    {categoryQuery?.data?.map((value, index) => (
                      <Link
                        key={index}
                        onMouseEnter={setCategory.bind(this, value)}
                        onClick={toggle_category}
                        to={`/s/${value.slug}`}
                        className={`flex flex-row justify-between items-center gap-2 text-gray-400  px-2 py-2 rounded-lg ${
                          category?._id === value._id
                            ? `bg-gray-100 text-gray-800`
                            : `hover:bg-gray-100 hover:text-gray-800`
                        }`}
                      >
                        <span className="flex gap-2 items-center">
                          {value.icon !== "" && CategoryIconsXs[value.icon]}
                          <span className="text-xs">{value.name}</span>
                        </span>
                        <ChevronLeftIcon size={14} />
                      </Link>
                    ))}
                  </div>
                  <div className="w-3/4 flex flex-col gap-1">
                    {category?.children &&
                      category?.children.length > 0 &&
                      category?.children?.map((value, index) => (
                        <div className="flex flex-col gap-4 pb-8">
                          <Link
                            key={index}
                            to={`/s/${value.slug}`}
                            onClick={toggle_category}
                            className={`flex flex-row items-center gap-2 text-gray-800`}
                          >
                            <span className="text-sm">{value.name}</span>
                          </Link>
                          {value?.children && value?.children.length > 0 && (
                            <div className="flex flex-col gap-2">
                              {value?.children &&
                                value?.children?.map((value, index) => (
                                  <Link
                                    key={index}
                                    to={`/s/${value.slug}`}
                                    onClick={toggle_category}
                                    className={`flex flex-row items-center gap-2 text-gray-400 hover:text-primary-default`}
                                  >
                                    <span className="text-xs">
                                      {value.name}
                                    </span>
                                  </Link>
                                ))}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                <Spinner />
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Categories;
