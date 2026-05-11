// Flashcards — Listagem + Detalhe + Modais
const { useState: useStateF, useMemo: useMemoF } = React;
const { Icon: IF, Modal: ModalF, RichEditor: RichEditorF, TagsInput: TagsInputF, ConfirmDelete: ConfirmDeleteF } = window.UI;

const FlashcardsFilters = ({ onSearch, onImport }) => {
  const [open, setOpen] = useStateF(false);
  const [q, setQ] = useStateF("");
  const [adv, setAdv] = useStateF({ id: "", tags: "" });
  return (
    <form className="filter-bar" onSubmit={(e)=>{e.preventDefault(); onSearch({ q, ...adv });}}>
      <div className="filter-row">
        <div className="search">
          <IF.search/>
          <input placeholder="Buscar por nome do curso…" value={q} onChange={(e)=>setQ(e.target.value)}/>
        </div>
        <button type="button" className={`advanced-toggle ${open?"open":""}`} onClick={()=>setOpen(!open)}>
          Filtro avançado <span className="chev"><IF.chev/></span>
        </button>
        <button type="submit" className="btn btn-primary"><IF.search/> Pesquisar</button>
        <button type="button" className="btn btn-secondary" onClick={onImport}><IF.upload/> Importar XLSX</button>
      </div>
      {open && (
        <div className="adv-panel">
          <div className="field"><label>ID do curso</label><input value={adv.id} onChange={(e)=>setAdv({...adv,id:e.target.value})} placeholder="ex. 2572"/></div>
          <div className="field"><label>Tags</label><input value={adv.tags} onChange={(e)=>setAdv({...adv,tags:e.target.value})} placeholder="vasculite, ANCA…"/></div>
        </div>
      )}
    </form>
  );
};

const FlashcardsList = ({ courses, onOpen, onDeleteAll, onImport }) => {
  const [filter, setFilter] = useStateF({ q: "", id: "" });
  const [confirm, setConfirm] = useStateF(null);
  const filtered = useMemoF(() => courses.filter(c => {
    if (filter.q && !c.nome.toLowerCase().includes(filter.q.toLowerCase())) return false;
    if (filter.id && String(c.id) !== filter.id) return false;
    return true;
  }), [filter, courses]);

  return (
    <>
      <FlashcardsFilters onSearch={setFilter} onImport={onImport}/>
      <div className="table-card">
        <div className="table-head">
          <h3>Cursos com flashcards</h3>
          <span className="meta">{filtered.length} curso{filtered.length !== 1 ? "s" : ""}</span>
        </div>
        <table>
          <thead><tr>
            <th style={{width:80}}>ID</th><th>Curso</th><th>Tipo</th><th>Especialidade</th>
            <th style={{textAlign:"right"}}>Flashcards</th><th style={{width:120, textAlign:"right"}}>Ações</th>
          </tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td className="cell-id">#{c.id}</td>
                <td className="cell-name">{c.nome}<span className="sub">{c.diagnostico}</span></td>
                <td><span className="badge">{c.tipo}</span></td>
                <td style={{color:"var(--fg-muted)"}}>{c.especialidade}</td>
                <td style={{textAlign:"right"}}>
                  <span className="cell-count"><span className="num">{c.flashcards}</span><span className="lbl">flashcards</span></span>
                </td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Ver flashcards" onClick={()=>onOpen(c.id)}><IF.view/></button>
                    <button className="btn-icon danger" title="Excluir todos" onClick={()=>setConfirm(c)}><IF.trash/></button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6}><div className="empty"><h4>Nenhum curso encontrado</h4><p>Ajuste os filtros ou importe um arquivo XLSX.</p></div></td></tr>
            )}
          </tbody>
        </table>
      </div>
      <ConfirmDeleteF open={!!confirm} onClose={()=>setConfirm(null)}
        onConfirm={()=>onDeleteAll(confirm.id)}
        title="Excluir todos os flashcards"
        message={confirm ? <>Isso vai excluir todos os <strong>{confirm.flashcards} flashcards</strong> do curso <strong>#{confirm.id}</strong>. Essa ação não pode ser desfeita.</> : ""}
        confirmLabel="Excluir todos"
      />
    </>
  );
};

