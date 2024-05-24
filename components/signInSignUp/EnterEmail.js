/**@format */

import React, { useContext,useEffect } from "react"
import { ENTER_EMAIL_DATA, LOGIN_DATA } from "./config"
import { GoogleLogin } from "@react-oauth/google"
import Image from "next/image"
import { localStorageKeys, skipEnterpriseSelectionPage } from "./config"
import { useRouter } from "next/router"
import SignInSignUpContext from "./context"
import Spinner from "../common/Spinner"

function EnterEmail(props) {
    const { getEmailId, formatInput, SignInSpinner, handleCredentialResponse, errorMsg, emailInputRef, checkUserExists, closeLogin,setEnterpriseDetails,refreshTokenAndUpdateRedux } = useContext(SignInSignUpContext)
    const {allowClose } = props
    const router = useRouter()

    useEffect(() => {
        setEnterpriseDetails({
            enterprise_name: "",
            category: "",
            category_id: "",
            default_teamname: "",
            owner_name: "",
            owner_phone: "",
            countryCode: "us",
            dialCode: "1",
            disable: false
        })
    }, [])

    //TODOO
    
    // useEffect(() => { 
    //     if (localStorage.getItem(localStorageKeys?.DEVICEID) && localStorage.getItem(localStorageKeys?.AUTHKEY) && localStorage.getItem(localStorageKeys.DEFAULTBEARERTOKEN)) {
    //         try {
    //             let userEmail = JSON.parse(localStorage.getItem(localStorageKeys?.USERDETAILS)).emailId
    //             let defaultEnterprise = JSON.parse(localStorage.getItem(localStorageKeys?.defaultEnterprise)).enterpriseId

    //             const {skip: skipEnterpriseSelection, enterprise_id} = skipEnterpriseSelectionPage(userEmail, defaultEnterprise)
    //             if (skipEnterpriseSelection) {
    //                 router.push({pathname: "/home", query: {"enterprise_id": enterprise_id}})
    //             } else {
    //                 router.push("/enterprises")
    //             }
    //             refreshTokenAndUpdateRedux({fastRefresh: false})
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }, [])
    
    return (
        <form>
            <h1 className=" text-base font-semibold text-black-800 lg:text-2xl text-left flex gap-1 justify-between">{ props.info ? props.info : (ENTER_EMAIL_DATA?.heading || LOGIN_DATA?.welcomeHeading)} 
                {allowClose &&
                    <Image src="https://spyne-static.s3.amazonaws.com/console/project/close_icon.svg"
                        width={24}
                        height={24}
                        alt="close"
                        className="flex cursor-pointer items-center"
                        onClick={() => closeLogin()}
                    />
                }
            </h1>
             <p className="mt-2 text-sm font-normal text-black-600 lg:text-base">{ENTER_EMAIL_DATA?.subHeading || LOGIN_DATA?.subHeading}</p>
            <div className="input-login relative mt-8 mb-5">
                <input
                    className={[errorMsg ? "border-red-500" : "border-black-200", " w-full rounded-lg border bg-transparent px-3.5 py-4 text-sm font-normal tracking-tight text-black-50 ring-transparent"].join(" ")}
                    placeholder="Email address"
                    type="text"
                    name="emailId"
                    required
                    ref={emailInputRef}
                    onChange={e => getEmailId(e)}
                    onBlur={e => {
                        formatInput(e)
                    }}
                />
                <label className={errorMsg ? "!text-red-500" : "!text-black-600"}>{LOGIN_DATA?.loginLabel}</label>
                {errorMsg ? <p className="mt-2 mb-2 text-xs text-red-500">{errorMsg}</p> : null}
            </div>
            <div className={[SignInSpinner ? "md:!py-[0.5315rem] 2xl:!py-[0.5325rem]" :"", "h-[50px] w-full secondary-btn flex items-center"].join(' ')}>
                <button className={[SignInSpinner ? "h-full !py-0" : "h-full !py-1", " shadow-5 w-full transition duration-150 ease-in-out"].join(" ")} type="submit" disabled={SignInSpinner ? true : false} id="next" onClick={checkUserExists}>
                    {SignInSpinner ? <Spinner type="LIGHT" style_CLASS={"justify-center items-center flex"} /> : "Next"}
                </button>
            </div>
             
            {/* glogin starts */}

            <div className="">
                <p className="mx-8 my-7 border-t border-black-200 text-center font-normal leading-[0] tracking-tight text-black-600">
                    <span className="bg-white px-3">{LOGIN_DATA?.orSeparatorText}</span>
                </p>
                <div className="glogin-wrapper mx-auto flex w-full items-center justify-center text-center">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            handleCredentialResponse(credentialResponse)
                        }}
                        onError={async () => {
                            await Logout()
                        }}
                        useOneTap
                        text="continue_with"
                        size="large"
                        logo_alignment="center"
                        className="login-google"
                    />
                </div>
            </div>
        </form>
    )
}
export default EnterEmail
