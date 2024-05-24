/**
 * @format
 */

 import Image from "next/image";
 import Link from "next/link";
 import Slider from "react-slick";
 
 function PressAndMedia({ data, settings }) {
   return (
     <section className="xl:py-20 md:py-10 px-4 pb-10">
       <div className="container px-2">
         <div className="grid grid-cols-12 gap-x-3">
           <h2 className="xl:mb-2 mb-2 md:mb-0 col-span-12 text-center">{data?.heading}</h2>
           <div className="col-span-12 md:h-full">
             <Slider {...settings}>
               {data?.cards?.map((content, indx) => {
                 return (
                   <div className="h-full px-4 py-6 xl:px-4 xl:py-6 md:px-2 md:py-3 text-center">
                     <div
                       className="text-center h-full xl:p-5 p-5 md:p-3 shadow-varient1 rounded-2xl border-2 border-spyne_blue-100"
                       key={`press-media:${indx}`}
                     >
                       <Image
                         className="my-auto w-full xl:h-20 h-20 object-contain  md:h-8"
                         src={content?.image}
                         width={200}
                         height={60}
                         alt="content-image"
                       />
                       <p className="xl:mt-5 mt-5 md:mt-4 mb-6 md:mb-5 xl:mb-6 md:h-[50px] xl:h-[75px] 2xl:h-auto md:text-[9px] xl:text-base xl:leading-6 md:leading-4 md:font-normal">{content?.text}</p>
                       <Link
                         target="_blank"
                         href={content?.readMoreUrl}
                         className="text-spyne_blue xl:text-base text-base md:text-[9px] md:leading-3 font-medium"
                       >
                         {content?.readMoreText}
                       </Link>
                     </div>
                   </div>
                 );
               })}
             </Slider>
           </div>
         </div>
       </div>
     </section>
   );
 }
 export default PressAndMedia;
 