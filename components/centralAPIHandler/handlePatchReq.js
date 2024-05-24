import axios from "axios";
import { Logout, generateBearerToken } from "../signInSignUp/config";

export const handlePatchRequest = (URL, callParams, headers = {}, cancelToken = axios.CancelToken.source()) => {
    let bearerToken = ''    
    bearerToken = generateBearerToken({additionalPayload: headers})

    axios.interceptors.response.use((response) => {
        return response;
    }, async function (error) {
        if (error && (error.response?.status === 401)) {
            await Logout({skipBackendLogout:true})

        }
        return Promise.reject(error);
    });

    let handlePatchPromise = new Promise((resolve, reject) => {
        axios({
            method: 'PATCH',
            url: URL,
            params: callParams ? { ...callParams } : {},
            headers : { authorization: bearerToken},
            cancelToken: cancelToken.token
        }).then(res => {
            if(res?.data?.error) {
                reject(res?.message || 'unknown error occurred')
            } else {
                resolve(res?.data)
            }
        }).catch(err => {
            if(err?.response?.data?.problems) {
                return reject({message: 'Either not a valid permission or missing input params'})
            }
            reject(err);
        })
    });

    return handlePatchPromise;

}

