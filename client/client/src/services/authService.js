
// import API from "../api/axios";
// import ENDPOINTS from "../api/endpoints";


// export const loginUser = async(data)=>{

//     const response =
//     await API.post(
//         ENDPOINTS.LOGIN,
//         data
//     );


//     return response.data;

// };
import API from "../api/axios";
import ENDPOINTS from "../api/endpoints";


// LOGIN USER

export const loginUser = async (data) => {

    const response = await API.post(
        ENDPOINTS.LOGIN,
        data
    );


    return response.data;

};