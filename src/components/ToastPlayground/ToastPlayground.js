import { useState, useRef, useContext } from "react";

import Button from "../Button";

import styles from "./ToastPlayground.module.css";
import ToastShelf from "../ToastShelf/ToastShelf";
import { ToastContext } from "../../context/ToastProvider";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const textareaRef = useRef(null);
  const radioGroupRef = useRef(null);
  const [variantOption, setVariantOption] = useState(() => VARIANT_OPTIONS[0]);
  const [messageInput, setMessageInput] = useState("");
  const { createToast } = useContext(ToastContext);

  function onVariantOptionChange(event) {
    setVariantOption(event?.target?.value);
  }

  function onMessageInputChange(event) {
    setMessageInput(event?.target?.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    if (!messageInput && !variantOption) {
      createToast(
        "Please provide a message and choose a variant.",
        "error",
        3000
      );
      textareaRef?.current?.focus();
    } else if (!messageInput) {
      createToast("Please provide a message!", "error", 3000);
      textareaRef?.current?.focus();
    } else if (!variantOption) {
      createToast("Please choose a variant!", "error", 3000);
      radioGroupRef?.current?.focus();
    } else {
      createToast(messageInput, variantOption);
    }
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <form onSubmit={onSubmit} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              ref={textareaRef}
              id="message"
              className={styles.messageInput}
              value={messageInput}
              onChange={onMessageInputChange}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div
            ref={radioGroupRef}
            className={`${styles.inputWrapper} ${styles.radioWrapper}`}
          >
            {VARIANT_OPTIONS.map((option, index) => (
              <label key={index} htmlFor={`variant-notice-${index}`}>
                <input
                  id={`variant-notice-${index}`}
                  type="radio"
                  name="variant"
                  value={option}
                  onChange={onVariantOptionChange}
                  checked={option === variantOption}
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
      <ToastShelf />
    </div>
  );
}

export default ToastPlayground;
