
import {
returnAsset
}
from "../../../services/assetService";

import {useState} from "react";


function ReturnAssetModal({

assetId,

close,

refresh

}){


const [loading,setLoading]=useState(false);



const submit=async()=>{


try{


setLoading(true);


await returnAsset(assetId);


refresh();

close();


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};






return(

<div style={styles.overlay}>


<div style={styles.modal}>


<div style={styles.iconBox}>

↩

</div>



<h2 style={styles.title}>

Return Asset

</h2>



<p style={styles.message}>

Are you sure this asset has been physically returned?

The asset status will be changed back to available.

</p>





<div style={styles.buttons}>


<button

onClick={close}

style={styles.cancel}

>

Cancel

</button>




<button

onClick={submit}

disabled={loading}

style={styles.return}

>


{

loading

?

"Returning..."

:

"Confirm Return"

}


</button>



</div>



</div>


</div>

);

}







const styles={



overlay:{


position:"fixed",

inset:0,

background:
"rgba(15,23,42,.65)",

backdropFilter:
"blur(8px)",

display:"flex",

alignItems:"center",

justifyContent:"center",

zIndex:3000,

padding:"20px"

},






modal:{


width:"430px",

maxWidth:"100%",

background:
"linear-gradient(145deg,#ffffff,#f8fafc)",

padding:"38px",

borderRadius:"32px",

textAlign:"center",

boxShadow:
"0 35px 90px rgba(15,23,42,.30)",

animation:
"modalShow .3s ease"

},






iconBox:{


width:"85px",

height:"85px",

borderRadius:"50%",


margin:"0 auto 20px",


display:"flex",

alignItems:"center",

justifyContent:"center",


fontSize:"40px",

color:"#ffffff",


background:
"linear-gradient(135deg,#f59e0b,#d97706)",


boxShadow:
"0 15px 35px rgba(245,158,11,.35)"

},







title:{


fontSize:"30px",

fontWeight:"850",

color:"#0f172a",

marginBottom:"12px"

},






message:{


fontSize:"16px",

lineHeight:"1.7",

color:"#64748b",

marginBottom:"32px"

},








buttons:{


display:"flex",

justifyContent:"center",

gap:"15px"

},






cancel:{


padding:"14px 28px",

borderRadius:"15px",

border:"1px solid #cbd5e1",

background:"#f8fafc",

color:"#475569",

fontWeight:"700",

cursor:"pointer",

transition:"all .25s ease"


},







return:{


padding:"14px 32px",

borderRadius:"15px",

border:"none",

background:
"linear-gradient(135deg,#f59e0b,#d97706)",

color:"#ffffff",

fontWeight:"800",

fontSize:"15px",

cursor:"pointer",

boxShadow:
"0 15px 30px rgba(245,158,11,.35)",

transition:"all .25s ease"

}




};



export default ReturnAssetModal;