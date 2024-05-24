import React, { useEffect } from 'react';

const HubSpotEcomForm = () => {
  useEffect(() => {
    // Load the HubSpot form script
    const script = document.createElement('script');
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.async = true;
    document.head.appendChild(script);

    // Initialize the HubSpot form
    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          region: 'na1',
          portalId: '7333835',
          formId: '33166fb1-3218-4c98-aebe-cc6d66c82722',
        });
      }
    };

    return () => {
      // Clean up the script when the component unmounts
      document.head.removeChild(script);
    };
  }, []);

  return <div id="hubspot-form" />;
};

export default HubSpotEcomForm;
