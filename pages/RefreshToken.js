/**
 * this wrapper-component is responsible for 
 * refreshing auth token of a user
 * and,
 * update redux if and when it becomes empty
 */
import CentralAPIHandler from '@/components/centralAPIHandler/centralAPIHandler'
import { localStorageKeys,generateBearerToken,sessionStorageKeys } from '@/components/signInSignUp/config'
import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'


function RefreshToken(props) {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.authReducer)
    const commonReducer = useSelector((state) => state.commonReducer)


    // const updateAuthDetailsInRedux = (authDetails) => {
    //     try {
    //         dispatch(updateAuthProp([
    //             {'key': 'loginModalTrigger', 'value': false},
    //             {'key': 'loggedIn', 'value': true},
    //             { "key": "guestLogin", "value": false},
    //             {'key': 'authKey', 'value': authDetails?.authKey},
    //             {'key': 'userId', 'value': authDetails?.userData?.userId},
    //             {'key': 'emailId', 'value': authDetails?.userData?.emailId},
    //             {'key': 'userName', 'value': authDetails?.userData?.name},
    //             {'key': 'contact', 'value': authDetails?.userData?.contact},
    //             {'key': 'defaultEnterprise', 'value': authDetails?.defaultEnterprise},
    //             {'key': 'permissionObject', 'value': authDetails?.permissionObject},
    //         ]))
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // const updateEnterpriseTeamDetailsInRedux = (enterpriseData) => {
    //     try {
    //         let { enterprise_id, enterprise_name, category } = enterpriseData;
    //         let enterpriseReduxUpdateObj = {enterprise_id, enterprise_name, category}
    //         dispatch(updateEnterpriseTeamProperty([
    //             { 'key' : 'enterprise', value: enterpriseReduxUpdateObj }
    //         ]))
    //     } catch(error){

    //     }
    // }

    // const updateCommonReducerInRedux = (data) =>{
    //     try{
    //      const {variable ,isBoolean,  LeadFormFilled} = data
    //      dispatch(updateCommonReducerProp([
    //         {'key': 'variable', 'value': variable},
    //         {'key': 'isBoolean', 'value': isBoolean},
    //         { "key": "LeadFormFilled", "value": LeadFormFilled},
    //     ]))
    //     }catch(error){

    //     }
    // }

    const tokenRefreshPeriodically = async () => {
            try {
                const URL = `${process.env.BACKEND_BASEURL}/user-management/v1/user/refresh-token`
                const resp = await CentralAPIHandler.handlePostRequest(URL)
                localStorage.removeItem(localStorageKeys?.DEFAULTBEARERTOKEN)

                localStorage.setItem(localStorageKeys?.USERDETAILS, JSON.stringify(resp?.data?.userData))
                localStorage.setItem(localStorageKeys?.defaultEnterprise, JSON.stringify(resp?.data?.defaultEnterprise))
                localStorage.setItem(localStorageKeys?.permissionObject, JSON.stringify(resp?.data?.permissionObject))
                localStorage.setItem(localStorageKeys?.AUTHKEY, resp?.data?.authKey)
                // updateAuthDetailsInRedux(resp?.data)
                generateBearerToken({additionalPayload: {}})
            } catch(error) {
                console.log(error)

            }
    }
    const refreshTokenAndUpdateRedux = async ({fastRefresh=false}) => {
        try {
            let timeInterval = (process.env.minutesToRefresh || 15) * 60 * 1000 

            if(fastRefresh) await tokenRefreshPeriodically() 

            setInterval(async () => {
                try {
                    await tokenRefreshPeriodically()
                } catch(error) {
                    console.log(error)

                } 
            }, timeInterval)
    
        } catch (error) {
            console.log(error)
        }
    }

    // const setUserDetailsInRedux = () => {
    //     try {
    //             let userDetails = JSON.parse(localStorage.getItem(localStorageKeys.USERDETAILS))
    //             let authDetails = {
    //                 authKey: localStorageKeys.AUTHKEY,
    //                 userData: {
    //                     userId: userDetails.userId,
    //                     emailId: userDetails.emailId,
    //                     name: userDetails.name,
    //                     contact: userDetails.contact,
    //                 },
    //                 defaultEnterprise: null,
    //                 permissionObject: null
    //             }  
    //             if(localStorage.getItem(localStorageKeys.defaultEnterprise)) {
    //                 authDetails.defaultEnterprise = JSON.parse(localStorage.getItem(localStorageKeys.defaultEnterprise))
    //             }
    //             if(localStorage.getItem(localStorageKeys.permissionObject)) {
    //                 authDetails.permissionObject = JSON.parse(localStorage.getItem(localStorageKeys.permissionObject))
    //             }
    //             updateAuthDetailsInRedux(authDetails)
    //     } catch (error) {
            
    //     }
    // }
    // const setEnterpriseTeamDetailsInRedux = () => {
    //     try {
    //             let enterpriseDetails = JSON.parse(sessionStorage.getItem(sessionStorageKeys.selectedEnterprise))
    //             updateEnterpriseTeamDetailsInRedux(enterpriseDetails)
    //     }catch(error){
    //     }
    // }
    
    // const setCommonReducerDetailsInRedux = () => {
    //     try {
    //         let details = JSON.parse(sessionStorage.getItem(sessionStorageKeys.commonReducer))
    //         updateCommonReducerInRedux(details)
    //     } catch (error) {
    //     }
    // }
    
    useEffect(() => {
        // console.log(localStorage.getItem(localStorageKeys?.DEVICEID), localStorage.getItem(localStorageKeys?.AUTHKEY), !auth.loggedIn)
      if(localStorage.getItem(localStorageKeys?.DEVICEID) && localStorage.getItem(localStorageKeys?.AUTHKEY) && localStorage.getItem(localStorageKeys.DEFAULTBEARERTOKEN) && !localStorage.getItem(localStorageKeys?.loggedIn)) {
        //first update redux from localStorage
        let isFastRefreshReqd = true
        // if(localStorage.getItem(localStorageKeys.USERDETAILS)) {
        //     setUserDetailsInRedux()
        //     isFastRefreshReqd = false
        // }
        // if(sessionStorage.getItem(sessionStorageKeys.selectedEnterprise)) {
        //     setEnterpriseTeamDetailsInRedux()
        //     isFastRefreshReqd = false
        // }
        // if(sessionStorage.getItem(sessionStorageKeys.commonReducer)) {
        //     setCommonReducerDetailsInRedux()
        //     isFastRefreshReqd = false
        // }
        
        //if not found then
        refreshTokenAndUpdateRedux({fastRefresh: isFastRefreshReqd}) 


        //disable right-click 
        const handleContextMenu = (e) => {
            //prevent right-click menu from appearing
            e.preventDefault()
        }

        // attach the event listener to 
        // the document object
        document.addEventListener("contextmenu", handleContextMenu)

        // clean up the event listener when 
        // the component unmounts
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu)
        }
      }
    }, [])
    
  return (
    <>{props.children}</>
  )
}

export default RefreshToken