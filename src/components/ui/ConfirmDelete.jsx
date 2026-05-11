import React from 'react';
import { Modal } from './Modal.jsx';
import { Icon } from './Icon.jsx';

export function ConfirmDelete({ open, onClose, onConfirm, title, message, confirmLabel }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="narrow"
      title={title}
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-danger" onClick={() => { onConfirm(); onClose(); }}>
            {confirmLabel || 'Excluir'}
          </button>
        </>
      }
    >
      <div className="danger-icon"><Icon.alert /></div>
      <p style={{ margin: 0, fontSize: 14, color: 'var(--fg-muted)', lineHeight: 1.55 }}>{message}</p>
      <div className="danger-note">⚠ Essa ação não pode ser desfeita</div>
    </Modal>
  );
}
