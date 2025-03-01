import Swal from 'sweetalert2';

// Success Alert
export const showSuccessAlert = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    confirmButtonText: 'OK',
  });
};

// Error Alert
export const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
    confirmButtonText: 'Retry',
  });
};

// Warning Alert
export const showWarningAlert = (message) => {
  Swal.fire({
    icon: 'warning',
    title: 'Warning',
    text: message,
    confirmButtonText: 'Got it',
  });
};
