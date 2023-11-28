import cloudinary from "./CloudinaryUP";

export const uploadImage = async (imagePath: string) => {
    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
        use_filename: true,
        unique_filename: false,
        overwrite: true,
    };

    try {
        const result = await cloudinary.uploader.upload(imagePath, options);
        return result.public_id;
    } catch (error) {
        console.error(error);
    }
};


export const getAssetInfo = async (publicId: string) => {
    try {
        const result = await cloudinary.api.resource(publicId);
        return result.secure_url;
    } catch (error) {
        console.error(error);
    }
};