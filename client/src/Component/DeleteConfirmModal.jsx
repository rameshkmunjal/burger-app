import React from "react";
import axios from "axios";

const DeleteConfirmModal = ({ isOpen, releaseId, inventoryId, onClose, onDeleted }) => {
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/inventory/${inventoryId}/release/${releaseId}`);
      onDeleted();  // refresh parent
      onClose();    // close modal
    } catch (err) {
      console.error("Error deleting release:", err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this release?</p>
        <div className="modal-actions">
          <button onClick={handleDelete} className="btn-danger">Yes, Delete</button>
          <button onClick={onClose} className="btn-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
