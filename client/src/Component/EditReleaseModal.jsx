import React, { useState, useEffect } from "react";
import axios from "axios";

const EditReleaseModal = ({ isOpen, release, inventoryId, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    qty: "",
    amt: "",
    releasedBy: "",
    releasedTo: "",
  });

  // populate form when release is passed
  useEffect(() => {
    if (release) {
      setFormData({
        qty: release.qty,
        amt: release.amt,
        releasedBy: release.releasedBy,
        releasedTo: release.releasedTo,
      });
    }
  }, [release]);

  // if not open, don’t render
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/inventory/${inventoryId}/release/${release.releaseId}`,
        formData
      );
      onUpdated(); // refresh parent data
      onClose();   // close modal
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Release</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            name="qty"
            value={formData.qty}
            onChange={handleChange}
            placeholder="Quantity"
            required
          />
          <input
            type="number"
            step="0.01"
            name="amt"
            value={formData.amt}
            onChange={handleChange}
            placeholder="Amount"
            required
          />
          <input
            type="text"
            name="releasedBy"
            value={formData.releasedBy}
            onChange={handleChange}
            placeholder="Released By"
            required
          />
          <input
            type="text"
            name="releasedTo"
            value={formData.releasedTo}
            onChange={handleChange}
            placeholder="Released To"
            required
          />
          <div className="modal-actions">
            <button type="submit" className="btn-success">Save</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReleaseModal;
