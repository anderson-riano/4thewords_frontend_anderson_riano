import React from "react";

const ModalConfirm = ({ show, message, onConfirm, onCancel }) => {
  if (!show) return null;
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmación</h5>
            <button type="button" className="close" onClick={onCancel}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onCancel}>Cancelar</button>
            <button className="btn btn-danger" onClick={onConfirm}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
