import { v2 as cloudinary } from 'cloudinary';

const {CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET} = process.env

// Configuration
cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET 
});

const ImageUpload = async imagePath => {
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true
    }

    try {
        const result = await cloudinary.uploader.upload(imagePath, options)
        return result.secure_url
    } catch (error) {
        console.error(error)
    }
}

export default ImageUpload