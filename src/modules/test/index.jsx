import React, {  useState } from "react";
import MainContainer from "../../shared/components/container";
import UploadImages from "../image/components/upload_image";
import { uploadImageFn } from "../image/mutation";

const Index = () => {
  const [images, setImages] = useState([]);
  // useEffect(() => console.log(images), [images]);
  return (
    <MainContainer className={`w-full flex justify-center gap-5 py-12`}>
      <UploadImages
        images={images}
        setImages={setImages}
        uploadImageFn={uploadImageFn}
      />
    </MainContainer>
  );
};

export default Index;
