const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


module.exports = {
    /**
     * @param imagePath - Image's Local Path
     * @returns {Object} Cloudinary Response 
     */
    upload: async function (imagePath) {
        return await cloudinary.uploader.upload(imagePath, {
            folder: 'products/'
        });
    },
    delete: async function (publicId) {
        try {
            return await cloudinary.uploader.destroy(publicId);
        }
        catch (e) {
            console.log(e)
        }
    }
}