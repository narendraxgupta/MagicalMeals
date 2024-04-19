const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let category = req.body.category
        cb(null, `./public/assets/img/menu/${category}`); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const itemimageupload = multer({ 
    storage: storage,
    fileFilter: function(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|avif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).single('image'); 

module.exports.managefilepath = async function (req,res,next){
   let filepath = req.file.path
    req.body.image = filepath.replace('public','')
    next()
}

module.exports.itemimageupload = itemimageupload

