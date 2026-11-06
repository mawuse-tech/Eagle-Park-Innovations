import Swal, { type SweetAlertIcon } from 'sweetalert2';

export function showToast(icon: SweetAlertIcon, title: string, text?: string) {
  return Swal.fire({
    toast: true,
    position: 'top-end',
    icon,
    title,
    text,
    showConfirmButton: false,
    timer: 3200,
    timerProgressBar: true,
  });
}
