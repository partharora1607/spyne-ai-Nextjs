/**
 * @format
 */
import React, { useState } from "react";
import { useEffect } from 'react';
import Herosection from "@/components/common/hero-section/HeroSection";
import CtaSection from "../common/cta-section/CtaSection";
import AccordionSection from "../common/accordian-section/AccordianSection";
import TrustedEnterprise from "../common/trusted-enterprise/TrustedEnterprise";
import ImageUpscaling from "../common/ImageUpscaling";
import DownloadApp from "../common/downloadApps/DownloadApp";
import AwardsAndWinings from "../common/AwardsAndWinings";
import Testimonials from "../common/Testimonials";
import PressAndMedia from "../common/PressAndMedia";
import Footer from "../common/Footer";
import Header from "../common/Header";
import ToolSection from "../common/toolsection/ToolSection";
import Head from "next/head";
import { 
    trustedEnterpriseData,
    DownloadAppData,
    CtaSectionData,
    awardsWiningsData,
    testimonialsData,
    pressAndMediaData,
     } from "../photo-upscaler/config";
import { AccordianSectiondata, heroSectionData, imageUpscalingData, ToolSectionData } from "./config";
import { localStorageKeys } from "../signInSignUp/config";


function ProductBackgroundRemover({Toolname}) {
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
    <div className="pt-12">
      <><Head>
        <title>Product Background Remover: Free AI Bg Remover</title>
        <meta name="title" content="Product Background Remover: Free AI Bg Remover" />
        <meta name="description" content="Revamp Your E-Commerce Photography with free product background remover. Create Stunning Product Images within seconds, Skyrocket Sales & Attract More Customers." />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="https://www.spyne.ai/wp-content/uploads/2023/01/cropped-favicon-1-180x180.png" sizes="any" />
        <link rel="canonical" href="https://www.spyne.ai/tools/product-background-remover" />
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
        componentType='product-bg'
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

export default ProductBackgroundRemover;
