import { ChevronLeftIcon, MoveRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import icons from "../../category/category_icons";

const SearchItemComponent = ({ id, slug, name, isBack = false, icon = "" }) => {
  return (
    <Link
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
    </Link>
  );
};
export default SearchItemComponent;
