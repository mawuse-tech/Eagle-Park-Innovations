import Swal from 'sweetalert2';
export { showToast as showAdminAlert } from '@/src/lib/alerts';

export async function confirmAdminDelete(itemName: string) {
  const result = await Swal.fire({
    icon: 'warning',
    title: 'Delete this item?',
    text: `“${itemName}” will be permanently deleted.`,
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#a33c33',
    cancelButtonColor: '#66766b',
    reverseButtons: true,
  });
  return result.isConfirmed;
}
