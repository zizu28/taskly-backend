import jwt from 'jsonwebtoken'
import { Usermodel } from '../models/Usermodel.js';
import ImageUpload from '../controllers/CloudinaryController.js'

const protect = async (req, res, next) => {
    let token;
  
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await Usermodel.findById(decoded.id);
        next();
      } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
      }
    } else {
      res.status(401).json({ message: 'No token provided' });
    }
  };

const AddImage = async (req, res, next) => {
    try {
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'Image file not provided' })
        }
        const {data, mimetype} = req.files.image
        const Base64String = Buffer.from(data).toString('base64')
        const withPrefix =`data:${mimetype};base64,${Base64String}`
        const imageUrl = await ImageUpload(withPrefix)
        return res.status(200).json({status: 'Ok', imageUrl})
    } catch (error) {
        next({status: 500, error})
    }
}

export default { protect, AddImage }