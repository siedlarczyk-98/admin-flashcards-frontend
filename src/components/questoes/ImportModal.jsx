import React, { useState } from 'react';
import { Modal } from '../ui/Modal.jsx';
import { Icon } from '../ui/Icon.jsx';

export function ImportModal({ open, onClose, onImport, kind }) {
  const [file, setFile] = useState(null);
  const [over, setOver] = useState(false);

  const handleClose = () => {
    setFile(null);
    onClose();
  };

  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  };

  const isQuestoes = kind === 'questoes';

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={`Importar ${isQuestoes ? 'questões' : 'flashcards'} via XLSX`}
      subtitle="Arraste um arquivo .xlsx ou clique para selecionar."
      footer={
        <>
          <button className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
          <button
            className="btn btn-primary"
            onClick={() => { onImport(file); setFile(null); }}
            disabled={!file}
          >
            Importar
          </button>
        </>
      }
    >
      <label
        className={`dropzone ${over ? 'over' : ''} ${file ? 'has-file' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setOver(true); }}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}
      >
        <input
          type="file"
          accept=".xlsx"
          style={{ display: 'none' }}
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <span className="ico"><Icon.file /></span>
        {file ? (
          <div style={{ flex: 1 }}>
            <div className="label">{file.name}</div>
            <div className="hint">{(file.size / 1024).toFixed(1)} KB · pronto para importar</div>
          </div>
        ) : (
          <div>
            <div className="label">Solte o arquivo aqui ou clique para selecionar</div>
            <div className="hint">Apenas arquivos .xlsx · máx. 10 MB</div>
          </div>
        )}
      </label>

      <div className="column-spec">
        <strong style={{ color: 'var(--fg)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em' }}>
          Colunas esperadas
        </strong>
        <br />
        {isQuestoes ? (
          <>
            <span className="col-name">curso_id</span> · <span className="col-name">enunciado</span> · <span className="col-name">alt_a</span>…<span className="col-name">alt_e</span><br />
            <span className="col-name">gabarito</span> · <span className="col-name">ano</span> · <span className="col-name">dificuldade</span> · <span className="col-name">instituicao</span> · <span className="col-name">essencial</span><br />
            <span className="col-opt">imagem_url (opcional)</span> · <span className="col-name">tags</span> · <span className="col-opt">feedback (opcional)</span>
          </>
        ) : (
          <>
            <span className="col-name">curso_id</span> · <span className="col-name">frente</span> · <span className="col-name">verso</span><br />
            <span className="col-opt">exemplo (opcional)</span> · <span className="col-name">tags</span>
          </>
        )}
      </div>

      <a
        className="template-link"
        href="#"
        onClick={(e) => e.preventDefault()}
        style={{ marginTop: 14, display: 'inline-flex' }}
      >
        <Icon.download /> Baixar modelo XLSX de {isQuestoes ? 'questões' : 'flashcards'}
      </a>
    </Modal>
  );
}
