import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FindChildrenCategorybySlugFn } from "../../../query";
import SingleLayoutMobile from "../../../../../layouts/mobile/single_layout";
import { ChevronLeftIcon, MoveRight } from "lucide-react";
import icons from "../../../../category/category_icons";
import { useNavigate } from "react-router-dom";

const SearchItemComponent = ({
  slug,
  name,
  isBack = false,
  icon = "",
  onClick,
  children,
}) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={
        children?.length === 0 ? navigate.bind(this, `/s/${slug}`) : onClick
      }
      to={`/new?slug=${slug}`}
      className={`w-full flex ${
        isBack ? "gap-3" : "justify-between"
      } border-b border-gray-200 py-4 items-center cursor-pointer`}
    >
      {isBack && (
        <span>
          <MoveRight size={"18px"} className="text-gray-500" />
        </span>
      )}
      <div className="flex items-center gap-3">
        {icon !== "" && icons[icon]}
        <p>{name}</p>
      </div>

      {!isBack && (
        <span>
          <ChevronLeftIcon size={"18px"} className="text-gray-500" />
        </span>
      )}
    </div>
  );
};

const ShowCategoryMobile = () => {
  const [selected, setSelected] = useState("root");

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: FindChildrenCategorybySlugFn.bind(this, "root"),
  });

  return (
    <SingleLayoutMobile title="دسته ها" buttonNavigationSelected="category">
      <div className="w-full flex flex-col">
        {selected !== "root" ? (
          <>
            <SearchItemComponent
              onClick={setSelected.bind(this, "root")}
              isBack
              name={`بازگشت `}
            />
            {selected?.children.map((value, index) => (
              <SearchItemComponent
                key={index}
                {...value}
                onClick={setSelected.bind(this, value)}
              />
            ))}
          </>
        ) : (
          categoryQuery?.data &&
          categoryQuery?.data.length > 0 &&
          categoryQuery?.data?.map((value, index) => (
            <SearchItemComponent
              key={index}
              {...value}
              onClick={setSelected.bind(this, value)}
            />
          ))
        )}
      </div>
    </SingleLayoutMobile>
  );
};
export default ShowCategoryMobile;
