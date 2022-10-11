import multer from "multer"
import path from "path"

const __dirname=path.resolve()

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "./public/images"))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() +"."+ file.mimetype.split('/')[1])
    }
})

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

 