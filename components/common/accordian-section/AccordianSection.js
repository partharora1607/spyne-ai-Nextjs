
import React, { useState } from "react";
import Accordion from "../accordion/Accordion";

const AccordionSection = ({data}) => {
  const [showAccordion, setShowAccordion] = useState(-1);
  return (
    <section className="md:py-20 px-4 py-10">
      <div className="container ">
        <h2 className="text-center sm:mb-8 mb-6">
          {data?.heading}
        </h2>
        {data?.questions.map((item, index) => {
          return (
            <Accordion
              title={item.question}
              content={item.content}
              idx={index}
              showAccordion={showAccordion}
              setShowAccordion={setShowAccordion}
            />
          );
        })}
      </div>
    </section>
  );
};

export default AccordionSection;
