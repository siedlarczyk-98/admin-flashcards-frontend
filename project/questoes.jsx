// Questões — Listagem + Detalhe + Modais
const { useState: useStateQ, useMemo: useMemoQ } = React;
const { Icon: IQ, DifficultyBadge, Modal: ModalQ, RichEditor, TagsInput, useToast: useToastQ, ConfirmDelete: ConfirmDeleteQ } = window.UI;

// ───── Filter bar ─────
const QuestoesFilters = ({ onSearch, onImport }) => {
  const [open, setOpen] = useStateQ(false);
  const [q, setQ] = useStateQ("");
  const [adv, setAdv] = useStateQ({ id: "", inst: "", ano: "", dif: "" });
  const submit = (e) => { e && e.preventDefault(); onSearch({ q, ...adv }); };
  return (
    <form className="filter-bar" onSubmit={submit}>
      <div className="filter-row">
        <div className="search">
          <IQ.search/>
          <input placeholder="Buscar por nome do curso…" value={q} onChange={(e)=>setQ(e.target.value)}/>
        </div>
        <button type="button" className={`advanced-toggle ${open?"open":""}`} onClick={()=>setOpen(!open)}>
          Filtro avançado <span className="chev"><IQ.chev/></span>
        </button>
        <button type="submit" className="btn btn-primary"><IQ.search/> Pesquisar</button>
        <button type="button" className="btn btn-secondary" onClick={onImport}><IQ.upload/> Importar XLSX</button>
      </div>
      {open && (
        <div className="adv-panel">
          <div className="field"><label>ID do curso</label><input value={adv.id} onChange={(e)=>setAdv({...adv,id:e.target.value})} placeholder="ex. 2572"/></div>
          <div className="field"><label>Instituição</label><input value={adv.inst} onChange={(e)=>setAdv({...adv,inst:e.target.value})} placeholder="USP, ENARE…"/></div>
          <div className="field"><label>Ano</label><input value={adv.ano} onChange={(e)=>setAdv({...adv,ano:e.target.value})} placeholder="2024"/></div>
          <div className="field"><label>Dificuldade</label>
            <select value={adv.dif} onChange={(e)=>setAdv({...adv,dif:e.target.value})}>
              <option value="">Todas</option><option>Fácil</option><option>Médio</option><option>Difícil</option>
            </select>
          </div>
        </div>
      )}
    </form>
  );
};

