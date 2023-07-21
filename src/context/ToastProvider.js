import { createContext, useState, useCallback } from "react";
import { useKeyDown } from "../hooks/useKeyDown";

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState(() => []);

  function createToast(message, variant, duration = null) {
    setToasts((currentToasts) => {
      const newToasts = [...currentToasts];
      newToasts.push({
        id: crypto.randomUUID(),
        message,
        variant,
        duration,
      });
      return newToasts;
    });
  }

  function dismissToast(id) {
    const nextToasts = toasts.filter((toast) => {
      return toast.id !== id;
    });

    setToasts(nextToasts);
  }

  const handleEscape = useCallback(() => {
    setToasts([]);
  }, []);

  useKeyDown("Escape", handleEscape);

  return (
    <ToastContext.Provider value={{ toasts, createToast, dismissToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
