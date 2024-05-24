import { ReadMoreContentData } from "@/components/photo-upscaler/config";
import { BgReadMoreContentData } from "@/components/background-removal/config";
import { BgReplacementData } from "@/components/car-background-replacement/config";
import { useState } from "react";
import { useEffect } from "react";
import BgReadMoreContent from "./BgReadMoreContent";
import BgReplacement from "./BgReplacement";
import ReadMoreContent from "./ReadMoreContent";
import ImageReadMoreContent from "./ImageReadMoreContent";
import NumberPlateBlurContent from "./NumberPlateBlurContent";
import { ImageReadMoreContentData } from "@/components/image-enhancer/config";
import SuperReadMoreContent from "./SuperReadMoreContent";
import { SuperReadMoreContentData } from "@/components/super-resolution/config";
import { NumberPlateBlurContentData } from "@/components/number-plate-masking/config";
import React from "react";
import DeblurReadMoreContent from "./DeblurReadMoreContent";
import { DeblurReadMoreContentData } from "@/components/image-deblurrer/config";
import RestoreReadMoreContent from "./RestoreReadMoreContent";
import { RestoreReadMoreContentData } from "@/components/photo-restoration/config";
import EnlargerReadMoreContent from "./EnlargerReadMoreContent";
import { EnlargerReadMoreContentData } from "@/components/image-enlarger/config";
import ImageBgReadMoreContent from "./ImageBgReadMoreContent";
import { ImageBgReadMoreContentData } from "@/components/image-background-removal/config";
import { AIBgReadMoreContentData } from "@/components/ai-background-removal/config";
import AIBgReadMoreContent from "./AIBgReadoreContent";
import CarPhotoEditingReadMoreContent from "./CarPhotoEditingReadMoreContent";
import { CarPhotoEditingReadMoreContentData } from "@/components/car-photo-editing/config";

import CarBackgroundEditingReadMoreContent from "./CarBackgroundEditingReadMoreContent";
import { CarBackgroundEditingReadMoreContentData } from "@/components/car-background-editing/config";

import CarPhotoEditorAppReadMoreContent from "./CarPhotoEditorAppReadMoreContent";
import { CarPhotoEditorAppReadMoreContentData } from "@/components/car-photo-editor-app/config";

import ProductBgReadMoreContent from "./ProductBgReadMoreContent";
import { ProductBgReadMoreContentData } from "@/components/product-background-remover/config";


function ToolSection({ ToolSectionData, componentType }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonText = isExpanded ? "Read less" : "Read more";

  const growDiv = () => {
    const growDiv = document.getElementById("grow");
  const wrapper = document.querySelector(".measuringWrapper");
  const contentHeight = wrapper.scrollHeight + 5  
  if (growDiv.clientHeight) {
    growDiv.style.height = 0;
  } else {
    growDiv.style.height = contentHeight + "px";
  }

  setIsExpanded(!isExpanded);
  };

  return (
    <section className="xl:pt-16 pt-10 px-4">
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <div className="xl:col-span-6 md:col-start-2 md:col-end-6 xl:pr-[120px] xl:mr-20 col-span-12 order-2 sm:order-1 xl:mt-20 md:mt-10 ">
            <h2 className="">{ToolSectionData?.heading}</h2>
            <p className="xl:mt-4 mt-4 md:mt-2 xl:text-base md:text-[10px] md:leading-[14px] text-lg font-medium text-black-600">
              {ToolSectionData?.subheading}
            </p>
            <div className="flex mt-9 xl:mt-9 md:mt-6 gap-2 cursor-pointer" onClick={growDiv}>
              <p
                className="text-lg xl:text-lg md:text-[10px] font-semibold text-blue leading-6"
                onClick={growDiv}
              >
                {buttonText}{" "}
              </p>
              <img src={ToolSectionData?.arrowimg} />
            </div>
          </div>
          <div className="md:col-span-6 col-span-12 order-1 sm:order-2 sm:pl-14 md:pl-0">
            <img
              src={ToolSectionData?.aienhancmentgif}
              width={600}
              height={450}
            />
          </div>
        </div>
        <div id="grow" className="grow">
          <div class="measuringWrapper">
            <div class="text">
              {
                componentType === 'photo' ?
                  <ReadMoreContent ReadMoreContentData={ReadMoreContentData} />
                  :
                  componentType === 'bg' ?
                    <BgReadMoreContent ReadMoreContentData={BgReadMoreContentData} />
                    :
                    componentType === 'product-bg-removal' ?
                      <BgReplacement ReadMoreContentData={BgReplacementData} />
                      :
                      componentType === 'numberplateblur' ?
                        <NumberPlateBlurContent NumberPlateBlurContentData={NumberPlateBlurContentData} />
                        :
                        componentType === 'super' ?
                          <SuperReadMoreContent SuperReadMoreContentData={SuperReadMoreContentData} />
                          :
                          componentType === 'deblurrer'?
                       <DeblurReadMoreContent DeblurReadMoreContentData ={DeblurReadMoreContentData} />
                       :
                       componentType === 'photorestore'?
                       <RestoreReadMoreContent RestoreReadMoreContentData={RestoreReadMoreContentData}  />
                       :
                       componentType === 'enlarger'?
                       <EnlargerReadMoreContent EnlargerReadMoreContentData ={EnlargerReadMoreContentData} />
                       :
                       componentType === 'image-bg'?
                       <ImageBgReadMoreContent ImageBgReadMoreContentData ={ImageBgReadMoreContentData}/>
                       :
                       componentType === 'ai-bg'?
                       <AIBgReadMoreContent AIBgReadMoreContentData = {AIBgReadMoreContentData}/>
                       :
                       componentType === 'product-bg'?
                       <ProductBgReadMoreContent ProductBgReadMoreContentData ={ProductBgReadMoreContentData}  />
                       :
                       componentType === 'car-photo-editing'?
                       <CarPhotoEditingReadMoreContent CarPhotoEditingReadMoreContentData ={CarPhotoEditingReadMoreContentData}  />
                       :
                       componentType === 'car-background-editing'?
                       <CarBackgroundEditingReadMoreContent CarBackgroundEditingReadMoreContentData ={CarBackgroundEditingReadMoreContentData}  />
                       :
                       componentType === 'car-photo-editor-app'?
                       <CarPhotoEditorAppReadMoreContent CarPhotoEditorAppReadMoreContentData ={CarPhotoEditorAppReadMoreContentData}  />
                       :
                      <ImageReadMoreContent ReadMoreContentData={ImageReadMoreContentData} />
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ToolSection;
