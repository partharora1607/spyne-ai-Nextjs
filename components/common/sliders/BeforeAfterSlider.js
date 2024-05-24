/**
 * @format
 */ 
import {
  ReactCompareSlider,
  ReactCompareSliderImage
} from "react-compare-slider";

function BeforeAfterSlider({ beforeImg, afterImg }) {
  return (
    <ReactCompareSlider
      className="rounded-xl overflow-hidden md:h-[280px] lg:h-[480px] "
      itemOne={
        <ReactCompareSliderImage
          src={beforeImg}
          srcSet={beforeImg}
          alt="Before Image "
          className="rounded-xl h-full w-full object-cover before-image relative"
        
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src={afterImg}
          srcSet={afterImg}
          alt="After Image"
          className="rounded-xl h-full w-full object-cover after-image relative"
        />
      }
    />
  );
}

export default BeforeAfterSlider;
