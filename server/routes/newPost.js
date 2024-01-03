import express  from "express";
import NewPost from '../controllers/newPost.js'
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const newName = Date.now() + path.extname(file.originalname);
        req.filename = newName;
      cb(null, newName);
    },
});

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 1024 * 1024 * 2,
  },
});



const router = express.Router();

router.post('/',upload.single('File'),NewPost);

export default router