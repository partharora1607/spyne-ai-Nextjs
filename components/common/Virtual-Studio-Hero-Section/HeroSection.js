/**
 * @format
 */
import BeforeAfterSlider from "../sliders/BeforeAfterSlider";
import Image from "next/image";
import { useRouter } from 'next/router';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { setVariable } from '../../../store/actions';
import { setBoolean } from '../../../store/actions';
import { backgroundHeroSectionData } from "@/components/background-removal/config";

function Herosection({ heroSectionData, sampleImages, setSampleImages, Toolname }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const toUploadPage = () => {
    dispatch(setBoolean(true));
    router.push('/' + Toolname + '/upload');
  };
  const handleFileChange = (event) => {

    const selectedFile = event.target.files[0];
    handleSubmit(event, selectedFile);
  };
  const handleSubmit = async (event, selectedFile) => {

    // Create a FormData object
    const formData = new FormData();
    formData.append('image', selectedFile);

    if(selectedFile == null){
        
    }
    else{
        try {
            // Send the image file to the API
            const response = await fetch('https://toolsapi.spyne.ai/api/uploadtos3', {
                method: 'POST',
                body: formData,
            });
    
            // Get the API response data
            const data = await response.json();
            dispatch(setVariable(data));
    
            
            router.push({
                pathname: '/' + Toolname + '/result',
            });
            } catch (error) {
            console.error('Error:', error);
            }
    }


  };
    //Handle Default Images
    const defaultImageHandler = (imageurlvalue) => {
        
      // const defaultImageUrl = { imageUrl: event.target.src} ;
      dispatch(setVariable(imageurlvalue));
      router.push('/' + Toolname + '/result');
  };
  
  return (
    <section className="xl:py-16 md:py-10 px-4 py-10">
      <div className="container md:px-2">
        <div className="grid grid-cols-12 gap-x-5">
          <div className="md:col-span-6 col-span-12 order-2 sm:order-1">
            <div className="md:pr-[17%] lg:pr-[15%] mb-6 xl:mb-6 md:mb-3">
              <h1 className="xl:mb-4 mb-4 md:mb-2 text-black-800">
                  
                <span className=" text-spyne_blue">
                  {heroSectionData?.heading?.spynebluetitle}
                </span>
                {heroSectionData?.heading?.title}
                
              </h1>
              <div className="lg:pr-[25%] lg:text-base font-normal !text-black-800">
                {heroSectionData?.subHeading?.title}
                <span className=" text-spyne_blue-800">
                  <a href={heroSectionData?.subHeading?.url}>
                    {heroSectionData?.subHeading?.subtile}
                  </a>
                </span>
              </div>
            </div>
            <div className="uploadBox bg-spyne_blue-20 border-spyne_blue-200 p-4 border-dashed border rounded-xl text-center lg:pt-5 pt-5 md:p-3">
              <a href="https://console.spyne.ai/virtualstudio">
              <span className="h-24 w-full opacity-0 block"/>
              <div className="xl:text-[16px] md:text-[12px] text-[12px] leading-3 text-black-600 mb-2 font-normal">
                <small className="text-black-800 block font-semibold">
                  {heroSectionData?.dropZone?.smallText}
                </small>
                {/* <p className="text-[12px]">{heroSectionData?.dropZone?.resolutionText}</p> */}
                
              </div>
              {/* <form onSubmit={handleSubmit} className="uploadForm">
                <input type="file" accept="image/*" onChange={handleFileChange} /> */}
                {/* <button type="submit">Upload</button> */}
                
                <button className="primary-btn flex gap-2 items-center mx-auto rounded-lg">
                <Image
                  src={heroSectionData?.dropZone?.uploadIcon}
                  alt=""
                  width={25}
                  height={25}
                />
                {heroSectionData?.dropZone?.uploadBtnText}
              </button>
              {/* </form> */}

              <p className="!text-xs mt-8 font-medium text-black-600">
                {heroSectionData?.dropZone?.pickImageText}
              </p>
              <div className="hidden md:grid grid-cols-6 md:gap-1 lg:gap-2 mt-2">
                {sampleImages?.map((image, indx) => {
                  return (
                    <div className="" key={`try-images-${indx}`}>
                      <Image
                        src={image?.url}
                        // onClick={() => defaultImageHandler(image?.url)}
                        alt=""
                        width={100}
                        height={100}
                        className="md:rounded-sm lg:rounded-lg w-full md:h-9 lg:h-[72px] object-cover cursor-pointer"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="grid-cols-4 md:hidden grid  gap-2 mt-2">
                {sampleImages.slice(2)?.map((images, indx) => {
                  return (
                    <div className="" key={`try-images-${indx}`}>
                      <Image
                        src={images?.url}
                        // onClick={() => defaultImageHandler(images?.url)}
                        alt=""
                        width={100}
                        height={100}
                        className="md:rounded-sm lg:rounded-lg w-full md:h-9 lg:h-[72px] object-cover"
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
              </a>
            </div>
          </div>
          <div className="md:col-span-6 col-span-12 order-1 grid items-center sm:order-2 sm:pl-10 mb-10 md:mb-3">
            <BeforeAfterSlider
              beforeImg={heroSectionData?.beforeAfterData?.beforeImg}
              afterImg={heroSectionData?.beforeAfterData?.afterImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
}


export default Herosection;
