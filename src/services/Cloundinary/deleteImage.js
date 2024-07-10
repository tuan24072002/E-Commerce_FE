import axios from 'axios'
import nProgress from 'nprogress'

const deleteImage = async (url) => {
    nProgress.start()
    const parts = url.split("/");
    const imageName = parts[parts.length - 1];
    const imageNameParts = imageName.split(".");
    const imageId = `e-commerce/${imageNameParts[0]}`;
    const formData = new FormData()
    formData.append(`public_id`, imageId)
    const res = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/resources/image/destroy`, formData)
    if (res) {
        nProgress.done()
        return res
    }
}

export default deleteImage