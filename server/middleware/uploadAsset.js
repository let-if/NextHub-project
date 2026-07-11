const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/assets");

    },


    filename:(req,file,cb)=>{


        const uniqueName =
        Date.now()
        +
        "-"
        +
        file.originalname.replace(/\s+/g,"-");


        cb(null,uniqueName);

    }

});



const fileFilter=(req,file,cb)=>{


    const allowed = [

        ".jpg",
        ".jpeg",
        ".png",
        ".webp"

    ];


    const ext =
    path.extname(file.originalname)
    .toLowerCase();



    if(allowed.includes(ext)){


        cb(null,true);


    }
    else{


        cb(
            new Error(
                "Only jpg, jpeg, png and webp images allowed"
            )
        );


    }


};




const uploadAsset = multer({

    storage,

    fileFilter,

    limits:{

        fileSize:5*1024*1024

    }

});


module.exports = uploadAsset;