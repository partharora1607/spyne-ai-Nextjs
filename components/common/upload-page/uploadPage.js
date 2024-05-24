/**
 * @format
 */

 import Image from "next/image";
 import { useRouter } from 'next/router';
 import React, { useState } from "react";
 import { useDispatch } from 'react-redux';
 import { setVariable } from '../../../store/actions';
 import {heroSectionData} from "../config";
 import Navbar from "../AutoNavbar";
 import Leftbar from "../left-bar/leftbar";
 import { useEffect } from 'react';
 import { useSelector } from 'react-redux';
 import { setBoolean } from '../../../store/actions';
 import NoindexMetaHead from "../../NoindexMetaHead";
import { localStorageKeys } from "@/components/signInSignUp/config";

 function UploadPage({sampleImages, Toolname}){
    const [logInState, setLogInState] = useState(false)
    const isBoolean = useSelector((state) => state.isBoolean);
    useEffect(() => {
        if(isBoolean == true){
            pgeloadfunc();
            setBoolean(false);
        }
        else{

        }
    }, []);


    const dispatch = useDispatch();
    const router = useRouter();

    const pgeloadfunc = () => {
        const inputField = document.getElementById('imagefile');
        inputField.click();
    };  

    const handleFileChange = (event) => {
        
        const selectedFile = event.target.files[0];
        handleSubmit(event, selectedFile);
      };
    const handleSubmit = async (event, selectedFile) => {
        
        // Create a FormData object
        const formData = new FormData();
        formData.append('image', selectedFile);

        if(selectedFile == null){
            
        }
        else{
            try {
                // Send the image file to the API
                const response = await fetch('https://toolsapi.spyne.ai/api/uploadtos3', {
                    method: 'POST',
                    body: formData,
                });
        
                // Get the API response data
                const data = await response.json();
                dispatch(setVariable(data.imageUrl));
        
                console.log( '/' + Toolname + '/result')
                router.push({
                    pathname: '/' + Toolname + '/result',
                });
                
                } catch (error) {
                console.error('Error:', error);
                }
        }


    };
    //Handle Default Images
    const defaultImageHandler = (imageurlvalue) => {
        
        // const defaultImageUrl = { imageUrl: event.target.src} ;
        dispatch(setVariable(imageurlvalue));
        router.push('/' + Toolname + '/result');
    };
    const ImageSourceFinder = (value) => {
        console.log('ye raha src:', value);
    };

     useEffect(() => {
         let state = JSON.parse(localStorage.getItem(localStorageKeys?.loggedIn))
         if (state) {
            setLogInState(true)
         }
     }, [logInState])

    return(
        <section>
            <NoindexMetaHead />
            <Navbar 
                Toolname = {Toolname}
                logInState={logInState}
                setLogInState={setLogInState}
            />
            <div className="grid grid-cols-12 h-[10vh]">
                <div className='col-span-1 md:block lg:block xl:block hidden bg-[#3632400A] pt-16 mr-5'>
                    <Leftbar />
                </div>
                <div className="col-span-12 lg:col-span-11 md:col-span-11 ">
                <div className="md:pr-5 xl:pr-5 md:pl-0 xl:pl-0 pr-2 pl-2">
                <div className="h-[85vh] relative mt-20 bg-spyne_blue-20 border-spyne_blue-200 p-4 border-dashed border rounded-xl text-center lg:pt-10 pt-10 md:p-3">
                <p className="xl:text-xs md:text-[10px] text-[10px] leading-4 text-black-600 mb-2 font-normal">
                    <small className="text-black-800 block font-semibold">
                    {heroSectionData?.dropZone?.smallText}
                    </small>
                    {heroSectionData?.dropZone?.resolutionText}
                </p>
                <form onSubmit={handleSubmit} className="uploadFormrounded-lg border-dashed border border-black-300 bg-[#4A3AFF05]">

                    <input className="h-[10vh] w-full opacity-0"  type="text"  onChange={handleFileChange} />
                    <div className="uploadBoxContent pb-3">
                        <img className="m-auto mb-6" src="https://prod-spyne-website.s3.amazonaws.com/ba4d9e53-62ef-46bb-a529-4f2a2dc67404"></img>
                        <label for="imagefile" className="btn">
                            <p className="blue-btn m-auto w-52 cursor-pointer">Upload</p>
                        </label>
                        <input className="opacity-0 h-0" type="text" id="imagefile"  onChange={handleFileChange}/> 
                        <p className="mt-[-12px]">Drop your image here</p>
                    </div>
                    <input className="h-[10vh] w-full opacity-0"  type="text"  onChange={handleFileChange} />
                    
                        
                </form>

                <p className="!text-xs mt-8 font-medium text-black-600">
                    {heroSectionData?.dropZone?.pickImageText}
                </p>
                <div className="hidden md:grid grid-cols-6 md:gap-3 cols-6 lg:gap-6 mt-10 p-3 rounded-lg border-dashed border border-black-100 absolute w-[98%] bottom-5">
                    {sampleImages?.map((image, indx) => {
                    return (
                        <div className="" key={`try-images-${indx}`} >
                        <img
                            src={image?.url}
                            onClick={() => defaultImageHandler(image?.url)}
                            alt=""
                            width={100}
                            height={100}
                            className="md:rounded-sm lg:rounded-lg w-full md:h-9 lg:h-[140px] object-cover cursor-pointer"
                        />
                        </div>
                    );
                    })}
                </div>
                <div className="grid-cols-3 md:hidden grid  gap-2 mt-2 absolute w-[92%] bottom-5">
                    {sampleImages.slice(0)?.map((images, indx) => {
                    return (
                        <div className="" key={`try-images-${indx}`}>
                        <img 
                            src={images?.url}
                            onClick={() => defaultImageHandler(images?.url)}
                            alt=""
                            width={100}
                            height={100}
                            className="rounded-85 w-full h-[80px] object-cover"
                        />
                        </div>
                    );
                    })}
                </div>
                </div>
        </div>
                </div>
            </div>
            
        </section>
    )
 }
 export default UploadPage;