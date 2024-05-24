/**
 * @format
 */
 import axios from 'axios';
 import React, { useRef, useState } from 'react';
 import Cropper, { ReactCropperElement } from "react-cropper";
 import 'cropperjs/dist/cropper.css';
 import { useRouter } from 'next/router';
 import { useEffect } from 'react';
 import { useSelector } from 'react-redux';
 import Navbar from "../common/AutoNavbar";
 import Leftbar from "../common/left-bar/leftbar";
 import { saveAs } from "file-saver";
 import { useDispatch } from 'react-redux';
 import { setBoolean } from '../../store/actions';
 import { setLeadFormFilled } from '../../store/actions';
 import { headerData } from "../common/config";
 import { CtaSectionData } from "../photo-upscaler/config";
 import Modal from "../common/modals/Modal";
 import Axios from "axios";
 import NoindexMetaHead from "../NoindexMetaHead";
 import UploadModal from "./UploadModal";
 import ReactCrop from 'react-image-crop';
 import RadioGroup from './NumberPlateOptions';
 import 'react-image-crop/dist/ReactCrop.css';
 import ImageCropper from './CropTool';
 import HubspotForm from 'react-hubspot-form'
import { localStorageKeys } from '../signInSignUp/config';
import LoginModal from '../signInSignUp/LoginModal';
import { downloadSingleImage } from '@/utils/downloadImage';

 function NumberPlateMaskingResult({Toolname}) {
    const dispatch = useDispatch();
    const router = useRouter();

    const variable = useSelector((state) => state.variable);
    const LeadFormFilled = useSelector((state) => state.LeadFormFilled);
    const [UserImage, setUserImage] = useState(variable);
    const [UserLogoUrl, setUserLogoUrl] = useState('https://prod-spyne-website.s3.amazonaws.com/5d5c079f-cdf7-4dde-b460-633eb60a1430');
    const [logInState, setLogInState] = useState(false)

    const variableChecker = () => {
        if(variable == null){
            router.push('/' + Toolname + '/upload');
        }
        else{
            setUserImage(variable, () => {
              });
        }
    };
    useEffect(() => {
        variableChecker();
        const handleContextmenu = e => {
            e.preventDefault()
        }
        document.addEventListener('contextmenu', handleContextmenu)
        return function cleanup() {
            document.removeEventListener('contextmenu', handleContextmenu)
        }

      }, []);
    // const [LeadFormFilled, setLeadFormFilled] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleModal = (e) => {
        e.stopPropagation();
        try {
            if(logInState){
                downloadSingleImage({imageUrl : isChecked ? AfterImage : BeforeImage,imageName: ''});
            }else{
                if (!showModal && !LeadFormFilled) {
                    setShowModal(true);
                    setTimeout(() => {
                      setFloatTransition("top-1/2");
                    }, 100);
                  } else {
                    handleDownload();
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
    const [DownloadSuccessText, setDownloadSuccessText] = useState('hidden');
    const submitHandler = async (e) => {
        e.preventDefault();
        setDownloadSuccessText('block');
        try {
          const { name, workEmail, company, phone } = userData;
        if (name === "" || workEmail === "" || company === "" || phone === "")
          return;
        if (phone.length <= 6) return;
        if (phone.length >= 15) return;
        const portalId = "7333835";
        const formGuid = "79cb18c6-1cce-4237-ab49-f6654602719c";
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
        setShowModal(false);
        dispatch(setLeadFormFilled(true));
        setLeadFormFilled(true);
        console.log('ye hai leadform variable ki value is func me:', LeadFormFilled);

        
        }
        // return response;
        } catch (error) {
          console.log(error)
        }finally {
          
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
          logo_url: UserLogoUrl,
        //   save_params: { extension: save_params, quality: 95 }
        };
    
        try {
          const response = await axios.post('https://toolsapi.spyne.ai/api/numberplatemasking', data,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
          })
          .then((res) => {
              setAfterImage(res.data.url);
          })
          ;

        } catch (error) {
          console.error('API Error:', error);
        }
      };

    const value  = router.query;
    //Changes on NumberPlate Toggle
    const [SettingsSection, setSettingsSection] = useState('')
    const [isToggleChecked, setisToggleChecked] = useState(true);
    const [DiabledButtons, setDiabledButtons] = useState(false);
    const handleToggleChange = () => {
        setisToggleChecked(!isToggleChecked);

        if (!isToggleChecked){
            setSettingsSection('opacity-100');
            setDiabledButtons(false);
        }
        else{
            setUserLogoUrl(null);
            setSettingsSection('opacity-50 cursor-not-allowed');
            setDiabledButtons(true);

        }
    };
    
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
  

    //Upload Number Plate Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    
    // Number Plate Upload and crop
  

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    //Create new number plate item 
    const initialOptions = [
      ];
    
      const [options, setOptions] = useState(initialOptions);
      const [selectedOption, setSelectedOption] = useState('');
    
      const handleRadioChange = (event) => {
        setSelectedOption(event.target.value);
      };
    
      const addNewOption = (UserUploadedPlate) => {
        const newOptionValue = UserUploadedPlate;
        const newOptionLabel = `Option ${options.length + 1}`;
        const newOptions = [...options, { value: newOptionValue, label: newOptionLabel }];
        setOptions(newOptions);
        closeModal();
      };
    // Console logs
    const radiochecker = () => {
        console.log('ye hai ab selected plate:', UserLogoUrl);
    };
    async function dataURLtoBlob(dataURL) {
        const response = await fetch(dataURL);
        const blob = await response.blob();
        return blob;
    };

    const [image, setImage] = useState(null);
    const cropperRef = useRef(null);
    const onCrop = async () => {
      const cropper = cropperRef.current?.cropper;
      const formData = new FormData();
      const imageBlob = await dataURLtoBlob(cropper.getCroppedCanvas().toDataURL());
      formData.append('image', imageBlob, 'image.png');
    
      try {
        const response = await fetch('https://toolsapi.spyne.ai/api/uploadtos3', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
    
        addNewOption(data.imageUrl);
        setUserLogoUrl(data.imageUrl);
      } catch (error) {
      }
    };
  
    const handleFileChange = (e) => {
      const selectedImage = e.target.files[0];
      setImage(URL.createObjectURL(selectedImage));
    };

    useEffect(() => {
        let state = JSON.parse(localStorage.getItem(localStorageKeys?.loggedIn))
        if(state){
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
            <div className="pt-10">
                <div className='grid grid-cols-12 gap-0 h-[95vh]'>
                    <div className='col-span-1 md:block lg:block xl:block hidden bg-[#3632400A] pt-8 mr-5'>
                        <Leftbar />
                    </div>
                    
                    <div className='md:pr-10 md:pl-4 xl:pr-10 xl:pl-4 px-4 lg:col-span-11 md:col-span-11 col-span-12 h-full'>
                        <div className='md:grid md:grid-cols-12 xl:grid xl:grid-cols-12 lg:grid gap-0 '>
                            <div className="lg:col-span-4 mt-10 gap-5 hidden md:grid lg:grid xl:grid">
                                    <div className='mb-5'>
                                        <h3>Number Plate</h3>
                                        <div className="NumberPlateSwitcher inline-grid grid-cols-2 gap-5">
                                            Replace Number Plate
                                            <div className="NumberPlateToggle flex flex-row-reverse mr-3">
                                                <label class="switch">
                                                    <input type="checkbox" className="opacity-0 w-0 h-0" defaultChecked onChange={handleToggleChange}/>
                                                    <span class="slider"></span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={SettingsSection}>
                                        <div className="NumberPlateSettings mr-20 max-h-[430px] overflow-y-auto p-2">
                                            <form onSubmit={handleSubmit} id="myForm">
                                            <RadioGroup options={options} selectedValue={selectedOption} disabled={DiabledButtons} className={SettingsSection} onChange={(e) => setUserLogoUrl(e.target.value)} />
                                                <div>
                                                    <label>
                                                        <input className="hidden" type="radio" disabled={DiabledButtons} value="https://prod-spyne-website.s3.amazonaws.com/5d5c079f-cdf7-4dde-b460-633eb60a1430" id="1" name="UserLogoUrl" defaultChecked onChange={(e) => setUserLogoUrl(e.target.value)}></input>
                                                        <div class="upscaler-factor-block block overflow-hidden mb-5 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                            <div className="grid grid-cols-12">
                                                                <div className='col-span-12'>
                                                                    <img className={SettingsSection} src="https://prod-spyne-website.s3.amazonaws.com/5d5c079f-cdf7-4dde-b460-633eb60a1430" loading="lazy"></img>  
                                                                </div> 
                                                            </div>
                                                            
                                                        </div>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <input className="hidden" type="radio" disabled={DiabledButtons} value="https://prod-spyne-website.s3.amazonaws.com/33a08ccb-11d1-403c-91e8-bcd95af73205" id="2" name="UserLogoUrl" onChange={(e) => setUserLogoUrl(e.target.value)}></input>
                                                        <div class="upscaler-factor-block block overflow-hidden mb-5 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                            <div className="grid grid-cols-12">
                                                            <div className='col-span-12'>
                                                                    <img className={SettingsSection} src="https://prod-spyne-website.s3.amazonaws.com/33a08ccb-11d1-403c-91e8-bcd95af73205" loading="lazy"></img>  
                                                                </div>  
                                                            </div>
                                                            
                                                        </div>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <input className="hidden" type="radio" disabled={DiabledButtons} value="https://prod-spyne-website.s3.amazonaws.com/a2b9f65d-a4f6-4f7a-acac-d9c6360c14a3" id="4" name="UserLogoUrl" onChange={(e) => setUserLogoUrl(e.target.value)}></input>
                                                        <div class="upscaler-factor-block block overflow-hidden mb-5 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                            <div className="grid grid-cols-12">
                                                                <div className='col-span-12'>
                                                                    <img className={SettingsSection} src="https://prod-spyne-website.s3.amazonaws.com/a2b9f65d-a4f6-4f7a-acac-d9c6360c14a3"></img>  
                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </label>
                                                </div>
                                                <div>
                                                    <label>
                                                        <input className="hidden" type="radio" disabled={DiabledButtons} value="https://prod-spyne-website.s3.amazonaws.com/227cf3d5-54f2-464e-a449-9a4626a02bd3" id="1" name="UserLogoUrl" onChange={(e) => setUserLogoUrl(e.target.value)}></input>
                                                        <div class="upscaler-factor-block block overflow-hidden mb-5 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                            <div className="grid grid-cols-12">
                                                            <div className='col-span-12'>
                                                                    <img className={SettingsSection} src="https://prod-spyne-website.s3.amazonaws.com/227cf3d5-54f2-464e-a449-9a4626a02bd3"></img>  
                                                                </div> 
                                                            </div>
                                                            
                                                        </div>
                                                    </label>
                                                </div>
                                            </form>
                                            
                                            
                                            
                                        </div>
                                        <div className="CustomUpload mr-20 mt-5">
                                            <div className={SettingsSection}>
                                                <button className="border-[#4600F2] border-[1px] rounded-lg p-3 w-full text-[#4600f2]" disabled={DiabledButtons} onClick={openModal}>
                                                    <img alt="Upload icon" src="https://spyne-static.s3.amazonaws.com/console/virtual-studio/icons/upload-blue.svg" width="20" height="20" decoding="async" data-nimg="1" class="inline" loading="lazy" />
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                        <UploadModal isOpen={isModalOpen} onClose={closeModal}>
                                            <div className="UploadBoxContent gap-3 text-center">
                                            <div>
                                                {image ? (
                                                    <div>
                                                    <h2 className="text-spyne_blue-800">Crop Your logo</h2>
                                                    <Cropper
                                                        ref={cropperRef}
                                                        src={image}
                                                        style={{ height: 250, width: '100%' }}
                                                        aspectRatio={3.73 / 1}
                                                        viewMode={0}
                                                        minCropBoxHeight={10}
                                                        minCropBoxWidth={10}
                                                        background={false}
                                                        responsive={true}
                                                        autoCropArea={1}
                                                        checkOrientation={false}
                                                    />
                                                    <button className="blue-btn mt-2 p-3" onClick={onCrop}>Crop Image</button>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <h2 className="text-spyne_blue-800">Select a logo</h2>
                                                        <p>Upload a logo for your custom license plate</p>
                                                        <label className="custum-file-upload">
                                                            <div className="icon">
                                                                <img src="https://spyne-static.s3.amazonaws.com/try-page/upload-drop.svg" className='h-20 invert'></img>
                                                            </div>
                                                            <div className="text">
                                                                <span className="text-spyne_blue-800 font-semibold">Bowse Files</span>
                                                            </div>
                                                            <input type="file" id="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                                                        </label>
                                                    </div>

                                                )}
                                            </div>


                                            </div>

                                        </UploadModal>
                                    </div>

                            
                            </div>
                            <div className="lg:col-span-8 mt-10 gap-0 lg:grid md:grid xl:grid">
                                <div className="ProcessingTab md:grid lg:grid xl:grid grid-cols-12 hidden">
                                    <div className="lg:col-span-2">
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
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /> </svg>
                                                    &nbsp; New Project
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
                                <div className="ImagePrivewer mt-8 rounded-lg border-1 md:h-[70vh] lg:h-[70vh] xl:h-[70vh] h-[30vh] object-contain align-middle">
                                    
                                    <div className='previewimageclass'>
                                        <div className={beforeImageClass}>
                                            {!imageLoaded && <div className="spinner z-10"></div>}
                                            <img className="z-10 relative w-full md:h-[70vh] lg:h-[70vh] xl:h-[70vh] h-[30vh] object-contain align-middle" src={BeforeImage} onLoad={imageDimensionChecker}></img>
                                        </div>
                                        <div className={afterImageClass}>
                                            {!imageLoaded && <div className="spinner z-10"></div>}
                                            <img className="w-full  md:h-[70vh] lg:h-[70vh] xl:h-[70vh] h-[30vh] object-contain align-middle" src={AfterImage} onLoad={handleImageLoad} onChange={handleImageLoad} style={{ display: imageLoaded ? 'block' : 'none' }}></img>
                                        </div>
                                    </div>

                                </div>
                                <div className='mobileConfig md:hidden lg:hidden xl:hidden h-[60vh] overflow-scroll pb-20'>
                                    <div className="mb-5">
                                        <h3>Number Plate</h3>
                                    </div>
                                    <div className="NumberPlateSettings p-3">
                                        <form onSubmit={handleSubmit} id="myForm">
                                        <RadioGroup options={options} selectedValue={selectedOption} disabled={DiabledButtons} className={SettingsSection} onChange={(e) => setUserLogoUrl(e.target.value)} />
                                        <div>
                                                    <label>
                                                        <input className="hidden" type="radio" disabled={DiabledButtons} value="https://prod-spyne-website.s3.amazonaws.com/5d5c079f-cdf7-4dde-b460-633eb60a1430" id="1" name="UserLogoUrl" defaultChecked onChange={(e) => setUserLogoUrl(e.target.value)}></input>
                                                        <div class="upscaler-factor-block block overflow-hidden mb-5 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                            <div className="grid grid-cols-12">
                                                                <div className='col-span-12'>
                                                                    <img className={SettingsSection} src="https://prod-spyne-website.s3.amazonaws.com/5d5c079f-cdf7-4dde-b460-633eb60a1430" loading="lazy"></img>  
                                                                </div> 
                                                            </div>
                                                            
                                                        </div>
                                                    </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input className="hidden" type="radio" disabled={DiabledButtons} value="https://prod-spyne-website.s3.amazonaws.com/33a08ccb-11d1-403c-91e8-bcd95af73205" id="2" name="UserLogoUrl" onChange={(e) => setUserLogoUrl(e.target.value)}></input>
                                                <div class="upscaler-factor-block block overflow-hidden mb-5 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                    <div className="grid grid-cols-12">
                                                    <div className='col-span-12'>
                                                            <img className={SettingsSection} src="https://prod-spyne-website.s3.amazonaws.com/33a08ccb-11d1-403c-91e8-bcd95af73205" loading="lazy"></img>  
                                                        </div>  
                                                    </div>
                                                    
                                                </div>
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input className="hidden" type="radio" disabled={DiabledButtons} value="https://prod-spyne-website.s3.amazonaws.com/a2b9f65d-a4f6-4f7a-acac-d9c6360c14a3" id="4" name="UserLogoUrl" onChange={(e) => setUserLogoUrl(e.target.value)}></input>
                                                <div class="upscaler-factor-block block overflow-hidden mb-5 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                    <div className="grid grid-cols-12">
                                                        <div className='col-span-12'>
                                                            <img className={SettingsSection} src="https://prod-spyne-website.s3.amazonaws.com/a2b9f65d-a4f6-4f7a-acac-d9c6360c14a3"></img>  
                                                        </div>
                                                    </div>
                                                    
                                                </div>
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input className="hidden" type="radio" disabled={DiabledButtons} value="https://prod-spyne-website.s3.amazonaws.com/227cf3d5-54f2-464e-a449-9a4626a02bd3" id="1" name="UserLogoUrl" onChange={(e) => setUserLogoUrl(e.target.value)}></input>
                                                <div class="upscaler-factor-block block overflow-hidden mb-5 bg-white border border-white rounded-xl shadow-[0_0px_16px_0px_rgba(64,35,135,0.08)] hover:border-500 hover:border-1 hover:border-[#CCCCCC]">
                                                    <div className="grid grid-cols-12">
                                                    <div className='col-span-12'>
                                                            <img className={SettingsSection} src="https://prod-spyne-website.s3.amazonaws.com/227cf3d5-54f2-464e-a449-9a4626a02bd3"></img>  
                                                        </div> 
                                                    </div>
                                                    
                                                </div>
                                            </label>
                                        </div>
                                        </form>
                                    </div>
                                    <div className="CustomUpload">
                                            <div className={SettingsSection}>
                                                <button className="border-[#4600F2] border-[1px] rounded-lg p-3 w-full text-[#4600f2]" disabled={DiabledButtons} onClick={openModal}>
                                                    <img alt="Upload icon" src="https://spyne-static.s3.amazonaws.com/console/virtual-studio/icons/upload-blue.svg" width="20" height="20" decoding="async" data-nimg="1" class="inline" loading="lazy" />
                                                    Upload
                                                </button>
                                            </div>
                                        </div>
                                    <div className="ProcessingTab grid grid-cols-12 mt-8">
                                    <div className="lg:col-span-2">
                                        {/* <h3 className="font-medium text-xl align-middle">Untitled Project 01</h3> */}
                                    </div>
                                    <div className='lg:col-span-10 md:col-span-10 col-span-12'>
                                        <div className='grid grid-cols-12 xl:gap-10 lg:gap-2 md:gap-2 px-2 gap-2'>
                                            <div className='lg:col-span-3 col-span-6'>
                                                <div className={className}>
                                                    <div className='before-after-switch w-full p-2'>
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
                                            <div className='lg:col-span-3 md:col-span-3 col-span-6 place-content-center flex'>
                                                <div className={className}>
                                                <button className="white-btn text-center inline-flex items-center xl:text-sm lg:text-xs !w-full p-2" onClick={handleDownload}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /> </svg>
                                                    &nbsp; Download
                                                </button>
                                                </div>
                                            </div>
                                            <div className='lg:col-span-3 md:col-span-3 col-span-12 place-content-center flex'>
                                                <button className="white-btn text-center inline-flex items-center xl:text-sm lg:text-xs w-full p-2" onClick={newProject}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /> </svg>
                                                    &nbsp; New Project
                                                </button>
                                            </div>
                                            <div className='lg:col-span-3 md:col-span-3 col-span-12 place-content-center flex'>
                                                <button className="blue-btn text-center inline-flex items-center w-full xl:text-sm lg:text-xs p-2" type="submit" value="Submit" form="myForm" onClick={() => { handleCheckboxChange(); handleClasschangeClick(); processButtonChange();}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"> <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" /> </svg> 
                                                    &nbsp; {buttonText}
                                                </button>
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
            {false && (
          <Modal floatTransition={floatTransition}>
            <div className="DownloadFormModal flex flex-col gap-3 md:mt-0 mt-8 relative w-full">
              <h4>
                Please fill out the form to continue
              </h4>
              <div className="flex justify-between gap-3 mt-5 w-full">
                {/* <form onSubmit={submitHandler}>
                  <input
                    type="text"
                    className=" border border-black-200 rounded-lg bg-white-600 p-3 placeholder-black-600 text-base font-normal w-full mb-5"
                    placeholder={CtaSectionData.placeholders[0].placeholder}
                    onChange={(e) => handleFormFieldInputs(e)}
                    name="name"
                    value={userData?.name}
                    required
                  />

                  <input
                    type="email"
                    className=" border border-black-200 rounded-lg bg-white-600 p-3 placeholder-black-600 text-base font-normal w-full mb-5"
                    placeholder={CtaSectionData.placeholders[1].placeholder}
                    onChange={(e) => handleFormFieldInputs(e)}
                    name="workEmail"
                    value={userData?.workEmail}
                    required
                  />

                  <input
                    type="text"
                    className="border border-black-200 rounded-lg bg-white-600 p-3  placeholder-black-600 text-base font-normal w-full mb-5"
                    value={userData?.company}
                    placeholder={CtaSectionData.placeholders[2].placeholder}
                    onChange={(e) => handleFormFieldInputs(e)}
                    name="company"
                    required
                  />
                  <input
                    type="number"
                    className="border border-black-200 rounded-lg bg-white-600 p-3  placeholder-black-600 text-base w-full font-normal mb-5"
                    placeholder={CtaSectionData.placeholders[3].placeholder}
                    onChange={(e) => handleFormFieldInputs(e)}
                    name="phone"
                    value={userData?.phone}
                    required
                  />
                  <button
                    class="blue-btn md:w-fit md:!px-16 w-full"
                  >
                    {CtaSectionData.button}
                  </button>
                  <p className={DownloadSuccessText}>Thank you for your submission!<br /> Your download should start in a few seconds.</p>
                </form> */}
                <div className="HubspotFormWrapper w-full">
                    <HubspotForm
                      portalId='7333835'
                      formId='79cb18c6-1cce-4237-ab49-f6654602719c'
                      loading={<div>Loading...</div>}
                      onFormSubmitted={() => { setShowModal(false); handleDownload(); dispatch(setLeadFormFilled(true)); setLeadFormFilled(true);}}
                      formInstanceId='numbplateblurid'
                    />
                </div>
              </div>
            </div>
          </Modal>
        )}
        { showModal && <LoginModal setShowModal={setShowModal} setLoggedIn={setLogInState} />}
        </section>    
    );

}

export default NumberPlateMaskingResult;