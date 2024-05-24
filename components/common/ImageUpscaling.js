/**
 * @format
 */

 import Image from "next/image";

function ImageUpscaling({ imageUpscalingData }) {
  return (
    <section className="xl:py-20 md:py-10 px-4 py-10">
      <div className="container px-2">
        <div className="grid grid-cols-12 gap-x-3">
          <h2 className="xl:mb-4 mb-4 md:mb-2 col-span-12 text-center">
            {imageUpscalingData?.heading}
          </h2>
          <p className="col-span-12 text-normal md:text-[10px] xl:text-base text-center text-black-600">
            {imageUpscalingData?.description}
          </p>
          {imageUpscalingData?.cardsData?.map((content, indx) => {
            return (
              <div
                className="md:col-span-4 col-span-12 mt-6 xl:mt-10 md:mt-5 p-6 shadow-varient1 rounded-2xl"
                key={`upscaling-data:${indx}`}
              >
                <Image
                  className="xl:mb-6 mb-6 md:mb-3"
                  src={content?.image}
                  width={400}
                  height={160}
                />
                <h3 className="xl:mb-3 mb-3 md:mb-[6px]">{content?.title}</h3>
                <p className="pr-[20%] md:text-[10px] md:leading-3 lg:text-base">{content?.subTitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default ImageUpscaling;
