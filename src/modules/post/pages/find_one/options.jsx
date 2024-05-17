import React from "react";
import { tomanCurrencyFormat } from "../../../../shared/util/numberFormat";

const PostOptions = ({ options, amount }) => {
  return (
    <>
      {options &&
        options?.map((key, index) => (
          <div
            key={index}
            className="w-full flex justify-between items-center border-b border-gray-200 pb-4"
          >
            <div className="text-gray-400 text-sm lg:text-md w-1/3">{key.title}</div>
            <div className="Fanum text-sm lg:text-md text-left w-2/3">
              {key.type === "currency"
                ? tomanCurrencyFormat(key.value)
                : key.value}
            </div>
          </div>
        ))}
      
    </>
  );
};
export default PostOptions;
