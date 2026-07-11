
import API from "../api/axios";


export const getMembers = async(filters={})=>{


const response = await API.get("/members",{

params:filters

});


return response.data;


};