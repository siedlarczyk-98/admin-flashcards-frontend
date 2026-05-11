// Shared UI components
const { useState, useEffect, useRef, useCallback } = React;

// ────────────────── Icons (small inline set) ──────────────────
const Icon = {
  search: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  chev:   (p) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6"/></svg>,
  arrowLeft: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>,
  edit:   (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:  (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>,
  plus:   (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="M12 5v14"/></svg>,
  upload: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/></svg>,
  download:(p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>,
  file:   (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  close:  (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>,
  check:  (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12"/></svg>,
  alert:  (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  view:   (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>,
};

// ────────────────── Difficulty badge ──────────────────
const DifficultyBadge = ({ value }) => {
  const cls = value === "Fácil" ? "badge-success" : value === "Médio" ? "badge-warning" : "badge-danger";
  return <span className={`badge ${cls}`}>{value}</span>;
};

// ────────────────── Modal shell ──────────────────
const Modal = ({ open, onClose, title, subtitle, children, footer, size }) => {
  useEffect(() => {
    if (!open) return;
    const h = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className={`modal ${size || ""}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:16}}>
            <div>
              <h3>{title}</h3>
              {subtitle && <p>{subtitle}</p>}
            </div>
            <button className="btn-icon" onClick={onClose} aria-label="Fechar"><Icon.close/></button>
          </div>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>
  );
};

// ────────────────── Rich text editor (B/I/U) ──────────────────
const RichEditor = ({ value, onChange, placeholder, minHeight }) => {
  const ref = useRef(null);
  const [active, setActive] = useState({ bold: false, italic: false, underline: false });

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || "")) {
      ref.current.innerHTML = value || "";
    }
  }, []); // init only

  const exec = (cmd) => {
    document.execCommand(cmd);
    ref.current && onChange(ref.current.innerHTML);
    updateActive();
    ref.current && ref.current.focus();
  };
  const updateActive = () => {
    setActive({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
    });
  };

  return (
    <div className="editor">
      <div className="editor-toolbar">
        <button type="button" className={`b ${active.bold ? "active" : ""}`} onMouseDown={(e)=>{e.preventDefault(); exec("bold");}} title="Negrito (Ctrl+B)">B</button>
        <button type="button" className={`i ${active.italic ? "active" : ""}`} onMouseDown={(e)=>{e.preventDefault(); exec("italic");}} title="Itálico (Ctrl+I)">I</button>
        <button type="button" className={`u ${active.underline ? "active" : ""}`} onMouseDown={(e)=>{e.preventDefault(); exec("underline");}} title="Sublinhado (Ctrl+U)">U</button>
      </div>
      <div
        ref={ref}
        className="editor-area"
        contentEditable
        suppressContentEditableWarning
        data-placeholder={placeholder}
        style={{ minHeight: minHeight || 72 }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        onKeyUp={updateActive}
        onMouseUp={updateActive}
      />
    </div>
  );
};

// ────────────────── Tags input (chips) ──────────────────
const TagsInput = ({ value, onChange, placeholder }) => {
  const [draft, setDraft] = useState("");
  const addTag = () => {
    const t = draft.trim().replace(/,$/,"");
    if (!t) return;
    if (value.includes(t)) { setDraft(""); return; }
    onChange([...value, t]);
    setDraft("");
  };
  const removeTag = (t) => onChange(value.filter(x => x !== t));
  return (
    <div className="tags-input" onClick={(e) => {
      const inp = e.currentTarget.querySelector("input");
      inp && inp.focus();
    }}>
      {value.map(t => (
        <span key={t} className="tag-chip">
          {t}
          <button type="button" onClick={() => removeTag(t)} aria-label={`Remover ${t}`}>×</button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
          else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={addTag}
        placeholder={value.length ? "" : (placeholder || "Digite e pressione Enter")}
      />
    </div>
  );
};

// ────────────────── Toast system ──────────────────
const ToastContext = React.createContext(null);
const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((toast) => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, ...toast }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, leaving: true } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 200);
    }, 2800);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="toast-stack">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type || "success"} ${t.leaving ? "leaving" : ""}`}>
            <span className="ico">{t.type === "danger" ? <Icon.trash/> : <Icon.check/>}</span>
            <span className="msg">{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
const useToast = () => React.useContext(ToastContext);

// ────────────────── Delete confirm modal ──────────────────
const ConfirmDelete = ({ open, onClose, onConfirm, title, message, confirmLabel }) => (
  <Modal open={open} onClose={onClose} size="narrow"
    title={title}
    footer={
      <>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-danger" onClick={() => { onConfirm(); onClose(); }}>{confirmLabel || "Excluir"}</button>
      </>
    }>
    <div className="danger-icon"><Icon.alert/></div>
    <p style={{margin:0, fontSize:14, color:"var(--fg-muted)", lineHeight:1.55}}>{message}</p>
    <div className="danger-note">⚠ Essa ação não pode ser desfeita</div>
  </Modal>
);

window.UI = { Icon, DifficultyBadge, Modal, RichEditor, TagsInput, ToastProvider, useToast, ConfirmDelete };
