import {useMutation} from "@tanstack/react-query"
import { googleLogin } from "../Services/authServices"

export const useGoogleLogin = () =>{
    return useMutation({
        mutationFn:googleLogin,

        onSuccess:(data)=>{
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("newConvo",true);
            localStorage.setItem("session_id",0);
        },
        onError:(error)=>{
            console.error("Google Login Failed", error.response?.data?.detail || error.message)
        }
    })
}