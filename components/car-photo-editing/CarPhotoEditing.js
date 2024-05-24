/**
 * @format
 */
import React, { useState } from "react";
import { useEffect } from 'react';
import Herosection from "../common/Virtual-Studio-Hero-Section/HeroSection";
//import { AccordianSectiondata, heroSectionData, imageUpscalingData, ToolSectionData } from "./config";
import TrustedEnterprise from "../common/trusted-enterprise/TrustedEnterprise";
import ImageUpscaling from "../common/ImageUpscaling";
import AwardsAndWinings from "../common/AwardsAndWinings";
import Testimonials from "../common/Testimonials";
import PressAndMedia from "../common/PressAndMedia";
import AccordionSection from "../common/accordian-section/AccordianSection";
import CtaSection from "../common/cta-section/CtaSection";
import Footer from "../common/Footer";
import ToolSection from "../common/toolsection/ToolSection";
import Header from "../common/Header";
import {  awardsWiningsData, CtaSectionData, DownloadAppData, pressAndMediaData, testimonialsData, trustedEnterpriseData } from "../photo-upscaler/config";
import DownloadApp from "../common/downloadApps/DownloadApp";
import Head from "next/head";
import { AccordianSectiondata, heroSectionData, imageUpscalingData, ToolSectionData } from "./config";
import { localStorageKeys } from "../signInSignUp/config";






function CarPhotoEditing({Toolname}) {
  const [sampleImages, setSampleImages] = useState([]);

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
      const [logInState, setLogInState] = useState(false)
      useEffect(() => {
        let state = JSON.parse(localStorage.getItem(localStorageKeys?.loggedIn))
        if(state){
         setLogInState(true)
        }
       }, [logInState])
  return (
    <div  className="pt-12">
      <><Head>
        <title>Car Photo Editing: Edit & Enhance Car Images Online</title>
        <meta name="title" content="Car Photo Editing: Edit & Enhance Car Images Online" />
        <meta name="description" content="Level up your car visuals with our free online car photo editor. Automatically edit and enhance your car photos in a few seconds. Try it now!" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://www.spyne.ai/wp-content/uploads/2023/01/cropped-favicon-1-180x180.png" sizes="any" />
        <link rel="canonical" href="https://www.spyne.ai/tools/car-photo-editing/" />
      </Head></>
      <Header logInState={logInState} setLogInState={setLogInState}/>
        <Herosection
        heroSectionData={heroSectionData}
        sampleImages={sampleImages}
        setSampleImages={setSampleImages}
        Toolname= {Toolname}
        
      />
      <TrustedEnterprise trustedEnterpriseData={trustedEnterpriseData} />
        <ImageUpscaling imageUpscalingData={imageUpscalingData} />
        <ToolSection
        ToolSectionData={ToolSectionData}
        componentType='car-photo-editing'
      />
      <DownloadApp  DownloadAppData={DownloadAppData} />
      <AwardsAndWinings awardsWiningsData={awardsWiningsData} />
      {/* <Testimonials data={testimonialsData} /> */}
      <PressAndMedia data={pressAndMediaData} settings={pressMedia} />
      <AccordionSection data={AccordianSectiondata} />

      <CtaSection CtaSectionData={CtaSectionData} />
      <Footer />
    </div>
  );
}

export default CarPhotoEditing;