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


<h2>
Return Asset
</h2>


<p>

Are you sure this asset has been returned?

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

background:"rgba(0,0,0,.5)",

display:"flex",

alignItems:"center",

justifyContent:"center"

},



modal:{

background:"white",

padding:"30px",

borderRadius:"20px",

width:"400px"

},



buttons:{

display:"flex",

justifyContent:"flex-end",

gap:"15px"

},



cancel:{

padding:"12px 20px",

border:"none",

borderRadius:"10px"

},


return:{

background:"#f59e0b",

color:"white",

border:"none",

padding:"12px 20px",

borderRadius:"10px"

}


};



export default ReturnAssetModal;