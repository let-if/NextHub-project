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

width:"100%"

},



header:{

display:"flex",

justifyContent:"space-between",

marginBottom:"30px"

},



card:{

background:"white",

padding:"35px",

borderRadius:"25px",

boxShadow:"0 15px 40px rgba(0,0,0,.08)"

},



imageSection:{

display:"flex",

alignItems:"center",

gap:"25px",

marginBottom:"30px"

},



previewBox:{

width:"180px",

height:"150px",

borderRadius:"20px",

overflow:"hidden",

background:"#f1f5f9"

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

fontSize:"60px"

},



upload:{

background:"#2563eb",

color:"white",

padding:"12px 20px",

borderRadius:"10px",

cursor:"pointer"

},



grid:{

display:"grid",

gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",

gap:"20px"

},



field:{

display:"flex",

flexDirection:"column",

gap:"8px"

},



input:{

padding:"12px",

borderRadius:"10px",

border:"1px solid #ddd"

},



textarea:{

width:"100%",

height:"120px",

marginTop:"15px",

padding:"15px",

borderRadius:"12px",

border:"1px solid #ddd"

},



save:{

marginTop:"25px",

background:"#16a34a",

color:"white",

padding:"14px 30px",

border:"none",

borderRadius:"12px",

fontWeight:"600",

cursor:"pointer"

},



back:{

padding:"12px 20px",

border:"none",

borderRadius:"10px",

cursor:"pointer"

},



loading:{

padding:"50px",

background:"white",

borderRadius:"20px",

textAlign:"center"

}


};



export default EditAsset;
// import {useEffect,useState} from "react";

// import DashboardLayout from "../../layouts/DashboardLayout";

// import {useNavigate,useParams} from "react-router-dom";

// import {
// getAssetById,
// updateAsset
// } from "../../services/assetService";



// function EditAsset(){


// const {id}=useParams();

// const navigate=useNavigate();


// const [loading,setLoading]=useState(true);

// const [image,setImage]=useState(null);



// const [form,setForm]=useState({

// asset_name:"",
// category:"",
// brand:"",
// model:"",
// serial_number:"",
// purchase_date:"",
// purchase_price:"",
// condition_status:"",
// status:"",
// description:""

// });





// useEffect(()=>{

// loadAsset();

// },[]);





// const loadAsset=async()=>{


// try{


// const data =
// await getAssetById(id);


// const a=data.asset;



// setForm({

// asset_name:a.asset_name || "",
// category:a.category || "",
// brand:a.brand || "",
// model:a.model || "",
// serial_number:a.serial_number || "",
// purchase_date:a.purchase_date || "",
// purchase_price:a.purchase_price || "",
// condition_status:a.condition_status || "",
// status:a.status || "",
// description:a.description || ""

// });


// }
// catch(error){

// console.log(error);

// }
// finally{

// setLoading(false);

// }


// };







// const handleChange=(e)=>{


// setForm({

// ...form,

// [e.target.name]:e.target.value

// });


// };







// const handleSubmit=async(e)=>{


// e.preventDefault();



// try{


// const data=new FormData();



// Object.keys(form).forEach(key=>{


// data.append(
// key,
// form[key]
// );


// });



// if(image){

// data.append(
// "asset_image",
// image
// );

// }



// await updateAsset(
// id,
// data
// );



// alert(
// "Asset updated successfully"
// );



// navigate(
// `/assets/${id}`
// );



// }
// catch(error){

// console.log(error);


// alert(
// "Update failed"
// );


// }



// };






// if(loading)

// return(

// <DashboardLayout>

// <div style={styles.loading}>
// Loading asset...
// </div>

// </DashboardLayout>

// );






// return(


// <DashboardLayout>


// <div style={styles.page}>


// <h1>
// Edit Asset
// </h1>



// <form

// onSubmit={handleSubmit}

// style={styles.card}

// >




// <input

// name="asset_name"

// value={form.asset_name}

// onChange={handleChange}

// placeholder="Asset Name"

// style={styles.input}

// />





// <input

// name="category"

// value={form.category}

// onChange={handleChange}

// placeholder="Category"

// style={styles.input}

// />






// <input

// name="brand"

// value={form.brand}

// onChange={handleChange}

// placeholder="Brand"

// style={styles.input}

// />







// <input

// name="model"

// value={form.model}

// onChange={handleChange}

// placeholder="Model"

// style={styles.input}

// />






// <input

// name="serial_number"

// value={form.serial_number}

// onChange={handleChange}

// placeholder="Serial Number"

// style={styles.input}

// />







// <input

// type="date"

// name="purchase_date"

// value={form.purchase_date?.slice(0,10)}

// onChange={handleChange}

// style={styles.input}

// />







// <input

// name="purchase_price"

// value={form.purchase_price}

// onChange={handleChange}

// placeholder="Purchase Price"

// style={styles.input}

// />








// <select

// name="condition_status"

// value={form.condition_status}

// onChange={handleChange}

// style={styles.input}

// >


// <option>
// Good
// </option>

// <option>
// Damaged
// </option>


// <option>
// Repair
// </option>


// </select>







// <select

// name="status"

// value={form.status}

// onChange={handleChange}

// style={styles.input}

// >


// <option>
// Available
// </option>

// <option>
// Assigned
// </option>

// <option>
// Maintenance
// </option>


// <option>
// Disposed
// </option>


// </select>







// <textarea

// name="description"

// value={form.description}

// onChange={handleChange}

// placeholder="Description"

// style={styles.textarea}

// />






// <input

// type="file"

// accept="image/*"

// onChange={(e)=>

// setImage(
// e.target.files[0]
// )

// }

// />







// <button

// style={styles.button}

// >

// Update Asset

// </button>






// </form>



// </div>


// </DashboardLayout>


// );


// }








// const styles={


// page:{
// width:"100%"
// },


// card:{

// background:"white",

// padding:"35px",

// borderRadius:"25px",

// boxShadow:"0 15px 35px rgba(0,0,0,.08)",

// display:"flex",

// flexDirection:"column",

// gap:"18px"

// },



// input:{


// padding:"14px",

// borderRadius:"12px",

// border:"1px solid #ddd",

// fontSize:"15px"

// },



// textarea:{


// padding:"14px",

// height:"120px",

// borderRadius:"12px",

// border:"1px solid #ddd"

// },




// button:{


// background:"#2563eb",

// color:"white",

// padding:"15px",

// border:"none",

// borderRadius:"12px",

// fontSize:"16px",

// fontWeight:"700",

// cursor:"pointer"


// },



// loading:{

// background:"white",

// padding:"50px",

// borderRadius:"20px",

// textAlign:"center"

// }



// };


// export default EditAsset;