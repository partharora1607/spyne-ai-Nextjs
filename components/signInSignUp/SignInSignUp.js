/**@format */

import React, { useState, createRef, useEffect, useRef } from "react"
import { base64Decode, localStorageKeys, LOGIN_TYPES, mailFormatRegEx, validateFormFields, sessionStorageKeys, generateBearerToken, skipEnterpriseSelectionPage, newBearerAfterGuestLoginFalse, guestEnterprise, redirectLinks, validateCreateEnterpriseFormFields, newHubspotReport, validateCreateEnterpriseForm, base64Payload, getToolName, SELECT_DROPDOWN_REVENUE, } from "./config"
import { useRouter } from "next/router"
import { useSelector, useDispatch } from "react-redux"
import { LOGIN_DATA, categories, prodCatIdMapping } from "./config"
import Image from "next/image"
import { toast } from "react-toastify"
import SignInSignUpContext from "./context"
import EnterEmail from "./EnterEmail"
import VerifyEmail from "./VerifyEmail"
import LoginTypePassword from "./LoginTypePassword"
import { v4 as uuid } from "uuid"
import { _tokenGenerationForPublicAPIs } from "./tokenRotation"
import SelectEnterprise from "./enterprise-team-selection/SelectEnterprise"
import CreateEnterprise from "./enterprise-team-selection/CreateEnterprise"
import SelectTeam from "./enterprise-team-selection/SelectTeam"
import CentralAPIHandler from "../centralAPIHandler/centralAPIHandler"
import ClevertapReact from "clevertap-react"

