export const headerData = {
  logo: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/spyneColoredBlack-Logo.svg`,
  downCaret: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/down-caret.svg`,
  arrowimg: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/trusted-enterprise/rightArrow.svg`,

  menuList: [
    {
      key: "products",
      dropdown: true,
      heading: "Products",
      dropdownList: [
        {
          key: "virtual_studio",
          title: "Virtual Studio",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/virtual-studio.svg`,
          description: "Place your cars in a studio",
          url: `${process.env.PROJECT_BASEURL}/virtual-car-photography-studio`
        },
        {
          key: "Spin",
          title: "360° Spin",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/360-spin.svg`,
          description: "Showcase your cars from every angle",
          url: `${process.env.PROJECT_BASEURL}/360-car-photography`
        }
      ]
    },
    {
      key: "solutions",
      dropdown: true,
      heading: "Solutions",
      dropdownList: [
        {
          key: "marketplaces",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/marketplaces.svg`,
          title: "Marketplaces",
          description: "Smart merchandising for your car",
          url: `${process.env.PROJECT_BASEURL}/car-marketplace-merchandising`
        },
        {
          key: "dealerships",
          title: "Dealerships",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/dealerships.svg`,
          description: "Solutions for the digital world",
          url: `${process.env.PROJECT_BASEURL}/car-dealership-merchandising`
        }
      ]
    },
    {
      key: "platforms",
      heading: "Platforms",
      dropdown: true,
      dropdownList: [
        {
          key: "android_app",
          title: "Android App",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/android-app.svg`,
          description: "Download our Android App",
          url: "https://play.google.com/store/apps/details?id=com.spyneai"
        },
        {
          key: "ios_app",
          title: "iOs App",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/ios-app.svg`,
          description: "Download our iOS App",
          url: "https://apps.apple.com/us/app/spyne-ai/id1570801766"
        },
        {
          key: "darkroom",
          title: "Darkroom",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/darkroom.svg`,
          description: "Try our online photo editor",
          url: `${process.env.PROJECT_BASEURL}/darkroom`
        },
        {
          key: "dashboard",
          title: "Dashboard",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/dashboard.svg`,
          description: "For all your car photography and editing needs",
          url: `${process.env.PROJECT_BASEURL}/dashboard/login`
        },
        {
          key: "developer_hub",
          title: "Developer Hub",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/developer-hub.svg`,
          description: "Integrate our AI in your environment",
          url: "https://docs.spyne.ai/"
        },
        {
          key: "console",
          title: "Console",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/console.svg`,
          description: "One stop-shop for all your car merchandising needs",
          new: "New",
          url: "https://console.spyne.ai/login"
        }
      ]
    },
    {
      key: "company",
      heading: "Company",
      dropdown: true,
      dropdownList: [
        {
          key: "about_us",
          title: "About Us",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/about-us.svg`,
          description: "Get to know us better",
          url: `${process.env.PROJECT_BASEURL}/about-us`
        },
        {
          key: "contact_us",
          title: "Contact Us",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/contact-us.svg`,
          description: "Talk to us",
          url: `${process.env.PROJECT_BASEURL}/contact-us`
        },
        {
          key: "careers",
          title: "Careers",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/careers.svg`,
          description: "Job opportunities at Spyne",
          url: "https://www.linkedin.com/jobs/search/?currentJobId=3636402878&f_C=20418623&geoId=92000000"
        },
        {
          key: "faqs",
          title: "FAQs",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/faqs.svg`,
          description: "Top questions people ask us",
          url: `${process.env.PROJECT_BASEURL}/faqs`
        }
      ]
    },
    {
      key: "resources",
      heading: "Resources",
      dropdown: true,
      dropdownList: [
        {
          key: "blogs",
          title: "Blogs",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/blogs.svg`,
          description: "Place your cars in a studio, virtually",
          url: `${process.env.PROJECT_BASEURL}/blogs`
        },
        {
          key: "glossary",
          title: "Glossary",
          icon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/header-icons/glossary.svg`,
          description: "Everything you should know",
          url: `${process.env.PROJECT_BASEURL}/definition`
        }
      ]
    },
    {
      key: "pricing",
      heading: "Pricing",
      url: `${process.env.PROJECT_BASEURL}/pricing-plans`,
      dropdown: false
    }
  ],
  headerRightBar: {
    loginText: "Login",
    signupText: "Sign up",
    demoBtnText: "Get a Demo",
    loginInBtnText: "Get Started",
    modalHeading: "Start A Free Trial Now !",
    modalSubheading:
      "Just drop in your details here and we’ll get back to you!",
    closeIcon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/console/project/close_icon.svg`,
    letGetStarted : "Let's Get Started"
  }
};

