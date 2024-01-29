import { toast } from "react-hot-toast";

export default function showToast(message, duration = 3000, position = "bottom-right", type = "default") {

    if (type === "error") {
        errorToast(message, duration, position);
    } else if (type === "success") {
        successToast(message, duration, position);
    } else {
        defaultToast(message, duration, position);
    }
}

const errorToast = (message, duration, position) => toast.error(message, { duration, position });

const successToast = (message, duration, position) => toast.success(message, { duration, position });

const defaultToast = (message, duration, position) => toast(message, { duration, position });
