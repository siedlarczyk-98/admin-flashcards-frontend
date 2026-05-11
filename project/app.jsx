// App entry — routing between Questões and Flashcards
const { useState, useMemo, useEffect } = React;
const { ToastProvider, useToast } = window.UI;
const { QuestoesList, QuestoesDetail, ImportModal } = window.Questoes;
const { FlashcardsList, FlashcardsDetail } = window.Flashcards;

const App = () => {
  // Section: 'questoes' | 'flashcards'
  const [section, setSection] = useState("questoes");
  // Mode: 'list' | 'detail' + courseId
  const [courseId, setCourseId] = useState(null);

  // Mutable state (clones so edits stick during session)
  const [coursesQ, setCoursesQ] = useState(() => window.COURSES.map(c => ({...c})));
  const [questoesMap, setQuestoesMap] = useState(() => {
    const m = {};
    Object.entries(window.QUESTOES_BY_COURSE).forEach(([cid, arr]) => m[cid] = arr.map(x => ({...x, alternativas: x.alternativas.map(a => ({...a})), tags: [...x.tags]})));
    return m;
  });
  const [flashMap, setFlashMap] = useState(() => {
    const m = {};
    Object.entries(window.FLASHCARDS_BY_COURSE).forEach(([cid, arr]) => m[cid] = arr.map(x => ({...x, tags: [...x.tags]})));
    return m;
  });

  const [importOpen, setImportOpen] = useState(false);
  const toast = useToast();

  // When section changes, reset to list
  const switchSection = (s) => {
    setSection(s);
    setCourseId(null);
  };

  const currentCourse = useMemo(() => coursesQ.find(c => c.id === courseId), [courseId, coursesQ]);

  // ── Handlers — questões ──
  const handleSaveQ = (q) => {
    setQuestoesMap(prev => ({
      ...prev,
      [courseId]: prev[courseId].map(x => x.id === q.id ? q : x),
    }));
    toast({ type: "success", msg: `Questão #${q.id} atualizada com sucesso` });
  };
  const handleDeleteQ = (qid) => {
    setQuestoesMap(prev => ({
      ...prev,
      [courseId]: prev[courseId].filter(x => x.id !== qid),
    }));
    setCoursesQ(prev => prev.map(c => c.id === courseId ? { ...c, questoes: Math.max(0, c.questoes - 1) } : c));
    toast({ type: "danger", msg: `Questão #${qid} excluída` });
  };
  const handleDeleteAllQ = (cid) => {
    const count = questoesMap[cid]?.length || 0;
    setQuestoesMap(prev => ({ ...prev, [cid]: [] }));
    setCoursesQ(prev => prev.map(c => c.id === cid ? { ...c, questoes: 0 } : c));
    toast({ type: "danger", msg: `${count} questões do curso #${cid} excluídas` });
  };

  // ── Handlers — flashcards ──
  const handleSaveF = (f) => {
    const isNew = !flashMap[courseId]?.find(x => x.id === f.id);
    setFlashMap(prev => {
      const arr = prev[courseId] || [];
      const next = isNew ? [...arr, { ...f, id: Math.max(1000, ...arr.map(x => x.id)) + 1 }] : arr.map(x => x.id === f.id ? f : x);
      return { ...prev, [courseId]: next };
    });
    if (isNew) {
      setCoursesQ(prev => prev.map(c => c.id === courseId ? { ...c, flashcards: c.flashcards + 1 } : c));
      toast({ type: "success", msg: `Flashcard criado com sucesso` });
    } else {
      toast({ type: "success", msg: `Flashcard #${f.id} atualizado com sucesso` });
    }
  };
  const handleDeleteF = (fid) => {
    setFlashMap(prev => ({ ...prev, [courseId]: prev[courseId].filter(x => x.id !== fid) }));
    setCoursesQ(prev => prev.map(c => c.id === courseId ? { ...c, flashcards: Math.max(0, c.flashcards - 1) } : c));
    toast({ type: "danger", msg: `Flashcard #${fid} excluído` });
  };
  const handleDeleteAllF = (cid) => {
    const count = flashMap[cid]?.length || 0;
    setFlashMap(prev => ({ ...prev, [cid]: [] }));
    setCoursesQ(prev => prev.map(c => c.id === cid ? { ...c, flashcards: 0 } : c));
    toast({ type: "danger", msg: `${count} flashcards do curso #${cid} excluídos` });
  };

  const [creatingFlash, setCreatingFlash] = useState(false);

  // Filter courses by what they have
  const coursesWithQ = coursesQ.filter(c => (questoesMap[c.id]?.length || 0) > 0);
  const coursesWithF = coursesQ.filter(c => (flashMap[c.id]?.length || 0) > 0);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="mark">Admin Flashcards e Questões <em>3.0</em></span>
          <span className="dot"/>
          <span className="kicker">Admin · Curso</span>
        </div>
        <nav className="breadcrumb">
          <span>Curso</span>
          <span className="sep">/</span>
          <span className="current">{section === "questoes" ? "Questões — Trilha" : "Flashcards"}</span>
          {currentCourse && <><span className="sep">/</span><span className="current">#{currentCourse.id}</span></>}
        </nav>
      </header>

      <div className="section-tabs">
        <button className={section === "questoes" ? "active" : ""} onClick={()=>switchSection("questoes")}>
          Questões
          <span className="count">{coursesWithQ.reduce((a,c) => a + (questoesMap[c.id]?.length || 0), 0)}</span>
        </button>
        <button className={section === "flashcards" ? "active" : ""} onClick={()=>switchSection("flashcards")}>
          Flashcards
          <span className="count">{coursesWithF.reduce((a,c) => a + (flashMap[c.id]?.length || 0), 0)}</span>
        </button>
      </div>

      {courseId === null && (
        <div className="page-head">
          <h1>{section === "questoes" ? <>Questões <em>— Trilha</em></> : <>Flashcards</>}</h1>
          <p>
            {section === "questoes"
              ? "Gerencie o banco de questões por curso. Importe via XLSX, edite alternativas e gabaritos, ou faça exclusões em massa quando preciso recomeçar."
              : "Cartões de estudo (frente / verso / exemplo) organizados por curso. Importe em lote ou crie um a um direto pela interface."}
          </p>
        </div>
      )}

      {section === "questoes" && courseId === null && (
        <QuestoesList
          courses={coursesWithQ}
          onOpen={setCourseId}
          onDeleteAll={handleDeleteAllQ}
          onImport={()=>setImportOpen(true)}
        />
      )}
      {section === "questoes" && currentCourse && (
        <QuestoesDetail
          course={currentCourse}
          questoes={questoesMap[courseId] || []}
          onBack={()=>setCourseId(null)}
          onSave={handleSaveQ}
          onDelete={handleDeleteQ}
        />
      )}
      {section === "flashcards" && courseId === null && (
        <FlashcardsList
          courses={coursesWithF}
          onOpen={setCourseId}
          onDeleteAll={handleDeleteAllF}
          onImport={()=>setImportOpen(true)}
        />
      )}
      {section === "flashcards" && currentCourse && (
        <FlashcardsDetail
          course={currentCourse}
          flashcards={flashMap[courseId] || []}
          onBack={()=>setCourseId(null)}
          onSave={handleSaveF}
          onDelete={handleDeleteF}
          onCreate={()=>setCreatingFlash(true)}
        />
      )}

      <ImportModal open={importOpen} onClose={()=>setImportOpen(false)}
        kind={section}
        onImport={(file)=>{
          setImportOpen(false);
          if (file) toast({ type: "success", msg: `${file.name} importado com sucesso · 0 erros` });
        }}/>

      {/* New flashcard modal */}
      {creatingFlash && (
        <NewFlashcardModal
          onClose={()=>setCreatingFlash(false)}
          onSave={(f)=>{ handleSaveF(f); setCreatingFlash(false); }}
        />
      )}
    </div>
  );
};

