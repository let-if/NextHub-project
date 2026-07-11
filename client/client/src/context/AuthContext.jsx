
import {
    createContext,
    useState,
    useEffect
} from "react";


import API from "../api/axios";


const AuthContext=createContext();



export const AuthProvider=({children})=>{


const [user,setUser]=useState(null);

const [loading,setLoading]=useState(true);



useEffect(()=>{


const checkUser=async()=>{


const token=localStorage.getItem("token");



if(!token){

    setLoading(false);

    return;

}



try{


const response=await API.get(
    "/auth/profile",
    {
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
);



setUser(
    response.data.user
);



localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
);



}
catch(error){


console.log(
"Authentication expired"
);



localStorage.removeItem(
    "token"
);


localStorage.removeItem(
    "user"
);



setUser(null);



}
finally{

setLoading(false);

}



};



checkUser();



},[]);





const login=(data)=>{


localStorage.setItem(
    "token",
    data.token
);



localStorage.setItem(
    "user",
    JSON.stringify(data.user)
);



setUser(
    data.user
);



};





const logout=()=>{


localStorage.removeItem(
    "token"
);


localStorage.removeItem(
    "user"
);



setUser(null);



};





return(

<AuthContext.Provider

value={{

user,

login,

logout,

loading

}}

>

{children}

</AuthContext.Provider>

);


};



export default AuthContext;