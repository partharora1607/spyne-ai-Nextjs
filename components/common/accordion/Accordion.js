/**
 * @format
 */
 import React, { useState, useEffect, useRef } from "react";

 function Accordion({ title, content, idx, showAccordion, setShowAccordion }) {
   const [accordianBodyHeight, setAccordianBodyHeight] = useState("0px");
 
   const accordianContent = useRef(null);
 
   const toggleAccordian = (index) => {
     if (showAccordion !== index) setShowAccordion(index);
     else setShowAccordion(-1);
   };
   useEffect(() => {
     setAccordianBodyHeight(showAccordion === idx ? `fit-content` : "0px");
   }, [showAccordion]);
 
   return (
     <div
       className="md:py-[18px] md:px-6 p-4 bg-spyne_blue-40 rounded-xl mb-2.5 flex flex-col "
       onClick={() => toggleAccordian(idx)}
     >
       <button className="flex justify-between">
         <h3 className="md:text-[22px] md:leading-[120%] text-black-800 text-left text-sm font-normal">
           {title}
         </h3>
         <img
           src={`${process.env.IMG_CLOUD_STORAGE_PREFIX}/console/filter/chevron_down_inactive.svg`}
           alt=""
           className={showAccordion === idx ? "rotate-icon" : "accordian-icon"}
         />
       </button>
       <div
         ref={accordianContent}
         style={{ maxHeight: `${accordianBodyHeight}` }}
         className={`${
           accordianBodyHeight === "0px" ? "" : "mt-3.5"
         } overflow-hidden transition-all duration-300 ease-in-out max-h-[50vh] overflow-y-scroll text-xs leading-5 sm:text-black-600  text-black-600 sm:text-[18px] md:leading-[140%] font-normal`}
       >
         {content}
       </div>
     </div>
   );
 }
 
 export default Accordion;
 