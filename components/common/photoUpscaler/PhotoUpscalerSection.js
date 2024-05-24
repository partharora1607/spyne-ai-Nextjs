import { useState } from "react";
import ReadMoreContent from "./ReadMoreContent";
import { ReadMoreContentData } from "../../photo-upscaler/config";

function PhotoUpscalerSection({ PhotoUpscalerSectionData }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonText = isExpanded ? "Read less" : "Read more";

  const growDiv = () => {
    const growDiv = document.getElementById("grow");
    if (growDiv.clientHeight) {
      growDiv.style.height = 0;
    } else {
      const wrapper = document.querySelector(".measuringWrapper");
      growDiv.style.height = wrapper.clientHeight + "px";
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="xl:py-8 py-10 px-4">
      <div className="container">
        <div className="grid grid-cols-12 gap-4">
          <div className="xl:col-span-6 md:col-start-2 md:col-end-6 xl:pr-[120px] xl:mr-20 col-span-12 order-2 sm:order-1 xl:mt-20 md:mt-10 ">
            <h2 className="">{PhotoUpscalerSectionData.heading}</h2>
            <p className="xl:mt-4 mt-4 md:mt-2 xl:text-base md:text-[10px] md:leading-[14px] text-lg font-medium text-black-600">
              {PhotoUpscalerSectionData.subheading}
            </p>
            <div className="flex mt-9 xl:mt-9 md:mt-6 gap-2 cursor-pointer" onClick={growDiv}>
              <p
                className="text-lg xl:text-lg md:text-[10px] font-semibold text-blue leading-6"
                onClick={growDiv}
              >
                {buttonText}{" "}
              </p>
              <img src={PhotoUpscalerSectionData.arrowimg} />
            </div>
          </div>
          <div className="md:col-span-6 col-span-12 order-1 sm:order-2 sm:pl-14 md:pl-0">
            <img
              src={PhotoUpscalerSectionData.aienhancmentgif}
              width={600}
              height={450}
            ></img>
          </div>
        </div>
        <div id="grow" className="grow">
          <div class="measuringWrapper">
            <div class="text">
              <ReadMoreContent ReadMoreContentData={ReadMoreContentData} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default PhotoUpscalerSection;
