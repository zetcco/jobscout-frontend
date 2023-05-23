import { serverClient } from "features/authSlice"
import { setToastMessage } from "features/toastSlice";
import { useDispatch } from "react-redux";

export const useFetch = () => {
    const dispatch = useDispatch()
    return (async (url, reqType, { data = null, successMsg = null, errorMsg, onSuccess = () => {}, onError = () => {} }) => {
        try {
            let response;
            if (reqType === "POST")
                response = await serverClient.post(url, data)
            else if (reqType === "PUT")
                response = await serverClient.put(url, data)
            else if (reqType === "DELETE")
                response = await serverClient.delete(url, data)
            else if (reqType === "GET")
                response = await serverClient.get(url)
            else if (reqType === "PATCH")
                response = await serverClient.patch(url, data)
            
            if (successMsg)
                dispatch(setToastMessage({ severity: 'success', message: successMsg }))
            onSuccess(response.data)
            
        } catch (error) {
            console.log(error)
            dispatch(setToastMessage({ severity: 'error', message: errorMsg ? errorMsg : error.response.data.message }))
            onError(error)
        }
    })
}