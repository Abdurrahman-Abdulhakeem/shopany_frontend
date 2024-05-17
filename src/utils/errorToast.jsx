import { toast } from 'react-toastify'

const errorToast = (msg) => {
 toast.error(`${msg}`, {
    position: 'top-right',
    autoClose: 2000,
    pauseOnHover: true,
    closeOnClick: true,
    hideProgressBar: true,
    draggable: true,
    // theme: 'colored',
    limit: 5
 })
}

export default errorToast