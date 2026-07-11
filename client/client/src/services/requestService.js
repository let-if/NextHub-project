
import API from "../api/axios";


// =================================
// CREATE REQUEST
// =================================

export async function createRequest(data){

    const response = await API.post(
        "/requests",
        data
    );

    return response.data;

}



// =================================
// GET MY REQUESTS
// =================================

export async function getMyRequests(){

    const response = await API.get(
        "/requests/my"
    );

    return response.data;

}



// =================================
// GET ALL REQUESTS
// =================================

export async function getAllRequests(){

    const response = await API.get(
        "/requests"
    );

    return response.data;

}



// =================================
// GET SINGLE REQUEST
// =================================

export async function getRequestById(id){

    const response = await API.get(
        `/requests/${id}`
    );

    return response.data;

}



// =================================
// UPDATE REQUEST
// =================================

export async function updateRequest(
    id,
    data
){

    const response = await API.put(
        `/requests/${id}`,
        data
    );


    return response.data;

}



// =================================
// DELETE REQUEST
// =================================

export async function deleteRequest(id){

    const response = await API.delete(
        `/requests/${id}`
    );


    return response.data;

}



// =================================
// ASSIGN REQUEST
// =================================

export async function assignRequest(
    id,
    data
){

    const response = await API.put(
        `/requests/${id}/assign`,
        data
    );


    return response.data;

}



// =================================
// UPDATE STATUS
// =================================

export async function updateRequestStatus(
    id,
    status
){

    const response = await API.put(
        `/requests/${id}/status`,
        {
            status
        }
    );


    return response.data;

}




// =================================
// GET DEPARTMENTS
// =================================

export async function getDepartments(){

    const response = await API.get(
        "/departments"
    );


    return response.data;

}