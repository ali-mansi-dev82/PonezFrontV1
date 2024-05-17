import { Breadcrumbs } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PostBreadcrumbs = ({ bread_crumb, title }) => {
  return (
    <div class="line-clamp-1 h-[20px]">
      <Breadcrumbs
        separator="›"
        aria-label="breadcrumb"
      >
        {bread_crumb?.map((value, index) => (
          <div key={index}>
            <Link to={`/s/${value?.slug}`} className="text-gray-800 text-xs">
              {value?.name}
            </Link>
          </div>
        ))}
        <div className="text-gray-400 text-xs">{title}</div>
      </Breadcrumbs>
    </div>
  );
};
export default PostBreadcrumbs;
