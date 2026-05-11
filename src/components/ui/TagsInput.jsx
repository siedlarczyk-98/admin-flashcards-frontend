import React, { useState } from 'react';

export function TagsInput({ value, onChange, placeholder }) {
  const [draft, setDraft] = useState('');

  const addTag = () => {
    const t = draft.trim().replace(/,$/, '');
    if (!t || value.includes(t)) { setDraft(''); return; }
    onChange([...value, t]);
    setDraft('');
  };

  const removeTag = (t) => onChange(value.filter((x) => x !== t));

  return (
    <div
      className="tags-input"
      onClick={(e) => e.currentTarget.querySelector('input')?.focus()}
    >
      {value.map((t) => (
        <span key={t} className="tag-chip">
          {t}
          <button type="button" onClick={() => removeTag(t)} aria-label={`Remover ${t}`}>×</button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addTag(); }
          else if (e.key === 'Backspace' && !draft && value.length) onChange(value.slice(0, -1));
        }}
        onBlur={addTag}
        placeholder={value.length ? '' : placeholder || 'Digite e pressione Enter'}
      />
    </div>
  );
}
