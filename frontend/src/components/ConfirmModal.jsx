function ConfirmModal({ visible, message, onConfirm, onCancel }) {
  if (!visible) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
      tabIndex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Confirmar</h5>
            <button type="button" className="btn-close" aria-label="Cerrar" onClick={onCancel}></button>
          </div>
          <div className="modal-body">
            <p>{message}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="button" className="btn btn-danger" onClick={onConfirm}>
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
