import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts, dismissToast }) {
  return (
    <ol className={styles.wrapper}>
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
