import { createPortal } from 'react-dom';
import Swal from 'sweetalert2';
function Modal({ isOpen, textModal, setIsOpen, textInfo}) {
    if(isOpen) {
        Swal.fire({
            icon: 'success',
            title: 'Confirmada accion',
            text: `Este ${textInfo} fue ${textModal}`,
            showConfirmButton: false,
            timer: 1500
        }).then(() => {

            setIsOpen(false);
        });
    }

    return null;
}

export { Modal }