/**
 * @format
 */
import Image from "next/image";
import Slider from "react-slick";

function ImagesSlider({ data, settings, class_name, wrapper_class }) {
  const defaultStyles = {
    class_name: "",
    wrapper_class: ""
  };
  return (
    <div className="trusted-slider">
      <Slider {...settings}>
        {data?.images?.map((element, indx) => {
          return (
            <div
              className={`px-2 mb-1 ${
                wrapper_class || defaultStyles?.wrapper_class
              }`}
              key={`image-list-${indx}`}
            >
              <Image
                src={element?.url}
                width={500}
                height={400}
                className={` object-contain ${
                  class_name || defaultStyles?.class_name
                }`}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
export default ImagesSlider;
