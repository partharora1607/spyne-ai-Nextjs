import UploadPage from "@/components/common/upload-page/uploadPage";
import React, { useState } from "react";
import { useEffect } from 'react';


function upload1() {
  const [sampleImages, setSampleImages] = useState([]);
  useEffect(() => {
    fetch('https://www.clippr.ai/api/v2/product/fetchImages?auth_key=fe4a909f-9e2f-461f-98fc-51c22a21aac6&enterprise_id=TaD1VC1Ko&prod_cat_id=cat_d8R14zUNE')
      .then(response => response.json())
      .then(data => {
        const { data: responseData } = data; 
        const sampleImagesData = responseData.slice(0, 6).map(item => ({
          url: item.image_url
        }));
        setSampleImages(sampleImagesData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  return(<UploadPage 
          sampleImages={sampleImages}
          setSampleImages={setSampleImages}
          Toolname='car-background-replacement'
        />
  ) ;
}
export default upload1;
