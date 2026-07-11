
import API from "../api/axios";


// GET ALL ASSETS
export const getAssets = async(filters)=>{

const response = await API.get("/assets",{
params:filters
});

return response.data;

};




// GET SINGLE ASSET
export const getAssetById = async(id)=>{

const response = await API.get(
`/assets/${id}`
);

return response.data;

};




// CREATE ASSET
export const createAsset = async(formData)=>{

const response = await API.post(
"/assets",
formData,
{
headers:{
"Content-Type":"multipart/form-data"
}
}
);

return response.data;

};




// UPDATE ASSET
export const updateAsset = async(id,formData)=>{

const response = await API.put(

`/assets/${id}`,

formData,

{
headers:{
"Content-Type":"multipart/form-data"
}
}

);


return response.data;

};



// ASSIGN ASSET

export const assignAsset = async(id,data)=>{


const response = await API.post(

`/assets/${id}/assign`,

data

);


return response.data;

};




// RETURN ASSET

export const returnAsset = async(id)=>{


const response = await API.post(

`/assets/${id}/return`

);


return response.data;

};




// GET ASSET HISTORY

export const getAssetHistory = async(id)=>{


const response = await API.get(

`/assets/${id}/history`

);


return response.data;

};




// GET EMPLOYEES

export const getEmployees = async()=>{


const response = await API.get(

"/assets/employees"

);


return response.data;

};

// DELETE ASSET
export const deleteAsset = async(id)=>{

const response = await API.delete(
`/assets/${id}`
);


return response.data;

};