import {useEffect,useState} from "react";

import {
useParams,
useNavigate
}
from "react-router-dom";


import DashboardLayout from "../../layouts/DashboardLayout";

import API from "../../api/axios";





function EditAsset(){


const {id}=useParams();

const navigate=useNavigate();



const [loading,setLoading]=useState(true);

const [saving,setSaving]=useState(false);


const [image,setImage]=useState(null);

const [preview,setPreview]=useState("");



const [form,setForm]=useState({

asset_name:"",
category:"",
brand:"",
model:"",
serial_number:"",
purchase_date:"",
purchase_price:"",
condition_status:"",
status:"",
description:""

});








useEffect(()=>{

loadAsset();

},[]);








const loadAsset=async()=>{


try{


const res =
await API.get(`/assets/${id}`);


const asset=res.data.asset;



setForm({

asset_name:asset.asset_name || "",

category:asset.category || "",

brand:asset.brand || "",

model:asset.model || "",

serial_number:asset.serial_number || "",

purchase_date:
asset.purchase_date || "",

purchase_price:
asset.purchase_price || "",

condition_status:
asset.condition_status || "",

status:
asset.status || "",

description:
asset.description || ""

});





if(asset.asset_image){

setPreview(

`http://localhost:5000/uploads/assets/${asset.asset_image}`

);

}



}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};










const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:
e.target.value

});


};









const handleImage=(e)=>{


const file=e.target.files[0];


if(file){


setImage(file);


setPreview(
URL.createObjectURL(file)
);


}


};










const submit=async(e)=>{


e.preventDefault();


try{


setSaving(true);



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





await API.put(

`/assets/${id}`,

data,

{

headers:{

"Content-Type":"multipart/form-data"

}

}

);





navigate(`/assets/${id}`);



}
catch(error){

console.log(error);

}
finally{

setSaving(false);

}


};










if(loading)

return(

<DashboardLayout>

<div style={styles.loading}>

Loading asset...

</div>

</DashboardLayout>

);