// ───── Listagem ─────
const QuestoesList = ({ courses, onOpen, onDeleteAll, onImport }) => {
  const [filter, setFilter] = useStateQ({ q: "", id: "", inst: "", ano: "", dif: "" });
  const [confirm, setConfirm] = useStateQ(null);
  const filtered = useMemoQ(() => courses.filter(c => {
    if (filter.q && !c.nome.toLowerCase().includes(filter.q.toLowerCase())) return false;
    if (filter.id && String(c.id) !== filter.id) return false;
    return true;
  }), [filter, courses]);

  return (
    <>
      <QuestoesFilters onSearch={setFilter} onImport={onImport}/>
      <div className="table-card">
        <div className="table-head">
          <h3>Cursos com questões</h3>
          <span className="meta">{filtered.length} curso{filtered.length !== 1 ? "s" : ""}</span>
        </div>
        <table>
          <thead><tr>
            <th style={{width:80}}>ID</th><th>Curso</th><th>Tipo</th><th>Especialidade</th>
            <th style={{textAlign:"right"}}>Questões</th><th style={{width:120, textAlign:"right"}}>Ações</th>
          </tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td className="cell-id">#{c.id}</td>
                <td className="cell-name">{c.nome}
                  <span className="sub">{c.diagnostico}</span>
                </td>
                <td><span className="badge">{c.tipo}</span></td>
                <td style={{color:"var(--fg-muted)"}}>{c.especialidade}</td>
                <td style={{textAlign:"right"}}>
                  <span className="cell-count"><span className="num">{c.questoes}</span><span className="lbl">questões</span></span>
                </td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Ver questões" onClick={()=>onOpen(c.id)}><IQ.view/></button>
                    <button className="btn-icon danger" title="Excluir todas" onClick={()=>setConfirm(c)}><IQ.trash/></button>
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
      <ConfirmDeleteQ open={!!confirm} onClose={()=>setConfirm(null)}
        onConfirm={()=>{ onDeleteAll(confirm.id); }}
        title="Excluir todas as questões"
        message={confirm ? <>Isso vai excluir todas as <strong>{confirm.questoes} questões</strong> do curso <strong>#{confirm.id}</strong>. Essa ação não pode ser desfeita.</> : ""}
        confirmLabel="Excluir todas"
      />
    </>
  );
};

// ───── Detalhe ─────
const QuestoesDetail = ({ course, questoes, onBack, onSave, onDelete }) => {
  const [editing, setEditing] = useStateQ(null);
  const [deleting, setDeleting] = useStateQ(null);
  return (
    <>
      <button className="detail-back" onClick={onBack}><IQ.arrowLeft/> Voltar para listagem</button>
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
          <span className="num">{questoes.length}</span>
          <span className="lbl">Questões cadastradas</span>
        </div>
      </div>

      <div className="table-card">
        <div className="table-head">
          <h3>Questões do curso #{course.id}</h3>
          <span className="meta">{questoes.length} questões encontradas</span>
        </div>
        <table>
          <thead><tr>
            <th style={{width:60}}>ID</th><th>Enunciado</th>
            <th style={{width:90}}>Gabarito</th><th>Instituição</th><th style={{width:80}}>Ano</th>
            <th style={{width:120}}>Dificuldade</th><th>Tags</th><th style={{width:90, textAlign:"right"}}>Ações</th>
          </tr></thead>
          <tbody>
            {questoes.map(q => (
              <tr key={q.id}>
                <td className="cell-id">#{q.id}</td>
                <td className="cell-truncate" title={q.enunciado.replace(/<[^>]+>/g,"")}>
                  <span dangerouslySetInnerHTML={{__html: q.enunciado}}/>
                </td>
                <td><span className="badge-circle">{q.gabarito}</span></td>
                <td style={{color:"var(--fg-muted)"}}>{q.instituicao}</td>
                <td className="cell-id">{q.ano}</td>
                <td><DifficultyBadge value={q.dificuldade}/></td>
                <td><div className="tag-list">{q.tags.slice(0,3).map(t => <span key={t} className="badge">{t}</span>)}</div></td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Editar" onClick={()=>setEditing(q)}><IQ.edit/></button>
                    <button className="btn-icon danger" title="Excluir" onClick={()=>setDeleting(q)}><IQ.trash/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <QuestaoEditModal open={!!editing} onClose={()=>setEditing(null)}
        questao={editing} onSave={(q)=>{onSave(q); setEditing(null);}}/>
      <ConfirmDeleteQ open={!!deleting} onClose={()=>setDeleting(null)}
        onConfirm={()=>onDelete(deleting.id)}
        title="Excluir questão"
        message={deleting ? <>Tem certeza que deseja excluir a <strong>Questão #{deleting.id}</strong>? Essa ação não pode ser desfeita.</> : ""}
      />
    </>
  );
};

// ───── Edit modal ─────
const QuestaoEditModal = ({ open, onClose, questao, onSave }) => {
  const [form, setForm] = useStateQ(null);
  React.useEffect(() => {
    if (questao) setForm({ ...questao, alternativas: questao.alternativas.map(a => ({...a})), tags: [...questao.tags] });
  }, [questao]);
  if (!form) return null;

  const set = (k, v) => setForm({ ...form, [k]: v });
  const setAlt = (i, texto) => {
    const a = [...form.alternativas]; a[i] = { ...a[i], texto }; set("alternativas", a);
  };
  const addAlt = () => {
    const letras = ["A","B","C","D","E","F","G","H"];
    const used = form.alternativas.map(a => a.letra);
    const next = letras.find(l => !used.includes(l));
    if (!next) return;
    set("alternativas", [...form.alternativas, { letra: next, texto: "" }]);
  };
  const removeAlt = (i) => {
    const a = form.alternativas.filter((_,idx) => idx !== i)
      .map((alt, idx) => ({ ...alt, letra: ["A","B","C","D","E","F","G","H"][idx] }));
    let gab = form.gabarito;
    if (!a.find(x => x.letra === gab)) gab = a[0]?.letra || "";
    setForm({ ...form, alternativas: a, gabarito: gab });
  };

  return (
    <ModalQ open={open} onClose={onClose} size="wide"
      title={`Editar Questão #${form.id}`}
      subtitle="Ajuste o enunciado, alternativas e metadados desta questão."
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={()=>onSave(form)}>Salvar alterações</button>
        </>
      }>
      <div className="form-grid">
        <div className="full">
          <label className="field-label">Enunciado</label>
          <RichEditor value={form.enunciado} onChange={(v)=>set("enunciado",v)} placeholder="Descreva o caso clínico ou pergunta…" minHeight={100}/>
        </div>
        <div className="full field">
          <label>URL da imagem (opcional)</label>
          <input value={form.imagem || ""} onChange={(e)=>set("imagem", e.target.value)} placeholder="https://…"/>
        </div>

        <div className="full">
          <label className="field-label">Alternativas</label>
          <div className="alt-list">
            {form.alternativas.map((a, i) => (
              <div key={i} className={`alt-row ${a.letra === form.gabarito ? "correct" : ""}`}>
                <span className="letter">{a.letra}</span>
                <input value={a.texto} onChange={(e)=>setAlt(i, e.target.value)} placeholder={`Texto da alternativa ${a.letra}…`}/>
                <button className="btn-icon danger" onClick={()=>removeAlt(i)} title="Remover" disabled={form.alternativas.length <= 2}>
                  <IQ.close/>
                </button>
              </div>
            ))}
            <button type="button" className="alt-add" onClick={addAlt}>
              <IQ.plus/> Adicionar alternativa
            </button>
          </div>
        </div>

        <div className="field">
          <label>Gabarito</label>
          <select value={form.gabarito} onChange={(e)=>set("gabarito", e.target.value)}>
            {form.alternativas.map(a => <option key={a.letra} value={a.letra}>{a.letra}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Ano</label>
          <input value={form.ano} onChange={(e)=>set("ano", e.target.value)} placeholder="2024"/>
        </div>
        <div className="field">
          <label>Dificuldade</label>
          <select value={form.dificuldade} onChange={(e)=>set("dificuldade", e.target.value)}>
            <option>Fácil</option><option>Médio</option><option>Difícil</option>
          </select>
        </div>
        <div className="field">
          <label>Instituição</label>
          <input value={form.instituicao} onChange={(e)=>set("instituicao", e.target.value)} placeholder="USP, ENARE…"/>
        </div>
        <div className="field">
          <label>Essencial</label>
          <select value={form.essencial ? "TRUE" : "FALSE"} onChange={(e)=>set("essencial", e.target.value === "TRUE")}>
            <option>TRUE</option><option>FALSE</option>
          </select>
        </div>
        <div className="full">
          <label className="field-label">Tags</label>
          <TagsInput value={form.tags} onChange={(v)=>set("tags", v)} placeholder="Digite uma tag e pressione Enter"/>
        </div>
        <div className="full field">
          <label>Feedback do professor (opcional)</label>
          <textarea value={form.feedback || ""} onChange={(e)=>set("feedback", e.target.value)}
            placeholder="Comentário pedagógico sobre a questão…"
            style={{width:"100%", minHeight:80, resize:"vertical", padding:"10px 12px",
                    border:"1px solid var(--border)", borderRadius:8, fontSize:13.5, outline:"none",
                    fontFamily:"var(--font-sans)", background:"var(--surface)"}}/>
        </div>
      </div>
      <style>{`
        .field-label { display:block; font-family:var(--font-mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--fg-soft); margin-bottom:6px; }
        textarea:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(15,118,110,.12); }
      `}</style>
    </ModalQ>
  );
};

// ───── Import modal ─────
const ImportModal = ({ open, onClose, onImport, kind }) => {
  const [file, setFile] = useStateQ(null);
  const [over, setOver] = useStateQ(false);
  const onDrop = (e) => {
    e.preventDefault(); setOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) setFile(f);
  };
  return (
    <ModalQ open={open} onClose={()=>{ setFile(null); onClose(); }}
      title={`Importar ${kind === "questoes" ? "questões" : "flashcards"} via XLSX`}
      subtitle="Arraste um arquivo .xlsx ou clique para selecionar."
      footer={
        <>
          <button className="btn btn-secondary" onClick={()=>{ setFile(null); onClose(); }}>Cancelar</button>
          <button className="btn btn-primary" onClick={()=>{ onImport(file); setFile(null); }} disabled={!file}>Importar</button>
        </>
      }>
      <label className={`dropzone ${over?"over":""} ${file?"has-file":""}`}
        onDragOver={(e)=>{e.preventDefault(); setOver(true);}}
        onDragLeave={()=>setOver(false)}
        onDrop={onDrop}>
        <input type="file" accept=".xlsx" style={{display:"none"}} onChange={(e)=>setFile(e.target.files?.[0])}/>
        <span className="ico"><IQ.file/></span>
        {file ? (
          <div style={{flex:1}}>
            <div className="label">{file.name}</div>
            <div className="hint">{(file.size/1024).toFixed(1)} KB · pronto para importar</div>
          </div>
        ) : (
          <div>
            <div className="label">Solte o arquivo aqui ou clique para selecionar</div>
            <div className="hint">Apenas arquivos .xlsx · máx. 10 MB</div>
          </div>
        )}
      </label>

      <div className="column-spec">
        <strong style={{color:"var(--fg)", fontFamily:"var(--font-sans)", fontSize:12, textTransform:"uppercase", letterSpacing:".08em"}}>Colunas esperadas</strong><br/>
        {kind === "questoes" ? (
          <>
            <span className="col-name">curso_id</span> · <span className="col-name">enunciado</span> · <span className="col-name">alt_a</span>…<span className="col-name">alt_e</span><br/>
            <span className="col-name">gabarito</span> · <span className="col-name">ano</span> · <span className="col-name">dificuldade</span> · <span className="col-name">instituicao</span> · <span className="col-name">essencial</span><br/>
            <span className="col-opt">imagem_url (opcional)</span> · <span className="col-name">tags</span> · <span className="col-opt">feedback (opcional)</span>
          </>
        ) : (
          <>
            <span className="col-name">curso_id</span> · <span className="col-name">frente</span> · <span className="col-name">verso</span><br/>
            <span className="col-opt">exemplo (opcional)</span> · <span className="col-name">tags</span>
          </>
        )}
      </div>

      <a className="template-link" href="#" onClick={(e)=>e.preventDefault()} style={{marginTop:14, display:"inline-flex"}}>
        <IQ.download/> Baixar modelo XLSX de {kind === "questoes" ? "questões" : "flashcards"}
      </a>
    </ModalQ>
  );
};

window.Questoes = { QuestoesList, QuestoesDetail, ImportModal };
