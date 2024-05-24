/**
 * @format
 */
 import axios from 'axios';
 import React, { useRef, useState } from "react";
 import { useRouter } from 'next/router';
 import { useEffect } from 'react';
 import { useSelector } from 'react-redux';
 import Navbar from "../common/Navbar";
 import Leftbar from "../common/left-bar/leftbar";
 import { saveAs } from "file-saver";
 import { useDispatch } from 'react-redux';
 import { setBoolean } from '../../store/actions';
 import { headerData } from "../common/config";
 import { CtaSectionData } from "../photo-upscaler/config";
 import Modal from "../common/modals/Modal";
 import Axios from "axios";
 import NoindexMetaHead from "../NoindexMetaHead";
 import HubspotForm from 'react-hubspot-form'
 import {usePopper} from "react-popper"
import { localStorageKeys, Logout } from '../signInSignUp/config';
import LoginModal from '../signInSignUp/LoginModal';
import { toast } from 'react-toastify';
import { downloadSingleImage } from '@/utils/downloadImage';

 function PhotoUpscalerResult({Toolname}) {
    const dispatch = useDispatch();
    const router = useRouter();

    const variable = useSelector((state) => state.variable);
    const [UserImage, setUserImage] = useState(variable);
    const [logInState, setLogInState] = useState(false)

    const variableChecker = () => {
        if(variable == null){
            // setUserImage(null);

            router.push('/' + Toolname + '/upload');
            
        }
        else{
            
            setUserImage(variable, () => {

              });

            
        }
    };
    useEffect(() => {
        variableChecker();

      }, []);


    const [showModal, setShowModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false)
    // const [loggedIn, setLoggedIn] = useState(false)
    let [referenceElement, setReferenceElement] = useState(null)
    let [popperElement, setPopperElement] = useState(null)
    let {styles, attributes} = usePopper(referenceElement, popperElement, {
        placement: "bottom-end"
    })
    
    let dropdownRef = useRef()

    const handleModal = (e) => {
        e.stopPropagation();
        try {
            if(logInState){
                downloadSingleImage({imageUrl : isChecked ? AfterImage : BeforeImage,imageName: ''});
            }else{

                if (!showModal) {
                    setShowModal(true);
                    setTimeout(() => {
                      setFloatTransition("top-1/2");
                    }, 100);
                  } else {
                    setTimeout(() => {
                      setFloatTransition("-top-1/2");
                    }, 1);
                    setTimeout(() => {
                      setShowModal(false);
                    }, 250);
                  }
            }
        } catch (error) {
          createAlert({ type: "error", message: error.message });
        }
      };

    
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
          const { name, workEmail, company, phone } = userData;
        if (name === "" || workEmail === "" || company === "" || phone === "")
          return;
        if (phone.length <= 6) return;
        if (phone.length >= 15) return;
        const portalId = "7333835";
        const formGuid = "33166fb1-3218-4c98-aebe-cc6d66c82722";
        const config = {
          // important!
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = await Axios.post(
          `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`,
          {
            portalId,
            formGuid,
            fields: [
              {
                name: "firstname",
                value: name
              },
              {
                name: "email",
                value: workEmail
              },
              {
                name: "company",
                value: company
              },
              {
                name: "phone",
                value: phone
              }
            ]
          },
          config
        );
        if (response.status == 200) {
        handleDownload();
        }
        // return response;
        } catch (error) {
          console.log(error)
        }finally {
          setShowModal(false)
        }
      };
    
      const handleFormFieldInputs = (e) => {
        try {
          setuserData({...userData, [e?.target?.name]: e?.target?.value})
        } catch (error) {
          console.log(error);
        }
      };

    const [floatTransition, setFloatTransition] = useState("-top-1/2");
    const [userData, setuserData] = useState({
      name: "",
      workEmail: "",
      company: "",
      phone: ""
    });

    const [imageLoaded, setImageLoaded] = useState(false);
    const handleImageLoad = () => {
      setImageLoaded(true);
    };
    



    const [BeforeImage, setBeforeImage] = useState(UserImage);
    const [AfterImage, setAfterImage] = useState();
    const [scale, setScale] = useState('');
    const [save_params, setSave_params] = useState('');
    const [className, setClassName] = useState('hidden');
    const [beforeImageClass, setbeforeImageClass] = useState('block');
    const [afterImageClass, setafterImageClass] = useState('hidden');
    
    //Changes the before/after image on process button
    const handleClasschangeClick = () => {

        setClassName('contents');
        setbeforeImageClass('hidden');
        setafterImageClass('contents');
    };
  
    // Upscales the image on selected parameters
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = {
          image_url: UserImage,
          scale,
          save_params: { extension: save_params, quality: 95 }
        };
    
        try {
          const response = await axios.post('https://toolsapi.spyne.ai/api/forward', data)
          .then((res) => {
              setAfterImage(res.data.url);
              console.log('ye hai upscaled image:', AfterImage)
          })
          ;

        } catch (error) {
          console.error('API Error:', error);
        }
      };

    const value  = router.query;

    
    //Changes the image on before/after switch
    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);

        if (!isChecked) {
        setbeforeImageClass('hidden');
        setafterImageClass('block');

        } else {
        setbeforeImageClass('block');
        setafterImageClass('hidden');

        }
    };


    // Redirect to Upload page on button click
    const newProject = () => {
        dispatch(setBoolean(false));
        router.push('/' + Toolname + '/upload');
    };

    //Download the Upscaled image
    const handleDownload = () => {
        saveAs(
            AfterImage
          );
      };
    

    //Find and show Uploaded image dimensions

    const [dimensions, setDimensions] = useState({ width: null, height: null });
    const [imageWidth, setimageWidth] = useState(null);
    const [imageHeight, setimageHeight] = useState(null);
    const imageDimensionChecker = (event) => {
        const { naturalWidth, naturalHeight } = event.target;
        setDimensions({ width: naturalWidth, height: naturalHeight });
        setimageHeight(naturalHeight);
        setimageWidth(naturalWidth);
    };

    const [buttonText, setButtonText] = useState('Process');

    const processButtonChange = () => {
      setButtonText('Reprocess');
    };
    
     useEffect(() => {
         let outsideFocusHandler = event => {
             if (!dropdownRef?.current?.contains(event?.target)) {
                 setShowDropdown(false)
             }
         }

         document.addEventListener("mousedown", outsideFocusHandler)

         return () => {
             document.removeEventListener("mousedown", outsideFocusHandler)
         }
     }, [])

    const handleLogout = async() => {
      setShowDropdown(false)
      await Logout({skipBackendLogout: false})
    //   setLoggedIn(false)
      setLogInState(false)
      window.location.reload()
    //   dispatch(resetAuth())
    }

    useEffect(() => {
        let state = JSON.parse(localStorage.getItem(localStorageKeys?.loggedIn))
        if(state){
         setLogInState(true)
        }
       }, [logInState])
    
    //    useEffect(()=>{
    //     setLoggedIn(logInState)
    //    },[logInState])
    return(
        <section>
            <NoindexMetaHead />
            <Navbar 
                Toolname = {Toolname}
                logInState={logInState}
                setLogInState={setLogInState}
            />
            <div className="pt-10">
                <div className='grid grid-cols-12 gap-0 h-[95vh]'>
                    <div className='col-span-1 md:block lg:block xl:block hidden bg-[#3632400A] pt-8 mr-5'>
                        <Leftbar />
                    </div>
                    
                    <div className='md:pr-10 md:pl-4 xl:pr-10 xl:pl-4 px-4 lg:col-span-11 md:col-span-11 col-span-12 h-full'>
                        <div className='md:grid md:grid-cols-12 xl:grid xl:grid-cols-12 lg:grid gap-0 '>
                            <div className="lg:col-span-4 mt-10 gap-5 hidden md:grid lg:grid xl:grid">
                            <div className="mb-5">
                                <h3>Resize</h3>
                                <p>Upscale Type</p>
                            </div>
                            <div className="ToolSettings mr-20">
                                <form onSubmit={handleSubmit} id="myForm">
                                    <label>
                                        <input className="hidden" type="radio" value="1" id="1" name="scale" defaultChecked onChange={(e) => setScale(e.target.value)}></input>
                                        <div class="upscaler-factor-block block max-w-sm p-3 mb-8 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                            <div className="grid grid-cols-12">
                                                <div className="lg:col-span-3">
                                                    <img className="" src="https://prod-spyne-website.s3.amazonaws.com/24c2692f-df79-4360-958f-3768be95b8e2"></img>
                                                </div>
                                                <div className="lg:col-span-9">
                                                    <h5 class="mb-2 ">Basic</h5>
                                                    <p class="font-medium ">Original Size &nbsp; 1x</p>
                                                </div>    
                                            </div>
                                            
                                        </div>
                                    </label>
                                    <label>
                                        <input className="hidden" type="radio" value="2" id="2" name="scale" onChange={(e) => setScale(e.target.value)}></input>
                                        <div class="upscaler-factor-block block max-w-sm p-3 mb-8 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                            <div className="grid grid-cols-12">
                                                <div className="lg:col-span-3">
                                                    <img className="" src="https://prod-spyne-website.s3.amazonaws.com/301f8928-7dff-4518-8fdd-8d7cf4960aff"></img>
                                                </div>
                                                <div className="lg:col-span-9">
                                                    <h5 class="mb-2 ">Standard</h5>
                                                    <p class="font-medium ">{2*imageWidth} x {2*imageHeight} &nbsp; 2x</p>
                                                </div>    
                                            </div>
                                            
                                        </div>
                                    </label>
                                    <label>
                                        <input className="hidden" type="radio" value="4" id="4" name="scale" onChange={(e) => setScale(e.target.value)}></input>
                                        <div class="upscaler-factor-block block max-w-sm p-3 mb-8 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                            <div className="grid grid-cols-12">
                                                <div className="lg:col-span-3">
                                                    <img className="" src="https://prod-spyne-website.s3.amazonaws.com/99bb4c36-ff75-48bb-a8d4-74dd38f697bc"></img>
                                                </div>
                                                <div className="lg:col-span-9">
                                                    <h5 class="mb-2 ">Pro</h5>
                                                    <p class="font-medium ">{4*imageWidth} x {4*imageHeight} &nbsp; 4x</p>
                                                </div>    
                                            </div>
                                            
                                        </div>
                                    </label>
                                    
                                </form>
                                
                                
                                
                            </div>
                            <div className="ImageFormatSettings">
                                <p>Marketplace sizes</p>
                                <div className="grid grid-cols-4 mt-5">
                                    <label>
                                    <input className="hidden" type="radio" value=".jpg" id=".jpg" name="save_params" onChange={(e) => setSave_params(e.target.value)}></input>
                                        <div className="FormatIcon text-center mr-5">
                                            <img className="hover:border-500 hover:border-1 " src="https://prod-spyne-website.s3.amazonaws.com/071fb5f0-cb2c-4035-a34c-f0b91fa35aa7"></img>
                                            <p className="font-medium text-xs mt-3">JPEG</p>
                                        </div>
                                    </label>
                                    <label>
                                    <input className="hidden" type="radio" value=".png" id=".png" name="save_params" defaultChecked onChange={(e) => setSave_params(e.target.value)}></input>     
                                    <div className="FormatIcon text-center mr-5">
                                        <img className="hover:border-500 hover:border-1" src="https://prod-spyne-website.s3.amazonaws.com/990a0755-2774-410b-9145-c82ca092111c"></img>
                                        <p className="font-medium text-xs mt-3">PNG</p>
                                    </div>
                                    </label>
                                    <label>
                                    <input className="hidden" type="radio" value=".webp" id=".webp" name="save_params" onChange={(e) => setSave_params(e.target.value)}></input>     
                                    <div className="FormatIcon text-center mr-5">
                                        <img className="hover:border-500 hover:border-1 " src="https://prod-spyne-website.s3.amazonaws.com/f9cde4f5-b6ac-4104-8496-96015596988d"></img>
                                        <p className="font-medium text-xs mt-3">WEBP</p>
                                    </div>
                                    </label>
                                </div>
                            </div>
                            
                            </div>
                            <div className="lg:col-span-8 mt-10 gap-0 lg:grid md:grid xl:grid">
                                <div className="ProcessingTab md:grid lg:grid xl:grid grid-cols-12 hidden">
                                    <div className="lg:col-span-2">
                                        {/* <h3 className="font-medium text-xl align-middle">Untitled Project 01</h3> */}
                                    </div>
                                    <div className='lg:col-span-10 md:col-span-10 col-span-12'>
                                        <div className='grid grid-cols-12 xl:gap-0 lg:gap-1 md:gap-2 px-8 '>
                                            <div className='lg:col-span-3 col-span-6 px-2'>
                                                <div className={className}>
                                                    <div className='before-after-switch w-full'>
                                                        <input class="check" type="checkbox" id="checkbox_toggle" defaultChecked onChange={handleCheckboxChange}/>
                                                        <div class="checkbox">
                                                        <label for="checkbox_toggle" class="slide py-2">
                                                            <label for="checkbox_toggle" class="toggle"></label>
                                                            <label for="checkbox_toggle" class="text">Before</label>
                                                            <label for="checkbox_toggle" class="text">After</label>
                                                        </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className='lg:col-span-3 md:col-span-3 col-span-6 px-2 place-content-center flex'>
                                                <div className={className}>
                                                <button className="white-btn text-center inline-flex items-center xl:text-sm lg:text-xs !w-full" onClick={handleModal}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /> </svg>
                                                    &nbsp; Download
                                                </button>
                                                </div>
                                            </div>
                                            <div className='lg:col-span-3 md:col-span-3 col-span-6 px-2 place-content-center flex'>
                                                <button className="white-btn text-center inline-flex items-center xl:text-sm lg:text-xs w-full" onClick={newProject}>
                                                    New Project
                                                </button>
                                            </div>
                                            <div className='lg:col-span-3 md:col-span-3 col-span-6 px-2 place-content-center flex'>
                                                <button className="blue-btn text-center inline-flex items-center w-full xl:text-sm lg:text-xs" type="submit" value="Submit" form="myForm" onClick={() => { handleCheckboxChange(); handleClasschangeClick(); processButtonChange();}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /> </svg> 
                                                    &nbsp; {buttonText}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ImagePrivewer mt-8 rounded-lg border-1 md:h-[70vh] lg:h-[70vh] xl:h-[70vh] h-[40vh] object-contain align-middle">
                                    
                                
                                    <div className={beforeImageClass}>
                                        {!imageLoaded && <div className="spinner z-10"></div>}
                                        <img className="z-10 relative w-full md:h-[70vh] lg:h-[70vh] xl:h-[70vh] h-[40vh] object-contain align-middle" src={BeforeImage} onLoad={imageDimensionChecker}></img>
                                    </div>
                                    <div className={afterImageClass}>
                                        {!imageLoaded && <div className="spinner z-10"></div>}
                                        <img className="w-full  md:h-[70vh] lg:h-[70vh] xl:h-[70vh] h-[40vh] object-contain align-middle" src={AfterImage} onLoad={handleImageLoad} onChange={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }}></img>
                                    </div>
                                </div>
                                <div className='mobileConfig md:hidden lg:hidden xl:hidden h-[60vh] overflow-scroll pb-20'>
                                    <div className="mb-5">
                                        <h3>Resize</h3>
                                        <p>Upscale Type</p>
                                    </div>
                                    <div className="ToolSettings">
                                        <form onSubmit={handleSubmit} id="myForm">
                                            <label>
                                                <input className="hidden" type="radio" value="1" id="1" name="scale" defaultChecked onChange={(e) => setScale(e.target.value)}></input>
                                                <div class="upscaler-factor-block block max-w-sm p-3 mb-8 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                    <div className="grid grid-cols-12">
                                                        <div className="col-span-3">
                                                            <img className="" src="https://prod-spyne-website.s3.amazonaws.com/24c2692f-df79-4360-958f-3768be95b8e2"></img>
                                                        </div>
                                                        <div className="col-span-9">
                                                            <h5 class="mb-2 ">Basic</h5>
                                                            <p class="font-medium ">Original Size &nbsp; 1x</p>
                                                        </div>    
                                                    </div>
                                                    
                                                </div>
                                            </label>
                                            <label>
                                                <input className="hidden" type="radio" value="2" id="2" name="scale" onChange={(e) => setScale(e.target.value)}></input>
                                                <div class="upscaler-factor-block block max-w-sm p-3 mb-8 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                    <div className="grid grid-cols-12">
                                                        <div className="col-span-3">
                                                            <img className="" src="https://prod-spyne-website.s3.amazonaws.com/301f8928-7dff-4518-8fdd-8d7cf4960aff"></img>
                                                        </div>
                                                        <div className="col-span-9">
                                                            <h5 class="mb-2 ">Standard</h5>
                                                            <p class="font-medium ">{2*imageWidth} x {2*imageHeight} &nbsp; 2x</p>
                                                        </div>    
                                                    </div>
                                                    
                                                </div>
                                            </label>
                                            <label>
                                                <input className="hidden" type="radio" value="4" id="4" name="scale" onChange={(e) => setScale(e.target.value)}></input>
                                                <div class="upscaler-factor-block block max-w-sm p-3 mb-8 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                    <div className="grid grid-cols-12">
                                                        <div className="col-span-3">
                                                            <img className="" src="https://prod-spyne-website.s3.amazonaws.com/99bb4c36-ff75-48bb-a8d4-74dd38f697bc"></img>
                                                        </div>
                                                        <div className="col-span-9">
                                                            <h5 class="mb-2 ">Pro</h5>
                                                            <p class="font-medium ">{4*imageWidth} x {4*imageHeight} &nbsp; 4x</p>
                                                        </div>    
                                                    </div>
                                                    
                                                </div>
                                            </label>
                                            
                                        </form>
                                        
                                        
                                        
                                    </div>
                                    <div className="ImageFormatSettings">
                                <p>Marketplace sizes</p>
                                <div className="grid grid-cols-3 mt-5">
                                    <label>
                                    <input className="hidden" type="radio" value=".jpg" id=".jpg" name="save_params" onChange={(e) => setSave_params(e.target.value)}></input>
                                        <div className="FormatIcon text-center mr-10">
                                            <img className="hover:border-500 hover:border-1 " src="https://prod-spyne-website.s3.amazonaws.com/071fb5f0-cb2c-4035-a34c-f0b91fa35aa7"></img>
                                            <p className="font-medium text-xs mt-3">JPEG</p>
                                        </div>
                                    </label>
                                    <label>
                                    <input className="hidden" type="radio" value=".png" id=".png" name="save_params" onChange={(e) => setSave_params(e.target.value)}></input>     
                                    <div className="FormatIcon text-center mr-10">
                                        <img className="hover:border-500 hover:border-1" src="https://prod-spyne-website.s3.amazonaws.com/990a0755-2774-410b-9145-c82ca092111c"></img>
                                        <p className="font-medium text-xs mt-3">PNG</p>
                                    </div>
                                    </label>
                                    <label>
                                    <input className="hidden" type="radio" value=".webp" id=".webp" name="save_params" onChange={(e) => setSave_params(e.target.value)}></input>     
                                    <div className="FormatIcon text-center mr-10">
                                        <img className="hover:border-500 hover:border-1 " src="https://prod-spyne-website.s3.amazonaws.com/071fb5f0-cb2c-4035-a34c-f0b91fa35aa7"></img>
                                        <p className="font-medium text-xs mt-3">WEBP</p>
                                    </div>
                                    </label>
                                </div>
                            </div>
                                    <div className="ProcessingTab grid grid-cols-12">
                                    <div className="lg:col-span-2">
                                        {/* <h3 className="font-medium text-xl align-middle">Untitled Project 01</h3> */}
                                    </div>
                                    <div className='lg:col-span-10 md:col-span-10 col-span-12'>
                                        <div className='grid grid-cols-12 xl:gap-10 lg:gap-2 md:gap-2 px-2 '>
                                            <div className='lg:col-span-3 col-span-6'>
                                                <div className={className}>
                                                    <div className='before-after-switch w-full'>
                                                        <input class="check" type="checkbox" id="checkbox_toggle" defaultChecked onChange={handleCheckboxChange}/>
                                                        <div class="checkbox">
                                                        <label for="checkbox_toggle" class="slide">
                                                            <label for="checkbox_toggle" class="toggle"></label>
                                                            <label for="checkbox_toggle" class="text">Before</label>
                                                            <label for="checkbox_toggle" class="text">After</label>
                                                        </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div className='lg:col-span-3 md:col-span-3 col-span-6 place-content-center flex'>
                                                <div className={className}>
                                                <button className="white-btn text-center inline-flex items-center xl:text-sm lg:text-xs !w-full" onClick={handleDownload}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /> </svg>
                                                    &nbsp; Download
                                                </button>
                                                </div>
                                            </div>
                                            <div className='lg:col-span-3 md:col-span-3 col-span-6 place-content-center flex'>
                                                <button className="white-btn text-center inline-flex items-center xl:text-sm lg:text-xs w-full" onClick={newProject}>
                                                    New Project
                                                </button>
                                            </div>
                                            <div className='lg:col-span-3 md:col-span-3 col-span-12 place-content-center flex'>
                                                <button className="blue-btn text-center inline-flex items-center w-10/12 fixed bottom-2" type="submit" value="Submit" form="myForm" onClick={() => { handleCheckboxChange(); handleClasschangeClick(); }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /> </svg> 
                                                    &nbsp; Process
                                                </button>
                                                    {logInState ?
                                                        <div className="relative order-3 hidden rounded-full md:block" ref={dropdownRef}>
                                                            <div className="hidden cursor-pointer motion-reduce:transition-none md:block" id="dropdownMenuButton1ds" onClick={() => setShowDropdown(!showDropdown)} ref={setReferenceElement}>
                                                                <div className="relative">
                                                                    <img src="https://spyne-static.s3.amazonaws.com/console/project/userProfileIcon.svg" alt="" height={36} width={36} className="w-7 hover:opacity-80 md:w-9 " />
                                                                </div>
                                                            </div>
                                                            {showDropdown ? (
                                                                <div
                                                                    className="dropdown-menu absolute z-[1000] float-left m-0 mt-1 hidden max-w-[550px!important] list-none rounded-lg bg-white bg-clip-padding text-left text-base shadow-lg md:block"
                                                                    aria-labelledby="dropdownMenuButton1ds"
                                                                    // data-te-dropdown-menu-ref //for dropdown menu
                                                                    ref={setPopperElement}
                                                                    style={styles?.popper}
                                                                    {...attributes?.popper}
                                                                >
                                                                    <div className="grid grid-cols-5 gap-1">
                                                                        <div className="col-span-5">
                                                                            <ul className="p-2 flex hover:bg-gray-100">
                                                                                <img className="mr-2 inline" src="https://spyne-static.s3.amazonaws.com/console/header-icons/logoutIcon.svg" height={18} width={18} />
                                                                                <li className="dropdown-item block w-full cursor-pointer whitespace-nowrap bg-transparent text-sm font-normal text-gray-700" onClick={handleLogout}>Logout</li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : null}
                                                        </div>
                                                        :
                                                        <button
                                                            onClick={handleModal}
                                                            className="blue-btn !text-[14px] font-semibold !py-2 px-5 md:text-base md:leading-[22px]"
                                                        >
                                                            {headerData?.headerRightBar?.loginInBtnText}
                                                        </button>
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
        //   <Modal floatTransition={floatTransition}>
        //     <div className="flex flex-col gap-3 md:mt-0 mt-8 relative w-full">
        //       <h4>
        //         Please Fill Out The Form to Conitune
        //         {/* <Image
        //           src={headerData?.headerRightBar?.closeIcon}
        //           width={16}
        //           height={16}
        //           className="arrow-img align-middle float-right ml-auto cursor-pointer"
        //           onClick={() => setShowModal(false)}
        //         /> */}
        //       </h4>
        //       {/* <p>{headerData?.headerRightBar?.modalSubheading}</p> */}
        //       <div className="flex justify-between gap-3 mt-5 w-full">
        //         {/* <form onSubmit={submitHandler}>
        //           <input
        //             type="text"
        //             className=" border border-black-200 rounded-lg bg-white-600 p-3 placeholder-black-600 text-base font-normal w-full mb-5"
        //             placeholder={CtaSectionData.placeholders[0].placeholder}
        //             onChange={(e) => handleFormFieldInputs(e)}
        //             name="name"
        //             value={userData?.name}
        //           />

        //           <input
        //             type="email"
        //             className=" border border-black-200 rounded-lg bg-white-600 p-3 placeholder-black-600 text-base font-normal w-full mb-5"
        //             placeholder={CtaSectionData.placeholders[1].placeholder}
        //             onChange={(e) => handleFormFieldInputs(e)}
        //             name="workEmail"
        //             value={userData?.workEmail}
        //           />

        //           <input
        //             type="text"
        //             className="border border-black-200 rounded-lg bg-white-600 p-3  placeholder-black-600 text-base font-normal w-full mb-5"
        //             value={userData?.company}
        //             placeholder={CtaSectionData.placeholders[2].placeholder}
        //             onChange={(e) => handleFormFieldInputs(e)}
        //             name="company"
        //           />
        //           <input
        //             type="text"
        //             className="border border-black-200 rounded-lg bg-white-600 p-3  placeholder-black-600 text-base w-full font-normal mb-5"
        //             placeholder={CtaSectionData.placeholders[3].placeholder}
        //             onChange={(e) => handleFormFieldInputs(e)}
        //             name="phone"
        //             value={userData?.phone}
        //           />
        //           <button
        //             class="blue-btn md:w-fit md:!px-16 w-full"
        //           >
        //             {CtaSectionData.button}
        //           </button>
        //         </form> */}
        //         <div className="HubspotFormWrapper w-full">
        //             <HubspotForm
        //               portalId='7333835'
        //               formId='33166fb1-3218-4c98-aebe-cc6d66c82722'
        //               loading={<div>Loading...</div>}
        //               onFormSubmitted={() => { setShowModal(false); handleDownload(); }}
        //               formInstanceId='phtoupsclr'
        //             />
        //         </div>
        //       </div>
        //     </div>
        //   </Modal>
        <LoginModal setShowModal={setShowModal} setLoggedIn={setLogInState}/>
        )}
        </section>    
    );

}

export default PhotoUpscalerResult;