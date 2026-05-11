import React, { useEffect, useRef, useState } from 'react';

export function RichEditor({ value, onChange, placeholder, minHeight }) {
  const ref = useRef(null);
  const [active, setActive] = useState({ bold: false, italic: false, underline: false });

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== (value || '')) {
      ref.current.innerHTML = value || '';
    }
  }, []); // init only

  const exec = (cmd) => {
    document.execCommand(cmd);
    if (ref.current) onChange(ref.current.innerHTML);
    updateActive();
    ref.current?.focus();
  };

  const updateActive = () => {
    setActive({
      bold: document.queryCommandState('bold'),
      italic: document.queryCommandState('italic'),
      underline: document.queryCommandState('underline'),
    });
  };

  return (
    <div className="editor">
      <div className="editor-toolbar">
        <button
          type="button"
          className={`b ${active.bold ? 'active' : ''}`}
          onMouseDown={(e) => { e.preventDefault(); exec('bold'); }}
          title="Negrito (Ctrl+B)"
        >B</button>
        <button
          type="button"
          className={`i ${active.italic ? 'active' : ''}`}
          onMouseDown={(e) => { e.preventDefault(); exec('italic'); }}
          title="Itálico (Ctrl+I)"
        >I</button>
        <button
          type="button"
          className={`u ${active.underline ? 'active' : ''}`}
          onMouseDown={(e) => { e.preventDefault(); exec('underline'); }}
          title="Sublinhado (Ctrl+U)"
        >U</button>
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
}
