import toastr from 'toastr';

 const showToast = ({ message, type = "success" }) => {
    switch (type) {
        case "success":
            toastr.success(message);
            break;
        case "error":
            toastr.error(message);
            break;
        case "warning":
            toastr.warning(message);
            break;
    }
}


export default showToast;