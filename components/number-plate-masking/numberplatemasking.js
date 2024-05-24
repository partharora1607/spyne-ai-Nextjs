/**
 * @format
 */
 import React, { useState } from "react";
 import { useEffect } from 'react';
 import {
   imageUpscalingData,
   trustedEnterpriseData,
   DownloadAppData,
   CtaSectionData,
   awardsWiningsData,
   testimonialsData,
   pressAndMediaData,
   AccordianSectiondata,
   heroSectionData,
   ToolSectionData,
 } from "./config";
 import Herosection from "@/components/common/hero-section/HeroSection";
 import CtaSection from "../common/cta-section/CtaSectionAuto";
 import AccordionSection from "../common/accordian-section/AccordianSection";
 import TrustedEnterprise from "../common/trusted-enterprise/TrustedEnterprise";
 import ImageUpscaling from "../common/ImageUpscaling";
 import DownloadApp from "../common/downloadApps/DownloadApp";
 import AwardsAndWinings from "../common/AwardsAndWinings";
 import Testimonials from "../common/Testimonials";
 import PressAndMedia from "../common/PressAndMedia";
 import Footer from "../common/Footer";
 import Header from "../common/AutoHeader";
 import ToolSection from "../common/toolsection/ToolSection";
 import Head from "next/head";
import { localStorageKeys } from "../signInSignUp/config";
 
 function NumberPlateMasking({componentType, Toolname}) {
  const [sampleImages, setSampleImages] = useState([]);
  const [logInState, setLogInState] = useState(false)

  useEffect(() => {
    fetch('https://www.clippr.ai/api/v2/product/fetchImages?auth_key=fe4a909f-9e2f-461f-98fc-51c22a21aac6&enterprise_id=TaD1VC1Ko&prod_cat_id=cat_d8R14zUNE')
      .then(response => response.json())
      .then(data => {
        const { data: responseData } = data; 
        const sampleImagesData = responseData.slice(0, 6).map(item => ({
          url: item.image_url
        }));
        setSampleImages(sampleImagesData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
 
 
   var pressMedia = {
     speed: 1000,
     slidesToShow: 4,
     slidesToScroll: 1,
     infinite: true,
     autoplay: true,
     arrows: false,
     autoplaySpeed: 1500,
     dots: false,
     responsive: [
       {
         breakpoint: 1024,
         settings: {
           slidesToShow: 4,
           slidesToScroll: 1
         }
       },
       {
         breakpoint: 600,
         settings: {
           slidesToShow: 1,
           slidesToScroll: 1,
           autoplaySpeed: 1500
         }
       }
     ]
   };

   useEffect(() => {
    let state = JSON.parse(localStorage.getItem(localStorageKeys?.loggedIn))
    if(state){
     setLogInState(true)
    }
   }, [logInState])
 
   return (
     <div className="pt-12">
             <><Head>
    <title>Number Plate Blur Online for Free</title>
    <meta name="title" content="Number Plate Blur Online for Free" />
    <meta name="description" content="Blur License Plates online with our free number plate masking. Powered by AI, now you achieve number plate blur in a matter of few seconds." />
    <meta name="robots" content="index, follow" />
    <link rel="icon" href="https://www.spyne.ai/wp-content/uploads/2023/01/cropped-favicon-1-180x180.png" sizes="any" />
    <link rel="canonical" href="https://www.spyne.ai/number-plate-blur" />
    {/* Add more metadata tags as needed */}
  </Head></>
       <Header logInState={logInState} setLogInState={setLogInState}/>
       <Herosection
         heroSectionData={heroSectionData}
         sampleImages={sampleImages}
         setSampleImages={setSampleImages}
         Toolname={Toolname}
       />
       <TrustedEnterprise trustedEnterpriseData={trustedEnterpriseData} />
       <ImageUpscaling imageUpscalingData={imageUpscalingData} />
       <ToolSection
         ToolSectionData={ToolSectionData}
         componentType='numberplateblur'
       />
       <DownloadApp DownloadAppData={DownloadAppData} />
 
       <AwardsAndWinings awardsWiningsData={awardsWiningsData} />
       <Testimonials data={testimonialsData} />
       <PressAndMedia data={pressAndMediaData} settings={pressMedia} />
       <AccordionSection data={AccordianSectiondata} />
 
       <CtaSection CtaSectionData={CtaSectionData} />
       <Footer />
     </div>
   );
 }
 
 export default NumberPlateMasking;
 