import React, { useState } from "react";
import { API_UPLOADED_IMAGES_URL } from "../../../../config";
import { ImageOffIcon } from "lucide-react";

const Images = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-[460px] h-[400px] pb-2/3  rounded-md">
        {images[0] ? (
          <img
            className="absolute w-full h-full inset-0 object-cover object-top rounded-md"
            src={`${API_UPLOADED_IMAGES_URL}${images[imageIndex]}`}
            alt="metal post thumbnail"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-md flex justify-center items-center text-gray-400">
            <ImageOffIcon size={32} />
            111
          </div>
        )}
      </div>
      <div className="flex flex-row gap-4 max-w-[460px] h-[100p]">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative w-[100px] h-[100px] pb-2/3  rounded-md"
            onClick={() => setImageIndex(index)}
          >
            {imageIndex !== index && (
              <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-45 rounded-md z-10"></div>
            )}
            <img
              className="absolute w-full h-full inset-0 object-cover object-top rounded-md z-0"
              src={`${API_UPLOADED_IMAGES_URL}${image}`}
              alt="metal post thumbnail"
            />
          </div>
        ))}
      </div>
      {/* <div className="relative w-[460px] h-[390px] pb-2/3  rounded-md">
        <img
          className="absolute w-full h-full inset-0 object-cover object-top rounded-md"
          src={`http://127.0.0.1:3500/uploads/${images[0]}`}
          alt="metal post thumbnail"
        />
      </div> */}
    </div>
  );
};

export default Images;
