import React from "react";

import styles from "../../styles/ConfirmationDialog.module.css";

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className={styles.confirmationDialog}>
      <div className={styles.confirmationContent}>
        <p>{message}</p>
        <div className={styles.confirmationButtons}>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
