/**@format */
import React, {useRef} from "react"
import SignInSignUp from "./SignInSignUp"
import Image from "next/image"
import {LOGIN_DATA} from "./config"

function MainWrapper() {
    const videoRef = useRef()
    // Left sideImage of page
    const leftImageURL = "https://spyne-static.s3.amazonaws.com/console/blackCarGif.mp4"

    return (
        <section className="enterprise-selection-area h-screen">
            <div className="container-fluid mx-auto h-full">
                <div className=" grid h-full grid-cols-1 gap-0 md:grid-cols-12 ">
                    <div className="col-span-1 md:h-full px-4 pt-5 pb-6 md:col-span-7 lg:px-6 lg:pl-12 lg:pt-14 3xl:col-span-8 mt-auto h-fit">
                        <Image src={LOGIN_DATA?.logoImage} alt="Spyne logo" width={150} height={100} className=" xs:mx-auto mb-4 h-12 w-auto lg:mx-0 lg:mb-0 lg:h-14" />
                        <video width="100%" height="100%" autoPlay loop muted className="mx-auto object-contain md:h-[95%]" ref={videoRef}>
                            <source src={leftImageURL} type="video/webm" />
                        </video>
                    </div>
                    <div className="col-span-1 block h-full place-items-center py-3 px-4 md:col-span-5 md:grid md:pt-12 md:pr-32 md:pl-20 lg:px-6 2xl:px-28 3xl:col-span-4">
                        <SignInSignUp />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default MainWrapper
