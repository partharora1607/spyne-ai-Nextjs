/**
 * @format
 */
 import React, { useState, useRef, useEffect } from "react";
 import { headerData } from "./config";
 import Image from "next/image";
 import Link from "next/link";
 import Modal from "./modals/Modal";
 import { CtaSectionData } from "../photo-upscaler/config";
 import Axios from "axios";
 import { useRouter } from 'next/router';
 import HubspotForm from 'react-hubspot-form'
import LoginModal from "../signInSignUp/LoginModal";
import { useDispatch } from "react-redux";
import { localStorageKeys, Logout } from "../signInSignUp/config";
import {usePopper} from "react-popper"

 function Navbar({Toolname,logInState,setLogInState}) {
   const router = useRouter();
   const dispatch = useDispatch()
   const [isHamburgerActive, setIsHamburgerActive] = useState(true);
   const [isNavExpanded, setIsNavExpanded] = useState("0px");
   const [dropdownExpanded, setDropdownExpanded] = useState(-1);
   const [dropdownMenuList, setdropdownMenuList] = useState("0px");
   const [showModal, setShowModal] = useState(false);
   const [floatTransition, setFloatTransition] = useState("-top-1/2");
   const [userData, setuserData] = useState({
     name: "",
     workEmail: "",
     company: "",
     phone: ""
   });
   const [showDropdown, setShowDropdown] = useState(false)
const [loggedIn, setLoggedIn] = useState(false)
   let [referenceElement, setReferenceElement] = useState(null)
   let [popperElement, setPopperElement] = useState(null)
   let {styles, attributes} = usePopper(referenceElement, popperElement, {
       placement: "bottom-end"
   })
   
   let dropdownRef = useRef()
 
   const handleDropdown = (e, indx) => {
     try {
       if (dropdownExpanded === indx) {
         setDropdownExpanded(-1);
         setdropdownMenuList("0px");
 
         return;
       }
       setDropdownExpanded(indx);
       setdropdownMenuList("300px");
     } catch (error) {
       console.log(error);
     }
   };
 
   const handleHamburgerToggle = (e) => {
     // console.log(setIsNavExpanded("h-fit"), "menu height show ho rhi h");
     try {
       e.stopPropagation();
       // console.log(setIsNavExpanded("h-fit"), "menu height show");
 
       setIsHamburgerActive(!isHamburgerActive);
       // setIsNavExpanded("h-fit");
     } catch (error) {
       console.log(error);
     }
   };
 
   const handleModal = (e) => {
     e.stopPropagation();
     try {
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
       // dispatch({ type: "formFilledTrue" });
       // dispatch({ type: "flagTrue" });
       // console.log("FOrm submitted success", response);
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
   const backButtonHandler = () => {
     if(router.pathname == '/' + Toolname + '/upload'){
         router.push('/' + Toolname);
     }
     else{
         router.push('/' + Toolname + '/upload');
     }
 
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
  setLoggedIn(false)
  setLogInState(false)
  window.location.reload()
  // dispatch(resetAuth())
}
 
   return (
     <section className="bg-white shadow-varient4 fixed top-0 left-0 right-0 z-20 md:px-4 xl:px-4 lg:py-2 py-2">
       <div className="md:pr-12 xl:pr-12 py-1">
         <div className="grid grid-cols-12 gap-2 items-center">
           <div className="lg:col-span-1 col-span-5 lg:order-1 order-2 px-5 sm:px-1">
             {/* <Image
               src={headerData?.logo}
               width={150}
               height={45}
               alt="spyne logo"
               className="w-auto h-10"
             /> */}
            <div className="bg-black-40 p-1.5 flex justify-center items-center gap-2 rounded-lg" onClick={backButtonHandler}>
                <img src="https://spyne-static.s3.amazonaws.com/console/virtual-studio/icons/left-caret.svg" alt="Back-arrow" />
                <p className="text-sm font-medium text-black-600 cursor-pointer ">Back</p>
            </div>
           </div>
           <div className="md:col-span-8 relative hidden lg:block lg:order-2">

           </div>
           <div className="lg:col-span-3 col-span-6 order-3">
             <ul className="flex gap-5 items-center justify-end">
               {/* <li>
                 <button className=" text-base font-semibold text-black-800">
                   {headerData?.headerRightBar?.loginText}
                 </button>
               </li> */}
               <li>
                 {/* <button className="blue-btn md:!px-6 md:!py-2 md:text-base md:leading-[22px]">
                   {headerData?.headerRightBar?.signupText}
                 </button> */}
                 {loggedIn || logInState?
                   <div className="relative order-3 hidden rounded-full md:block" ref={dropdownRef}>
                     <div className="hidden cursor-pointer motion-reduce:transition-none md:block" id="dropdownMenuButton1ds" onClick={() => setShowDropdown(!showDropdown)} ref={setReferenceElement}>
                       <div className="relative">
                         <Image src="https://spyne-static.s3.amazonaws.com/console/project/userProfileIcon.svg" alt="" height={36} width={36} className="w-7 hover:opacity-80 md:w-9 " />
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
                               <Image className="mr-2 inline" src="https://spyne-static.s3.amazonaws.com/console/header-icons/logoutIcon.svg" height={18} width={18} />
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
                     className="bg-[#4600f21F] text-spyne_blue-800 text-[14px] font-semibold py-2 px-5 flex justify-center items-center gap-2 rounded-lg"
                   >
                     {headerData?.headerRightBar?.loginInBtnText}
                   </button>
                 }
               </li>
             </ul>
           </div>
 
           {/* for mobile and tab view */}

 
           <div
             className={` h-screen lg:hidden block responsive-menu fixed left-0 top-[55px] bg-white md:max-w-[320px] w-full z-[1] transition-all ease-in-out duration-500 delay-300 shadow-varient5 py-5  ${
               isHamburgerActive && isNavExpanded
                 ? "-translate-x-[100%]"
                 : "translate-x-[0]"
             }`}
           >
             <ul className="items-center lg:justify-center justify-between h-full">
               {headerData?.menuList?.map((menu, indx) => {
                 return (
                   <li
                     className="cursor-pointer w-full py-3  px-4 text-black md:opacity-80 lg:opacity-60 font-normal  text-base  hover:opacity-100 relative"
                     onClick={(e) => handleDropdown(e, indx)}
                     key={`menu-list:${indx}`}
                   >
                     {menu?.dropdown ? (
                       <div className="flex  rounded justify-between">
                         {menu?.heading}&nbsp;
                         {menu?.dropdown ? (
                           <Image
                             src={headerData?.downCaret}
                             width={15}
                             height={15}
                             className=" align-middle"
                           />
                         ) : null}
                       </div>
                     ) : (
                       <div className="flex  rounded">
                         <Link href={menu?.url} target="_blank">
                           {menu?.heading}
                         </Link>
                       </div>
                     )}
                     {dropdownExpanded === indx && menu?.dropdown ? (
                       <div
                         className={`lg:hidden block items-center grid-cols-12 gap-3 w-full bg-white border border-gray-light my-2 py-6 px-5 rounded-2xl shadow-varient5 transition-all ease-in-out duration-500 delay-300 ${dropdownMenuList}`}
                       >
                         {headerData?.menuList[indx]?.dropdownList?.map(
                           (element, index) => {
                             return (
                               <div
                                 className="col-span-12 dropdown-menu"
                                 key={`dropdown-${index}`}
                               >
                                 <Link href={element?.url} target="_blank">
                                   <ul className="flex gap-4 items-center">
                                     <li className="">
                                       <Image
                                         src={element?.icon}
                                         width={60}
                                         height={60}
                                         className="icon-img align-middle bg-spyne_blue-20 rounded-lg p-3"
                                       />
                                     </li>
 
                                     <li className="md:w-[calc(100%-75px)]">
                                       <h5 className="flex gap-1 items-center text-base font-bold text-black-800 relative">
                                         <div>
                                           {element?.title}
                                           {element?.new ? (
                                             <small className="text-green text-sm font-medium px-2.5 py-0.5 bg-green-light rounded-2xl ml-1">
                                               {element?.new}
                                             </small>
                                           ) : null}
                                         </div>
                                         <Image
                                           src={headerData?.arrowimg}
                                           width={13}
                                           height={13}
                                           className="arrow-img align-middle float-right opacity-0 absolute right-[20%]"
                                         />
                                       </h5>
                                       <p className="text-sm font-normal text-gray-400">
                                         {element?.description}
                                       </p>
                                     </li>
                                   </ul>
                                 </Link>
                               </div>
                             );
                           }
                         )}
                       </div>
                     ) : null}
                   </li>
                 );
               })}
             </ul>
           </div>
         </div>
 
         {showModal && (
          //  <Modal floatTransition={floatTransition}>
          //    <div className="flex flex-col gap-3 md:mt-0 mt-8 relative w-full">
          //      <h4>
          //        {headerData?.headerRightBar?.modalHeading}
          //        <Image
          //          src={headerData?.headerRightBar?.closeIcon}
          //          width={16}
          //          height={16}
          //          className="arrow-img align-middle float-right ml-auto cursor-pointer"
          //          onClick={() => setShowModal(false)}
          //        />
          //      </h4>
          //      <p>{headerData?.headerRightBar?.modalSubheading}</p>
          //      <div className="flex justify-between gap-3 mt-5">
          //        {/* <form onSubmit={submitHandler}>
          //          <input
          //            type="text"
          //            className=" border border-black-200 rounded-lg bg-white-600 p-3 placeholder-black-600 text-base font-normal w-full mb-5"
          //            placeholder={CtaSectionData.placeholders[0].placeholder}
          //            onChange={(e) => handleFormFieldInputs(e)}
          //            name="name"
          //            value={userData?.name}
          //          />
 
          //          <input
          //            type="email"
          //            className=" border border-black-200 rounded-lg bg-white-600 p-3 placeholder-black-600 text-base font-normal w-full mb-5"
          //            placeholder={CtaSectionData.placeholders[1].placeholder}
          //            onChange={(e) => handleFormFieldInputs(e)}
          //            name="workEmail"
          //            value={userData?.workEmail}
          //          />
 
          //          <input
          //            type="text"
          //            className="border border-black-200 rounded-lg bg-white-600 p-3  placeholder-black-600 text-base font-normal w-full mb-5"
          //            value={userData?.company}
          //            placeholder={CtaSectionData.placeholders[2].placeholder}
          //            onChange={(e) => handleFormFieldInputs(e)}
          //            name="company"
          //          />
          //          <input
          //            type="text"
          //            className="border border-black-200 rounded-lg bg-white-600 p-3  placeholder-black-600 text-base w-full font-normal mb-5"
          //            placeholder={CtaSectionData.placeholders[3].placeholder}
          //            onChange={(e) => handleFormFieldInputs(e)}
          //            name="phone"
          //            value={userData?.phone}
          //          />
          //          <button
          //            class="blue-btn md:w-fit md:!px-16 w-full"
          //          >
          //            {CtaSectionData.button}
          //          </button>
          //        </form> */}
          //        <div className="HubspotFormWrapper w-full">
          //           <HubspotForm
          //             portalId='7333835'
          //             formId='33166fb1-3218-4c98-aebe-cc6d66c82722'
          //             loading={<div>Loading...</div>}
          //             onFormSubmitted={() => { setShowModal(false); handleDownload(); }}
          //             formInstanceId='navbarid'
          //           />
          //       </div>
          //      </div>
          //    </div>
          //  </Modal>
          <LoginModal setShowModal={setShowModal} setLoggedIn={setLoggedIn} info="Let's Get Started..."/>
         )}
       </div>
     </section>
   );
 }
 export default Navbar;
 