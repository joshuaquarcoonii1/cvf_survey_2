import React, { useState } from "react";

const modalStyles = {
  overlay: {
    position: "fixed",
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999,
  },
  content: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "400px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  button: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

const CVFModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);

  return (
    isOpen && (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.content}>
          <h2>CVF Survey</h2>
          <p>We’re not taking submissions anymore. Thank you for your interest.</p>
          <button style={modalStyles.button} onClick={handleClose}>
            Okay
          </button>
        </div>
      </div>
    )
  );
};

export default CVFModal;
