
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { getDepartments } from "../../services/requestService";


function AddAsset(){

const navigate = useNavigate();


const [loading,setLoading] = useState(false);

const [imagePreview,setImagePreview] = useState(null);

const [departments,setDepartments] = useState([]);

const [loadingDepartments,setLoadingDepartments] = useState(true);



const [form,setForm] = useState({

asset_code:"",
asset_name:"",
category:"",
department_id:"",
brand:"",
model:"",
serial_number:"",
purchase_date:"",
purchase_price:"",
condition_status:"Good",
description:""

});



const [image,setImage] = useState(null);





// LOAD DEPARTMENTS

useEffect(()=>{

loadDepartments();

},[]);




const loadDepartments = async()=>{

try{

const result = await getDepartments();


setDepartments(
result.departments || []
);


}
catch(error){

console.log(
"Department loading error:",
error
);

}
finally{

setLoadingDepartments(false);

}

};








const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};








const handleImage=(e)=>{


const file=e.target.files[0];


if(file){

setImage(file);


setImagePreview(
URL.createObjectURL(file)
);

}


};









const handleSubmit=async(e)=>{


e.preventDefault();


try{


setLoading(true);



const data=new FormData();



Object.keys(form).forEach(key=>{


data.append(

key,

form[key]

);


});





if(image){

data.append(

"asset_image",

image

);

}





await API.post(

"/assets",

data,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);



alert(
"Asset created successfully"
);



navigate("/assets");



}
catch(error){


console.log(error);


alert(

error.response?.data?.message ||

"Creating asset failed"

);


}
finally{


setLoading(false);


}



};










return(


<DashboardLayout>


<div style={styles.page}>


<div style={styles.header}>


<div>


<h1 style={styles.title}>

Add New Asset

</h1>


<p style={styles.subtitle}>

Register company equipment and resources

</p>


</div>



<button

onClick={()=>navigate("/assets")}

style={styles.back}

>

← Back

</button>



</div>








<form

onSubmit={handleSubmit}

style={styles.card}

>





{/* IMAGE */}


<div style={styles.section}>


<h2 style={styles.sectionTitle}>

Asset Image

</h2>




<label style={styles.uploadBox}>


{

imagePreview ?


<img

src={imagePreview}

alt="preview"

style={styles.preview}

/>


:


<div>


<div style={styles.uploadIcon}>

📷

</div>


<p>

Click to upload asset image

</p>


<small>

PNG, JPG up to 5MB

</small>


</div>


}



<input

type="file"

accept="image/*"

onChange={handleImage}

style={styles.file}

/>


</label>



</div>









{/* INFORMATION */}


<div style={styles.section}>


<h2 style={styles.sectionTitle}>

Asset Information

</h2>



<div style={styles.formGrid}>


<Input

label="Asset Code"

name="asset_code"

value={form.asset_code}

onChange={handleChange}

placeholder="Example: LAP-001"

required

/>



<Input

label="Asset Name"

name="asset_name"

value={form.asset_name}

onChange={handleChange}

placeholder="Dell Laptop"

required

/>



<Input

label="Category"

name="category"

value={form.category}

onChange={handleChange}

placeholder="Laptop"

required

/>





<div style={styles.field}>


<label>

Department

</label>



<select

name="department_id"

value={form.department_id}

onChange={handleChange}

style={styles.input}

required

>


<option value="">

Select Department

</option>



{

loadingDepartments ?


<option>

Loading departments...

</option>



:


departments.map((department)=>(


<option

key={department.id}

value={department.id}

>

{department.department_name}

</option>


))


}



</select>


</div>







<Input

label="Brand"

name="brand"

value={form.brand}

onChange={handleChange}

placeholder="Dell"

/>






<Input

label="Model"

name="model"

value={form.model}

onChange={handleChange}

placeholder="Latitude 7420"

/>






<Input

label="Serial Number"

name="serial_number"

value={form.serial_number}

onChange={handleChange}

placeholder="SN-12345"

/>






<Input

label="Purchase Date"

type="date"

name="purchase_date"

value={form.purchase_date}

onChange={handleChange}

/>







<Input

label="Purchase Price"

type="number"

name="purchase_price"

value={form.purchase_price}

onChange={handleChange}

placeholder="1500"

/>



</div>


</div>









{/* CONDITION */}


<div style={styles.section}>


<h2 style={styles.sectionTitle}>

Condition & Description

</h2>





<div style={styles.field}>


<label>

Condition

</label>



<select

name="condition_status"

value={form.condition_status}

onChange={handleChange}

style={styles.input}

>


<option>
Excellent
</option>


<option>
Good
</option>


<option>
Fair
</option>


<option>
Damaged
</option>


</select>



</div>






<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Write asset description..."

style={styles.textarea}

/>



</div>









<div style={styles.footer}>


<button

type="button"

onClick={()=>navigate("/assets")}

style={styles.cancel}

>

Cancel

</button>




<button

disabled={loading}

style={styles.submit}

>


{

loading ?

"Saving..."

:

"Save Asset"

}



</button>



</div>






</form>



</div>


</DashboardLayout>


);

}









function Input({

label,

...props

}){


return(

<div style={styles.field}>


<label>

{label}

</label>


<input

style={styles.input}

{...props}

/>


</div>


);

}









const styles={


page:{

width:"100%"

},



header:{

display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"30px"

},



title:{

fontSize:"32px",

margin:0,

color:"#0f172a"

},



subtitle:{

color:"#64748b"

},



back:{

background:"#e2e8f0",

border:"none",

padding:"12px 20px",

borderRadius:"10px",

cursor:"pointer",

fontWeight:"600"

},



card:{

background:"white",

borderRadius:"22px",

padding:"30px",

boxShadow:"0 15px 40px rgba(0,0,0,.08)"

},



section:{

marginBottom:"35px"

},



sectionTitle:{

fontSize:"20px",

marginBottom:"20px",

color:"#0f172a"

},



uploadBox:{

height:"220px",

border:"2px dashed #cbd5e1",

borderRadius:"18px",

display:"flex",

justifyContent:"center",

alignItems:"center",

textAlign:"center",

cursor:"pointer",

overflow:"hidden",

position:"relative"

},



file:{

position:"absolute",

width:"100%",

height:"100%",

opacity:0,

cursor:"pointer"

},



uploadIcon:{

fontSize:"50px"

},



preview:{

width:"100%",

height:"100%",

objectFit:"cover"

},



formGrid:{

display:"grid",

gridTemplateColumns:

"repeat(auto-fit,minmax(260px,1fr))",

gap:"20px"

},



field:{

display:"flex",

flexDirection:"column",

gap:"8px"

},



input:{

padding:"13px",

border:"1px solid #cbd5e1",

borderRadius:"12px",

fontSize:"15px",

outline:"none"

},



textarea:{

width:"100%",

height:"120px",

padding:"15px",

borderRadius:"12px",

border:"1px solid #cbd5e1",

resize:"none"

},



footer:{

display:"flex",

justifyContent:"flex-end",

gap:"15px"

},



cancel:{

padding:"13px 25px",

borderRadius:"12px",

border:"none",

background:"#e2e8f0",

cursor:"pointer"

},



submit:{

padding:"13px 30px",

borderRadius:"12px",

border:"none",

background:"#2563eb",

color:"white",

fontWeight:"600",

cursor:"pointer"

}


};



export default AddAsset;