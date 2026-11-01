import api from "../API/axios"

export const googleLogin = async (googleToken)=>{
    const res = await api.post("/auth/google",{
        token:googleToken
    });
    return res.data
};

export const getCurrentUser = async ()=>{
    try{
       const res = await api.get("/users/me"); 
    }
    catch(error){
        console.warn("Cannot fetch current User ", error?.message || error);
        return null;
    }

}