export const footerData = {
  logo: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/SpyneLogo.svg`,
  text: "Spyne is a deep tech company helping businesses create studio-finish catalogs",
  appStoreImg: {
    url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/app-store.svg`,
    link: "https://apps.apple.com/us/app/spyne-ai/id1570801766"
  },
  gplay: {
    url: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/gplay.svg`,
    link: "https://play.google.com/store/apps/details?id=com.spyneai&pli=1"
  },

  socialLinks: [
    {
      image: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/facebook.svg`,
      link: "https://www.facebook.com/spyneai/"
    },
    {
      image: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/instagram.svg`,
      link: "https://www.instagram.com/spyne.ai/"
    },
    {
      image: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/twitter.svg`,
      link: "https://twitter.com/spyne_ai"
    },
    {
      image: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/youtube.svg`,
      link: "https://www.youtube.com/channel/UCXFGiawbLL2pBWI84VY5sJw"
    },
    {
      image: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/linkedin.svg`,
      link: "https://www.linkedin.com/company/spyne-ai/"
    }
  ],
  menues: [
    {
      heading: "Product",
      menu: [
        {
          text: "Virtual Studio",
          url: `${process.env.PROJECT_BASEURL}/virtual-car-photography-studio`
        },
        {
          text: "360 Spin",
          url: `${process.env.PROJECT_BASEURL}/360-car-photography`
        }
      ]
    },
    {
      heading: "Solution",
      menu: [
        {
          text: "Dealerships",
          url: `${process.env.PROJECT_BASEURL}/car-dealership-merchandising`
        },
        {
          text: "Marketplace",
          url: `${process.env.PROJECT_BASEURL}/car-marketplace-merchandising`
        }
      ]
    },
    {
      heading: "Free Tools",
      menu: [
        {
          text: "Photo Upscaler",
          url: `${process.env.PROJECT_BASEURL}/photo-upscaler`
        }
      ]
    },
    {
      heading: "Platforms",
      menu: [
        {
          text: "Android App",
          url: "https://play.google.com/store/apps/details?id=com.spyneai&pli=1"
        },
        {
          text: "IOS App",
          url: "https://apps.apple.com/us/app/spyne-ai/id1570801766"
        },
        {
          text: "Darkroom",
          url: `${process.env.PROJECT_BASEURL}/darkroom?category=automobile`
        },
        {
          text: "DashBoard",
          url: `${process.env.PROJECT_BASEURL}/dashboard/login`
        },
        {
          text: "Console",
          url: "https://console.spyne.ai/login"
        },
        {
          text: "Developer Hub",
          url: "https://docs.spyne.ai/"
        }
      ]
    },
    {
      heading: "Company",
      menu: [
        {
          text: "About Us",
          url: `${process.env.PROJECT_BASEURL}/about-us`
        },
        {
          text: "Contact Us",
          url: `${process.env.PROJECT_BASEURL}/contact-us`
        },
        {
          text: "Careers",
          url: "https://www.linkedin.com/jobs/search/?currentJobId=3631745770&f_C=20418623&geoId=92000000"
        },
        {
          text: "FAQs",
          url: `${process.env.PROJECT_BASEURL}/faqs`
        }
      ]
    },
    {
      heading: "Resources",
      menu: [
        {
          text: "Blogs",
          url: `${process.env.PROJECT_BASEURL}/blogs/`
        },
        {
          text: "Glossary",
          url: `${process.env.PROJECT_BASEURL}/definition`
        }
      ]
    }
  ],
  bottomFooterData: {
    copyright: "@2023 Spyne.ai All rights reserved ",
    menues: [
      {
        title: "Cookie Policy",
        url: `${process.env.PROJECT_BASEURL}/cookie-policy`
      },
      {
        title: "Terms of Service",
        url: `${process.env.PROJECT_BASEURL}/terms-service`
      },
      {
        title: "Data Processing Addendum",
        url: `${process.env.PROJECT_BASEURL}/data`
      },
      {
        title: "Privacy Policy",
        url: `${process.env.PROJECT_BASEURL}/privacy`
      }
    ]
  }
};
