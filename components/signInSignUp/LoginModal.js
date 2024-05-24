/**
 * @format
 */
import {GoogleLogin} from "@react-oauth/google"
import React, {useContext, useEffect, useRef, useState} from "react"
import {LOGIN_DATA, icons} from "./config"
import {Logout, base64Decode, generateBearerToken, localStorageKeys, newBearerAfterGuestLoginFalse, sessionStorageKeys, skipEnterpriseSelectionPage} from "./config"
import Image from "next/image"
import {useDispatch} from "react-redux"
import {toast} from "react-toastify"
import {useRouter} from "next/router"
import CentralAPIHandler from "../centralAPIHandler/centralAPIHandler"
import SignInSignUp from "./SignInSignUp"

const LoginModal = props => {
    const dispatch = useDispatch()
    const loginModalRef = useRef()
    const router = useRouter()
    const [user, setUser] = useState({
        name: "",
        email: "",
        contact: ""
    })
    const [errorMsg, setErrorMsg] = useState("")


    const updateAuthDetailsInRedux = loginResponseData => {
        try {
            localStorage.setItem(localStorageKeys.guestLogin, false)
            // dispatch(
            //     updateAuthProp([
            //         {"key": "loginModalTrigger", "value": false},
            //         {"key": "loggedIn", "value": true},
            //         {"key": "guestLogin", "value": false},
            //         {"key": "authKey", "value": loginResponseData?.authKey},
            //         {"key": "userId", "value": loginResponseData?.userData?.userId},
            //         {"key": "emailId", "value": loginResponseData?.userData?.emailId},
            //         {"key": "userName", "value": loginResponseData?.userData?.name},
            //         {"key": "contact", "value": loginResponseData?.userData?.contact},
            //         {"key": "defaultEnterprise", "value": loginResponseData?.defaultEnterprise},
            //         {"key": "permissionObject", "value": loginResponseData?.permissionObject}
            //     ])
            // )
        } catch (error) {
            console.log(error)
        }
    }
    const mapGuestToActual = async userData => {
        const URL = `${process.env.BACKEND_BASEURL}/console/v1/user/guest-user-mapping`

        const payload = {
            guestUserId: guestEnterprise?.guestUserId,
            actualUserId: userData?.userId,
            skuIdList: skuIds
        }

        await CentralAPIHandler.handlePatchRequest(URL, payload)
    }
    const refreshTokenAndUpdateRedux = ({fastRefresh = false}) => {
        try {
            let timeInterval = (process.env.minutesToRefresh || 15) * 60 * 1000 //every 15 mins
            const URL = `${process.env.BACKEND_BASEURL}/user-management/v1/user/refresh-token`

            setInterval(async () => {
                try {
                    const resp = await CentralAPIHandler.handlePostRequest(URL)

                    localStorage.removeItem(localStorageKeys?.DEFAULTBEARERTOKEN)
                    localStorage.setItem(localStorageKeys?.USERDETAILS, JSON.stringify(resp?.data?.userData))
                    localStorage.setItem(localStorageKeys?.defaultEnterprise, JSON.stringify(resp?.data?.defaultEnterprise))
                    localStorage.setItem(localStorageKeys?.permissionObject, JSON.stringify(resp?.data?.permissionObject))
                    localStorage.setItem(localStorageKeys?.AUTHKEY, resp?.data?.authKey)
                    updateAuthDetailsInRedux(resp?.data)
                    generateBearerToken({additionalPayload: {}})
                } catch (error) {
                    console.log(error)
                }
            }, timeInterval)
        } catch (error) {
            console.log(error)
        }
    }

   
    return (
        <div className="relative z-30 " aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
            <div className="fixed inset-0 z-20 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center lg:items-center lg:p-4 ">
                    <div className="bottom-modal-sm item-center relative m-0 flex max-h-[520px] w-full flex-col gap-5 overflow-y-scroll rounded-t-3xl bg-white px-4 py-5 lg:max-h-fit lg:w-[440px] lg:rounded-xl lg:p-6" ref={loginModalRef}>
                        <div className="mx-auto rounded-3xl bg-black-200 lg:hidden"></div>
                        <SignInSignUp setShowModal={props.setShowModal} setLoggedIn={props?.setLoggedIn} info={props?.info}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal
