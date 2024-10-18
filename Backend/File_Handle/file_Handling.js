import multer from 'multer'
import path from 'path'

const Storage = multer.diskStorage({
  destination:'Uploads/Images',
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}_${path.parse(file.originalname).name}_${path.extname(file.originalname)}`);
  }
  
})

export default Storage
