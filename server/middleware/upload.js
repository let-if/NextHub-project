const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

    destination:(req,file,cb)=>{

        cb(null,"uploads/");

    },


    filename:(req,file,cb)=>{


        const uniqueName =
        Date.now()
        +
        "-"
        +
        file.originalname;


        cb(null,uniqueName);

    }

});

const fileFilter=(req,file,cb)=>{


const allowedTypes=[

"image/jpeg",

"image/png",

"image/jpg",

"image/webp"

];


if(
allowedTypes.includes(file.mimetype)
){

cb(null,true);

}

else{

cb(
new Error(
"Only image files (jpg, jpeg, png, webp) are allowed"
)
);

}


};

// const fileFilter=(req,file,cb)=>{


//     const allowed = [
//         ".jpg",
//         ".jpeg",
//         ".png"
//     ];


//     const ext =
//     path.extname(file.originalname)
//     .toLowerCase();



//     if(allowed.includes(ext)){

//         cb(null,true);

//     }
//     else{

//         cb(
//             new Error(
//             "Only jpg and png allowed"
//             )
//         );

//     }


// };



const upload = multer({

storage,

fileFilter,

limits:{
    fileSize:5*1024*1024
}

});


module.exports = upload;