/**
 * @format
 */
import React, { useState,useEffect } from "react";
import Herosection from "../common/hero-section/HeroSection";
import {awardsWiningsData, CtaSectionData, DownloadAppData,  pressAndMediaData, testimonialsData, trustedEnterpriseData } from "@/components/photo-upscaler/config";
import TrustedEnterprise from "../common/trusted-enterprise/TrustedEnterprise";
import ImageUpscaling from "../common/ImageUpscaling";
import { AccordianSectiondata, heroSectionData, imageUpscalingData, ToolSectionData } from "./config";
import DownloadApp from "../common/downloadApps/DownloadApp";
import AwardsAndWinings from "../common/AwardsAndWinings";
import Testimonials from "../common/Testimonials";
import PressAndMedia from "../common/PressAndMedia";
import AccordionSection from "../common/accordian-section/AccordianSection";
import CtaSection from "../common/cta-section/CtaSection";
import Footer from "../common/Footer";
import ToolSection from "../common/toolsection/ToolSection";
import Header from "../common/Header";
import Head from "next/head";
import { localStorageKeys } from "../signInSignUp/config";


function ImageEnhancer({componentType, Toolname}) {
  const [sampleImages, setSampleImages] = useState([
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage1.webp`
    },
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage2.webp`
    },
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage3.webp`
    },
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage4.webp`
    },
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage5.webp`
    },
    {
      url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/sampleImage6.webp`
    }
  ]);
  const [logInState, setLogInState] = useState(false)

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
    if (state) {
      setLogInState(true)
    }
  }, [logInState])

  return (
    <div className="pt-12">
      <><Head>
    <title>AI Image Enhancer: Free Online Photo Quality Enhancer Tool</title>
    <meta name="title" content="AI Image Enhancer: Free Online Photo Quality Enhancer Tool" />
    <meta name="description" content="Learn more about Spyne AI photo enhancer and level up the visual game. Transform your low-quality product photos to High-Quality with the power of AI Image Enhancer." />
    <meta name="robots" content="index, follow" />
    <link rel="icon" href="https://www.spyne.ai/wp-content/uploads/2023/01/cropped-favicon-1-180x180.png" sizes="any" />
    <link rel="canonical" href="https://www.spyne.ai/image-enhancer" />
    <script type="application/ld+json"
   dangerouslySetInnerHTML={
                 {
     __html: `
     {
         "@context": "https://schema.org/",
         "@type": "Product",
         "name": "AI Photo Enhancer",
         "aggregateRating": {
               "@type": "AggregateRating",
             "ratingValue": "4.5",
             "bestRating": "5",
             "worstRating": "0",
             "ratingCount": "278"
         }
     }
    `,
   }}
 />;
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

export default ImageEnhancer;