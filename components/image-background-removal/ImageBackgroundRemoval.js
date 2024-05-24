/**
 * @format
 */
import React, { useState } from "react";
import { useEffect } from 'react';
import Herosection from "../common/hero-section/HeroSection";
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






function ImageBackgroundRemoval({Toolname}) {
    const [sampleImages, setSampleImages] = useState([
        {
          url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/tryimg1.svg`
        },
        {
          url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/tryimg2.svg`
        },
        {
          url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/tryimg3.svg`
        },
        {
          url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/tryimg4.svg`
        },
        {
          url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/tryimg5.svg`
        },
        {
          url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/tryimg1.svg`
        }
      ]);
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
        <title>Image Background Remover: Remove Bg Online for Free</title>
        <meta name="title" content="Image Background Remover: Remove Bg Online for Free" />
        <meta name="description" content="Effortlessly remove image backgrounds in seconds with our free online image background remover tool. Transform your photos instantly!" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://www.spyne.ai/wp-content/uploads/2023/01/cropped-favicon-1-180x180.png" sizes="any" />
        <link rel="canonical" href="https://www.spyne.ai/tools/image-background-remover" />
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
        componentType='image-bg'
      />
      <DownloadApp  DownloadAppData={DownloadAppData} />
      <AwardsAndWinings awardsWiningsData={awardsWiningsData} />
      <Testimonials data={testimonialsData} />
      <PressAndMedia data={pressAndMediaData} settings={pressMedia} />
      <AccordionSection data={AccordianSectiondata} />

      <CtaSection CtaSectionData={CtaSectionData} />
      <Footer />
    </div>
  );
}

export default ImageBackgroundRemoval;