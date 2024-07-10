import axios from 'axios'
import nProgress from 'nprogress'
const api = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`
const uploadImage = async (image) => {
    nProgress.start()
    const formData = new FormData()
    formData.append(`file`, image)
    formData.append(`upload_preset`, `e-commerce`)
    const res = await axios.post(api, formData)
    if (res) {
        nProgress.done()
        return res
    }
}

export default uploadImage