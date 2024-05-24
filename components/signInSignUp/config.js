/**
 * @format
 */
 import jwtDecode from "jwt-decode"
 import { googleLogout } from "@react-oauth/google"
 import ClevertapReact from "clevertap-react"
 import axios from "axios"
 import CentralAPIHandler from "../centralAPIHandler/centralAPIHandler"
 import { useRouter } from 'next/router';
 
 export const LOGIN_DATA = {
     welcomeHeading: "Let’s start your Cataloging Journey",
     subHeading: "Enter your Email to Login/Signup",
     forgetPassText: "Forgot Password",
     verifyOTP: "Verify OTP",
     resendOTP: "Resend OTP",
     orSeparatorText: "OR",
     dontHaveACNT: "Don’t have an account ?",
     signUp: "Sign up",
     logIn: "Log in to continue",
     passowrdLabel: "Password",
     loginLabel: "Email",
     resetMailSentText: "Password reset link sent to your email",
     alreadyHaveAccount: "Already have an account?",
     signUpWithEmail: "Sign up with Email",
     enterYourPass: "Enter Your Password",
     otpLabel: "Enter Code",
     otpHeading: "Verify your Email",
     otpSubHeading: "Please enter the verification code we’ve sent you on",
     logoImage: "https://spyne-static.s3.amazonaws.com/console/login/spyneBlackLogo.svg"
 }
 export const ENTER_EMAIL_DATA = {
     heading: "Your Image is Ready...",
     subHeading: "Enter your Email to continue"
 
 }
 export const RESET_PASSWORD_DATA = {
     videoUrl: "https://spyne-static.s3.amazonaws.com/console/blackCarGif.mp4",
     heading: "Reset Password",
     submitBtn: "Confirm",
     orSeparatorText: "OR",
     alreadyHaveAccount: "Already have an account? ",
     login: "Log in",
     fieldData: [
         {
             labelName: "",
             inputType: "email",
             placeholderText: "",
             disabled: true
         },
         {
             labelName: "Enter New Password",
             inputType: "password",
             placeholderText: ""
         },
         {
             labelName: "Confirm Password",
             inputType: "password",
             placeholderText: ""
         }
     ]
 }
 export const SET_PASSWORD_DATA = {
     videoUrl: "https://spyne-static.s3.amazonaws.com/console/home/car-gif.webm",
     heading: "Tell Us About Yourself",
     submitBtn: "Confirm",
     orSeparatorText: "OR",
     alreadyHaveAccount: "Already have an account? ",
     login: "Log in",
     fieldData: [
         {
             labelName: "Enter Your Email",
             inputType: "email",
             placeholderText: "",
             name: "emailId"
         },
         {
             labelName: "Enter Your Name",
             inputType: "text",
             placeholderText: "",
             name: "userName"
         },
         {
             labelName: "Enter New Password",
             inputType: "password",
             placeholderText: "",
             name: "password"
         },
         {
             labelName: "Confirm Password",
             inputType: "password",
             placeholderText: "",
             name: "password"
         }
     ]
 }
 
 export const icons = {
     email: "https://spyne-static.s3.amazonaws.com/console/login/email_grey.svg"
 }
 
 export const FORGET_PASSWORD_DATA = {
     heading: "Forgot Password",
     subHeading: "Password reset link will be sent to your email.",
     btnText: "Send Link",
     label: "Email",
     emailSentTitle: "Email Sent",
     emailSentDesc: "Check your email and open the link we sent to",
     gmailIcon: "https://spyne-static.s3.amazonaws.com/console/login/gmail.svg",
     outlookIcon: "https://spyne-static.s3.amazonaws.com/console/login/outlook.svg",
     gmailBtnText: "Open Gmail",
     outlookBtnText: "Open Outlook"
 }
 
 export const CREATE_ENTERPRISE_DATA = {
     heading: "Welcome",
     subHeading: "Let’s create your first enterprise",
     nameField: "Enter name",
     nameFieldLabel: "Name",
 
     companyNameField: "Enter company name",
     companyNameLabel: "Company / Enterprise Name",
     phoneLabel: "Phone",
     businessTypeHeading: "Choose your business type:",
     companyWebsiteField: 'Enter your website url',
     websiteUrlLabel: "Website URL",
     websiteUrl: "Enter your website URL",
     annualRevenueLabel: "Annual Revenue($)",
     businessTypeData: [
         {
             icon: "https://spyne-static.s3.amazonaws.com/console/login/automobile.svg",
             text: "Automobile",
             key: "cat_d8R14zUNE",
             alt: "Automobile icon",
             cols: "col-span-3"
         },
         {
             icon: "https://spyne-static.s3.amazonaws.com/console/login/e-comm.svg",
             text: "E-commerce",
             key: "cat_Ujt0kuFxY",
             alt: "e-commerce icon",
             cols: "col-span-3"
         },
         {
             icon: "https://spyne-static.s3.amazonaws.com/console/login/food.svg",
             text: "Food",
             key: "cat_Ujt0kuFxF",
             alt: "Food icon",
             cols: "col-span-2"
         }
     ]
 }
 
 export const categories = {
     "automobile": 'cat_d8R14zUNE',
     "ecommerce": 'cat_Ujt0kuFxY',
     "food": 'cat_Ujt0kuFxF'
 }
 
 export const prodCatIdMapping = {
     "cat_d8R14zUNE": 'Automobile',
     "cat_Ujt0kuFxY": 'E-commerce',
     "cat_Ujt0kuFxF": 'Food',
 }
 
 export const LOGIN_TYPES = {
     PASSWORD: "PASSWORD",
     GOOGLE: "GOOGLE",
     OTP: "OTP",
     EMAIL: "EMAIL",
     CREATE_ENTERPRISE: "create-enterprise",
     SELECT_ENTERPRISE: "select-enterprise",
     HOME: "home-page",
     FORGOT_PASSWORD: "forgot-password",
     FORGOT_EMAIL_LINK_SENT: "forgot-email-link-sent",
     SELECT_TEAM: "select-team"
 }
 
 export const localStorageKeys = {
     AUTHKEY: "authKey",
     DEVICEID: "deviceId",
     DEFAULTBEARERTOKEN: "defaultBearerToken",
     USERDETAILS: "userDetails",
     defaultEnterprise: "defaultEnterprise",
     permissionObject: "permissionObject",
     onBoardingDetails: "onboardingDetails",
     downloadPollingId: "downloadPollingId",
     downloadRecords: "downloadRecords",
     epConfig: "epConfig",
     reportImagesModal: "reportImagesModal",
     showWarningModal: "showWarningModal",
     guestLogin: "guestLogin",
     processCount: "processCount", //this is to keep track of images processed by a user (current_use_case: Guest-user-flow)
     src: "src", //this is to keep track if guest-flow is there or normal (will be removed after login if done from /login page)
     rememberChoiceVS: "rememberChoiceVS",
     VSProjectCount: "VSProjectCount",
     loggedIn: "loggedIn"
 }
 
 export const sessionStorageKeys = {
     TEAMID: "teamIds",
     selectedEnterprise: "selectedEnterprise",
     selectedTeam: "selectedTeam",
     enterpriseReasons: "enterpriseReasons",
     teamList: "teamList",
     usersList: "usersList",
     studioData: "studioData",
     enterpriseList: "enterpriseList",
     guestUserId: "guestUserId",
     skuProcessed: "skuProcessed",
     enterprisePlan: "enterprisePlan",
     enterpriseFeatures: "enterpriseFeatures",
     stepCreateEnterprise: "stepCreateEnterprise",
     activeTabInProjectsPage: "activeTabInProjectsPage",
     commonReducer: "commonReducer",
     previousState: "previousState",
     loggedIn: "loggedIn"
 }
 
 export const base64Decode = ({ payload = {}, decodeSrc = false }) => {
     try {
         let decodedToken = ""
         if (decodeSrc) {
             decodedToken = jwtDecode(payload?.credential)
         }
 
         return decodedToken
     } catch (error) {
         console.log(error)
     }
 }
 export const mailFormatRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
 
 export const validateFormFields = ({ formFields = {}, fromSignUp = false }) => {
     try {
         const errors = {}
         if (fromSignUp && !formFields.userName) {
             errors.userName = "User name is required for signup!"
         }
         if (fromSignUp && formFields.userName.length < 4) {
             errors.userName = "User name length cannot be less than 4 digits!"
         }
         if (!formFields.emailId) {
             errors.emailId = "Email is required!"
         } else if (!mailFormatRegEx.test(formFields?.emailId)) {
             errors.emailId = "Please enter a valid email address"
         }
         if (!formFields.contactNo) {
             errors.contactNo = "Contact no is required!"
         }
         if (!formFields.password) {
             errors.password = "Password is required"
         } else if (formFields?.password?.length < 4) {
             errors.password = "Password must be more than 4 characters"
         } else if (formFields.password?.length > 25) {
             errors.password = `Password can't exceed 25 characters`
         }
         if (!formFields?.confirmPassword) {
             errors.confirmPassword = `Confirm Password is required!`
         } else if (formFields?.confirmPassword !== formFields.password) {
             errors.confirmPassword = `Password not matching`
         }
         return errors
     } catch (error) { }
 }
 
 export function generateBearerToken({ additionalPayload = {} }, createEnterpriseSignUp = false, team_id, enterprise_id) {
     try {
         let bearerToken = localStorage.getItem(localStorageKeys?.DEFAULTBEARERTOKEN)
         let enterpriseId = enterprise_id ? enterprise_id : localStorage.getItem(localStorageKeys?.defaultEnterprise) ? JSON.parse(localStorage.getItem(localStorageKeys?.defaultEnterprise))?.enterpriseId : ''
         // enterpriseId =enterpriseId? :null;
         let teamId = team_id ? team_id : sessionStorage.getItem(sessionStorageKeys?.selectedTeam) ? JSON.parse(sessionStorage.getItem(sessionStorageKeys?.selectedTeam))?.team_id : ''
         // teamId = teamId ? JSON.parse(teamId)?.team_id :''
 
         if (!localStorage.getItem(localStorageKeys?.DEFAULTBEARERTOKEN) || createEnterpriseSignUp) {
             if (localStorage.getItem(localStorageKeys?.AUTHKEY) && localStorage.getItem(localStorageKeys?.DEVICEID)) {
                 let defaultPayload = {
                     authKey: localStorage.getItem(localStorageKeys?.AUTHKEY),
                     deviceId: localStorage.getItem(localStorageKeys?.DEVICEID)
                 }
 
                 enterpriseId ? (defaultPayload["enterprise_id"] = enterpriseId) : null
                 teamId ? (defaultPayload["team_id"] = teamId) : null
 
                 let finalPayload = {}
                 if (Object.keys(additionalPayload).length > 0) {
                     finalPayload = { ...additionalPayload, ...defaultPayload }
                 } else {
                     finalPayload = { ...defaultPayload }
                 }
                 let token = base64Payload({ payload: finalPayload })
                 bearerToken = `Bearer ${token}`
 
                 localStorage.setItem(localStorageKeys?.DEFAULTBEARERTOKEN, bearerToken)
             } else if (localStorage.getItem(localStorageKeys?.DEVICEID)) {
                 // let token = base64Payload({ payload: additionalPayload.authorization})
                 let token = base64Payload({ payload: additionalPayload })
                 bearerToken = `Bearer ${token}`
             }
         }
         return bearerToken
     } catch (error) {
 
     }
 }
 
 export const skipEnterpriseSelectionPage = (userEmail, defaultEnterpriseId) => {
     try {
         let domain = defaultEnterprise?.domain,
             skip = false
         const spyneEnterpriseId = defaultEnterprise?.enterpriseID
         const domainPattern = new RegExp(`@${domain}$`, "i")
 
         if (domainPattern.test(userEmail) && defaultEnterpriseId === spyneEnterpriseId) {
             skip = true
             return { skip, enterprise_id: spyneEnterpriseId }
         } else if (defaultEnterpriseId) {
             skip = true
             return { skip, enterprise_id: defaultEnterpriseId }
         }
         return { skip }
     } catch (error) {
         console.log(error)
     }
 }
 
 export const newBearerAfterGuestLoginFalse = async authKey => {
     try {
         let auth_key = authKey || localStorage.getItem(localStorageKeys?.AUTHKEY)
         if (auth_key && localStorage.getItem(localStorageKeys?.DEVICEID)) {
             let defaultPayload = {
                 authKey: localStorage.getItem(localStorageKeys?.AUTHKEY),
                 deviceId: localStorage.getItem(localStorageKeys?.DEVICEID)
             }
 
             let token = base64Payload({ payload: defaultPayload })
             let bearerToken = `Bearer ${token}`
 
             localStorage.setItem(localStorageKeys?.DEFAULTBEARERTOKEN, bearerToken)
         }
     } catch (error) {
         // console.log(error)
     }
 }
 
 export const newHubspotReport = async(payload) => {
     try {
         let formId = "32689ebe-fae5-4c3c-b65f-36e8915c2d22"
         const portalId = "7333835"
 
         // Default form id is set to AI Tools Ecommerce form
         let formGuid = "33166fb1-3218-4c98-aebe-cc6d66c82722"; // Default formGuid
 
         // Form id set to AI Tools Automobile for auto-related tools
         const pathname = window.location.pathname;
         if (pathname.startsWith("/car-background-removal") || (pathname.startsWith("/number-plate-blur")) || (pathname.startsWith("/car-background-replacement"))) {
             formGuid = "79cb18c6-1cce-4237-ab49-f6654602719c";
             console.log('auto ka form hai', pathname);
         }
 
         let hubspotSignupFormUrl = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`
 
         let data = {
             fields: await getFieldData(payload)
         }
         axios
             .post(hubspotSignupFormUrl, data)
             .then(() => {
                 return "Success"
             })
             .catch(() => {
                 return "Failed"
             })
     } catch (error) {
         console.log(error)
     }
 }
 const getFieldData = (payload) => {
     let fields = [];
     if (payload?.name) {
         fields.push({
             objectTypeId: "0-1",
             name: "firstname",
             value: payload?.name
         })
     }
     if (payload?.email) {
         fields.push({
             objectTypeId: "0-1",
             name: "email",
             value: payload?.email
         })
     }
     if (payload?.phone) {
         fields.push({
             objectTypeId: "0-1",
             name: "phone",
             value: payload?.phone
         })
     }
     if (payload?.company) {
         fields.push({
             objectTypeId: "0-1",
             name: "company",
             value: payload?.company
         })
     }
 
     if (payload?.toolName) {
         fields.push({
             objectTypeId: "0-1",
             name: "Tool-Name",
             value: payload?.toolName
         })
     }
     
     if (payload?.website_link) {
         fields.push({
             objectTypeId: "0-1",
             name: "website_link",
             value: payload?.website_link
         })
     }
     if (payload?.otpVerify) {
        fields.push({
            objectTypeId: "0-1",
            name: "otp-verified",
            value: payload?.otpVerify
        })
    }
     if (payload?.annual_revenue) {
         fields.push({
             objectTypeId: "0-1",
             name: "annual_revenue",
             value: payload?.annual_revenue
         })
     }
     return fields
 }
 export const guestEnterprise = {
     enterpriseID: "72bb92735",
     teamId: "8cc4c88c71",
     prodCatAuto: "cat_d8R14zUNE",
     guestUserId: "g24rf7w5",
     guestBearerToken: "Bearer eyJkZXZpY2VJZCI6IjIwYzk5ZGMzODNjNjI0YjAyYTVhYzcxODU0YTdhYjg0IiwiYXV0aEtleSI6IjM3YzJjM2FkLTc4OGMtNDU2OC1hNjE5LTNhZjUxNDU1MDc1OCJ9"
 }
 
 export const defaultEnterprise = {
     domain: "spyne.ai",
     enterpriseID: "TaD1VC1Ko",
     teamId: "tagdsb12",
     prodCatAuto: "cat_d8R14zUNE"
 }
 
 export const validateCreateEnterpriseForm = ({ formFields = {}, fromSignUp = false,categoryId,prodCatId,selectedRevenue = ""}) => {  //latest signup flow
     try {
         const error = {}
         console.log(formFields)
         if (!formFields?.enterprise_name) {
             error.enterprise_name = `Enterprise name is required!`
         }
         if (!formFields?.owner_name) {
             error.owner_name = "Owner name is required for signup!"
         }
         if (!formFields?.owner_phone) {
             error.owner_phone = "Phone number is required!"
         }
         if((categoryId && categoryId !== "cat_d8R14zUNE") || (prodCatId && prodCatId !== "cat_d8R14zUNE")){
            if(!formFields?.website_link.length){
                error.website_link = "Website URL is required!"
            }
        }
        if ((categoryId && categoryId !== "cat_d8R14zUNE") || (prodCatId && prodCatId !== "cat_d8R14zUNE")) {
            if (formFields?.website_link.length > 0 && !validateDotWithCharacters(formFields?.website_link)) {
                error.website_link = "Enter a valid Website URL!"
            }
        }
        if((categoryId && categoryId !== "cat_d8R14zUNE")  && selectedRevenue && (selectedRevenue === SELECT_DROPDOWN_REVENUE[0]?.value)){
            error.revenue = 'Please select a value'
        }
         return error
     } catch (error) {
     }
 }
 
 export const logoutFromBackend = async (deviceId, globalLogout = false) => {
     try {
         let deviceList = [deviceId]
         const URL = `${process.env.BACKEND_BASEURL}/user-management/v1/user/logout`
         const resp = await CentralAPIHandler.handlePostRequest(URL, {
             deviceIdList: deviceList,
             "isLogOutFromAllDevices": globalLogout
         })
         ClevertapReact.logout()
         localStorage.setItem(localStorageKeys?.loggedIn, false)
     } catch (error) {
     }
 }
 
 export async function Logout({ skipBackendLogout = true }) {
     try {
         let deviceId = ""
         if (localStorage.getItem(localStorageKeys?.DEVICEID)) {
             deviceId = localStorage.getItem(localStorageKeys?.DEVICEID)
         }
         googleLogout()
         if (!skipBackendLogout) await logoutFromBackend(deviceId)
     } catch (error) {
     } finally {
         let rememberChoiceVS = localStorage.getItem(localStorageKeys?.rememberChoiceVS) ? JSON.parse(localStorage.getItem(localStorageKeys?.rememberChoiceVS)) : false
         let tempProjectCount = localStorage.getItem(localStorageKeys?.VSProjectCount) ? localStorage.getItem(localStorageKeys?.VSProjectCount) : []
         localStorage.clear()
         localStorage.setItem(localStorageKeys?.rememberChoiceVS, rememberChoiceVS) //this should not be cleared
         localStorage.setItem(localStorageKeys?.VSProjectCount, tempProjectCount)
         sessionStorage.clear()
 
     }
 }
 
 
 export const redirectLinks = {
     upgradeRedirectUrl: `https://share.hsforms.com/1PQ9ixMRdRUaluQPUnAiNlg4d6tn`,
     policyLinkurl: `https://www.spyne.ai/privacy`,
     cookieLikUrl: `https://www.spyne.ai/cookie-policy`,
     termsServiceUrl: "https://www.spyne.ai/terms-service"
 }
 
 export const openInbox = (e, client = 'GMAIL') => {
     e.preventDefault()
     e.stopPropagation()
     try {
         if (client === 'OUTLOOK') {
             window.open('https://outlook.live.com/mail/0/', '_blank')
         } else {
             let path = 'https://mail.google.com/mail/u/0/#advanced-search/subset=ast&has=spyne&within=1d&sizeoperator=s_sl&sizeunit=s_smb&query=in%3Aanywhere+spyne'
             window.open(path, '_blank')
             //router.push(path)
         }
     } catch (error) {
         console.log(error)
     }
 }
 
 export const SIGNUP_DATA = {
     welcomeHeading: 'Tell Us About Yourself',
     orSeparatorText: 'OR',
     dontHaveACNT: 'Already have an account? ',
     logIn: 'Log In',
     email: 'Email *',
     nameText: 'Full Name *',
     createPassText: 'Password',
     confirmPassText: 'Confirm Password',
     enterOtp: 'Enter OTP *',
     heading: 'Verify your Email',
     subHeading: 'Please enter the verification code we’ve sent you on',
     changeText: 'change',
     resendOtp: 'Resend',
     contactNo: 'Contact No *',
 
     createEnterprise: 'Create Enterprise',
     companyName: 'Company Name *',
     teamName: 'Default Team Name *',
     roleName: 'Company Type *',
     createBtn: 'Create',
     country: 'Country',
     url: 'Website URL '
 }
 export const TOOL_NAME = {
     'car-background-removal': 'carBackgroundRemoval',
     'car-background-replacement': 'carBackgroundReplacement',
     'number-plate-blur': 'numberPlateBlur',
     'image-enhancer': 'imageEnhancer',
     'image-upscaler': 'imageUpscaler',
     'image-enlarger': 'imageEnlarger',
     'photo-restoration': 'photoRestoration',
     'background-remover': 'backgroundRemover',
     'image-background-remover': 'imageBackgroundRemover',
     'image-deblurrer': 'imageDeblurrer',
     'product-background-remover': 'productBackgroundRemover'
 
 }
 export const base64Payload = ({ payload = {} }) => {
     try {
         let encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64")
         return encodedPayload
     } catch (error) {
         console.log(error)
     }
 }
 export const getToolName = (pathname) => {
     if (pathname.includes('car-background-removal')) {
         return TOOL_NAME["car-background-removal"]
     }
     if (pathname.includes('car-background-replacement')) {
         return TOOL_NAME["car-background-replacement"]
     }
     if (pathname.includes('number-plate-blur')) {
         return TOOL_NAME["number-plate-blur"]
     }
     if (pathname.includes('image-enhancer')) {
         return TOOL_NAME["image-enhancer"]
     }
     if (pathname.includes('image-upscaler')) {
         return TOOL_NAME["image-upscaler"]
     }
     if (pathname.includes('super-resolution')) {
         return TOOL_NAME["super-resolution"]
     }
     if (pathname.includes('image-enlarger')) {
         return TOOL_NAME["image-enlarger"]
     }
     if (pathname.includes('photo-restoration')) {
         return TOOL_NAME["photo-restoration"]
     }
     if (pathname.includes('background-remover')) {
         return TOOL_NAME["background-remover"]
     }
     if (pathname.includes('image-background-remover')) {
         return TOOL_NAME["image-background-remover"]
     }
     if (pathname.includes('image-deblurrer')) {
         return TOOL_NAME["image-deblurrer"]
     }
     if (pathname.includes('product-background-remover')) {
         return TOOL_NAME["product-background-remover"]
     }
     return 'none'
 }

 export const validateDotWithCharacters = (inputString) => {
    let pattern = /^[a-zA-Z0-9]+[.][a-zA-Z0-9]+$/;
    return pattern.test(inputString);
  }

  export const SELECT_DROPDOWN_REVENUE = [
    {
        label: 'Select Annual Revenue',
        value: 'Select Annual Revenue',
        hidden: true
    },
    {
        label: '<50K',
        value: '<50K',
    },
    {
        label: '50K-200K',
        value: '50K-200K',
    },
    {
        label: '200K-500K',
        value: '200K-500K',
    },
    {
        label: '500K-1M',
        value: '500K-1M',
    },
    {
        label: '>1M',
        value: '>1M',
    },
  
  ]
 
 