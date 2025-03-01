import { toast } from 'react-toastify';

// Success Toast
export const showSuccessToast = (message) => {
  toast.success(message, {
    position: 'top-right',
    autoClose: 5000,
  });
};

// Error Toast
export const showErrorToast = (message) => {
  toast.error(message, {
    position: 'top-right',
    autoClose: 5000,
  });
};

// Warning Toast
export const showWarningToast = (message) => {
  toast.warning(message, {
    position: 'top-right',
    autoClose: 5000,
  });
};
