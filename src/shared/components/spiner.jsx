import React from "react";

export default function Spinner({ size }) {
  return (
    <div className="w-full flex justify-center items-center py-56 col-span-3">
      <span className="loading loading-spinner loading-md"></span>
    </div>
  );
}
