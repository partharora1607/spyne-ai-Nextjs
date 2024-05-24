/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.js"],
  theme: {
    // screens: {
    //   xs: "475px",
    //   "3xl": "1600px",
    //   // => @media (min-width: 1680px) { ... }
    //   desktop: "1800px"
    // },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      colors: {
        wood_black: {
          DEFAULT: "rgba(14, 13, 18, 1)"
        },
        black: {
          DEFAULT: "rgba(0, 0, 0, 1)",
          "4": "rgba(0, 0, 0, 0.04)",
          "8": "rgba(0, 0, 0, 0.08)",
          "10": "rgba(0, 0, 0, 0.1)",
          "12": "rgba(0, 0, 0, 0.12)",
          "16": "rgba(0, 0, 0, 0.16)",
          "18": "rgba(0, 0, 0, 0.18)",
          "50": "rgba(0, 0, 0, 0.5)",
          200: "rgba(0, 0, 0, 0.2)",
          400: "rgba(0, 0, 0, 0.4)",
          40: "rgba(0, 0, 0, 0.04)",
          600: "rgba(0, 0, 0, 0.6)",
          800: "rgba(0, 0, 0, 0.8)",
          900: "rgba(0, 0, 0, 0.9)"
        },
        white: {
          DEFAULT: "rgba(255, 255, 255, 1)",
          15: "rgba(255, 255, 255, 0.15)",
          600: "rgba(255, 255, 255, 0.6)",
          700: "rgba(255, 255, 255, 0.7)",
          900: "rgba(255, 255, 255, 0.9)",
          "16": "rgba(255, 255, 255, 0.16)",
          "8": "rgba(255, 255, 255, 0.08)",
          "6": "rgba(255, 255, 255, 0.6)"
        },
        blue: {
          DEFAULT: "rgba(70,0,242,1)",
          dark: "#4F25B7",
          darker: "#363F72",
          darkest: "#344054",
          darkD: "#3538CD",
          "1": "rgba(208,213,221,1.000)",
          "2": " rgba(70, 0, 242, 0.02)",
          "4": "rgba(70, 0, 242, 0.04)",
          "8": "rgba(70, 0, 242, 0.08)",
          "10": "rgba(70, 0, 242, 0.10)",
          "12": "rgba(74, 58, 255, 0.12)",
          "16": "rgba(70, 0, 242, 0.16)",
          "32": "rgba(69 0 242 / 32%)",
          "40": "rgba(70, 0, 242, 0.40)",
          "10": "rgba(248, 248, 255, 1)",
          "24": "rgba(70, 0, 242, 0.24)",
          "100": "rgba(70, 0, 242, 1)",
          blueGray700: "#363F72",
          light: "#4600F2",
          lighter: "#EEF4FF",
          lightest: "#4A3AFF3D",
          bright: "#1E40AF",
          brighter: "#EFF6FF",
          errorBoundary: "#674ee7",
          ultraLight: "#40238733"
        },
        spyne_blue: {
          DEFAULT: "#4200f2", //rgba(70, 0, 242, 1),
          100: "rgba(70, 0, 242, 0.1)",
          12: "rgba(70, 0, 242, 0.12)",
          20: "rgba(74, 58, 255, 0.02)",
          40: "rgba(70, 0, 242, 0.04)",
          80: "rgba(70, 0, 242, 0.08)",
          200: "rgba(74, 58, 255, 0.2)",
          40: "rgba(70, 0, 242, 0.04)",
          800: "rgba(70, 0, 242, 0.8)",
          300: "rgba(30, 0, 104, 0.08)",
          600: "rgba(70, 0, 242, 0.6)",
          900: "rgba(70, 0, 242, 0.9)"
        },
        gray: {
          DEFAULT: "rgba(200, 200, 200, 1)",
          light: "rgba(239, 240, 246, 1)",
          300: "rgba(10, 38, 71, 0.3)",
          light_300: "rgba(157, 168, 181, 0.3)",
          400: "rgba(10, 38, 71, 0.4)"
        },
        green: {
          DEFAULT: "rgba(2, 122, 72, 1)", //#027A48
          light: "rgba(236, 253, 243, 1)"
        },
        gradiant4:
          "linear-gradient(0deg,rgba(70, 0, 242, 0.04),rgba(70, 0, 242, 0.04)),#ffffff"
      },
      boxShadow: {
        varient1: "0px 16px 24px -4px rgba(4, 33, 89, 0.08)",
        varient2:
          "0px 16px 24px -4px rgba(4, 33, 89, 0.08), 0px 0px 4px 2px rgba(4, 33, 89, 0.03)",
        varient3:
          "0px 12px 16px -4px rgba(70, 0, 242, 0.08), 0px 4px 6px -2px rgba(70, 0, 242, 0.03)",
        varient4: " 0px 3px 8px rgba(29, 0, 102, 0.08)",
        varient5:
          "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)"
      }
    }
  },
  plugins: []
};
