const multer  = require('multer');
const mkdirp  = require('mkdirp');

function makeDir(folder) {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate() + 1;
    return `./public/uploads/${folder}/${year}/${month}/${day}`;
}

const ImageStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let dir = makeDir('images');
        mkdirp(dir , err => cb(err , dir))
    },
    filename: (req , file , cb) => {
        let fileName = file.originalname.replace(/\s/g , "-");
        cb(null, Date.now() +  '-' + fileName );
    }
});
const imgFilter = (req , file , cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null , true)
    } else {
        cb(null , false)
    }
};
const uploadImg = multer({
    storage : ImageStorage,
    limits : {
        fileSize : 1024 * 1024 * 2
    },
    fileFilter : imgFilter
});

const FileStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let dir = makeDir('files');
        mkdirp(dir , err => cb(err , dir))
    },
    filename: (req , file , cb) => {
        let fileName = file.originalname.replace(/\s/g , "-");
        cb(null, Date.now() +  '-' + fileName );
    }
});
const voiceStorage = multer.diskStorage({
    destination : (req , file , cb) => {
        let dir = makeDir('chatFile');
        mkdirp(dir , err => cb(err , dir))
    },
    filename: (req , file , cb) => {
        let fileName = file.originalname.replace(/\s/g , "-");
        cb(null, Date.now() +  '-' + fileName +".wav");
    }
});
const fileFilter = (req , file , cb) => {
    if(file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "application/pdf") {
        cb(null , true)
    } else {
        cb(null , false)
    }
};
const voiceFilter = (req , file , cb) => {
    if(file.mimetype === "audio/webm" ) {
        cb(null , true)
    } else {
        cb(null , false)
    }
};
const uploadFile = multer({
    storage : FileStorage,
    limits : {
        fileSize : 1024 * 1024 * 30
    },
    fileFilter : fileFilter
});
const uploadVoice = multer({
    storage : voiceStorage,
    limits : {
        fileSize : 1024 * 1024 * 30
    },
    fileFilter : voiceFilter
});


module.exports = {
    uploadImg,
    uploadFile,
  uploadVoice
};