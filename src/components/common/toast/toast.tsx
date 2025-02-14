import { toast, ToastOptions } from 'react-toastify';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ShowToastProps {
  type: ToastType;
  message: string;
  options?: ToastOptions;
}

export const showToast = ({ type, message, options }: ShowToastProps) => {
  const config: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    ...options,
  };
  switch (type) {
    case 'success':
      toast.success(message, config);
      break;
    case 'error':
      toast.error(message, config);
      break;
    case 'info':
      toast.info(message, config);
      break;
    case 'warning':
      toast.warn(message, config);
      break;
    default:
      toast(message, config);
      break;
  }
};
