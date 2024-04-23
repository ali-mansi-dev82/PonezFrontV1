import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MainContainer from "../../../../shared/components/container";
import New from "./new";
import SearchItemComponent from "../../components/search_item";
import {
  FindChildrenCategorybySlugFn,
  SearchCategoryFn,
} from "../../../category/query";
import { isEmpty } from "../../../../shared/util/functions";
import { TextField } from "@mui/material";

const Index = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("slug");
  const [searchInput, setSearchInput] = useState("");
  const [senario, setSenario] = useState(0);

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: FindChildrenCategorybySlugFn.bind(this, slug),
    enabled: false,
  });

  const searchCategoryQuery = useQuery({
    queryKey: ["search_categories"],
    queryFn: SearchCategoryFn.bind(this, searchInput),
    enabled: false,
  });

  const searchInputHandler = async (e) => {
    setSenario(-1);
    const value = await e.target.value;
    if (value === "") {
      return setSearchInput("");
    }
    await setSearchInput(value);
    searchCategoryQuery.refetch();
  };

  useEffect(() => {
    const fn = async () => {
      if (!(await isEmpty(slug)) && slug.length >= 1) {
        if (slug === "root") setSenario(1); //senario 2
        else setSenario(2); //senario 3
        return await categoryQuery.refetch();
      }
      setSenario(0); //senario 1
    };
    fn();
  }, [slug]);

  return (
    <MainContainer className={`w-full flex justify-center gap-5 py-12`}>
      <div className="flex flex-col w-[600px] gap-0">
        {/* we have 4 Senario */}
        {/* Search */}
        {!(senario === 2 && categoryQuery?.data?.children?.length <= 0) && (
          <>
            <h6 className="w-full text-lg text-gray-800 mb-3">
              چه چیزی آگهی می‌کنید؟
            </h6>
            <p className="w-full text-sm text-gray-400 mb-4">
              با جستجو در کادر زیر، دستهٔ آگهی را انتخاب کنید.
            </p>
            <TextField
              variant="outlined"
              size="small"
              sx={{ marginBottom: "1rem" }}
              placeholder="مثلا: اجاره مسکونی، ماشین، لباس، کفش ..."
              onChange={searchInputHandler}
            />
          </>
        )}

        {senario === -1 && (
          <>
            {searchCategoryQuery?.data && searchCategoryQuery?.data.length > 0
              ? searchCategoryQuery?.data?.map((value, index) => {
                  return (
                    <SearchItemComponent
                      key={index}
                      id={value?._id}
                      icon={value?.icon}
                      name={value?.name}
                      slug={value?.slug}
                    />
                  );
                })
              : "دسته بندی پیدا نشد!!"}
          </>
        )}
        {/* No Slug */}
        {senario === 0 && (
          <>
            <SearchItemComponent
              id={"root"}
              name={"دیدن تمام دسته بندی های پونز"}
              slug={"root"}
            />
          </>
        )}
        {/* Root Slug */}
        {senario === 1 && (
          <>
            {categoryQuery?.data &&
              categoryQuery?.data.length > 0 &&
              categoryQuery?.data?.map((value, index) => {
                return (
                  <>
                    <SearchItemComponent
                      key={index}
                      id={value?._id}
                      icon={value?.icon}
                      name={value?.name}
                      slug={value?.slug}
                    />
                  </>
                );
              })}
          </>
        )}
        {/* Any Slug */}
        {senario === 2 && (
          <>
            {categoryQuery?.data?.children &&
            categoryQuery?.data?.children?.length > 0 ? (
              <>
                <SearchItemComponent
                  id={categoryQuery?.data?.slug}
                  isBack
                  name={
                    categoryQuery?.data?.parent === null
                      ? "بازگشت به همه دسته بندی ها"
                      : "بازگشت به " + categoryQuery?.data?.parent?.name
                  }
                  slug={
                    categoryQuery?.data?.parent === null
                      ? "root"
                      : categoryQuery?.data?.parent?.slug
                  }
                />
                {categoryQuery?.data?.children?.map((value, index) => {
                  return (
                    <SearchItemComponent
                      key={index}
                      id={value?._id}
                      name={value?.name}
                      slug={value?.slug}
                    />
                  );
                })}
              </>
            ) : (
              <New
                id={categoryQuery?.data?._id}
                name={categoryQuery?.data?.name}
                slug={categoryQuery?.data?.slug}
              />
            )}
          </>
        )}
      </div>
    </MainContainer>
  );
};
export default Index;