// Wrap new flashcard in same component
const NewFlashcardModal = ({ onClose, onSave }) => {
  const { Modal, RichEditor, TagsInput } = window.UI;
  const [form, setForm] = useState({ id: "new-" + Date.now(), frente: "", verso: "", exemplo: "", tags: [] });
  const set = (k, v) => setForm({ ...form, [k]: v });
  return (
    <Modal open onClose={onClose} size="wide"
      title="Novo flashcard"
      subtitle="Frente, verso e exemplo opcional. Pressione Enter no campo de tags para adicionar."
      footer={
        <>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={()=>onSave(form)}>Criar flashcard</button>
        </>
      }>
      <div style={{display:"flex", flexDirection:"column", gap:16}}>
        <div><label className="lf">Frente</label><RichEditor value={form.frente} onChange={(v)=>set("frente",v)} placeholder="Pergunta ou conceito…" minHeight={80}/></div>
        <div><label className="lf">Verso</label><RichEditor value={form.verso} onChange={(v)=>set("verso",v)} placeholder="Resposta, definição ou explicação…" minHeight={100}/></div>
        <div><label className="lf">Exemplo (opcional)</label><RichEditor value={form.exemplo} onChange={(v)=>set("exemplo",v)} placeholder="Aplicação prática, caso clínico, mnemônico…" minHeight={70}/></div>
        <div><label className="lf">Tags</label><TagsInput value={form.tags} onChange={(v)=>set("tags",v)} placeholder="Digite uma tag e pressione Enter"/></div>
      </div>
      <style>{`.lf { display:block; font-family:var(--font-mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--fg-soft); margin-bottom:6px; }`}</style>
    </Modal>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <ToastProvider><App/></ToastProvider>
);
