import React, { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid';
import MD5 from 'crypto-js/md5';
import { localStorageKeys,sessionStorageKeys, guestEnterprise } from '@/components/signInSignUp/config';


function AppWrapper(props) {
    // const [guestBearer, setGuestBearer] = useState("")

    const generateUniqueDeviceId = () => {
        try {
            let uniqueId = uuid();
            let symbolsArr = ['@', '#', '$', '%']
            const uniqueSymbols = Math.floor(Math.random() * symbolsArr.length)
            const mySecretKey = "b82f68f96f478eb98654423363dc0f67"
            const deviceId = `${uniqueId}_${symbolsArr[uniqueSymbols]}_${mySecretKey}`

            return MD5(deviceId).toString()
        } catch (error) {
            console.log(error)
        }
    }

    const storeDeviceId = (uniqueDeviceId) => {
        try {
            localStorage.setItem(localStorageKeys?.DEVICEID, uniqueDeviceId)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (localStorage.getItem(localStorageKeys?.DEVICEID)) {
            // fetchGuestUserDetails()
            return
        }
        storeDeviceId(generateUniqueDeviceId())
    }, [])

    useEffect(() => {
        let guestLogin = localStorage.getItem(localStorageKeys?.guestLogin) ? JSON.parse(localStorage.getItem(localStorageKeys?.guestLogin)) : false
        if(localStorage.getItem(localStorageKeys?.DEFAULTBEARERTOKEN) 
            && localStorage.getItem(localStorageKeys?.AUTHKEY) 
            && localStorage.getItem(localStorageKeys?.DEVICEID)
            // && !guestLogin
        ) {
            return
        }
        let guestBearer = `${guestEnterprise?.guestBearerToken}`
        localStorage.setItem(localStorageKeys?.DEFAULTBEARERTOKEN, guestBearer)
        sessionStorage.setItem(sessionStorageKeys?.guestUserId, guestEnterprise?.guestUserId)
        localStorage.setItem(localStorageKeys?.guestLogin, true)
        localStorage.setItem(localStorageKeys?.processCount, 0) //image process
        localStorage.setItem(localStorageKeys?.src, 'guest')
    }, [])

    return (
        <>{props.children}</>
    )
}

export default AppWrapper