import API from "../api/axios";


// ========================================
// GET ALL DEPARTMENTS
// ========================================

export const getDepartments = async () => {

    const response = await API.get("/departments");

    return response.data;

};



// ========================================
// GET SINGLE DEPARTMENT
// ========================================

export const getDepartmentById = async (id) => {

    const response = await API.get(`/departments/${id}`);

    return response.data;

};



// ========================================
// CREATE DEPARTMENT
// ========================================

export const createDepartment = async (data) => {

    const response = await API.post(
        "/departments",
        data
    );

    return response.data;

};



// ========================================
// UPDATE DEPARTMENT
// ========================================

export const updateDepartment = async (id, data) => {

    const response = await API.put(
        `/departments/${id}`,
        data
    );

    return response.data;

};



// ========================================
// DELETE DEPARTMENT
// ========================================

export const deleteDepartment = async (id) => {

    const response = await API.delete(
        `/departments/${id}`
    );

    return response.data;

};
export const getDepartmentMembers = async(id)=>{


const response = await API.get(

`/departments/${id}/members`

);


return response.data;


};