const FlashcardsDetail = ({ course, flashcards, onBack, onSave, onDelete, onCreate }) => {
  const [editing, setEditing] = useStateF(null);
  const [deleting, setDeleting] = useStateF(null);

  return (
    <>
      <button className="detail-back" onClick={onBack}><IF.arrowLeft/> Voltar para listagem</button>
      <div className="course-card">
        <div>
          <div className="id-chip">Curso · <span className="num">#{course.id}</span></div>
          <h2>{course.nome}</h2>
          <p className="subtitle">
            {course.tipo}<span className="dot"/>{course.especialidade}<span className="dot"/>{course.diagnostico}
          </p>
          <div className="tag-list">
            {course.tags.map(t => <span key={t} className="badge">{t}</span>)}
          </div>
        </div>
        <div className="counter-block">
          <span className="num">{flashcards.length}</span>
          <span className="lbl">Flashcards cadastrados</span>
        </div>
      </div>

      <div className="table-card">
        <div className="table-head">
          <h3>Flashcards do curso #{course.id}</h3>
          <div style={{display:"flex", gap:14, alignItems:"center"}}>
            <span className="meta">{flashcards.length} flashcards</span>
            <button className="btn btn-primary btn-sm" onClick={onCreate}><IF.plus/> Novo flashcard</button>
          </div>
        </div>
        <table>
          <thead><tr>
            <th style={{width:60}}>ID</th><th>Frente</th><th>Verso</th><th>Exemplo</th><th>Tags</th>
            <th style={{width:90, textAlign:"right"}}>Ações</th>
          </tr></thead>
          <tbody>
            {flashcards.map(f => (
              <tr key={f.id}>
                <td className="cell-id">#{f.id}</td>
                <td className="cell-truncate" style={{maxWidth:240, color:"var(--fg)"}}>
                  <span dangerouslySetInnerHTML={{__html: f.frente}}/>
                </td>
                <td className="cell-truncate" style={{maxWidth:260}}>
                  <span dangerouslySetInnerHTML={{__html: f.verso}}/>
                </td>
                <td className="cell-truncate" style={{maxWidth:200, fontStyle: f.exemplo ? "italic" : "normal", color: f.exemplo ? "var(--fg-soft)" : "var(--fg-faint)"}}>
                  {f.exemplo ? <span dangerouslySetInnerHTML={{__html: f.exemplo}}/> : "—"}
                </td>
                <td><div className="tag-list">{f.tags.slice(0,3).map(t => <span key={t} className="badge badge-soft-accent">{t}</span>)}</div></td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Editar" onClick={()=>setEditing(f)}><IF.edit/></button>
                    <button className="btn-icon danger" title="Excluir" onClick={()=>setDeleting(f)}><IF.trash/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <FlashcardEditModal open={!!editing} onClose={()=>setEditing(null)}
        flashcard={editing} onSave={(f)=>{ onSave(f); setEditing(null); }}/>
      <ConfirmDeleteF open={!!deleting} onClose={()=>setDeleting(null)}
        onConfirm={()=>onDelete(deleting.id)}
        title="Excluir flashcard"
        message={deleting ? <>Tem certeza que deseja excluir o <strong>Flashcard #{deleting.id}</strong>? Essa ação não pode ser desfeita.</> : ""}
      />
    </>
  );
};

const FlashcardEditModal = ({ open, onClose, flashcard, onSave }) => {
  const [form, setForm] = useStateF(null);
  React.useEffect(() => {
    if (flashcard) setForm({ ...flashcard, tags: [...flashcard.tags] });
  }, [flashcard]);
  if (!form) return null;
  const set = (k, v) => setForm({ ...form, [k]: v });
  const isNew = !form.id || String(form.id).startsWith("new-");

  return (
    <ModalF open={open} onClose={onClose} size="wide"
      title={isNew ? "Novo flashcard" : `Editar Flashcard #${form.id}`}
      subtitle="Frente, verso e exemplo opcional. Pressione Enter no campo de tags para adicionar."
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={()=>onSave(form)}>{isNew ? "Criar flashcard" : "Salvar alterações"}</button>
        </>
      }>
      <div style={{display:"flex", flexDirection:"column", gap:16}}>
        <div>
          <label className="field-label-f">Frente</label>
          <RichEditorF value={form.frente} onChange={(v)=>set("frente",v)} placeholder="Pergunta ou conceito…" minHeight={80}/>
        </div>
        <div>
          <label className="field-label-f">Verso</label>
          <RichEditorF value={form.verso} onChange={(v)=>set("verso",v)} placeholder="Resposta, definição ou explicação…" minHeight={100}/>
        </div>
        <div>
          <label className="field-label-f">Exemplo (opcional)</label>
          <RichEditorF value={form.exemplo || ""} onChange={(v)=>set("exemplo",v)} placeholder="Aplicação prática, caso clínico, mnemônico…" minHeight={70}/>
        </div>
        <div>
          <label className="field-label-f">Tags</label>
          <TagsInputF value={form.tags} onChange={(v)=>set("tags",v)} placeholder="Digite uma tag e pressione Enter"/>
        </div>
      </div>
      <style>{`.field-label-f { display:block; font-family:var(--font-mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--fg-soft); margin-bottom:6px; }`}</style>
    </ModalF>
  );
};

window.Flashcards = { FlashcardsList, FlashcardsDetail };
