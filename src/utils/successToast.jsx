import { toast } from 'react-toastify'

const successToast = (msg) => {

    toast.success(`${msg}`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        limit: 5, 
        style: {
            backgroundColor: "royalblue",
        }
    })
}

export default successToast