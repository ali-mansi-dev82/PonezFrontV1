import { Chip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PopularSearch = () => {
  return (
    <div className="flex flex-col p-5 gap-4">
      <h1 className="text-sm text-gray-500">بیشترین جستجوهای پونز</h1>
      <div className="flex flex-row flex-wrap gap-2 text-gray-400">
        <Link to={`/s/cars-parent`}>
          <Chip
            size="small"
            sx={{ padding: "6px" }}
            label="خودرو"
            variant="outlined"
          />
        </Link>
        <Link to={`/s/apartment-rent`}>
          <Chip
            size="small"
            sx={{ padding: "6px" }}
            label="اجاره آپارتمان"
            variant="outlined"
          />
        </Link>
        <Link to={`/s/residential-sell-parent`}>
          <Chip
            size="small"
            sx={{ padding: "6px" }}
            label="فروش مسکونی"
            variant="outlined"
          />
        </Link>
        <Link to={`/s/mobile-phones`}>
          <Chip
            size="small"
            sx={{ padding: "6px" }}
            label="گوشی موبایل"
            variant="outlined"
          />
        </Link>
        <Link to={`/s/motorcycles`}>
          <Chip
            size="small"
            sx={{ padding: "6px" }}
            label="موتورسیکلت"
            variant="outlined"
          />
        </Link>
        <Link to={`/s/clothing-and-shoes-parent`}>
          <Chip
            size="small"
            sx={{ padding: "6px" }}
            label="کفش و لباس"
            variant="outlined"
          />
        </Link>
        <Link to={`/s/jewelry-and-watches-parent`}>
          <Chip
            size="small"
            sx={{ padding: "6px" }}
            label="زیورآلات و اکسسوری"
            variant="outlined"
          />
        </Link>
        <Link to={`/s/computers-parent`}>
          <Chip
            size="small"
            sx={{ padding: "6px" }}
            label="رایانه"
            variant="outlined"
          />
        </Link>
        <Link to={`/s/jobs-parent`}>
          <Chip
            size="small"
            sx={{ padding: "6px" }}
            label="استخدام و کاریابی"
            variant="outlined"
          />
        </Link>
      </div>
    </div>
  );
};
export default PopularSearch;
