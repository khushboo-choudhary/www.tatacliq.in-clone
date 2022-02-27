const path= require('path');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null,path.join(__dirname,'../uploads'));
    },
    filename: function (req, file, callback) {
      const uniquePrefix = Date.now() + Math.random().toString();
      callback(null, `${uniquePrefix}-${file.originalname}`)
    }
  });

  function fileFilter (req, file, callback) {

    if(file.mimetype === 'image/jpeg' || file.mimetype=== 'image/png'){
        callback(null, true)
    }else{
        callback(null, false)
      }
  }
  
  module.exports= multer({ storage, fileFilter, 
    limits:{
        fileSize: 1024*1024*30
  }
});