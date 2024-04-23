import React from "react";

function MainContainer({ children, className }) {
  return (
    <div
      className={`container text-gray-800 max-w-[1340px] min-w-[800px] w-[88%] mx-auto ${className}`}
    >
      {children}
    </div>
  );
}

export default MainContainer;
