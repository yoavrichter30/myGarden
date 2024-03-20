import express from "express";
import multer from "multer";

// const base = "http://" + process.env.DOMAIN_BASE + ":" + process.env.PORT + "/";
const base = process.env.NODE_ENV !== 'PRODUCTION' ? "http://localhost:8080/" : "https://10.10.248.182:443/";
const filesLocation = process.env.NODE_ENV !== 'PRODUCTION' ? 'public/' : '../public'
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/')
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
            .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
            .slice(1)
            .join('.')
        cb(null, Date.now() + "." + ext)
    }
})
const upload = multer({ storage: storage });

router.post('/', upload.single("file"), function (req, res) {
    console.log(`router.post(/file: ${base}${req.file!.path})`)
    res.status(200).send({ url: base + req.file!.path })
});

export default router;