return(


<DashboardLayout>


<div style={styles.page}>


<div style={styles.header}>


<div>

<h1>

Edit Asset

</h1>


<p>

Update asset information

</p>


</div>


<button

style={styles.back}

onClick={()=>navigate(-1)}

>

← Back

</button>


</div>









<form

onSubmit={submit}

style={styles.card}

>






<div style={styles.imageSection}>


<div style={styles.previewBox}>


{

preview ?


<img

src={preview}

style={styles.image}

alt="preview"

/>


:

<div style={styles.placeholder}>

📦

</div>


}



</div>




<label style={styles.upload}>


Change Image


<input

type="file"

accept="image/*"

onChange={handleImage}

hidden

/>


</label>



</div>









<div style={styles.grid}>


<Input

label="Asset Name"

name="asset_name"

value={form.asset_name}

onChange={handleChange}

/>




<Select

label="Category"

name="category"

value={form.category}

onChange={handleChange}

options={[

"Laptop",

"Printer",

"Phone",

"Vehicle"

]}

/>





<Input

label="Brand"

name="brand"

value={form.brand}

onChange={handleChange}

/>




<Input

label="Model"

name="model"

value={form.model}

onChange={handleChange}

/>





<Input

label="Serial Number"

name="serial_number"

value={form.serial_number}

onChange={handleChange}

/>





<Input

type="date"

label="Purchase Date"

name="purchase_date"

value={form.purchase_date}

onChange={handleChange}

/>





<Input

type="number"

label="Purchase Price"

name="purchase_price"

value={form.purchase_price}

onChange={handleChange}

/>






<Select

label="Condition"

name="condition_status"

value={form.condition_status}

onChange={handleChange}

options={[

"Good",

"Fair",

"Damaged"

]}

/>





<Select

label="Status"

name="status"

value={form.status}

onChange={handleChange}

options={[

"Available",

"Assigned",

"Maintenance",

"Disposed"

]}

/>




</div>









<label>

Description

</label>


<textarea

name="description"

value={form.description}

onChange={handleChange}

style={styles.textarea}

/>








<button

disabled={saving}

style={styles.save}

>

{

saving

?

"Updating..."

:

"Update Asset"

}


</button>




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









function Select({

label,

options,

...props

}){


return(

<div style={styles.field}>


<label>

{label}

</label>


<select

style={styles.input}

{...props}

>


<option value="">

Select

</option>


{

options.map(item=>(

<option key={item}>

{item}

</option>

))

}


</select>


</div>

);


}






const styles={


page:{

width:"100%",

minHeight:"100vh",

animation:"pageEnter .6s ease"

},






/* ================= HEADER ================= */


header:{


display:"flex",

justifyContent:"space-between",

alignItems:"center",

marginBottom:"40px",

flexWrap:"wrap",

gap:"20px"


},



headerTitle:{


fontSize:"42px",

fontWeight:"950",

letterSpacing:"-1.5px",

background:
"linear-gradient(90deg,#020617,#2563eb,#06b6d4)",


WebkitBackgroundClip:"text",

WebkitTextFillColor:"transparent"


},



headerSubtitle:{


color:"#64748b",

fontSize:"16px",

fontWeight:"600"

},




/* ================= MAIN CARD ================= */


card:{


background:
"rgba(255,255,255,.75)",


backdropFilter:
"blur(30px)",


padding:"45px",


borderRadius:"40px",


border:
"1px solid rgba(255,255,255,.8)",


boxShadow:
"0 40px 100px rgba(15,23,42,.15)",


position:"relative",

overflow:"hidden"


},








/* ================= IMAGE SECTION ================= */



imageSection:{


display:"flex",

alignItems:"center",

gap:"35px",

marginBottom:"45px",

paddingBottom:"35px",

borderBottom:
"1px solid #e2e8f0",

flexWrap:"wrap"


},





previewBox:{


width:"220px",

height:"180px",


borderRadius:"35px",


overflow:"hidden",


background:
"linear-gradient(145deg,#f8fafc,#e2e8f0)",


border:
"3px solid #ffffff",


boxShadow:
"0 25px 60px rgba(15,23,42,.15)",


transition:
".4s"


},




image:{


width:"100%",

height:"100%",

objectFit:"cover"


},




placeholder:{


height:"100%",


display:"flex",

alignItems:"center",

justifyContent:"center",

fontSize:"80px"

},





upload:{


background:
"linear-gradient(135deg,#2563eb,#06b6d4)",


color:"#fff",


padding:"15px 30px",


borderRadius:"20px",


fontWeight:"900",


cursor:"pointer",


boxShadow:
"0 20px 45px rgba(37,99,235,.35)",


transition:".3s"


},







/* ================= FORM GRID ================= */



grid:{


display:"grid",

gridTemplateColumns:
"repeat(auto-fit,minmax(280px,1fr))",


gap:"28px"


},





field:{


display:"flex",


flexDirection:"column",


gap:"10px"


},





input:{


padding:"16px 18px",


borderRadius:"18px",


border:
"1px solid #cbd5e1",


background:"#ffffff",


fontSize:"15px",


fontWeight:"600",


outline:"none",


transition:".3s"


},







textarea:{


width:"100%",


height:"160px",


marginTop:"25px",


padding:"18px",


borderRadius:"22px",


border:
"1px solid #cbd5e1",


fontSize:"15px",


resize:"vertical",


outline:"none"


},







/* ================= SAVE BUTTON ================= */



save:{


marginTop:"35px",


width:"100%",


padding:"18px",


borderRadius:"22px",


border:"none",


background:
"linear-gradient(135deg,#16a34a,#22c55e)",


color:"#ffffff",


fontSize:"17px",


fontWeight:"950",


cursor:"pointer",


boxShadow:
"0 25px 60px rgba(22,163,74,.35)",


transition:".35s"


},







/* ================= BACK BUTTON ================= */


back:{


padding:"14px 25px",


borderRadius:"18px",


border:"none",


background:
"rgba(255,255,255,.8)",


fontWeight:"800",


cursor:"pointer",


boxShadow:
"0 15px 30px rgba(15,23,42,.08)",


transition:".3s"


},







/* ================= LOADING ================= */


loading:{


height:"400px",


background:
"rgba(255,255,255,.8)",


backdropFilter:
"blur(25px)",


borderRadius:"35px",


display:"flex",


alignItems:"center",


justifyContent:"center",


fontSize:"22px",


fontWeight:"800",


color:"#2563eb",


boxShadow:
"0 30px 80px rgba(15,23,42,.12)"


}



};





export default EditAsset;
