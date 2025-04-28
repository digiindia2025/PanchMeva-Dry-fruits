const cloudnary = require("cloudinary").v2

cloudnary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECKRET
})


const uploadImage = async (file) => {
    try {
        const imageurl = await cloudnary.uploader.upload(file)
        return imageurl.secure_url
    } catch (error) {
        console.log(error)
    }
}


const deleteImage = async (imageUrl) => {
    try {
        const publicId = imageUrl.split("/").pop().split(".")[0];
        await cloudnary.uploader.destroy(publicId);
        console.log(`Image deleted successfully: ${publicId}`);
    } catch (error) {
        console.error("Failed to delete image from Cloudinary:", error);
    }
};


module.exports = {
    uploadImage, deleteImage
}