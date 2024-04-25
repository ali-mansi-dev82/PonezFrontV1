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
            <div className="text-gray-400 text-md">{key.title}</div>
            <div className="Fanum text-md">
              {key.type === "currency"
                ? tomanCurrencyFormat(key.value)
                : key.value}
            </div>
          </div>
        ))}
      <div className="w-full flex justify-between items-center border-b border-gray-200 pb-4">
        <div className="text-gray-400 text-md">قیمت</div>
        <div className="Fanum text-md">
          {amount && amount > 0 ? tomanCurrencyFormat(amount) : "توافقی"}
        </div>
      </div>
    </>
  );
};
export default PostOptions;
