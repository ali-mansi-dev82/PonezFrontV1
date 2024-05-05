import React from "react";

const PostDescription = ({ desription }) => {
  return (
    <>
      {desription && desription.length > 0 && (
        <div className="flex flex-col gap-1 w-full h-max">
          <h6 className="text-gray-700 text-sm lg:text-md font-semibold">توضیحات</h6>
          <p
            dangerouslySetInnerHTML={{
              __html: desription.replaceAll("\n", "<br />"),
            }}
            className="text-gray-500 text-sm leading-8 max-w-[500px] vazir font-Vazir Fanum"
          ></p>
        </div>
      )}
    </>
  );
};
export default PostDescription;
