
import { useEffect } from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

const Toast = ({ toast, onDismiss }) => {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, onDismiss]);

  if (!toast) return null;

  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex items-center w-full max-w-xs p-4 text-gray-100 bg-gray-700 rounded-lg shadow-lg"
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-400 bg-green-800/50 rounded-lg">
        <CheckCircleIcon className="w-5 h-5" />
      </div>
      <div className="ml-3 text-sm font-normal">{toast.message}</div>
    </div>
  );
};

export default Toast;
