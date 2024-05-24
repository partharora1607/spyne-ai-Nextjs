import React, { useRef, useState } from 'react';
import HubspotForm from 'react-hubspot-form'

function CtaSection({ CtaSectionData }) { 

  return (

    <section className="py-10 px-4 bg-gradient-to-r from-spyne_blue-80 to-spyne_blue-300" id="ctasection">
      <div className="container">
        <div className="grid grid-cols-12 gap-2">
          <div className="md:col-span-6 md:text-start col-span-12 h-full items-center md:pt-10">
            <h2 className="mb-3">
              {CtaSectionData.mainheading}
              <span className="block">{CtaSectionData.heading}</span>
            </h2>
            <h3 className="text-black-600 font-bold md:text-sm lg:text-[34px] text-2xl tracking-[0.02em]">
              {CtaSectionData.subheading}
            </h3>
          </div>
          <div className="md:col-start-8 md:col-end-13 md:justify-end col-span-12  flex flex-col gap-3 md:mt-0 mt-8">
            <div className="HubspotFormWrapper">
              <HubspotForm
                  portalId='7333835'
                  formId='33166fb1-3218-4c98-aebe-cc6d66c82722'
                  loading={<div>Loading...</div>}
                  formInstanceId='ctascnid'
              />
            </div>

          </div>

        </div>
      </div>
  </section>
  );
}
export default CtaSection;
