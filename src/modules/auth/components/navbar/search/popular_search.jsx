import { Chip } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const mostSearched = [
  {
    label: "خودرو",
    link: `/s/cars-parent`,
  },
  {
    label: "اجاره آپارتمان",
    link: `/s/apartment-rent`,
  },
  {
    label: "فروش مسکونی",
    link: `/s/residential-sell-parent`,
  },
  {
    label: "گوشی موبایل",
    link: `/s/mobile-phones`,
  },
  {
    label: "موتورسیکلت",
    link: `/s/motorcycles`,
  },
  {
    label: "کفش و لباس",
    link: `/s/clothing-and-shoes-parent`,
  },
  {
    label: "زیورآلات و اکسسوری",
    link: `/s/clothing-and-shoes-parent`,
  },
  {
    label: "رایانه",
    link: `/s/clothing-and-shoes-parent`,
  },
];

const PopularSearch = ({ onClose }) => {
  return (
    <div className="flex flex-col lg:p-5 gap-4">
      <h1 className="text-sm text-gray-500">بیشترین جستجوهای پونز</h1>
      <div className="flex flex-row flex-wrap gap-2 text-gray-400">
        {mostSearched.map((value, index) => (
          <Link key={index} to={value.link} onClick={onClose}>
            <Chip
              size="small"
              sx={{ padding: "6px" }}
              label={value.label}
              variant="outlined"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default PopularSearch;
