/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false
};

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  ...nextConfig,
  env: {
    /** change values for different environments (local, staging, production) */
    PROJECT_BASEURL: "",
    IMG_CLOUD_STORAGE_PREFIX: "",
    BACKEND_BASEURL: "",
    USER_MANAGEMENT_SERVICE: "",
    IMG_CLOUD_STORAGE_PREFIX_2: "",
    PUBLIC_API_SECRET : "816f5jjdkjfdd3b-c6e2-44f5-968a-20bb4d1af8d5",
    APP_KEY_GOOGLE_CLIENT_ID:'fhdjhdjf',
    clevertapKey:"fdhjhjdh",
    minutesToRefresh: 15
    },
  
  // env: {
  //   /** change values for different environments (local, staging, production) */
  //   PROJECT_BASEURL: "https://www.spyne.ai",
  //   IMG_CLOUD_STORAGE_PREFIX: "https://spyne-static.s3.amazonaws.com",
  //   BACKEND_BASEURL: "https://beta-api.spyne.xyz",
  //   USER_MANAGEMENT_SERVICE: "https://beta-api.spyne.xyz",
  //   IMG_CLOUD_STORAGE_PREFIX_2: "https://prod-spyne-website.s3.amazonaws.com",
  //   PUBLIC_API_SECRET : "92ea200a-10a5-49c7-9adc-3727f99ae17d",
  //   APP_KEY_GOOGLE_CLIENT_ID:'887824920844-6n7pic33ra30hf0mjlrc8f1m6qt6hs9r.apps.googleusercontent.com',
  //   clevertapKey:"TEST-Z4W-55R-786Z",
  //   minutesToRefresh: 15
  //   },

  images: {
    domains: [
      "spyne-static.s3.amazonaws.com",
      // "www.spyne.ai",
      "beta-web.spyne.xyz",
      "prod-spyne-website.s3.amazonaws.com",
      "localhost",
      "beta.spyne.ai",
      "spyne.ai"
    ],
    // formats: ["image/avif", "image/webp"]
  },
  assetPrefix: '/ai-tools/assets/',
  // assetPrefix: BASE_PREFIX_FOR_APP,
  async rewrites(){
    return [
      {
        source: `/ai-tools/assets/_next/:path*`,
        destination: '/_next/:path*'
      }
    ]
  }
};
