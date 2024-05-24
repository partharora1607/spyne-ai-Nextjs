import Image from "next/image";
import React from "react";

function Testimonials({ data }) {
  return (
    <section className="xl:py-20 py-10 md:py-10 px-4">
      <div className="container px-2">
        <div className="grid grid-cols-12 xl:gap-8 md:gap-4 gap-y-8">
          <h2 className="xl:col-start-3 xl:col-end-11 md:col-start-2 md:col-end-12 col-span-12 text-center">
            {data?.heading}
          </h2>
          {data?.card.map((element, indx) => {
            return (
              <div
                className="md:col-span-6 col-span-12"
                key={`testimonials-${indx}`}
              >
                <div className="w-full  xl:rounded-2xl rounded-2xl md:rounded-lg xl:p-10 p-10 xl:pr-18 md:p-[22px] gradiant-2 border border-spyne_blue-100">
                  <Image src={element?.image} width={100} height={100} alt="" className="h-8 w-auto md:h-8 xl:h-12"/>
                  <p className="xl:mt-3 mt-3 md:mt-2 xl:mb-9 mb-9 md:mb-4 xl:text-lg md:text-[9px] text-xs xl:leading-[28px] leading-[18px] md:leading-[14px]  text-black-600">
                    {element?.text}
                  </p>
                  <Image
                    src={element?.logo}
                    width={160}
                    height={45}
                    alt="content-logo"
                    className="w-auto xl:h-10 h-8 md:h-4 object-contain"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Testimonials;
