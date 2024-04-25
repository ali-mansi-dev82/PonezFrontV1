import React from "react";

function MainContainer({ children, className }) {
  return (
    <div
      className={`container text-gray-800 lg:max-w-[1340px] lg:min-w-[800px] lg:w-[88%] mx-auto px-3 lg:px-0 lg:h-[64px] ${className}`}
    >
      {children}
    </div>
  );
}

export default MainContainer;
