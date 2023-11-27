import { UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';

interface Opts { overwrite: boolean; invalidate: boolean; resource_type: "auto" }


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});


export const cloudinaryDeleteImg = async (fileToDelete: string) => {
    return new Promise((resolve) => {

        cloudinary.uploader.destroy(fileToDelete, (error, result) => {
            console.log('result :: ', result);
            resolve({
                url: result.secure_url,
                asset_id: result.asset_id,
                public_id: result.public_id,
            })
        })
    })
}


export default cloudinary