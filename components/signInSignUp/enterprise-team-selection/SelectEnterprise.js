/**
 * @format
 */

import Image from "next/image"
import {useRouter} from "next/router"
import React, {useState, useEffect, useRef, useContext} from "react"
import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
import SignInSignUpContext from "../context"
import CentralAPIHandler from "../../centralAPIHandler/centralAPIHandler"
import {LOGIN_TYPES, base64Payload, generateBearerToken, localStorageKeys, newBearerAfterGuestLoginFalse, sessionStorageKeys, skipEnterpriseSelectionPage} from "../config"
import {ENTERPRISE_DATA} from "./config"
import {prodCatIdMapping} from "../config"
import {v4 as uuid} from "uuid"
import ClevertapReact from "clevertap-react"
import Spinner from "@/components/common/Spinner"
import Skeleton from "@/components/common/Skeleton"

function SelectEnterprise(props) {
    const {allowClose} = props
    const [enterpriseSelection, setEnterpriseSelection] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [enterpriseSelectionCopy, setEnterpriseSelectionCopy] = useState([])
    const [teamsDataCopy, setTeamsDataCopy] = useState([])
    const [noDataToDisplay, setNoDataToDisplay] = useState(false)

    const {user: userData, setLoginType, SignInSpinner, userValidationInfo, teamSelectionData, setTeamSelectionData, setSelectedEnterprise, closeLogin, enterpriseDetails, setUser, signupSource, loginType,handleChangeLoginState} = useContext(SignInSignUpContext)

    const router = useRouter()
    const dispatch = useDispatch()
    const auth = useSelector(state => state.authReducer)

    useEffect(() => {
        setEnterpriseSelection([...userValidationInfo?.enterpriseData])
        setEnterpriseSelectionCopy([...userValidationInfo?.enterpriseData])
        // getEnterpriseList()
    }, [])
    // }, [authReducer]) remove dependency to avoid unnessary call api

    // const getEnterpriseList = async () => {
    //     try {
    //         setIsLoading(true)
    //         const URL = `${process.env.BACKEND_BASEURL}/console/v1/enterprise/get-enterprise-list`
    //         const resp = await CentralAPIHandler.handleGetRequest(URL)

    //         setEnterpriseSelection([...resp?.data])
    //         setEnterpriseSelectionCopy([...resp?.data])
    //     } catch (error) {
    //         toast(error?.response?.data?.message || error?.message || "Unknown error occurred", {hideProgressBar: true, autoClose: 2000, type: "error", position: "bottom-center", pauseOnHover: true})
    //     }
    //     setIsLoading(false)
    // }

    const handleEnterpriseSelection = async (e, enterpriseData = null) => {
        try {
            setIsLoading(true)
            if (e) e.stopPropagation()
            const URL = `${process.env.BACKEND_BASEURL}/console/v1/enterprise/get-enterprise-teams`
            const resp = await CentralAPIHandler.handleGetRequest(URL, {
                enterpriseId: enterpriseData?.enterprise_id
            })

            setSelectedEnterprise({enterprise_id: enterpriseData?.enterprise_id, enterprise_name: enterpriseData?.enterprise_name, api_key: resp?.data?.enterpriseDetails?.api_key})
            setTeamSelectionData([...resp?.data?.teamDetails])
            if (resp?.data?.teamDetails?.length === 1) {
                signupAndHome(resp?.data?.teamDetails[0], enterpriseData, resp?.data?.enterpriseDetails?.api_key)
            } else {
                // dispatch(updateAuthProp([{"key": "previousState", value: {...auth?.previousState, [LOGIN_TYPES.SELECT_TEAM]: loginType}}]))
                let state = {...auth?.previousState, [LOGIN_TYPES.SELECT_TEAM]: loginType}
                sessionStorage.setItem(sessionStorageKeys?.previousState, JSON.stringify(state))
                setLoginType(LOGIN_TYPES?.SELECT_TEAM)
            }
            let cleverTapPayload = {
                "status": "Joined enterprise",
                "source": signupSource,
                "category": enterpriseDetails?.category,
                "user_email": userData?.emailId,
                "device_id": localStorage.getItem(localStorageKeys?.DEVICEID)
            }
            if (userData && userData?.emailId && !userData?.emailId.includes("@spyne.ai")) {
                ClevertapReact.event("auth_signup_join_enterprise_clicked", cleverTapPayload)
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoading(false)
    }

    const filterEnterpriseName = e => {
        try {
            setNoDataToDisplay(false)
            setSearchText(e.target.value)
            const tempData = enterpriseSelectionCopy.filter(element => {
                if (element?.enterprise_name && (element?.enterprise_name).toLowerCase().includes(e.target.value.toLowerCase())) return true
                return false
            })
            if (tempData.length === 0) {
                setNoDataToDisplay(true)
            }
            setEnterpriseSelection([...tempData])
        } catch (error) {
            console.log(error)
        }
    }

    const signupAndHome = async (teamData, enterpriseData, apiKey) => {
        let skuIds = []
        skuIds = sessionStorage.getItem(sessionStorageKeys?.skuProcessed) ? sessionStorage.getItem(sessionStorageKeys?.skuProcessed) : []
        try {
            localStorage.removeItem(localStorageKeys?.DEFAULTBEARERTOKEN)
            let tempPassword = uuid().slice(0, 10)
            tempPassword = tempPassword.split("-").join("")
            setUser({...userData, password: tempPassword})
            let user_name = userData?.emailId.split("@")
            user_name = user_name[0]
            let deviceId = uuid().slice(0, 36)
            deviceId = deviceId.replace(/[&\/\\#, +()$~%.'":*?<>{}-]/g, "")
            localStorage.setItem(localStorageKeys?.DEVICEID, deviceId)
            let payload = {
                strategy: "PASSWORD",
                apiKey: apiKey,
                emailId: userData?.emailId.toLowerCase(),
                password: tempPassword,
                userName: user_name,
                deviceId: deviceId,
                enterpriseOnboarding: false,
                sendWelcomeEmail: true,
                contactNo: enterpriseDetails?.owner_phone,
                isdCode: enterpriseDetails?.dialCode,
                source: 'ai_tools',
                teamId: teamData?.team_id
            }
            const URL = `${process.env.BACKEND_BASEURL}/user-management/v1/user/signup`
            const resp = await CentralAPIHandler.handlePostRequest(URL, {}, payload)

            let guestLogin = localStorage.getItem(localStorageKeys?.guestLogin) ? JSON.parse(localStorage.getItem(localStorageKeys?.guestLogin)) : false

            let payloadForApp = {
                "enterprise_id": enterpriseData?.enterprise_id,
                "enterprise_name": enterpriseData?.enterprise_name,
                "team_id": teamData?.team_id,
                "team_name": teamData?.team_name,
                "user_name": resp?.data?.userData?.name,
                "email_id": resp?.data?.userData?.emailId || user?.emailId,
                "user_role": resp?.data?.permissionObject[enterpriseData?.enterprise_id][teamData?.team_id]?.alias,
                "authKey": resp?.data?.authKey,
                "deviceId": deviceId
            }

            if (Object.keys(resp?.data || {}).length > 0) {
                localStorage.setItem(localStorageKeys?.AUTHKEY, resp?.data?.authKey)

                let defaultEnterpriseObj = {
                    "enterpriseId": enterpriseData?.enterprise_id,
                    "name": enterpriseData?.enterprise_name,
                    "apiKey": apiKey
                }
                updateAuthDetailsInRedux(resp?.data, defaultEnterpriseObj)

                localStorage.setItem(localStorageKeys?.USERDETAILS, JSON.stringify(resp?.data?.userData))
                localStorage.setItem(localStorageKeys?.defaultEnterprise, JSON.stringify(defaultEnterpriseObj))
                localStorage.setItem(localStorageKeys?.permissionObject, JSON.stringify(resp?.data?.permissionObject))

                refreshTokenAndUpdateRedux({fastRefresh: false})
                generateBearerToken({additionalPayload: {}}, true, teamData?.team_id, enterpriseData?.enterprise_id)

                let newBearerToken = base64Payload({payload: payloadForApp})
                // if (guestLogin && window?.location?.pathname?.includes("/virtualstudio")) {
                //     router.replace({query: {"enterprise_id": enterpriseData?.enterprise_id}})
                // } else {
                //     let userEmail = payload?.emailId,
                //         defaultEnterprise = enterpriseData?.enterprise_id
                //     const {skip: skipEnterpriseSelection, enterprise_id} = skipEnterpriseSelectionPage(userEmail, defaultEnterprise)
                //     if (skipEnterpriseSelection) {
                //         if(signupSource === 'console'){
                //             router.push({pathname: "/home", query: {"enterprise_id": enterpriseData?.enterprise_id}})
                //         }else{
                //             localStorage.clear()
                //             sessionStorage.clear()
                //             router.push(`/register/success?bearerToken=${newBearerToken}`)
                //         }
                //     } else {
                //         router.push("/enterprises")
                //     }
                // }
                if (props?.hideLeftContainer) {
                    await newBearerAfterGuestLoginFalse(resp?.data?.authKey) //this function is used to generate a new bearerToken for logged in user after guestLogin is set to false
                    if (skuIds?.length > 0) await mapGuestToActual(resp?.data?.userData, skuIds)
                }
            }

            let cleverTapPayload = {
                "status": "Enterprise Created",
                "source": signupSource,
                "user_email": userData?.emailId,
                "user_name": enterpriseDetails?.owner_name,
                "mobile_number": enterpriseDetails?.owner_phone,
                "device_id" : deviceId

            }
            if (userData && userData?.emailId && !userData?.emailId.includes("@spyne.ai")) {
                ClevertapReact.event("auth_signup_create_enterprise_clicked", cleverTapPayload)
            }
            props?.setShowModal(false)
            localStorage.setItem(localStorageKeys?.loggedIn, true)
            props?.setLoggedIn(true)

        } catch (error) {
            console.log(error)
            toast(`Couldn't sign you up. Please try again later.`, {hideProgressBar: true, autoClose: 2000, type: "error", position: "bottom-center", pauseOnHover: true})
            if (props?.hideLeftContainer && skuIds?.length > 0) {
                router.replace("/virtualstudio")
            }
            localStorage.setItem(localStorageKeys?.loggedIn, false)
            props?.setLoggedIn(false)
        }
        if (!props?.hideLeftContainer) {
            localStorage.removeItem(localStorageKeys?.src)
        }
    }
    const mapGuestToActual = async (userData, skuIds) => {
        try {
            const URL = `${process.env.BACKEND_BASEURL}/console/v1/user/guest-user-mapping`

            const payload = {
                guestUserId: guestEnterprise?.guestUserId,
                actualUserId: userData?.userId,
                skuIdList: skuIds
            }

            await CentralAPIHandler.handlePatchRequest(URL, payload)
        } catch (error) {
            console.log
        }
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
    const updateAuthDetailsInRedux = (loginResponseData, defaultEnterpriseObj) => {
        try {
            let defaultEnterprise = loginResponseData?.defaultEnterprise || defaultEnterpriseObj
            localStorage.setItem(localStorageKeys?.guestLogin, false)
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
            //         {"key": "defaultEnterprise", "value": defaultEnterprise},
            //         {"key": "permissionObject", "value": loginResponseData?.permissionObject}
            //     ])
            // )
        } catch (error) {
            console.log(error)
        }
    }

    const handleCreate = () =>{
        // dispatch(updateAuthProp([{"key": "previousState", value: {...auth?.previousState, [LOGIN_TYPES.CREATE_ENTERPRISE]: loginType}}]))
        let state = {...auth?.previousState, [LOGIN_TYPES.CREATE_ENTERPRISE]: loginType}
        sessionStorage.setItem(sessionStorageKeys?.previousState, JSON.stringify(state))
        setLoginType(LOGIN_TYPES?.CREATE_ENTERPRISE)
        let cleverTapPayload = {
            "status": "New enterprise created",
            "source": signupSource,
            "category": enterpriseDetails?.category,
            "user_email": userData?.emailId,
        }
        if (userData && userData?.emailId && !userData?.emailId.includes("@spyne.ai")) {
            ClevertapReact.event("auth_signup_new_enterprise_clicked", cleverTapPayload)
        }
    }

    return (
        <SignInSignUpContext.Provider value={{teamSelectionData, setTeamSelectionData}}>
            <div className={[enterpriseSelection?.length >= 8 || searchText?.length ? "pt-0" : "place-items-center", " col-span-4 grid h-full"].join(" ")}>
                <div className={[enterpriseSelection?.length >= 8 || searchText?.length ? "" : "", " w-full"].join(" ")}>
                    <div className="flex items-center justify-between mb-3">
                    <h1 className="relative flex items-center text-base font-semibold text-black md:text-2xl">
                    <Image className="h-4 cursor-pointer lg:h-6" src="https://spyne-static.s3.amazonaws.com/console/login/back-arrow.svg" height={24} width={24} alt="back-arrow" onClick={handleChangeLoginState} />

                        Welcome,
                        </h1>
                        {allowClose && <Image src="https://spyne-static.s3.amazonaws.com/console/project/close_icon.svg" width={24} height={24} alt="close" className="cursor-pointer" onClick={() => closeLogin()} />}
                        </div>
                    <p className=" relative mb-4 text-base font-normal leading-[19.36px] text-black-600"> {isLoading ? <Skeleton classSTYLE={"h-full w-full rounded-lg mb-3 mt-3"} /> : "Choose an enterprise to continue"}</p>
                    <p className=" relative mb-4 text-sm font-normal text-black-600">
                        Enterprises for <strong className="font-medium text-black-800">{userData?.emailId}</strong>
                        <span className="float-right ml-1 cursor-pointer text-sm font-medium text-blue-light" onClick={() => setLoginType(LOGIN_TYPES?.EMAIL)}>
                            Change
                        </span>
                    </p>

                    {enterpriseSelection?.length >= 5 || searchText?.length ? (
                        <div className=" shadow-5 mb-4 flex rounded-lg border border-black-8 bg-blue-10 py-2 px-3">
                            <Image className="mr-2 cursor-pointer" src="https://spyne-static.s3.amazonaws.com/console/filter/search.svg" height={20} width={20} />
                            <input type="text" placeholder="Search Enterprises" className="w-full bg-transparent" value={searchText} onChange={e => filterEnterpriseName(e)} />
                        </div>
                    ) : null}
                    {enterpriseSelection?.length >= 5 || searchText?.length ? <div className="mb-4 mt-1 h-[1px] w-[100%] rounded-sm bg-black-10"></div> : null}

                    <ul className={[enterpriseSelection?.length >= 0 || searchText?.length ? "h-[40vh] md:h-[50vh] 2xl:h-[55vh]" : "h-[50vh] md:h-[60vh] 2xl:h-[65vh] ", "enterprise-list gap-2 overflow-y-scroll rounded-lg border border-black-10"].join(" ")}>
                        {enterpriseSelection?.map((elements, indx) => {
                            const initial = elements?.enterprise_name ? elements?.enterprise_name.charAt(0).toUpperCase() : null

                            return (
                                <li onClick={e => handleEnterpriseSelection(e, elements)} key={indx} className={[isLoading ? "min-h-[4.25rem]" : "", " relative cursor-pointer py-2.5 px-3 text-sm font-medium leading-5 text-[#1d0066] last:mb-0 md:py-3 md:px-4 md:text-base"].join(" ")}>
                                    {isLoading ? (
                                        <Skeleton classSTYLE={"rounded-lg left-0 border-b-2 border-white "} />
                                    ) : (
                                        <div className="grid grid-cols-12 items-center justify-between gap-x-2">
                                            <div className="col-span-9">
                                                <div className="grid grid-cols-12 gap-2">
                                                    <div className=" col-span-3">
                                                        <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-blue-8 text-base text-black-600 md:h-[3.25rem] md:w-[3.25rem] md:text-xl">{initial}</div>
                                                    </div>
                                                    <div className="col-span-9">
                                                        <div className=" mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">{elements?.enterprise_name}</div>

                                                        <div className="flex gap-1">
                                                            <div className={[`${elements?.category_id}-banner`, "flex w-fit items-center rounded-3xl px-2 py-1 text-xs font-medium "].join(" ")}>{prodCatIdMapping[elements?.category_id]}</div>
                                                            <div className="users-chip flex w-fit items-center gap-1 rounded-3xl bg-gray-snow_drift px-2 py-1 text-[10px] font-medium leading-3 text-navy_blue md:text-xs md:leading-4">
                                                                <Image src="https://spyne-static.s3.amazonaws.com/console/filter/users_active.svg" alt="user icon" height={17} width={17} className="grayscale-[60%]" />
                                                                {elements?.user_count}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="join-tag col-span-3 text-center">
                                                <span className="text-sm font-medium text-blue-light opacity-0 transition-all duration-200 ease-in-out">Join</span>
                                                <Image className="float-right align-middle opacity-60 grayscale transition-all duration-200 ease-in-out" src="https://spyne-static.s3.amazonaws.com/console/blue-right-caret.svg" height={22} width={22} alt="right caret for button" />
                                            </div>
                                        </div>
                                    )}
                                </li>
                            )
                        })}
                        {noDataToDisplay ? (
                            <div className="p-4">
                                <p>{ENTERPRISE_DATA?.notFound}</p>
                            </div>
                        ) : null}
                    </ul>

                    <div className="">
                        <p className="my-7 border-t border-black-200 text-center font-normal leading-[0] tracking-tight text-black-600">
                            <span className="bg-white px-3">{ENTERPRISE_DATA?.orSeparatorText}</span>
                        </p>
                        <button className={[SignInSpinner ? "!py-1 pointer-events-none" : "!py-2.5", "secondary-btn mb-2 block w-full items-center"].join(" ")} disabled={SignInSpinner ? true : false} onClick={handleCreate}>
                            {SignInSpinner ? <Spinner type="LIGHT" style_CLASS={"justify-center w-full h-full item-center flex"} /> : ENTERPRISE_DATA?.createEntText}
                        </button>
                    </div>
                </div>
            </div>
        </SignInSignUpContext.Provider>
    )
}
export default SelectEnterprise
