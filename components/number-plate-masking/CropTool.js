import React, { useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from "react-cropper";
import 'cropperjs/dist/cropper.css';
import axios from 'axios';

const ImageCropper = () => {
    async function dataURLtoBlob(dataURL) {
        const response = await fetch(dataURL);
        const blob = await response.blob();
        return blob;
    };

    const [image, setImage] = useState(null);
    const cropperRef = useRef(null);
    const onCrop = async () => {
      const cropper = cropperRef.current?.cropper;
      const formData = new FormData();
      console.log("ye rha image ka object",cropper.getCroppedCanvas().toDataURL());
      const imageBlob = await dataURLtoBlob(cropper.getCroppedCanvas().toDataURL());
      formData.append('image', imageBlob, 'image.png');
    
      try {
        const response = await fetch('https://toolsapi.spyne.ai/api/uploadtos3', {
            method: 'POST',
            body: formData,
        });
    
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('Error sending cropped image:', error);
      }
    };
  
    const handleFileChange = (e) => {
      const selectedImage = e.target.files[0];
      setImage(URL.createObjectURL(selectedImage));
    };
  
  
    return (
        <div>
        <label className="custum-file-upload">
            <div className="icon">
                <img src="https://spyne-static.s3.amazonaws.com/try-page/upload-drop.svg" className='h-20 invert'></img>
            </div>
            <div className="text">
                <span className="text-spyne_blue-800 font-semibold">Bowse Files</span>
            </div>
            <input type="file" id="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>
        {image && (
          <Cropper
            ref={cropperRef}
            src={image}
            style={{ height: 400, width: '100%' }}
            aspectRatio={4 / 1}
            viewMode={0}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            // Other Cropper.js options can be passed here
          />
        )}
        <button onClick={onCrop}>Crop Image</button>
      </div>
    );
  };
  
  export default ImageCropper;
  