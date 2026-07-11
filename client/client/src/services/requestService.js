import API from "../api/axios";
import ENDPOINTS from "../api/endpoints";



// ========================================
// CREATE REQUEST
// ========================================

export const createRequest = async(data)=>{


const response = await API.post(

ENDPOINTS.CREATE_REQUEST,

data

);


return response.data;


};






// ========================================
// GET MY REQUESTS
// ========================================

export const getMyRequests = async()=>{


const response = await API.get(

ENDPOINTS.MY_REQUESTS

);


return response.data;


};






// ========================================
// GET ALL REQUESTS
// ========================================

export const getAllRequests = async()=>{


const response = await API.get(

ENDPOINTS.REQUESTS

);


return response.data;


};






// ========================================
// GET DEPARTMENTS
// ========================================

export const getDepartments = async()=>{


const response = await API.get(

"/departments"

);


return response.data;


};