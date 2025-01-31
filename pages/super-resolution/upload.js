import UploadPage from "@/components/common/upload-page/uploadPage";
import React, { useState } from "react";


function upload() {
  const [sampleImages, setSampleImages] = useState([
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage1.webp`
    },
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage2.webp`
    },
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage3.webp`
    },
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage4.webp`
    },
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage5.webp`
    },
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage6.webp`
    }
  ]);
  return(<UploadPage 
          sampleImages={sampleImages}
          setSampleImages={setSampleImages}
          Toolname='super-resolution'
        />
  ) ;
}
export default upload;
