import React from "react";
import { footerData } from "./config";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

function Footer({ }) {
  return (
    <section className=" bg-wood_black px-5">
    <><Head>
    <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0102/8925.js" async="async" ></script>
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-135505701-1"></script>
    
    <script
   dangerouslySetInnerHTML={
                 {
     __html: `
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'UA-135505701-1');

     (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
     new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
     j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
     'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
     })(window,document,'script','dataLayer','GTM-TQ5V9FW');
     
     (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "hv38i70ba8");
      (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:2787794,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');


  `,
   }}
 />;
  </Head></>
  <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TQ5V9FW" className="hidden"></iframe>
      <div className="top-footer xl:py-14 pb-10 border-b border-white-15">
        <div className="container">
          <div className="grid grid-cols-12 gap-2">
            <div className="xl:col-span-3 xl:pr-[10%] col-span-12 xl:order-1 order-2 ">
              <div className="grid grid-cols-12 gap-2">
                <div className="md:col-span-6 xl:col-span-12 col-span-12 md:pr-5">
                  <Image
                    src={footerData?.logo}
                    width={200}
                    height={52}
                    className="w-auto h-6 xl:h-10"
                    alt="spyneLogo"
                  />
                  <p className=" md:mb-6  text-white-700 text-xs font-normal leading-4 xl:font-medium mt-3.5 ">
                    {footerData?.text}
                  </p>
                </div>
                <div className="md:col-span-6 xl:col-span-12 col-span-12">
                  <ul className="flex gap-2 mt-6 md:-mt-2 md:justify-end xl:justify-start">
                    <li>
                      <Link href={footerData?.appStoreImg?.link}>
                        <Image
                          src={footerData?.appStoreImg?.url}
                          className="w-auto h-11 xl:h-10 md:h-8 border border-white rounded-md"
                          width={168}
                          height={50}
                        />
                      </Link>
                    </li>
                    <li>
                      <Link href={footerData?.gplay?.link}>
                        <Image
                          src={footerData?.gplay?.url}
                          className="w-auto h-11 xl:h-10 md:h-8 border border-white rounded-md"
                          width={168}
                          height={50}
                        />
                      </Link>
                    </li>
                  </ul>
                  <ul className="flex gap-5 xl:mt-10 mt-6 md:justify-end xl:justify-start">
                    {footerData?.socialLinks?.map((element, indx) => {
                      return (
                        <li key={`socials-${indx}`}>
                          <Link href={element?.link} target="_blank">
                            <Image
                              src={element?.image}
                              alt="social links"
                              width={25}
                              height={25}
                              className="h-6 w-auto"
                            />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>

            <div className="xl:col-span-9 col-span-12 order-1 xl:order-2 pt-10 xl:py-0">
              <div className="grid xl:grid-cols-6 grid-cols-2 md:grid-cols-3">
                {footerData?.menues?.map((element, indx) => {
                  return (
                    <div className="">
                      <h5 className=" xl:text-xl text-2xl leading-6 font-medium text-white">
                        {element?.heading}
                      </h5>
                      <ul className="xl:mt-1 mt-5 mb-10 xl:mb-0">
                        {element?.menu?.map((links, indx) => {
                          return (
                            <li className="md:mt-[18px] md:mb-0  mb-3 text-sm leading-5 md:text-lg md:leading-[22px] font-normal text-white-700">
                              <Link href={links?.url}>{links?.text}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer md:py-10 pt-10 pb-20">
        <div className="container">
          <div className="grid grid-cols-12 gap-2">
            <div className="xl:col-span-3 col-span-12 ">
              <p className="text-white-700 xl:text-base text-sm leading-[19px] font-normal">
                {footerData?.bottomFooterData?.copyright}
              </p>
            </div>
            <div className="xl:col-span-9 xl:mt-0 mt-6 col-span-12">
              <div className="grid md:grid-cols-4 grid-cols-2 md:gap-3 gap-2">
                {footerData?.bottomFooterData?.menues?.map((element, indx) => {
                  return (
                    <div className="links">
                      <Link
                        className="text-white-700 xl:text-base text-xs leading-[19px] font-normal"
                        href={element?.url}
                      >
                        {element?.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
