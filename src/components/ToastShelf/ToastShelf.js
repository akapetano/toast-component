import { useContext } from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";
import { ToastContext } from "../../context/ToastProvider";

function ToastShelf() {
  const { toasts, dismissToast } = useContext(ToastContext);

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts &&
        Array.isArray(toasts) &&
        toasts.map(({ id, variant, message, duration }, index) => (
          <li key={id} className={styles.toastWrapper}>
            <Toast
              variant={variant}
              duration={duration}
              dismissToast={() => dismissToast(id)}
            >
              {message}
            </Toast>
          </li>
        ))}
    </ol>
  );
}

export default ToastShelf;
