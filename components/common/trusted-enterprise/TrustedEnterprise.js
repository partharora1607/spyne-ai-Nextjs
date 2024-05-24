/**
 * @format
 */
import React from "react";
import ImagesSlider from "../sliders/ImagesSlider";

function TrustedEnterprise({ trustedEnterpriseData }) {
  var settings = {
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerMode: true,
          centerPadding: "60px",
          slidesToShow: 7,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 1500
        }
      },
      {
        breakpoint: 600,
        settings: {
          centerMode: true,
          centerPadding: "60px",
          slidesToShow: 2.5,
          slidesToScroll: 1,
          autoplay: true,
          infinite: true,
          autoplaySpeed: 1500
        }
      }
    ]
  };
  return (
    <section className="md:py-0 md:px-24 py-5">
      <div className="container">
        <div className="grid grid-cols-1 gap-4 md:gap-1 xl:gap-4">
          <h2 className="xl:mb-2 mb-2 md:mb-0 text-sm font-semibold text-black-400 text-center px-6 md:px-0">
            {trustedEnterpriseData?.heading}
          </h2>
          <ImagesSlider
            data={trustedEnterpriseData}
            settings={settings}
            class_name={"w-auto h-10 mx-auto clients-logos "}
            wrapper_class={"text-center relative after:w-[0.516671px] after:bg-gray-light_300 after:h-[65%] after:right-0 after:absolute after:bottom-[15%]"}
          />
        </div>
      </div>
    </section>
  );
}
export default TrustedEnterprise;
