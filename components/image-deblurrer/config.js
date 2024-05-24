export const heroSectionData = {
    heading: {
        spynebluetitle: "Free AI ",
        title: "Image Deblurrer Online "
    },
    subHeading: {
        title: "Increase image resolution without losing quality. Powered by",
        subtile: "Spyne.ai",
        url: `${process.env.PROJECT_BASEURL}`
    },
    dropZone: {
        smallText: "Drop an image",
        resolutionText: "(upto resolution 5,000 x 5,000 px)",
        uploadIcon: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/upload-white.svg`,
        uploadBtnText: "Upload an image",
        pickImageText: "No image to upload ? Pick one"
    },
    beforeAfterData: {
        beforeImg: `https://spyne-static.s3.amazonaws.com/AI-tools/image-deblurrer-before.webp`,
        afterImg: `https://spyne-static.s3.amazonaws.com/AI-tools/image-deblurrer-after.webp`
    }
};

export const imageUpscalingData = {
    heading: "What is an Image Deblurrer?",
    description:
        "An image deblurrer is an AI-powered tool that focuses on the task of analyzing the image to make better illustration of the scene, giving sharper and better results.  It is based on models that are influenced by other image enhancement methods like Photoshop. Simply called, it is a technique used for removing the blur from a deteriorated image and restoring the original image. The fact that blurry images is one of the most common photography mistake makes this tool beneficial.",
    cardsData: [
        {
            key: "uploadImage",
            image: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/trusted-enterprise/upscalingprocess1.svg`,
            title: "1. Upload an image",
            subTitle: "We accept both PNG and JPG file formats."
        },
        {
            key: "uploadImage",
            image: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/trusted-enterprise/upscalingprocess2.svg`,
            title: "2. Upscale using AI",
            subTitle: "Transform your images into high-quality digital assets."
        },
        {
            key: "uploadImage",
            image: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/trusted-enterprise/upscalingprocess3.svg`,
            title: "3. Download ",
            subTitle: "Download your enhanced image in PNG format."
        }
    ]
};
export const ToolSectionData = {
    heading:
      "AI Image Deblurring from any Photo Online",
    subheading:
      "From casual social media posts to building the brand identity of a business, everything requires images, and not just any images but high-quality images. Here’s how our tool works and why it’s the best.",
    toggleFirst: "Read More",
    toggleSecond: "Read Less",
    arrowimg: `${process.env.IMG_CLOUD_STORAGE_PREFIX}/AI-tools/photo-upscaler/trusted-enterprise/rightArrow.svg`,
    aienhancmentgif: `${process.env.PROJECT_BASEURL}/wp-content/uploads/2023/06/ai-tools-gif.webp`
  };

export const DeblurReadMoreContentData = {
    FirstDescription: "Nowadays, everything is visually driven; high-quality images are now an important aspect of our daily lives. From casual social media posts to building the brand identity of a business, everything requires images, and not just any images but high-quality images. However, there are moments when you try your best to capture perfect images, but somehow, due to shaky hands or a sudden moment in your camera, the image you capture comes out blurry. Blurry images can be a nightmare for photographers. But now AI technology has gone far ahead, and with a simple tool, anyone can get rid of unwanted blurry images. This tool is called Image deblurrer.",
    SecondDescription: "If you are eager to learn more and want to know how you can apply unblur tool for your own benefit, then this blog is for you.",
    Firstheading: {
        heading: "What is an Image Deblurrer?",
        descriptions: [
            // { description: "An image deblurrer is an AI-powered tool that processes the image and removes unwanted blur, which in the end, provides a better representation of the scene. The task of deblurrer tools is to unblur image and make them more representable by removing blurring elements. The fact that blurry images is one of the most common photography mistake makes this tool beneficial. " },
            { description: "The need for image deblurring arises from various scenarios where images may be captured under unrealistic conditions. For instance, when taking a photograph in low light or using slow shutter speeds, the camera may capture motion blur if the subject or camera moves during the exposure. Similarly, images taken with a poorly focused lens may suffer from defocus blur. In these cases, deblurring can be used to salvage valuable information from blurred images. Therefore specific algorithms and techniques were used to build this tool. Many algorithms methods like Wiener deconvolution and Lucy-Richardson deconvolution to more advanced approaches helped build image deblurrer." },
            { description: "The process of image deblurring involves applying various mathematical and computational techniques to estimate the original sharp image from the blurred version. These techniques are often based on understanding how the blur was introduced into the image and how it affects different parts of the image." }
        ]
    },
    SecondHeading: {
        heading: "Why Do You Need Deblurring Images?",
        FirstDescription: "When a photographer is out to capture images, he/she always looks for perfection with a pinch of aesthetic in his photographs. They try to provide and make it a better representation of the scene they have captured. But even after doing everything right, somehow, on many occasions, images come out less or more blurry. Therefore deblurring the image becomes essential for making an image more sharp and useful. It makes a unblur image online a great option for",
        boldText: " Image Upscaler.",
        SecondDescription: "This tool helps you to deblur images caused by camera defocus or sudden movement of the camera. Image deblurrer is handy in any type of photography, be it product, car, or shoe photography. An unblurred photo always attracts an audience. An unblur image AI might just unblur photo, but its applications are beyond that.",
        points: [{
            title: "1. Various Types of photography:",
            text: " The tool can easily take on the challenge of camera shake. Uses intricate image stabilization techniques, and it steadies the trembling elements. As a result, previously blurred elements are sharpened, and the true quality of the photograph comes out."
        },
        {
            title: "2. Forensics and Crime Solving:",
            text: " Obtaining clear and sharp visuals can make all the difference in deciphering a case. Crime scene photos or surveillance footage are often ruined by motion blur, low-light conditions, or other environmental challenges, making it difficult for investigators to find crucial details. An unblur tool can remove blur from photos that can be later used as evidence."
        },
        {
            title: "3. Imaging In the Medical Field:",
            text: " The application of image deblurrer in medical examinations begins with the understanding that acquiring clear and sharp images is importantt for accurate diagnoses. This can only be achieved if the images are unblurred. Therefore photo deblurrer works by reversing the blurring effect and restoring fine details."
        },
        {
            title: "4. Satellite Imagery:",
            text: " With amazing precision, deblurring techniques can easily handle atmospheric interference, instrumental limitations, and the complex movement of aerial platforms. Therefore this tool can easily unblur images of a star or a Cosmo, and this helps scientists discover new things regarding space."
        }

        ]
    },
    ThirdHeading: {
        heading: "Which Images Can Be Deblurred",
        description: "An image deblurrer success only depends on the severity of the blur. There are also other requirements that can vary, like the image weight should be up to 5mb, length and width be up to 2500 pixels. But there are certain kinds of blur images where unblur tools can showcase their efficiency.",
        points: [{
            title: "1. Motion blur",
            text: "Images blurred due to camera or object motion can easily be deblurred. The direction and amount of motion blur play a role in determining the effectiveness of deblurring."
        },
        {
            title: "2. Defocus blur",
            text: "Out-of-focus images can be blurred to some extent. The blur caused by incorrect camera focus settings can be partially corrected."
        },
        {
            title: "3. Gaussian blur",
            text: "Images that are blurred using Gaussian filters or similar smoothing techniques can be partially deblurred, depending on the strength of the blur."
        },
        {
            title: "4. Uniform blur",
            text: "Images that have uniform blur, where the blur is consistent across the entire image, are generally easier to deblur compared to non-uniform blurs. A blur that is constant across the image is known as uniform blur and is easier to unblur compared to other forms of blurred images."
        }]
    },
    FourthHeading: {
        heading: "Why Choose Spyne AI Image Deblurrer?",
        firstHalfDescription: "With our expertise in AI technology, we have built amazing tools that have helped businesses build stunning ecommerce catalogs. With our AI technology, you can take your photo editing and enhance",
        BoldText: "ecommerce catalogs.",
        secondHalfDescription: " With our AI technology, you can take your photo editing and enhancement to the next level. Spyne knows how much of an issue a blurred image is and how greatly it can impact a business's catalog quality. Therefore our AI gives you the power of image upscaling, which will add super-resolution to your blurred images and remove blur from photos. Additionally, our AI tools will also marginalize your images which will give your image a better look for your catalog.",
        subDescription: "So, now you can easily image unblur your favorite photos with a few and simple clicks. With our tools, you will get free features that enhance overall image quality. These features are",
        points: [{
            title: "1. Image quality Detection",
            text: "Our AI will deliver high-level detection with ease. The AI will notify you if the image requires certain changes. If the image is cropped, blurry, or overexposed, everything will be detected by the AI."
        },
        {
            title: "2. Profanity Check",
            text: "Sometimes, images have something explicit or derogatory content that can impact the images and your catalogs in a big way. Spyne AI will detect these elements and notify the user."
        },
        {
            title: "3. Background Transformation",
            text: "If you are not satisfied with the background of your image, then you don’t have to worry about it. Our tool can easily remove or add a new background that will improve the overall visuals of your image."
        },
        {
            title: "4. Image Enhancement",
            text: "Feel free to use our tool to enhance your image by tilt and edge correction of the image. Our AI will also add the required exposure to your images."
        }],
        lastFirstHalfDesc: "In addition to all of this, our ",
        boldText: "image enlarger",
        lastSecondHalfDesc: " can easily extend the background of your image. All of this can be achieved within a few seconds, and you can easily bundle edit your images with the help of our API solutions."
    },
    FifthHeading: {
        heading: "How to Unblur Your Images",
        description: "With a few simple clicks, you can easily unblur your images using our AI tool.",
        points: [
            { text: "1. Unbluring images is easy now. With Spyne AI, just upload your blurry image by clicking on “ Upload image.”" },
            { text: "2. After uploading your blur image, the AI image enlarger will automatically unblur the image, and then you will have a crystal clear image to download." },
            { text: "3. You can fine-tune your image by adjusting color sharpness or exposure." },
            { text: "4. When satisfied with the results, click “Download”." }
        ],
        subDescription: "But you can also find tools online that will unblur image free though their quality will not be up to mark. These tools can be found on the internet or on the play store if you want to unblur images in the phone.",
        keypoints: [{
            title: "1. Sharpen images:",
            text: " This unblur image app will help you improve the overall image quality of blurred photos."
        },
        {
            title: "2. Lummi:",
            text: " It's a photo editing app that can be used as an image deblurrer. Using sharpening and graining tools."
        },
        {
            title: "3. Enhance photo quality:",
            text: " This photo editor tool is a good unblur tool that will help you unblur images on smartphones."
        }
        ]
    },
    FeatureHeading: {
        heading: "Features of Image Unblurrer",
        description: "An image deblurrer reduces or eliminates blurriness from images, enhancing their clarity and visual quality. Whether utilizing traditional algorithms or advanced AI-based approaches, an image unblurrer offers a range of features",
        subFeatures: [{
            title: "Unblur Image Online to Enhance Portrait",
            text: "You can easily unblur pictures online free. These online platforms utilize advanced deep-learning algorithms to reduce blurriness and restore details in portrait images. Many unblur tools can be found on the internet easily. Most of these online unblur tools are easy to use. All you have to do is click on the prompt button saying upload an image or drag copy the blurred picture. The tool will automatically deblur the image online after the upload is complete. Then you can download the sharpened and enhanced images the online tool provides."
        },
        {
            title: "Restore Old Photos for New Look",
            text: "Have you ever wanted to restore some old faded photos of your grandparents?  Now with the help of AI, you can easily restore these photos by using Image upscale and Unblur tools. Restoring old photos for a new look is a process that aims to rebuild and enhance the visual appeal of vintage or aging photographs. Old photos may suffer from various issues over time, such as fading, discoloration, scratches, tears, and other forms of damage. Modern technology, image editing techniques, and software can address these imperfections, breathing new life into nostalgic memories and transforming them into captivating images that retain their historical significance."
        },
        {
            title: "Sharpen Image to Recover Details",
            text: "Images can lose sharpness due to various factors such as camera limitations, image compression, or resizing. By applying sharpening algorithms, photographers and image editors can accentuate edges and bring out intricate details, making the image appear more precise and defined. These days you can sharpen images online without any time constraints or effort. With photo editing and upscaling tools, you can improve image quality and make it look clearer and crisp. These tools will allow you to adjust lighting, contrast, and exposure, fine-tune color and unwanted blurriness, upscale images, which will make your images look sharper."
        },
        {
            title: "Remove Blur and Enhance Product Photos With Ease",
            text: "Blurry and pixelated photos can ruin a product listing and sales. You can easily remove blur from photos with image deblurrer and get rid of blurry and pixelated pictures and sharpen images online or use apps to do so. It is recommended to have high quality images to attract customers and boost sales."
        },
        {
            title: "Unblur Text to Make them Readable",
            text: "If you are seeking ways to get rid of that blur, then unblur tools can help you. These unblur tools can easily satisfy a curiosity about blurry texts that have some kind of secret content. You can also read blur text using inspect tool or you can use the google translate tool to read blurred text. But in most cases, people prefer photo editing tools to eliminate blurry text."
        },
        {
            title: "Enhance and Upscale Images for Better Quality",
            text: "If you wish to upscale the quality of the image then it's easy to do so by clicking on the upload image option that can be found on different unblur tools online. Enhancing and upscaling images is a valuable process that aims to improve the quality and resolution of  images. Whether you have low-resolution images, old photographs, or pixelated graphics, image enhancement, and upscaling can take the quality of images to a higher level, making them more visually appealing and suitable for various purposes."
        }]
    },
    ConclusionHeading:"Conclusion",
    ConclusionText:"The image deblurrer has become a valuable tool to enhance and upscale images for better quality. Its widespread applications extend to photography, forensics, medical imaging, and more. Users can now easily and efficiently remove blur from photos, making them more visually appealing and effective for various purposes. With the ease and accessibility of AI-powered tools, anyone can now take their images to new heights of clarity and visual impact."

}

export const AccordianSectiondata = {
    heading: "Got any questions ?",
    questions: [
      {
        question: "How can I remove blur from a picture online?",
        content:
          "Unbluring a picture is simple and fast using Spyne AI tool. Our Image upscaling tool will give you astonishing results like never before. Just upload the blurred image and our AI image upscaler will do the trick for you."
      },
      {
        question: "How do you Unblur a picture on Google?",
        content:
          "Instructions to Unblur a Blurry Photo using Google Photos on your Pixel 7 or 7 Pro: Launch the Google Photos app on your Pixel 7 or 7 Pro. Navigate to your photo library and choose a blurry photo you want to enhance.Tap the Edit button located in the bottom toolbar.In the photo editor, click on the Tools option.Look for the Unblur feature and select it. Google Photos will then analyze the selected photo and automatically apply the Unblur tool to enhance the image’s clarity and sharpness"
      },
      {
        question: "Is there software to Unblur images?",
        content:
          "Many unblur image apps or free software can be found easily. One of the best software in the market is Unshake. It is one of the simplest software to deblur images. It detects the nature of the blur and improves your blurry photos."
      }]
    }