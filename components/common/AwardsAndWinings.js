import React, { useState, useEffect } from "react";
import ImagesSlider from "./sliders/ImagesSlider";
import Counter from "./Counter/Counter";
import Image from "next/image";
/**
 * @format
 */
function AwardsAndWinings({ awardsWiningsData }) {
  const scrollToSection = () => {
    const targetSection = document.getElementById('ctasection');
    
    if (targetSection) {
      const { top, height } = targetSection.getBoundingClientRect();
      const offset = top + window.scrollY - (window.innerHeight - height) / 2;
      
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  };

  var settings = {
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    autoplay: true,
    Infinite: true,
    autoplaySpeed: 1500
  };

  return (
    <section className="md:mb-10 px-4 md:px-0 md:pt-0 pt-10">
      <div className="container">
        <div className="grid grid-cols-12 xl:rounded-[20px] rounded-[20px] md:rounded-xl gradiant-1 md:p-4 xl:p-10 px-5 py-10 gap-2">
          <div className="md:col-span-5  col-span-12">
            <h2 className="md:hidden text-center mb-1 md:text-lg xl:text-[28px] text-2xl">
              {awardsWiningsData?.heading}
            </h2>
            <p className="md:hidden text-center text-sm xl:text-base md:text-xs mb-4 sm:mb-0">
              {awardsWiningsData?.subHeading}
            </p>

            <div className="awards-slider shadow-varient3 xl:rounded-2xl rounded-2xl md:rounded-lg xl:p-2 p-2 bg-white-900 md:my-0 xl:my-1">
              <ImagesSlider
                data={awardsWiningsData}
                settings={settings}
                class_name={
                  "w-full xl:h-[450px] h-[260px] md:h-[253px] object-contain mx-auto"
                }
                alt="sliderimages"
              />
            </div>
          </div>
          <div className="md:col-start-7 md:col-end-13  col-span-12 ">
            <h2 className="md:block hidden">{awardsWiningsData?.heading}</h2>
            <p className="md:block hidden">{awardsWiningsData?.subHeading}</p>
            <div className="xl:mt-6 mt-6 md:mt-5 md:mb-0 mb-10">
              <div className="grid grid-cols-12 md:gap-2 gap-4">
                {awardsWiningsData?.counterData?.map((data, indx) => {
                  return (
                    <div
                      className="col-span-6 xl:mb-14 md:mb-7"
                      key={`counter-${indx}`}
                    >
                      <ul className="grid grid-cols-12 gap-2 xl:gap-3 md:gap-1">
                        <li className="xl:col-span-4 col-span-4 md:col-span-2">
                          <Image
                            className="w-full h-auto xl:h-auto md:h-7 "
                            src={data?.image}
                            width={100}
                            height={100}
                          />
                        </li>
                        <li className="xl:col-span-8 col-span-8 md:col-span-10">
                          <h4 className="block mb-1">
                                <Counter
                                  counterValue={data?.number}
                                  counterTime={data?.time}
                                  data={data}
                                />
                          </h4>
                          <p className="xl:text-base md:text-[10px] text-black-800 font-medium text-[10px] leading-3">
                            {data?.title[0]}
                            <span className="block">{data?.title[1]}</span>
                          </p>
                        </li>
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="md:text-start md:text-[10px] text-center justify-center my-auto md:my-0">
              <button className="blue-btn px-4" onClick={scrollToSection}><a>{awardsWiningsData?.btnText}</a></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default AwardsAndWinings;
