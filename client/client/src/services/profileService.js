
import API from "../api/axios";


// ===============================
// GET PROFILE
// ===============================

export const getProfile = async()=>{


    const response = await API.get(
        "/auth/profile"
    );


    return response.data;

};




// ===============================
// UPDATE PROFILE IMAGE
// ===============================

export const updateProfileImage = async(file)=>{


    const formData = new FormData();


    formData.append(
        "profile_image",
        file
    );



    const response = await API.put(

        "/auth/profile/image",

        formData,

        {
            headers:{
                "Content-Type":"multipart/form-data"
            }
        }

    );


    return response.data;

};





// ===============================
// CHANGE PASSWORD
// ===============================

export const changePassword = async(data)=>{


    const response = await API.put(

        "/auth/profile/password",

        data

    );


    return response.data;

};