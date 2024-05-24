/**
 * @format
 */

import Image from "next/image"
import { useRouter } from "next/router"
import React, { useState, useEffect, useRef, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"
import SignInSignUpContext from "../context"
import CentralAPIHandler from "../../centralAPIHandler/centralAPIHandler"
import { base64Payload, generateBearerToken, localStorageKeys, newBearerAfterGuestLoginFalse, sessionStorageKeys, skipEnterpriseSelectionPage } from "../config"
import { v4 as uuid } from "uuid"
import Skeleton from "@/components/common/Skeleton"


function SelectTeam(props) {
    const { allowClose } = props
    const [isLoading, setIsLoading] = useState(false)
    const [searchText, setSearchText] = useState("")
    const [enterpriseSelectionCopy, setEnterpriseSelectionCopy] = useState([])
    const [teamsDataCopy, setTeamsDataCopy] = useState([])
    const [teamsData, setTeamsData] = useState([])
    const [noDataToDisplay, setNoDataToDisplay] = useState(false)
    const { user: userData, setUser, signupSource, teamSelectionData, selectedEnterprise, enterpriseDetails, setSelectedEnterprise, closeLogin, handleChangeLoginState } = useContext(SignInSignUpContext)

    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        setTeamsData(teamSelectionData)
        setTeamsDataCopy(teamSelectionData)
    }, [teamSelectionData.length > 0])

    const handleTeamSelection = async (e, teamData = null) => {
        try {
            setIsLoading(true)
            //signup user to enterprise and team selected
            setSelectedEnterprise({ ...selectedEnterprise, team_name: teamData?.team_name, team_id: teamData?.team_id })

            signupAndHome(teamData)
        } catch (error) {
            console.log(error)
            toast(`Couldn't sign you up. Please try again later.`, { hideProgressBar: true, autoClose: 2000, type: "error", position: "bottom-center", pauseOnHover: true })
        }
        setIsLoading(false)

    }
    const signupAndHome = async teamData => {
        let skuIds = []
        skuIds = sessionStorage.getItem(sessionStorageKeys?.skuProcessed) ? sessionStorage.getItem(sessionStorageKeys?.skuProcessed) : []
        try {
            localStorage.removeItem(localStorageKeys?.DEFAULTBEARERTOKEN)
            let tempPassword = uuid().slice(0, 10)
            tempPassword = tempPassword.split("-").join("")
            setUser({ ...userData, password: tempPassword })
            let user_name = userData?.emailId.split("@")
            user_name = user_name[0]
            let deviceId = uuid().slice(0, 36)
            deviceId = deviceId.replace(/[&\/\\#, +()$~%.'":*?<>{}-]/g, "")
            localStorage.setItem(localStorageKeys?.DEVICEID, deviceId)
            let payload = {
                strategy: "PASSWORD",
                apiKey: selectedEnterprise?.api_key,
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
                "enterprise_id": selectedEnterprise?.enterprise_id,
                "enterprise_name": selectedEnterprise?.enterprise_name,
                "team_id": teamData?.team_id,
                "team_name": teamData?.team_name,
                "user_name": resp?.data?.userData?.name,
                "email_id": resp?.data?.userData?.emailId || user?.emailId,
                "user_role": resp?.data?.permissionObject[selectedEnterprise?.enterprise_id][teamData?.team_id]?.alias,
                "authKey": resp?.data?.authKey,
                "deviceId": deviceId
            }
            if (Object.keys(resp?.data || {}).length > 0) {
                localStorage.setItem(localStorageKeys?.AUTHKEY, resp?.data?.authKey)
                let defaultEnterpriseObj = {
                    "enterpriseId": selectedEnterprise?.enterprise_id,
                    "name": selectedEnterprise?.enterprise_name,
                    "apiKey": selectedEnterprise?.api_key
                }
                updateAuthDetailsInRedux(resp?.data, defaultEnterpriseObj)

                localStorage.setItem(localStorageKeys?.USERDETAILS, JSON.stringify(resp?.data?.userData))
                localStorage.setItem(localStorageKeys?.defaultEnterprise, JSON.stringify(defaultEnterpriseObj))
                localStorage.setItem(localStorageKeys?.permissionObject, JSON.stringify(resp?.data?.permissionObject))

                refreshTokenAndUpdateRedux({ fastRefresh: false })
                generateBearerToken({ additionalPayload: {} }, true, selectedEnterprise?.team_id || teamData?.team_id, selectedEnterprise?.enterprise_id)
                let newBearerToken = base64Payload({payload: payloadForApp})
                // if (guestLogin && window?.location?.pathname?.includes("/virtualstudio")) {
                //     router.replace({ query: { "enterprise_id": selectedEnterprise?.enterprise_id } })
                // } else {
                //     let userEmail = payload?.emailId,
                //         defaultEnterprise = selectedEnterprise?.enterprise_id
                //     const { skip: skipEnterpriseSelection, enterprise_id } = skipEnterpriseSelectionPage(userEmail, defaultEnterprise)
                //     if (skipEnterpriseSelection) {
                //         if(signupSource === 'console'){
                //             router.push({ pathname: "/home", query: { "enterprise_id": enterprise_id } })
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
            props?.setShowModal(false)
            localStorage.setItem(localStorageKeys?.loggedIn, true)
            props?.setLoggedIn(true)
        } catch {
            
            toast(error?.response?.data?.message || error?.message || "Something went wrong", {hideProgressBar: true, autoClose: 2000, type: "error", position: "bottom-center", pauseOnHover: true})
            localStorage.setItem(localStorageKeys?.loggedIn, false)
            props?.setLoggedIn(false)
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
            s
            await CentralAPIHandler.handlePatchRequest(URL, payload)
        } catch (error) {
            console.log
        }
    }
    const updateAuthDetailsInRedux = (loginResponseData, defaultEnterpriseObj) => {
        try {
            let defaultEnterprise = loginResponseData?.defaultEnterprise || defaultEnterpriseObj
            localStorage.setItem(localStorageKeys?.guestLogin, false)
            // dispatch(
            //     updateAuthProp([
            //         { "key": "loginModalTrigger", "value": false },
            //         { "key": "loggedIn", "value": true },
            //         { "key": "guestLogin", "value": false },
            //         { "key": "authKey", "value": loginResponseData?.authKey },
            //         { "key": "userId", "value": loginResponseData?.userData?.userId },
            //         { "key": "emailId", "value": loginResponseData?.userData?.emailId },
            //         { "key": "userName", "value": loginResponseData?.userData?.name },
            //         { "key": "contact", "value": loginResponseData?.userData?.contact },
            //         { "key": "defaultEnterprise", "value": defaultEnterprise },
            //         { "key": "permissionObject", "value": loginResponseData?.permissionObject }
            //     ])
            // )
        } catch (error) {
            console.log(error)
        }
    }
    const refreshTokenAndUpdateRedux = ({ fastRefresh = false }) => {
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
                    generateBearerToken({ additionalPayload: {} })
                } catch (error) {
                    console.log(error)
                }
            }, timeInterval)
        } catch (error) {
            console.log(error)
        }
    }

    const filterEnterpriseName = e => {
        try {
            setNoDataToDisplay(false)
            setSearchText(e.target.value)
            const tempData = teamsDataCopy.filter(element => {
                if (element?.team_name && (element?.team_name).toLowerCase().includes(e.target.value.toLowerCase())) return true
                return false
            })
            if (tempData.length === 0) {
                setNoDataToDisplay(true)
            }
            setTeamsData([...tempData])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={[teamsData?.length >= 8 || searchText.length ? "" : "place-items-center", " col-span-4 grid h-full"].join(" ")}>
            <div className={[teamsData?.length >= 8 || searchText.length ? "" : "", " w-full"].join(" ")}>
                <div className="flex items-center justify-between gap-1">
                    <h1 className="relative mb-2 flex items-center text-base font-semibold text-black md:text-2xl">
                        <Image className="h-4 cursor-pointer lg:h-6" src="https://spyne-static.s3.amazonaws.com/console/login/back-arrow.svg" height={24} width={24} alt="back-arrow" onClick={handleChangeLoginState} />
                        Welcome,
                    </h1>
                    {allowClose && <Image src="https://spyne-static.s3.amazonaws.com/console/project/close_icon.svg" width={24} height={24} alt="close" className="flex cursor-pointer items-center" onClick={() => closeLogin()} />}
                </div>
                <p className=" relative mb-4 text-sm font-normal leading-[19.36px] text-black-600 md:mb-8 md:text-base"> {isLoading ? <Skeleton classSTYLE={"h-full w-full rounded-lg mb-3 mt-3"} /> : "Choose a team to continue"}</p>
                <p className=" relative mb-3 text-sm font-normal text-black-600 md:mb-4">
                    Teams for <strong className="font-medium text-black-800">{selectedEnterprise?.enterprise_name}</strong>
                </p>

                {teamsData?.length >= 5 || searchText.length ? (
                    <div className=" shadow-5 mb-4 flex rounded-lg border border-black-8 bg-blue-10 py-2 px-3">
                        <Image className="mr-2 cursor-pointer" src="https://spyne-static.s3.amazonaws.com/console/filter/search.svg" height={20} width={20} />
                        <input type="text" placeholder="Search Teams" className="w-full bg-transparent" value={searchText} onChange={e => filterEnterpriseName(e)} />
                    </div>
                ) : null}
                {teamsData?.length >= 5 || searchText.length ? <div className="mb-4 mt-1 h-[1px] w-[100%] rounded-sm bg-black-10"></div> : null}

                <ul className={[teamsData?.length >= 0 || searchText.length ? "h-[30vh] md:h-[58vh] 2xl:h-[61vh]" : "h-[38vh] md:h-[70vh] 2xl:h-[75vh] ", "enterprise-list  gap-2 overflow-y-scroll rounded-lg border border-black-10"].join(" ")}>
                    {teamsData?.map((elements, indx) => {
                        const initial = elements?.team_name ? elements?.team_name.charAt(0).toUpperCase() : null

                        return (
                            <li onClick={e => handleTeamSelection(e, elements)} key={indx} className={[isLoading ? "pointer-events-none min-h-[4.25rem]" : "", " relative cursor-pointer py-2.5 px-3 text-sm font-medium leading-5 text-[#1d0066] last:mb-0 md:py-3 md:px-4 md:text-base"].join(" ")}>
                                {isLoading ? (
                                    <Skeleton classSTYLE={"rounded-lg left-0  border-b-2 border-white"} />
                                ) : (
                                    <div className="grid grid-cols-12 items-center justify-between gap-x-2">
                                        <div className="col-span-9">
                                            <div className="grid grid-cols-12 gap-2">
                                                <div className=" col-span-3">
                                                    <div className=" flex h-12 w-12 items-center justify-center rounded-full bg-blue-8 text-base text-black-600 md:h-[3.25rem] md:w-[3.25rem] md:text-xl">{initial}</div>
                                                </div>
                                                <div className="col-span-9">
                                                    <div className=" mb-1 w-full overflow-hidden text-ellipsis whitespace-nowrap">{elements?.team_name}</div>

                                                    <div className="users-chip flex w-fit items-center gap-1 rounded-3xl bg-gray-snow_drift px-2 py-1 text-[10px] font-medium leading-3 text-navy_blue md:text-xs md:leading-4">
                                                        <Image src="https://spyne-static.s3.amazonaws.com/console/filter/users_active.svg" alt="user icon" height={17} width={17} className="grayscale-[60%]" />
                                                        {elements?.user_count}
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
                            <p>This team could not be found, please check the name and try again.</p>
                        </div>
                    ) : null}
                </ul>
            </div>
        </div>
    )
}
export default SelectTeam