function SignInSignUp(props) {
    const [loginType, setLoginType] = useState(LOGIN_TYPES?.EMAIL)
    const [errorMsg, setErrorMsg] = useState("")
    const [user, setUser] = useState({
        emailId: "",
        password: "",
        otp: "",
        googleResponse: null
    })
    const [enterpriseDetails, setEnterpriseDetails] = useState({
        enterprise_name: "",
        category: "",
        category_id: "",
        default_teamname: "",
        owner_name: "",
        owner_phone: "",
        countryCode: "us",
        dialCode: "1",
        disable: false,
        website_link: ""
    })
    const [userValidationInfo, setUserValidationInfo] = useState({
        userExists: false,
        passwordExists: false,
        enterpriseData: []
    })
    const [SignInSpinner, setSignInSpinner] = useState(false)
    const [seeData, setSeeData] = useState(false)
    const [resetPassword, setResetPassword] = useState(false)
    const [otp, setOtp] = useState({
        sent: false,
        label: "Email Address/Phone"
    })
    const [resetEmailSent, setResetEmailSent] = useState(false)
    // newflow
    const [userAlreadyExists, setUserAlreadyExists] = useState(false)
    const [email, setEmail] = useState("")
    const [seconds, setSeconds] = useState(30)
    const [stepLoginOtp, setStepLoginOtp] = useState(1)
    const [activeCategoryType, setActiveCategoryType] = useState(categories?.automobile)
    const [teamSelectionData, setTeamSelectionData] = useState([])
    const [selectedEnterprise, setSelectedEnterprise] = useState("")
    const [forceResendOtp, setForceResendOtp] = useState(false)
    const [genericLoginPage, setGenericLoginPage] = useState(false)
    const [formErrors, setFormErrors] = useState({})
    const [signupSource, setSignupSource] = useState("")
    const [googleStrategy, setGoogleStrategy] = useState(false)
    const [selectedRevenue, setSelectedRevenue] = useState(SELECT_DROPDOWN_REVENUE[0]?.value)


    let emailInputRef = createRef()
    const router = useRouter()
    const auth = useSelector(state => state.authReducer)
    const dispatch = useDispatch()

    const nextStepMapping = {
        "enter-password": "PASSWORD",
        "create-enterprise": "CREATE_ENTERPRISE",
        "select-enterprise": "SELECT_ENTERPRISE",
        "home-page": "HOME",
        "verify-otp": "OTP"
    }

    const previousState = {
        [LOGIN_TYPES.PASSWORD]: "",
        [LOGIN_TYPES.GOOGLE]: "",
        [LOGIN_TYPES.OTP]: "",
        [LOGIN_TYPES.EMAIL]: "",
        [LOGIN_TYPES.CREATE_ENTERPRISE]: "",
        [LOGIN_TYPES.SELECT_ENTERPRISE]: "",
        [LOGIN_TYPES.HOME]: "",
        [LOGIN_TYPES.FORGOT_PASSWORD]: "",
        [LOGIN_TYPES.FORGOT_EMAIL_LINK_SENT]: ""
    }

    const handleLogin = async e => {
        e.preventDefault()
        try {
            if (errorMsg && errorMsg.length) setErrorMsg("")
            if (validateFormFields({ userEmail: user?.emailId, userPassword: user?.password })) {
                let payload = {
                    strategy: "PASSWORD",
                    apiKey: process.env.REACT_APP_API_KEY,
                    emailId: user?.emailId?.toLowerCase(),
                    password: user?.password,
                    deviceId: localStorage.getItem(localStorageKeys?.DEVICEID)
                }

                if (loginType === LOGIN_TYPES?.OTP) {
                    payload["strategy"] = "OTP"
                    payload["password"] = ""
                }
                await handlePasswordLogin(payload);
                props?.setLoggedIn(true)
            } else {
                return
            }
        } catch (error) {
            setErrorMsg(error?.data?.message || error)
            console.log(error)
        }
    }

    const SignInComponents = () => {
        try {
            switch (loginType) {
                case LOGIN_TYPES?.EMAIL:
                    return <EnterEmail allowClose={true} info={props.info} />
                case LOGIN_TYPES?.PASSWORD:
                case LOGIN_TYPES?.FORGOT_PASSWORD:
                case LOGIN_TYPES?.FORGOT_EMAIL_LINK_SENT:
                    return <LoginTypePassword allowClose={true} />
                case LOGIN_TYPES?.OTP:
                    return <VerifyEmail allowClose={true} />
                case LOGIN_TYPES?.SELECT_ENTERPRISE:
                    return <SelectEnterprise allowClose={true} setShowModal={props?.setShowModal} setLoggedIn={props?.setLoggedIn} />
                case LOGIN_TYPES?.CREATE_ENTERPRISE:
                    return <CreateEnterprise allowClose={true} />
                case LOGIN_TYPES?.SELECT_TEAM:
                    return <SelectTeam allowClose={true} setShowModal={props?.setShowModal} setLoggedIn={props?.setLoggedIn} />
                default:
                    return <EnterEmail allowClose={true} info={props.info} />
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleEmailChange = e => {
        setStepLoginOtp(1)
    }
    const handleOTP = e => {
        try {
            if (errorMsg) setErrorMsg("")
            setUser({ ...user, otp: e.target.value })
        } catch (error) {
            console.log(error)
        }
    }

    const handleEmailVerification = async e => {
        e.preventDefault()
        e.stopPropagation()
        try {
            setSignInSpinner(true)
            setErrorMsg("")
            if (!user?.otp) {
                setErrorMsg("Please enter the OTP to verify your email")
                return
            }
            const URL = `${process.env.BACKEND_BASEURL}/user-management/v1/user/verify-otp`
            await CentralAPIHandler.handlePostRequest(URL, {
                email_id: user?.emailId,
                otp: user?.otp
            })
            let cleverTapPayload = {
                "status": "OTP Verified",
                "source": signupSource,
                "category": enterpriseDetails?.category,
                "user_email": user?.emailId,
            }
            let hubSpotpayload = {
                "email": user?.emailId,
                "company": enterpriseDetails?.enterprise_name,
                'toolName': getToolName(router.pathname),
                "otpVerify": true
            }
            newHubspotReport(hubSpotpayload)
            if (user && user?.emailId && !user?.emailId.includes("@spyne.ai")) {
                ClevertapReact.event("auth_signup_otp_clicked", cleverTapPayload)
            }

            if (userValidationInfo?.userExists) {
                handleLogin(e)
            } else {
                if (userValidationInfo?.enterpriseData?.length > 0) {
                    // dispatch(updateAuthProp([{"key": "previousState", value: {...auth?.previousState, [LOGIN_TYPES?.SELECT_ENTERPRISE]: loginType}}]))
                    let state = { ...auth?.previousState, [LOGIN_TYPES?.SELECT_ENTERPRISE]: loginType }
                    sessionStorage.setItem(sessionStorageKeys?.previousState, JSON.stringify(state))
                    setLoginType(LOGIN_TYPES?.SELECT_ENTERPRISE)
                } else {
                    await handleCreateEnterprise(e)
                }
            }
            setSignInSpinner(false)
        } catch (error) {
            setForceResendOtp(true)
            setErrorMsg(error?.response?.data?.message || error?.message || "Unknown error occurred")
            setSignInSpinner(false)
            // setLoginType(LOGIN_TYPES?.OTP)
        }
    }

    const checkUserExists = async (e, googleResponse) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        setSignInSpinner(true)
        setUser({ ...user, otp: "" })
        try {
            let userEmail = user?.emailId
            if (user?.googleResponse || googleResponse) {
                userEmail = user?.googleResponse?.email || googleResponse?.email
                setUser({ ...user, emailId: userEmail })
                setGoogleStrategy(true)
            }
            if (errorMsg && errorMsg.length) setErrorMsg(" ")
            if (!userEmail) {
                setErrorMsg("Email Address is required to login/signup")
                return
            } else if (!mailFormatRegEx.test(userEmail)) {
                setErrorMsg("Please enter a valid email address")
                return
            }

            // Make API call to check if the user exists
            const URL = `${process.env.BACKEND_BASEURL}/user-management/v1/user/user-exists`
            const resp = await CentralAPIHandler.handleGetRequest(URL, {
                email_id: userEmail,
                googleStrategy: googleResponse?.email ? true : false,
                device_id: localStorage.getItem(localStorageKeys?.DEVICEID)
            })

            let payloadForApp = {
                "enterprise_id": resp?.data?.loginResponse?.defaultEnterprise?.enterpriseId,
                "enterprise_name": resp?.data?.loginResponse?.defaultEnterprise?.name,
                "team_id": resp?.data?.loginResponse?.teamData?.team_id,
                "team_name": resp?.data?.loginResponse?.teamData?.team_name,
                "user_name": resp?.data?.loginResponse?.userData?.name,
                "email_id": resp?.data?.loginResponse?.userData?.emailId,
                "user_role": resp?.data?.loginResponse?.permissionObject[resp?.data?.loginResponse?.defaultEnterprise?.enterpriseId][resp?.data?.loginResponse?.teamData?.team_id]?.alias,
                "authKey": resp?.data?.loginResponse?.authKey,
                "deviceId": localStorage.getItem(localStorageKeys?.DEVICEID)
            }
            let emailDomains = [
                'gmail.com',
                'yahoo.com',
                'outlook.com',
                'hotmail.com',
                'aol.com',
                'icloud.com',
                'protonmail.com',
                'mail.com',
                'zoho.com',
                'yandex.com',
                'gmx.com'
            ]
            let domain = userEmail.split('@')[1]
            let enterpriseTempName = domain.split(".")[0]
            if (!emailDomains.includes(domain)) {
                setEnterpriseDetails({ ...enterpriseDetails, enterprise_name: enterpriseTempName })
            }

            // Update state based on API response
            // dispatch(updateAuthProp([{"key": "previousState", value: {...previousState, [LOGIN_TYPES?.[nextStepMapping[resp?.data?.nextStep]]]: loginType}}]))
            let state = { ...previousState, [LOGIN_TYPES?.[nextStepMapping[resp?.data?.nextStep]]]: loginType }
            sessionStorage.setItem(sessionStorageKeys?.previousState, JSON.stringify(state))
            setLoginType(LOGIN_TYPES?.[nextStepMapping[resp?.data?.nextStep]])
            setUserValidationInfo({
                ...userValidationInfo,
                userExists: resp?.data?.userExists ?? false,
                passwordExists: resp?.data?.passwordExists ?? false,
                enterpriseData: resp?.data?.enterpriseData ?? []
            })

            let hubSpotpayload = {
                // "email": user?.emailId,
                "email": userEmail,
                'toolName': getToolName(router.pathname),
            }
            newHubspotReport(hubSpotpayload)

            //redirect to home page with default enterprise of user
            if (Object.keys(resp?.data?.loginResponse || {}).length > 0 && resp?.data?.nextStep === "home-page") {
                localStorage.setItem(localStorageKeys?.loggedIn, true)
                localStorage.setItem(localStorageKeys?.AUTHKEY, resp?.data?.loginResponse?.authKey)

                updateAuthDetailsInRedux(resp?.data?.loginResponse)

                localStorage.setItem(localStorageKeys?.USERDETAILS, JSON.stringify(resp?.data?.loginResponse?.userData))
                localStorage.setItem(localStorageKeys?.defaultEnterprise, JSON.stringify(resp?.data?.loginResponse?.defaultEnterprise))
                localStorage.setItem(localStorageKeys?.permissionObject, JSON.stringify(resp?.data?.loginResponse?.permissionObject))
                refreshTokenAndUpdateRedux({ fastRefresh: false })
                generateBearerToken({ additionalPayload: {} }, true, "", resp?.data?.loginResponse?.defaultEnterprise?.enterpriseId)

                let token = base64Payload({ payload: payloadForApp })
                // if (signupSource === "console") {
                //     router.push({pathname: "/home", query: {"enterprise_id": resp?.data?.loginResponse?.defaultEnterprise?.enterpriseId}})
                // } else {
                //     router.push(`/login?bearerToken=${token}`)
                // }
                props?.setShowModal(false)
                props?.setLoggedIn(true)
            }

            let cleverTapPayload = {
                "status": "Email entered",
                "source": signupSource,
                "category": enterpriseDetails?.category,
                "user_email": user?.emailId,
            }
            if (user?.emailId && !user?.emailId.includes("@spyne.ai")) {
                if (resp?.data?.userExists) {
                    ClevertapReact.event("auth_login_email_clicked", cleverTapPayload)
                } else {
                    ClevertapReact.event("auth_signup_email_clicked", cleverTapPayload)
                }
            }

        } catch (error) {
            console.error("Error checking user:", error)
            setErrorMsg(error?.data?.message || error?.message || error)
            localStorage.removeItem(localStorageKeys?.AUTHKEY)
            localStorage.setItem(localStorageKeys?.guestLogin, true)
            // dispatch(resetAuth())
        } finally {
            setSignInSpinner(false)
        }
    }


    const handlePasswordLogin = async payload => {
        let skuIds = []
        skuIds = sessionStorage.getItem(sessionStorageKeys?.skuProcessed) ? sessionStorage.getItem(sessionStorageKeys?.skuProcessed) : []
        try {
            setSignInSpinner(true)
            localStorage.removeItem(localStorageKeys?.DEFAULTBEARERTOKEN)

            const URL = `${process.env.BACKEND_BASEURL}/user-management/v1/user/login`
            const resp = await CentralAPIHandler.handlePostRequest(URL, {}, payload)

            let guestLogin = localStorage.getItem(localStorageKeys?.guestLogin) ? JSON.parse(localStorage.getItem(localStorageKeys?.guestLogin)) : false
            localStorage.setItem(localStorageKeys?.USERDETAILS, JSON.stringify(resp?.data?.userData))
            localStorage.setItem(localStorageKeys?.defaultEnterprise, JSON.stringify(resp?.data?.defaultEnterprise))
            localStorage.setItem(localStorageKeys?.permissionObject, JSON.stringify(resp?.data?.permissionObject))
            localStorage.setItem(localStorageKeys?.AUTHKEY, resp?.data?.authKey)
            refreshTokenAndUpdateRedux({ fastRefresh: false })

            let payloadForApp = {
                "enterprise_id": resp?.data?.defaultEnterprise?.enterpriseId,
                "enterprise_name": resp?.data?.defaultEnterprise?.name,
                "team_id": resp?.data?.teamData?.team_id,
                "team_name": resp?.data?.teamData?.team_name,
                "user_name": resp?.data?.userData?.name,
                "email_id": resp?.data?.userData?.emailId || user?.emailId,
                "user_role": resp?.data?.permissionObject[resp?.data?.defaultEnterprise?.enterpriseId][resp?.data?.teamData?.team_id]?.alias,
                "authKey": resp?.data?.authKey,
                "deviceId": localStorage.getItem(localStorageKeys?.DEVICEID)
            }

            if (Object.keys(resp?.data || {}).length > 0) {
                if (guestLogin && window?.location?.pathname?.includes("/virtualstudio")) {
                    // router.replace({query: { "enterprise_id": resp?.data?.defaultEnterprise?.enterpriseId, "team_id": [`${}`] }})
                    router.replace({ query: { "enterprise_id": resp?.data?.defaultEnterprise?.enterpriseId } })
                } else {
                    generateBearerToken({ additionalPayload: {} })
                    let token = base64Payload({ payload: payloadForApp })
                    let userEmail = payload?.emailId,
                        defaultEnterprise = resp?.data?.defaultEnterprise?.enterpriseId
                    const { skip: skipEnterpriseSelection, enterprise_id } = skipEnterpriseSelectionPage(userEmail, defaultEnterprise)
                    // if (signupSource === "console") {
                    //     if (skipEnterpriseSelection) {
                    //         router.push({pathname: "/home", query: {"enterprise_id": enterprise_id}})
                    //     } else {
                    //         router.push("/enterprises")
                    //     }
                    // } else {
                    //     router.push(`/login?bearerToken=${token}`)
                    // }
                }

                if (props?.hideLeftContainer) {
                    await newBearerAfterGuestLoginFalse(resp?.data?.authKey) //this function is used to generate a new bearerToken for logged in user after guestLogin is set to false
                    if (skuIds?.length > 0) await mapGuestToActual(resp?.data?.userData, skuIds)
                }
                updateAuthDetailsInRedux(resp?.data)


                let cleverTapPayload = {
                    "status": "Logged in",
                    "source": signupSource,
                    "user_email": resp?.data?.userData?.emailId || user?.emailId,
                    "user_id": resp?.data?.userData?.userId,
                    "enterprise_id": resp?.data?.defaultEnterprise?.enterpriseId,
                    "mobile_number": resp?.data?.userData?.contact,
                    "device_id": localStorage.getItem(localStorageKeys?.DEVICEID)

                }


                if (resp && resp?.data?.userData?.emailId && !resp?.data?.userData?.emailId.includes("@spyne.ai")) {
                    if (payload["strategy"] === "OTP") {
                        ClevertapReact?.event("auth_login_otp_clicked", cleverTapPayload)
                    } else if (payload["strategy"] === "PASSWORD") {
                        ClevertapReact?.event("auth_login_password_clicked", cleverTapPayload)
                    }
                }

                // addUserDetailsInLocalStorage(resp?.data)
            }
            props?.setShowModal(false)
            localStorage.setItem(localStorageKeys?.loggedIn, true)
            props?.setLoggedIn(true)
        } catch (error) {
            if (props?.hideLeftContainer && skuIds?.length > 0) {
                router.replace("/virtualstudio")
                toast("Oops, something went wrong! Please try again.", { hideProgressBar: true, autoClose: 2000, type: "error", position: "bottom-center", pauseOnHover: true })
            }

            setErrorMsg(error?.response?.data?.message || error?.message)
            localStorage.removeItem(localStorageKeys?.AUTHKEY)
            localStorage.setItem(localStorageKeys?.guestLogin, true)
            // dispatch(resetAuth())
            // dispatch(updateAuthProp([{"key": "previousState", value: {...previousState, [LOGIN_TYPES?.PASSWORD]: LOGIN_TYPES?.EMAIL}}]))
            let state = { ...previousState, [LOGIN_TYPES?.PASSWORD]: LOGIN_TYPES?.EMAIL }
            sessionStorage.setItem(sessionStorageKeys?.previousState, JSON.stringify(state))
            setUser({ ...user, password: "" })
            // if (props?.hideLeftContainer) dispatch(updateAuthProp([{"key": "loginModalTrigger", "value": true}]))
            localStorage.setItem(localStorageKeys?.loggedIn, false)
            props?.setLoggedIn(false)
        } finally {
            setSignInSpinner(false)
            if (!props?.hideLeftContainer) {
                localStorage.removeItem(localStorageKeys?.src)
            }
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

    const getEmailId = e => {
        setErrorMsg("")
        setResetEmailSent(false)
        setUser({
            ...user,
            emailId: e.target.value
        })
        const regex = mailFormatRegEx
        {
            loginType !== "PASSWORD" && regex.test(e.target.value) ? setOtp({ ...otp, label: "Phone" }) : setOtp({ ...otp, label: "Email Address/Phone" })
        }
    }

    const handleCredentialResponse = async (googleResponse, e) => {
        let credential = base64Decode({ payload: googleResponse, decodeSrc: true })
        let skuIds = []
        skuIds = sessionStorage.getItem(sessionStorageKeys?.skuProcessed) ? sessionStorage.getItem(sessionStorageKeys?.skuProcessed) : []
        try {
            let credential = base64Decode({ payload: googleResponse, decodeSrc: true })
            setUser({ ...user, googleResponse: credential, email: credential?.email })
            setEnterpriseDetails({
                ...enterpriseDetails,
                owner_name: credential?.name
            })
            await checkUserExists(e, credential)
        } catch (error) {
            if (props?.hideLeftContainer && skuIds?.length > 0) {
                router.replace("/virtualstudio")
                toast("Oops, something went wrong! Please try again.", { hideProgressBar: true, autoClose: 2000, type: "error", position: "bottom-center", pauseOnHover: true })
            }
            setErrorMsg(error?.response?.data?.message || error?.message)
            localStorage.removeItem(localStorageKeys?.AUTHKEY)
            localStorage.setItem(localStorageKeys?.guestLogin, true)

            // dispatch(resetAuth())
            // if (props?.hideLeftContainer) dispatch(updateAuthProp([{"key": "loginModalTrigger", "value": true}]))
        } finally {
            if (!props?.hideLeftContainer) {
                localStorage.removeItem(localStorageKeys?.src)
            }
        }
    }


    const formatInput = e => {
        try {
            let attribute = e.target.name
            setEnterpriseDetails({
                ...enterpriseDetails,
                [attribute]: e?.target?.value
            })
        } catch (error) {
            console.log(error)
        }
    }

    const validateInput = e => {
        try {
            let attribute = e.target.name
            setEnterpriseDetails({
                ...enterpriseDetails,
                [attribute]: e?.target?.value?.trim()
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handlePhoneInput = (value, data, e, formattedValue) => {
        try {
            setEnterpriseDetails({
                ...enterpriseDetails,
                owner_phone: value,
                countryCode: data?.countryCode,
                dialCode: data?.dialCode
            })
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

    const handleForgotPassword = async e => {
        e.preventDefault()
        e.stopPropagation()
        try {
            setSignInSpinner(true)
            setSeconds(30)
            if (!user?.emailId) {
                setErrorMsg("Email Address is required to reset your password")
                return
            }
            const URL = `${process.env.BACKEND_BASEURL}/console/v1/user/forget-password`
            const resp = await CentralAPIHandler.handlePostRequest(URL, {
                emailId: user?.emailId
            })

            let cleverTapPayload = {
                "status": "Forgot password",
                "source": signupSource,
                "category": enterpriseDetails?.category,
                "user_email": user?.emailId,

            }
            if (user?.emailId && !user?.emailId.includes("@spyne.ai")) {
                ClevertapReact.event("auth_login_forgot_password_clicked", cleverTapPayload)
            }

            if (!resp?.error) {
                setResetEmailSent(true)
                // dispatch(updateAuthProp([{"key": "previousState", value: {...auth?.previousState, [LOGIN_TYPES?.FORGOT_EMAIL_LINK_SENT]: loginType}}]))
                let state = { ...auth?.previousState, [LOGIN_TYPES?.FORGOT_EMAIL_LINK_SENT]: loginType }
                sessionStorage.setItem(sessionStorageKeys?.previousState, JSON.stringify(state))
                setLoginType(LOGIN_TYPES?.FORGOT_EMAIL_LINK_SENT)
                return
            }
        } catch (error) {
            setErrorMsg(error?.response?.data?.message || error?.message)
            setResetEmailSent(false)
            console.log(error)
        } finally {
            setSignInSpinner(false)
        }
    }

    const handleChangeLoginState = () => {
        try {
            let state = JSON.parse(sessionStorage.getItem(sessionStorageKeys?.previousState))
            setLoginType(state[loginType])
            // dispatch(updateAuthProp([{"key": "previousState", value: {...auth?.previousState, [loginType]: ""}}]))
        } catch (error) {
            console.log(error)
        }
    }

    // const handleForgot = () => {
    //     try {
    //         dispatch(updateAuthProp([{"key": "previousState", value: {...auth?.previousState, [LOGIN_TYPES?.FORGOT_PASSWORD]: loginType}}]))
    //         setLoginType(LOGIN_TYPES?.FORGOT_PASSWORD)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleLoginTypeEmail = () => {
        try {
            // dispatch(updateAuthProp([{"key": "previousState", value: {...auth?.previousState, [LOGIN_TYPES?.EMAIL]: loginType}}]))
            let state = { ...auth?.previousState, [LOGIN_TYPES?.EMAIL]: loginType }
            sessionStorage.setItem(sessionStorageKeys?.previousState, JSON.stringify(state))
            setLoginType(LOGIN_TYPES?.EMAIL)
        } catch (error) {
            console.log(error)
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

        }
    }
    const useLoginTypeOTP = async (resend = false) => {
        setUser({ ...user, password: "", otp: "" })
        try {
            setSeconds(30)
            // dispatch(updateAuthProp([{"key": "previousState", value: {...auth?.previousState, [LOGIN_TYPES?.OTP]: loginType}}]))
            let state = { ...auth?.previousState, [LOGIN_TYPES?.OTP]: loginType }
            sessionStorage.setItem(sessionStorageKeys?.previousState, JSON.stringify(state))
            setLoginType(LOGIN_TYPES?.OTP)
            const URL = `${process.env.BACKEND_BASEURL}/user-management/v1/user/generate-otp`
            const resp = await CentralAPIHandler.handlePostRequest(URL, {
                email_id: user?.emailId
            })

            let cleverTapPayload = {
                "status": "Use OTP to login",
                "source": signupSource,
                "category": enterpriseDetails?.category,
                "user_email": user?.emailId,
            }
            if (user?.emailId && !user?.emailId.includes("@spyne.ai")) {
                ClevertapReact.event("auth_login_use_otp_clicked", cleverTapPayload)
            }
        } catch (error) {
            console.log(error)
            setErrorMsg(error?.data?.message || error)
        }
    }

    const createEnterprise = async (e) => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        let queryParams = new URLSearchParams(window.location.search)
        let prodCatId = queryParams.get("category_id")
        let prodCatName = prodCatIdMapping[prodCatId]
        let step = null
        try {
            let splitValue = user?.emailId.split("@")
            let domain = splitValue[1]
            setFormErrors(validateCreateEnterpriseForm({ formFields: enterpriseDetails, fromSignUp: true,categoryId: enterpriseDetails?.category_id, prodCatId:prodCatId,selectedRevenue }))
            if (Object?.keys(validateCreateEnterpriseForm({ formFields: enterpriseDetails, fromSignUp: true,categoryId: enterpriseDetails?.category_id, prodCatId:prodCatId,selectedRevenue }) || {})?.length > 0) return
            setErrorMsg("")
            setSignInSpinner(true)
            const URL = `${process.env.BACKEND_BASEURL}/console/v1/enterprise/verify-enterprise-name`
            const resp = await CentralAPIHandler.handleGetRequest(URL, {
                enterpriseName: enterpriseDetails?.enterprise_name
            })

            let state = {
                enterpriseName: enterpriseDetails?.enterprise_name,
                category: enterpriseDetails?.category ?? prodCatName,
                category_id: enterpriseDetails?.category_id ?? prodCatId,
                teamName: enterpriseDetails?.default_teamname || enterpriseDetails?.enterprise_name,
                emailId: user?.emailId,
                userName: enterpriseDetails?.owner_name,
                url: domain
            }
            sessionStorage.setItem(sessionStorageKeys?.stepCreateEnterprise, JSON.stringify(state))

            useLoginTypeOTP()
            setSignInSpinner(false)
            // dispatch(updateAuthProp([{"key": "previousState", value: {...auth?.previousState, [LOGIN_TYPES?.OTP]: loginType}}]))
            let signupState = { ...auth?.previousState, [LOGIN_TYPES?.OTP]: loginType }
            sessionStorage.setItem(sessionStorageKeys?.previousState, JSON.stringify(signupState))
            setLoginType(LOGIN_TYPES?.OTP)

            let hubSpotpayload = {
                "firstname": enterpriseDetails?.owner_name,
                "email": user?.emailId,
                "phone": enterpriseDetails?.owner_phone,
                "company": enterpriseDetails?.enterprise_name,
                'toolName': getToolName(router.pathname),
            }
            newHubspotReport(hubSpotpayload)

            let cleverTapPayload = {
                "status": "Enterprise created",
                "source": signupSource,
                "category": enterpriseDetails?.category,
                "user_email": user?.emailId,
                "user_name": enterpriseDetails?.owner_name,
                "mobile_number": enterpriseDetails?.owner_phone,
                'toolName': getToolName(router.pathname),

            }
            if (user?.emailId && !user?.emailId.includes("@spyne.ai")) {
                ClevertapReact.event("auth_signup_create_enterprise_clicked", cleverTapPayload)
            }

        } catch (err) {
            setSignInSpinner(false)
            toast(err?.message || "Something went wrong", { hideProgressBar: true, autoClose: 2000, type: "error", position: "bottom-center", pauseOnHover: true })
            setErrorMsg(err?.message)
        }

    }
    const handleCreateEnterprise = async e => {
        if (e) {
            e.preventDefault()
            e.stopPropagation()
        }
        let queryParams = new URLSearchParams(window.location.search)
        let prodCatId = queryParams.get("category_id")
        let prodCatName = prodCatIdMapping[prodCatId]
        let teamId
        let enterpriseId
        let apiKey
        let step = null

        try {
            let tempPassword = uuid().slice(0, 10)
            tempPassword = tempPassword.split("-").join("")
            setUser({ ...user, password: tempPassword })
            let splitValue = user?.emailId.split("@")
            let domain = splitValue[1]
            let deviceId = uuid().slice(0, 36)
            deviceId = deviceId.replace(/[&\/\\#, +()$~%.'":*?<>{}-]/g, "")
            localStorage.setItem(localStorageKeys?.DEVICEID, deviceId)
            setFormErrors(validateCreateEnterpriseForm({ formFields: enterpriseDetails, fromSignUp: true,categoryId: enterpriseDetails?.category_id, prodCatId:prodCatId,selectedRevenue }))
            if (Object?.keys(validateCreateEnterpriseForm({ formFields: enterpriseDetails, fromSignUp: true,categoryId: enterpriseDetails?.category_id, prodCatId:prodCatId,selectedRevenue }) || {})?.length > 0) return
            setErrorMsg("")
            setSignInSpinner(true)
            localStorage.removeItem(localStorageKeys?.DEFAULTBEARERTOKEN)
            const secureToken = _tokenGenerationForPublicAPIs()
            let enterprisePayloadFromSession = sessionStorage.getItem(sessionStorageKeys?.stepCreateEnterprise)
            let parsedPayload = JSON.parse(enterprisePayloadFromSession)
            let createEnterprisePayload

            if (parsedPayload) {
                createEnterprisePayload = {
                    ...parsedPayload, password: tempPassword, deviceId: deviceId, sSecret: secureToken.passPhrase,
                    sKey: secureToken.token,
                }
            } else {
                createEnterprisePayload = {
                    enterpriseName: enterpriseDetails?.enterprise_name,
                    category: enterpriseDetails?.category ?? prodCatName,
                    category_id: enterpriseDetails?.category_id ?? prodCatId,
                    teamName: enterpriseDetails?.default_teamname || enterpriseDetails?.enterprise_name,
                    emailId: user?.emailId,
                    password: tempPassword,
                    userName: enterpriseDetails?.owner_name,
                    deviceId: deviceId,
                    sSecret: secureToken.passPhrase,
                    sKey: secureToken.token,
                    url: domain,
                    website_link: ((enterpriseDetails?.category_id && enterpriseDetails?.category_id !== "cat_d8R14zUNE") || (prodCatId && prodCatId !== "cat_d8R14zUNE")) ? JSON.stringify([enterpriseDetails?.website_link]) : "",
                    annual_revenue: ((enterpriseDetails?.category_id && enterpriseDetails?.category_id !== "cat_d8R14zUNE") || (prodCatId && prodCatId !== "cat_d8R14zUNE")) ? selectedRevenue : ""
                }
            }
            const URLCreateEnterprise = `${process.env.BACKEND_BASEURL}/console/v1/account/create-enterprise-config`
            let response = await CentralAPIHandler.handlePostRequest(
                URLCreateEnterprise, createEnterprisePayload,
                {}
            )
            step = 1
            teamId = response?.data?.teamId
            enterpriseId = response?.data?.enterpriseId
            apiKey = response?.data?.apiKey
            if (!parsedPayload) {
                let state = {
                    step: "create-enterprise-config",
                    enterpriseName: enterpriseDetails?.enterprise_name,
                    category: enterpriseDetails?.category ?? prodCatName,
                    category_id: enterpriseDetails?.category_id ?? prodCatId,
                    teamName: enterpriseDetails?.default_teamname || enterpriseDetails?.enterprise_name,
                    emailId: user?.emailId,
                    userName: enterpriseDetails?.owner_name,
                    deviceId: deviceId,
                    contactNo: enterpriseDetails?.owner_phone,
                    isdCode: enterpriseDetails?.dialCode
                }
                sessionStorage.setItem(sessionStorageKeys?.stepCreateEnterprise, JSON.stringify(state))
            }
            let payload = {
                strategy: googleStrategy ? "GOOGLE" : "PASSWORD",
                apiKey: apiKey,
                emailId: user?.emailId,
                password: googleStrategy ? "" : tempPassword,
                userName: enterpriseDetails?.owner_name,
                deviceId: deviceId,
                enterpriseOnboarding: true,
                contactNo: enterpriseDetails?.owner_phone,
                isdCode: enterpriseDetails?.dialCode,
                source: signupSource,
                // category_id: enterpriseDetails?.category_id ?? prodCatId,
                toolName: getToolName(router.pathname)
            }
            localStorage.removeItem(localStorageKeys?.DEFAULTBEARERTOKEN)
            const URL = `${process.env.BACKEND_BASEURL}/user-management/v1/user/signup`
            const resp = await CentralAPIHandler.handlePostRequest(URL, {}, payload)
            step = 2
            if (prodCatId || enterpriseDetails?.category_id === "cat_d8R14zUNE") {
                //for Automobile only
                const secureTokenConfigurations = _tokenGenerationForPublicAPIs()
                const URLDefaultConfigation = `${process.env.BACKEND_BASEURL}/console/v1/account/add-default-configuration`
                await CentralAPIHandler.handlePostRequest(URLDefaultConfigation, {
                    enterpriseId: enterpriseId,
                    prodCatId: enterpriseDetails?.category_id ?? prodCatId,
                    emailId: user?.emailId,
                    spyneAssured: false,
                    coBrand: true,
                    price: 4,
                    planTitle: "Combo - Cobranded",
                    sSecret: secureTokenConfigurations.passPhrase,
                    sKey: secureTokenConfigurations.token
                })
                step = null
                await addDefaultBgTags(enterpriseId, enterpriseDetails?.category_id, prodCatId)
            }

            if(prodCatId || enterpriseDetails?.category_id === "cat_Ujt0kuFxY") {//Ecom category
                const secureTokenConfigurations = _tokenGenerationForPublicAPIs()
                const URLDefaultConfigation = `${process.env.BACKEND_BASEURL}/console/v1/account/add-default-ecom-configuration`
                await CentralAPIHandler.handlePostRequest(URLDefaultConfigation, {
                    enterpriseId: enterpriseId,
                    prodCatId: enterpriseDetails?.category_id ?? prodCatId,
                    emailId: user?.emailId,
                    sSecret: secureTokenConfigurations.passPhrase,
                    sKey: secureTokenConfigurations.token
                })
            }

            if(prodCatId || enterpriseDetails?.category_id === "cat_Ujt0kuFxF"){ //Food category
                const secureTokenConfigurations = _tokenGenerationForPublicAPIs()
                const URLDefaultConfigation = `${process.env.BACKEND_BASEURL}/console/v1/account/add-default-food-configuration`
                await CentralAPIHandler.handlePostRequest(URLDefaultConfigation, {
                    enterpriseId: enterpriseId,
                    prodCatId: enterpriseDetails?.category_id ?? prodCatId,
                    emailId: user?.emailId,
                    sSecret: secureTokenConfigurations.passPhrase,
                    sKey: secureTokenConfigurations.token
                })
            }

            toast("Your account has been created", { hideProgressBar: true, autoClose: 2000, type: "success", position: "bottom-center", pauseOnHover: true })
            let hubSpotpayload = {
                "firstname": enterpriseDetails?.owner_name,
                "email": user?.emailId,
                "phone": enterpriseDetails?.owner_phone,
                "company": enterpriseDetails?.enterprise_name,
                'toolName': getToolName(router.pathname),
                "website_link": ((enterpriseDetails?.category_id && enterpriseDetails?.category_id !== "cat_d8R14zUNE") || (prodCatId && prodCatId !== "cat_d8R14zUNE")) ? enterpriseDetails?.website_link : "",
                "annual_revenue": ((enterpriseDetails?.category_id && enterpriseDetails?.category_id !== "cat_d8R14zUNE") || (prodCatId && prodCatId !== "cat_d8R14zUNE")) ? selectedRevenue : ""

            }
            newHubspotReport(hubSpotpayload)
            let cleverTapPayload = {
                "status": "Enterprise Created",
                "source": signupSource,
                "user_email": user?.emailId,
                "user_name": enterpriseDetails?.owner_name,
                "mobile_number": enterpriseDetails?.owner_phone,
                "device_id": deviceId,
                'toolName': getToolName(router.pathname),

            }
            if (user && user?.emailId && !user?.emailId.includes("@spyne.ai")) {
                ClevertapReact.event("auth_signup_create_enterprise_clicked", cleverTapPayload)
            }
            setUser({
                emailId: "",
                password: "",
                otp: "",
                googleResponse: null
            })
            let defaultEnterprise = {
                "enterpriseId": enterpriseId,
                "name": enterpriseDetails?.enterprise_name,
                "apiKey": apiKey,
                "spyneAssured": "NONE",
                "qualityCheck": 0
            }
            localStorage.setItem(localStorageKeys?.AUTHKEY, resp?.data?.authKey)
            updateAuthDetailsInRedux(resp?.data, defaultEnterprise)

            localStorage.setItem(localStorageKeys?.USERDETAILS, JSON.stringify(resp?.data?.userData))
            localStorage.setItem(localStorageKeys?.defaultEnterprise, JSON.stringify(defaultEnterprise))
            localStorage.setItem(localStorageKeys?.permissionObject, JSON.stringify(resp?.data?.permissionObject))

            refreshTokenAndUpdateRedux({ fastRefresh: false })

            let payloadForApp = {
                "enterprise_id": enterpriseId,
                "enterprise_name": enterpriseDetails?.enterprise_name,
                "team_id": teamId,
                "team_name": enterpriseDetails?.enterprise_name,
                "user_name": resp?.data?.userData?.name,
                "email_id": resp?.data?.userData?.emailId || user?.emailId,
                "user_role": resp?.data?.permissionObject[enterpriseId][teamId]?.alias,
                "authKey": resp?.data?.authKey,
                "deviceId": deviceId
            }
            generateBearerToken({ additionalPayload: {} }, true, teamId, enterpriseId)
            let newBearerToken = base64Payload({ payload: payloadForApp })
            // if (signupSource === "console") {
            //     router.push({pathname: "/home", query: {"enterprise_id": enterpriseId}})
            // } else {
            //     localStorage.clear()
            //     sessionStorage.clear()
            //     router.push(`/register/success?bearerToken=${newBearerToken}`)
            // }
            setSignInSpinner(false)
            localStorage.setItem(localStorageKeys?.loggedIn, true)
            props?.setLoggedIn(true)
            props?.setShowModal(false)
        } catch (error) {
            if (step) {
                try {
                        const secureTokenConfigurations = _tokenGenerationForPublicAPIs()
                        const URLCreateEnterprise = `${process.env.BACKEND_BASEURL}/console/v1/account/delete-configuration`
                        await CentralAPIHandler.handlePostRequest(URLCreateEnterprise, {
                            enterpriseId: enterpriseId,
                            teamId: teamId,
                            emailId: user?.emailId,
                            sSecret: secureTokenConfigurations.passPhrase,
                            sKey: secureTokenConfigurations.token,
                            step: step
                        })
                    
                } catch (error) {
                    throw Error(error)
                }
            }
            toast(error?.response?.data?.message || error?.message || "Something went wrong", { hideProgressBar: true, autoClose: 2000, type: "error", position: "bottom-center", pauseOnHover: true })
            setErrorMsg(error?.response?.data?.message || error?.message)
            localStorage.setItem(localStorageKeys?.loggedIn, false)
            props?.setLoggedIn(false)
            // dispatch(resetAuth())
        }
        setSignInSpinner(false)
    }

    const addDefaultBgTags = async (enterpriseId, prodCatId, queryProdCatId) => {
        try {
            const secureTokenConfigurations = _tokenGenerationForPublicAPIs()
            const createBgID = `${process.env.BACKEND_BASEURL}/console/v1/account/add-default-bg-tags`
            await CentralAPIHandler.handlePostRequest(createBgID, {
                enterpriseId: enterpriseId,
                prodCatId: prodCatId ?? queryProdCatId,
                sSecret: secureTokenConfigurations.passPhrase,
                sKey: secureTokenConfigurations.token
            })
        } catch (error) { }
    }

    const handleActiveCategoryTab = prodCatId => {
        try {
            let queryParams = new URLSearchParams(window.location.search)
            let prodCategory = queryParams.get("category_id")

            if (!prodCategory) {
                setActiveCategoryType(prodCatId)
                setEnterpriseDetails({ ...enterpriseDetails, category: prodCatIdMapping[prodCatId], category_id: prodCatId })
            } else {
                return
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getProductCategoryAndSource = () => {
        try {
            let queryParams = new URLSearchParams(window.location.search)
            let prodCatId = queryParams.get("category_id")
            let source = queryParams.get("pageSrc")
            let toolName = router.pathname.split('/')[1]
            if (!source) source = "ai_tools"
            setSignupSource(source)
            if (!prodCatId) {
                prodCatId = ['image-enhancer', 'image-upscaler', 'super-resolution'].includes(toolName) ? categories.ecommerce : categories.automobile
                setGenericLoginPage(true)
            }
            setActiveCategoryType(prodCatId)
            setEnterpriseDetails({ ...enterpriseDetails, category: prodCatIdMapping[prodCatId], category_id: prodCatId })
        } catch (error) {
            console.log(error)
        }
    }

    const closeLogin = () => {
        try {
            props?.setShowModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem(localStorageKeys?.DEVICEID) && localStorage.getItem(localStorageKeys?.AUTHKEY) && localStorage.getItem(localStorageKeys.DEFAULTBEARERTOKEN)) {
            try {
                let userEmail = JSON.parse(localStorage.getItem(localStorageKeys?.USERDETAILS)).emailId
                let defaultEnterprise = JSON.parse(localStorage.getItem(localStorageKeys?.defaultEnterprise)).enterpriseId

                const { skip: skipEnterpriseSelection, enterprise_id } = skipEnterpriseSelectionPage(userEmail, defaultEnterprise)
                // if (signupSource === "console") {
                //     if (skipEnterpriseSelection) {
                //         router.push({pathname: "/home", query: {"enterprise_id": enterprise_id}})
                //     } else {
                //         router.push("/enterprises")
                //     }
                // }
                refreshTokenAndUpdateRedux({ fastRefresh: false })
            } catch (error) {
                console.log(error)
            }
        }
        getProductCategoryAndSource()
    }, [])

    useEffect(() => {
        if (seconds > 0 && (loginType === LOGIN_TYPES?.OTP || LOGIN_TYPES?.FORGOT_EMAIL_LINK_SENT)) {
            const interval = setInterval(() => {
                setSeconds(seconds => seconds - 1)
            }, 1000)
            return () => clearInterval(interval)
        } else {
            setSeconds(`00`)
        }
    }, [seconds])

    useEffect(() => {
        setErrorMsg("")
        setSeconds(30)
        SignInComponents()
    }, [loginType])

    return (
        <SignInSignUpContext.Provider
            value={{
                handleLogin,
                handleEmailVerification,
                handleOTP,
                checkUserExists,
                handlePasswordLogin,
                updateAuthDetailsInRedux,
                getEmailId,
                handleCredentialResponse,
                formatInput,
                refreshTokenAndUpdateRedux,
                handleForgotPassword,
                mapGuestToActual,
                errorMsg,
                setErrorMsg,
                SignInSpinner,
                emailInputRef,
                seeData,
                setSeeData,
                user,
                setUser,
                resetPassword,
                resetEmailSent,
                setLoginType,
                loginType,
                handleEmailChange,
                seconds,
                setSeconds,
                useLoginTypeOTP,
                handleCreateEnterprise,
                handleChangeLoginState,
                googleStrategy,
                // handleForgot,
                handleLoginTypeEmail,
                activeCategoryType,
                setActiveCategoryType,
                handleActiveCategoryTab,
                userValidationInfo,
                teamSelectionData,
                setTeamSelectionData,
                selectedEnterprise,
                setSelectedEnterprise,
                enterpriseDetails,
                forceResendOtp,
                genericLoginPage,
                handlePhoneInput,
                signupSource,
                formErrors,
                validateInput,
                createEnterprise,
                setEnterpriseDetails,
                refreshTokenAndUpdateRedux,
                closeLogin,
                selectedRevenue, 
                setSelectedRevenue
            }}
        >
            <div className="w-full">{SignInComponents()}</div>
        </SignInSignUpContext.Provider>
    )
}
export default SignInSignUp
