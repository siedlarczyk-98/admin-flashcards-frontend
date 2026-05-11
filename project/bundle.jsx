// ===== data.jsx =====
(() => {
  // Mock data — medicina residência
  const COURSES = [
  {
    id: 2572,
    nome: "AstraZeneca ImpulsiOne — Sueli, 41 anos",
    tipo: "Farmacêuticas",
    especialidade: "Reumatologia",
    diagnostico: "GEPA",
    tags: ["Produção", "Vasculites", "ANCA+"],
    questoes: 12,
    flashcards: 8
  },
  {
    id: 2589,
    nome: "ENARE 2024 — Clínica Médica",
    tipo: "Residência",
    especialidade: "Clínica Médica",
    diagnostico: "Multitemático",
    tags: ["ENARE", "2024", "Banco oficial"],
    questoes: 84,
    flashcards: 42
  },
  {
    id: 2604,
    nome: "Cardiologia — IAM com supra de ST",
    tipo: "Especialização",
    especialidade: "Cardiologia",
    diagnostico: "Síndrome Coronariana Aguda",
    tags: ["Emergência", "ECG", "Dupla antiagregação"],
    questoes: 36,
    flashcards: 22
  },
  {
    id: 2611,
    nome: "Pediatria — Sepse Neonatal Precoce",
    tipo: "Residência",
    especialidade: "Pediatria",
    diagnostico: "Sepse Neonatal",
    tags: ["UTI Neo", "GBS", "Antibioticoterapia"],
    questoes: 18,
    flashcards: 14
  },
  {
    id: 2628,
    nome: "USP-RP — Vias Aéreas Difíceis",
    tipo: "Concurso",
    especialidade: "Anestesiologia",
    diagnostico: "Manejo de Via Aérea",
    tags: ["USP-RP", "2024", "Cormack-Lehane"],
    questoes: 24,
    flashcards: 16
  },
  {
    id: 2645,
    nome: "UNIFESP — Hepatites Virais Crônicas",
    tipo: "Residência",
    especialidade: "Gastroenterologia",
    diagnostico: "Hepatite B/C",
    tags: ["UNIFESP", "Sorologia", "DAA"],
    questoes: 28,
    flashcards: 18
  }];


  const QUESTOES_BY_COURSE = {
    2572: [
    { id: 101, enunciado: "Paciente feminina, 41 anos, com quadro de vasculite sistêmica e eosinofilia periférica. Qual a conduta mais adequada?",
      alternativas: [
      { letra: "A", texto: "Iniciar prednisona em dose alta" },
      { letra: "B", texto: "Solicitar biópsia renal imediata" },
      { letra: "C", texto: "Iniciar mepolizumabe como adjuvante" },
      { letra: "D", texto: "Prescrever ciclofosfamida isolada" },
      { letra: "E", texto: "Observação clínica e reavaliação em 30 dias" }],

      gabarito: "C", instituicao: "USP", ano: "2023", dificuldade: "Médio",
      tags: ["vasculite", "GEPA", "tratamento"], essencial: true,
      feedback: "Em GEPA refratária à corticoterapia, o mepolizumabe (anti-IL5) demonstrou redução significativa de recaídas no estudo MIRRA."
    },
    { id: 102, enunciado: "Qual é o principal mecanismo de ação dos anti-IL5 no tratamento da GEPA?",
      alternativas: [
      { letra: "A", texto: "Bloqueio da interleucina-5, reduzindo eosinófilos circulantes" },
      { letra: "B", texto: "Inibição de TNF-α" },
      { letra: "C", texto: "Depleção de células B via CD20" },
      { letra: "D", texto: "Inibição de calcineurina" }],

      gabarito: "A", instituicao: "UNICAMP", ano: "2022", dificuldade: "Fácil",
      tags: ["mecanismo", "biológicos"], essencial: false, feedback: "" },
    { id: 103, enunciado: "Em relação ao diagnóstico diferencial de vasculites ANCA-associadas, assinale a correta.",
      alternativas: [
      { letra: "A", texto: "GPA tem maior envolvimento renal" },
      { letra: "B", texto: "MPA cursa tipicamente com granulomas" },
      { letra: "C", texto: "GEPA está fortemente associada a asma" },
      { letra: "D", texto: "Todas anteriores estão corretas" }],

      gabarito: "C", instituicao: "ENARE", ano: "2024", dificuldade: "Difícil",
      tags: ["diagnóstico", "ANCA"], essencial: true, feedback: "" },
    { id: 104, enunciado: "Mulher de 35 anos apresenta púrpura palpável em MMII, artralgia e hematúria. Considerando a hipótese de vasculite, qual o exame inicial mais indicado?",
      alternativas: [
      { letra: "A", texto: "TC de tórax" },
      { letra: "B", texto: "Pesquisa de ANCA e exame de urina I" },
      { letra: "C", texto: "Biópsia renal" },
      { letra: "D", texto: "Capilaroscopia periungueal" }],

      gabarito: "B", instituicao: "USP-RP", ano: "2023", dificuldade: "Médio",
      tags: ["clínica", "investigação"], essencial: false, feedback: "" },
    { id: 105, enunciado: "Sobre o tratamento da granulomatose eosinofílica com poliangiíte, é INCORRETO afirmar que…",
      alternativas: [
      { letra: "A", texto: "Corticoide é o pilar do tratamento" },
      { letra: "B", texto: "Mepolizumabe é aprovado como adjuvante" },
      { letra: "C", texto: "Rituximabe pode ser usado em casos graves" },
      { letra: "D", texto: "Ciclofosfamida é a primeira escolha em todos os casos" },
      { letra: "E", texto: "Manutenção pode ser feita com azatioprina" }],

      gabarito: "D", instituicao: "UNIFESP", ano: "2024", dificuldade: "Difícil",
      tags: ["tratamento", "imunossupressão"], essencial: true, feedback: "" },
    { id: 106, enunciado: "Qual marcador laboratorial é classicamente elevado na GEPA?",
      alternativas: [
      { letra: "A", texto: "IgE total e eosinófilos" },
      { letra: "B", texto: "Anti-DNA dupla-fita" },
      { letra: "C", texto: "Anti-Ro/SSA" },
      { letra: "D", texto: "Anti-CCP" }],

      gabarito: "A", instituicao: "USP", ano: "2022", dificuldade: "Fácil",
      tags: ["laboratório"], essencial: false, feedback: "" },
    { id: 107, enunciado: "Critérios diagnósticos ACR/EULAR 2022 para GEPA incluem todos, EXCETO:",
      alternativas: [
      { letra: "A", texto: "Asma" }, { letra: "B", texto: "Eosinofilia > 1000" },
      { letra: "C", texto: "Sinusite/polipose" }, { letra: "D", texto: "Hipertensão sistêmica" }],

      gabarito: "D", instituicao: "ENARE", ano: "2023", dificuldade: "Médio",
      tags: ["critérios", "ACR"], essencial: true, feedback: "" },
    { id: 108, enunciado: "Em qual situação a biópsia renal é mais indicada na suspeita de vasculite ANCA?",
      alternativas: [
      { letra: "A", texto: "Hematúria isolada sem proteinúria" },
      { letra: "B", texto: "GNRP com queda de função renal" },
      { letra: "C", texto: "Apenas elevação de PCR" },
      { letra: "D", texto: "Suspeita clínica sem alteração urinária" }],

      gabarito: "B", instituicao: "UNICAMP", ano: "2024", dificuldade: "Médio",
      tags: ["diagnóstico", "renal"], essencial: false, feedback: "" }]

  };
  // Generate placeholder questions for other courses
  [2589, 2604, 2611, 2628, 2645].forEach((cid) => {
    const course = COURSES.find((c) => c.id === cid);
    const n = course.questoes;
    QUESTOES_BY_COURSE[cid] = Array.from({ length: Math.min(n, 6) }, (_, i) => ({
      id: cid * 10 + i + 1,
      enunciado: `Questão ${i + 1} do curso ${course.especialidade}. Assinale a alternativa correta sobre o tema apresentado.`,
      alternativas: ["A", "B", "C", "D", "E"].map((l) => ({ letra: l, texto: `Alternativa ${l}` })),
      gabarito: ["A", "B", "C", "D", "E"][i % 5],
      instituicao: ["USP", "ENARE", "UNIFESP", "UNICAMP", "USP-RP"][i % 5],
      ano: ["2024", "2023", "2022"][i % 3],
      dificuldade: ["Fácil", "Médio", "Difícil"][i % 3],
      tags: [course.especialidade.toLowerCase(), "prova"],
      essencial: i % 2 === 0,
      feedback: ""
    }));
  });

  const FLASHCARDS_BY_COURSE = {
    2572: [
    { id: 201, frente: "O que é GEPA (Granulomatose Eosinofílica com Poliangiíte)?",
      verso: "Vasculite sistêmica de pequenos vasos associada a ANCA, com eosinofilia periférica e manifestações pulmonares, cutâneas e neurológicas.",
      exemplo: "Paciente com asma + eosinofilia + neuropatia periférica sugere fortemente GEPA.",
      tags: ["vasculite", "ANCA", "reumatologia"] },
    { id: 202, frente: "Quais os critérios diagnósticos ACR para GEPA?",
      verso: "Asma, eosinofilia >10%, neuropatia, infiltrados pulmonares migratórios, sinusite, biópsia com eosinófilos extravasculares.",
      exemplo: "4 de 6 critérios → sensibilidade de 85% e especificidade de 99%.",
      tags: ["diagnóstico", "ACR"] },
    { id: 203, frente: "Qual o papel do mepolizumabe no tratamento da GEPA?",
      verso: "Anti-IL5, reduz eosinófilos, aprovado como adjuvante para GEPA refratária ou recidivante.",
      exemplo: "Estudo MIRRA: redução de 50% nas recaídas vs. placebo.",
      tags: ["tratamento", "biológico"] },
    { id: 204, frente: "Diferença clínica entre GPA, MPA e GEPA?",
      verso: "GPA: granulomas + vias aéreas. MPA: pauci-imune sem granuloma. GEPA: asma + eosinofilia + granuloma.",
      exemplo: "", tags: ["diferencial"] },
    { id: 205, frente: "ANCA mais frequente em GEPA?",
      verso: "p-ANCA (MPO) é o mais comum em GEPA, encontrado em ~40% dos casos.",
      exemplo: "", tags: ["laboratório", "ANCA"] },
    { id: 206, frente: "Indicação de ciclofosfamida em vasculite ANCA?",
      verso: "Doença grave com envolvimento renal (GNRP), neurológico ou cardíaco. Considerar rituximabe como alternativa.",
      exemplo: "", tags: ["tratamento"] },
    { id: 207, frente: "Manutenção da remissão em vasculite ANCA?",
      verso: "Azatioprina, metotrexato ou rituximabe por 18-24 meses após indução.",
      exemplo: "", tags: ["manutenção"] },
    { id: 208, frente: "Quando suspeitar de GEPA em paciente asmático?",
      verso: "Asma de difícil controle + eosinofilia + manifestações extrapulmonares (neuropatia, pele, cardíaca).",
      exemplo: "Mononeurite múltipla é altamente sugestiva.", tags: ["clínica"] }]

  };
  [2589, 2604, 2611, 2628, 2645].forEach((cid) => {
    const course = COURSES.find((c) => c.id === cid);
    const n = Math.min(course.flashcards, 5);
    FLASHCARDS_BY_COURSE[cid] = Array.from({ length: n }, (_, i) => ({
      id: cid * 10 + 100 + i,
      frente: `Conceito ${i + 1} — ${course.especialidade}`,
      verso: `Definição teórica do conceito ${i + 1} aplicada ao contexto de ${course.diagnostico}.`,
      exemplo: i % 2 === 0 ? `Aplicação clínica típica no manejo de ${course.diagnostico}.` : "",
      tags: [course.especialidade.toLowerCase(), "conceito"]
    }));
  });

  window.COURSES = COURSES;
  window.QUESTOES_BY_COURSE = QUESTOES_BY_COURSE;
  window.FLASHCARDS_BY_COURSE = FLASHCARDS_BY_COURSE;

})();

// ===== ui.jsx =====
(() => {
  // Shared UI components
  const { useState, useEffect, useRef, useCallback } = React;

  // ────────────────── Icons (small inline set) ──────────────────
  const Icon = {
    search: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>,
    chev: (p) => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6" /></svg>,
    arrowLeft: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>,
    edit: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
    trash: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 6h18" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
    plus: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14" /><path d="M12 5v14" /></svg>,
    upload: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></svg>,
    download: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></svg>,
    file: (p) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
    close: (p) => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>,
    check: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="20 6 9 17 4 12" /></svg>,
    alert: (p) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    view: (p) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
            <div>
              <h3 style={{ fontFamily: "Roboto" }}><span style={{ color: "#475569" }}>{title}</span></h3>
              {subtitle && <p>{subtitle}</p>}
            </div>
            <button className="btn-icon" onClick={onClose} aria-label="Fechar"><Icon.close /></button>
          </div>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-foot">{footer}</div>}
      </div>
    </div>);

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
        underline: document.queryCommandState("underline")
      });
    };

    return (
      <div className="editor">
      <div className="editor-toolbar">
        <button type="button" className={`b ${active.bold ? "active" : ""}`} onMouseDown={(e) => {e.preventDefault();exec("bold");}} title="Negrito (Ctrl+B)">B</button>
        <button type="button" className={`i ${active.italic ? "active" : ""}`} onMouseDown={(e) => {e.preventDefault();exec("italic");}} title="Itálico (Ctrl+I)">I</button>
        <button type="button" className={`u ${active.underline ? "active" : ""}`} onMouseDown={(e) => {e.preventDefault();exec("underline");}} title="Sublinhado (Ctrl+U)">U</button>
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
          onMouseUp={updateActive} />
        
    </div>);

  };

  // ────────────────── Tags input (chips) ──────────────────
  const TagsInput = ({ value, onChange, placeholder }) => {
    const [draft, setDraft] = useState("");
    const addTag = () => {
      const t = draft.trim().replace(/,$/, "");
      if (!t) return;
      if (value.includes(t)) {setDraft("");return;}
      onChange([...value, t]);
      setDraft("");
    };
    const removeTag = (t) => onChange(value.filter((x) => x !== t));
    return (
      <div className="tags-input" onClick={(e) => {
        const inp = e.currentTarget.querySelector("input");
        inp && inp.focus();
      }}>
      {value.map((t) =>
        <span key={t} className="tag-chip">
          {t}
          <button type="button" onClick={() => removeTag(t)} aria-label={`Remover ${t}`}>×</button>
        </span>
        )}
      <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {e.preventDefault();addTag();} else
            if (e.key === "Backspace" && !draft && value.length) {
              onChange(value.slice(0, -1));
            }
          }}
          onBlur={addTag}
          placeholder={value.length ? "" : placeholder || "Digite e pressione Enter"} />
        
    </div>);

  };

  // ────────────────── Toast system ──────────────────
  const ToastContext = React.createContext(null);
  const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);
    const push = useCallback((toast) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { id, ...toast }]);
      setTimeout(() => {
        setToasts((prev) => prev.map((t) => t.id === id ? { ...t, leaving: true } : t));
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 200);
      }, 2800);
    }, []);
    return (
      <ToastContext.Provider value={push}>
      {children}
      <div className="toast-stack">
        {toasts.map((t) =>
          <div key={t.id} className={`toast ${t.type || "success"} ${t.leaving ? "leaving" : ""}`}>
            <span className="ico">{t.type === "danger" ? <Icon.trash /> : <Icon.check />}</span>
            <span className="msg">{t.msg}</span>
          </div>
          )}
      </div>
    </ToastContext.Provider>);

  };
  const useToast = () => React.useContext(ToastContext);

  // ────────────────── Delete confirm modal ──────────────────
  const ConfirmDelete = ({ open, onClose, onConfirm, title, message, confirmLabel }) =>
  <Modal open={open} onClose={onClose} size="narrow"
  title={title}
  footer={
  <>
        <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
        <button className="btn btn-danger" onClick={() => {onConfirm();onClose();}}>{confirmLabel || "Excluir"}</button>
      </>
  }>
    <div className="danger-icon"><Icon.alert /></div>
    <p style={{ margin: 0, fontSize: 14, color: "var(--fg-muted)", lineHeight: 1.55 }}>{message}</p>
    <div className="danger-note">⚠ Essa ação não pode ser desfeita</div>
  </Modal>;


  window.UI = { Icon, DifficultyBadge, Modal, RichEditor, TagsInput, ToastProvider, useToast, ConfirmDelete };

})();

// ===== questoes.jsx =====
(() => {
  // Questões — Listagem + Detalhe + Modais
  const { useState: useStateQ, useMemo: useMemoQ } = React;
  const { Icon: IQ, DifficultyBadge, Modal: ModalQ, RichEditor, TagsInput, useToast: useToastQ, ConfirmDelete: ConfirmDeleteQ } = window.UI;

  // ───── Filter bar ─────
  const QuestoesFilters = ({ onSearch, onImport }) => {
    const [open, setOpen] = useStateQ(false);
    const [q, setQ] = useStateQ("");
    const [adv, setAdv] = useStateQ({ id: "", inst: "", ano: "", dif: "" });
    const submit = (e) => {e && e.preventDefault();onSearch({ q, ...adv });};
    return (
      <form className="filter-bar" onSubmit={submit}>
      <div className="filter-row">
        <div className="search">
          <IQ.search />
          <input placeholder="Buscar por nome do curso…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <button type="button" className={`advanced-toggle ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
          Filtro avançado <span className="chev"><IQ.chev /></span>
        </button>
        <button type="submit" className="btn btn-primary"><IQ.search /> Pesquisar</button>
        <button type="button" className="btn btn-secondary" onClick={onImport}><IQ.upload /> Importar XLSX</button>
      </div>
      {open &&
        <div className="adv-panel">
          <div className="field"><label>ID do curso</label><input value={adv.id} onChange={(e) => setAdv({ ...adv, id: e.target.value })} placeholder="ex. 2572" /></div>
          <div className="field"><label>Instituição</label><input value={adv.inst} onChange={(e) => setAdv({ ...adv, inst: e.target.value })} placeholder="USP, ENARE…" /></div>
          <div className="field"><label>Ano</label><input value={adv.ano} onChange={(e) => setAdv({ ...adv, ano: e.target.value })} placeholder="2024" /></div>
          <div className="field"><label>Dificuldade</label>
            <select value={adv.dif} onChange={(e) => setAdv({ ...adv, dif: e.target.value })}>
              <option value="">Todas</option><option>Fácil</option><option>Médio</option><option>Difícil</option>
            </select>
          </div>
        </div>
        }
    </form>);

  };

  // ───── Listagem ─────
  const QuestoesList = ({ courses, onOpen, onDeleteAll, onImport }) => {
    const [filter, setFilter] = useStateQ({ q: "", id: "", inst: "", ano: "", dif: "" });
    const [confirm, setConfirm] = useStateQ(null);
    const filtered = useMemoQ(() => courses.filter((c) => {
      if (filter.q && !c.nome.toLowerCase().includes(filter.q.toLowerCase())) return false;
      if (filter.id && String(c.id) !== filter.id) return false;
      return true;
    }), [filter, courses]);

    return (
      <>
      <QuestoesFilters onSearch={setFilter} onImport={onImport} />
      <div className="table-card">
        <div className="table-head">
          <h3>Cursos com questões</h3>
          <span className="meta">{filtered.length} curso{filtered.length !== 1 ? "s" : ""}</span>
        </div>
        <table>
          <thead><tr>
            <th style={{ width: 80 }}>ID</th><th>Curso</th><th>Tipo</th><th>Especialidade</th>
            <th style={{ textAlign: "right" }}>Questões</th><th style={{ width: 120, textAlign: "right" }}>Ações</th>
          </tr></thead>
          <tbody>
            {filtered.map((c) =>
              <tr key={c.id}>
                <td className="cell-id">#{c.id}</td>
                <td className="cell-name">{c.nome}
                  <span className="sub">{c.diagnostico}</span>
                </td>
                <td><span className="badge">{c.tipo}</span></td>
                <td style={{ color: "var(--fg-muted)" }}>{c.especialidade}</td>
                <td style={{ textAlign: "right" }}>
                  <span className="cell-count"><span className="num">{c.questoes}</span><span className="lbl">questões</span></span>
                </td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Ver questões" onClick={() => onOpen(c.id)}><IQ.view /></button>
                    <button className="btn-icon danger" title="Excluir todas" onClick={() => setConfirm(c)}><IQ.trash /></button>
                  </div>
                </td>
              </tr>
              )}
            {filtered.length === 0 &&
              <tr><td colSpan={6}><div className="empty"><h4>Nenhum curso encontrado</h4><p>Ajuste os filtros ou importe um arquivo XLSX.</p></div></td></tr>
              }
          </tbody>
        </table>
      </div>
      <ConfirmDeleteQ open={!!confirm} onClose={() => setConfirm(null)}
        onConfirm={() => {onDeleteAll(confirm.id);}}
        title="Excluir todas as questões"
        message={confirm ? <>Isso vai excluir todas as <strong>{confirm.questoes} questões</strong> do curso <strong>#{confirm.id}</strong>. Essa ação não pode ser desfeita.</> : ""}
        confirmLabel="Excluir todas" />
        
    </>);

  };

  // ───── Detalhe ─────
  const QuestoesDetail = ({ course, questoes, onBack, onSave, onDelete }) => {
    const [editing, setEditing] = useStateQ(null);
    const [deleting, setDeleting] = useStateQ(null);
    return (
      <>
      <button className="detail-back" onClick={onBack}><IQ.arrowLeft /> Voltar para listagem</button>
      <div className="course-card">
        <div>
          <div className="id-chip">Curso · <span className="num">#{course.id}</span></div>
          <h2>{course.nome}</h2>
          <p className="subtitle">
            {course.tipo}<span className="dot" />{course.especialidade}<span className="dot" />{course.diagnostico}
          </p>
          <div className="tag-list">
            {course.tags.map((t) => <span key={t} className="badge">{t}</span>)}
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
            <th style={{ width: 60 }}>ID</th><th>Enunciado</th>
            <th style={{ width: 90 }}>Gabarito</th><th>Instituição</th><th style={{ width: 80 }}>Ano</th>
            <th style={{ width: 120 }}>Dificuldade</th><th>Tags</th><th style={{ width: 90, textAlign: "right" }}>Ações</th>
          </tr></thead>
          <tbody>
            {questoes.map((q) =>
              <tr key={q.id}>
                <td className="cell-id">#{q.id}</td>
                <td className="cell-truncate" title={q.enunciado.replace(/<[^>]+>/g, "")}>
                  <span dangerouslySetInnerHTML={{ __html: q.enunciado }} />
                </td>
                <td><span className="badge-circle">{q.gabarito}</span></td>
                <td style={{ color: "var(--fg-muted)" }}>{q.instituicao}</td>
                <td className="cell-id">{q.ano}</td>
                <td><DifficultyBadge value={q.dificuldade} /></td>
                <td><div className="tag-list">{q.tags.slice(0, 3).map((t) => <span key={t} className="badge">{t}</span>)}</div></td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Editar" onClick={() => setEditing(q)}><IQ.edit /></button>
                    <button className="btn-icon danger" title="Excluir" onClick={() => setDeleting(q)}><IQ.trash /></button>
                  </div>
                </td>
              </tr>
              )}
          </tbody>
        </table>
      </div>

      <QuestaoEditModal open={!!editing} onClose={() => setEditing(null)}
        questao={editing} onSave={(q) => {onSave(q);setEditing(null);}} />
      <ConfirmDeleteQ open={!!deleting} onClose={() => setDeleting(null)}
        onConfirm={() => onDelete(deleting.id)}
        title="Excluir questão"
        message={deleting ? <>Tem certeza que deseja excluir a <strong>Questão #{deleting.id}</strong>? Essa ação não pode ser desfeita.</> : ""} />
        
    </>);

  };

  // ───── Edit modal ─────
  const QuestaoEditModal = ({ open, onClose, questao, onSave }) => {
    const [form, setForm] = useStateQ(null);
    React.useEffect(() => {
      if (questao) setForm({ ...questao, alternativas: questao.alternativas.map((a) => ({ ...a })), tags: [...questao.tags] });
    }, [questao]);
    if (!form) return null;

    const set = (k, v) => setForm({ ...form, [k]: v });
    const setAlt = (i, texto) => {
      const a = [...form.alternativas];a[i] = { ...a[i], texto };set("alternativas", a);
    };
    const addAlt = () => {
      const letras = ["A", "B", "C", "D", "E", "F", "G", "H"];
      const used = form.alternativas.map((a) => a.letra);
      const next = letras.find((l) => !used.includes(l));
      if (!next) return;
      set("alternativas", [...form.alternativas, { letra: next, texto: "" }]);
    };
    const removeAlt = (i) => {
      const a = form.alternativas.filter((_, idx) => idx !== i).
      map((alt, idx) => ({ ...alt, letra: ["A", "B", "C", "D", "E", "F", "G", "H"][idx] }));
      let gab = form.gabarito;
      if (!a.find((x) => x.letra === gab)) gab = a[0]?.letra || "";
      setForm({ ...form, alternativas: a, gabarito: gab });
    };

    return (
      <ModalQ open={open} onClose={onClose} size="wide"
      title={`Editar Questão #${form.id}`}
      subtitle="Ajuste o enunciado, alternativas e metadados desta questão."
      footer={
      <>
          <button className="btn btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => onSave(form)}>Salvar alterações</button>
        </>
      }>
      <div className="form-grid">
        <div className="full">
          <label className="field-label">Enunciado</label>
          <RichEditor value={form.enunciado} onChange={(v) => set("enunciado", v)} placeholder="Descreva o caso clínico ou pergunta…" minHeight={100} />
        </div>
        <div className="full field">
          <label>URL da imagem (opcional)</label>
          <input value={form.imagem || ""} onChange={(e) => set("imagem", e.target.value)} placeholder="https://…" />
        </div>

        <div className="full">
          <label className="field-label">Alternativas</label>
          <div className="alt-list">
            {form.alternativas.map((a, i) =>
              <div key={i} className={`alt-row ${a.letra === form.gabarito ? "correct" : ""}`}>
                <span className="letter">{a.letra}</span>
                <input value={a.texto} onChange={(e) => setAlt(i, e.target.value)} placeholder={`Texto da alternativa ${a.letra}…`} />
                <button className="btn-icon danger" onClick={() => removeAlt(i)} title="Remover" disabled={form.alternativas.length <= 2}>
                  <IQ.close />
                </button>
              </div>
              )}
            <button type="button" className="alt-add" onClick={addAlt}>
              <IQ.plus /> Adicionar alternativa
            </button>
          </div>
        </div>

        <div className="field">
          <label>Gabarito</label>
          <select value={form.gabarito} onChange={(e) => set("gabarito", e.target.value)}>
            {form.alternativas.map((a) => <option key={a.letra} value={a.letra}>{a.letra}</option>)}
          </select>
        </div>
        <div className="field">
          <label>Ano</label>
          <input value={form.ano} onChange={(e) => set("ano", e.target.value)} placeholder="2024" />
        </div>
        <div className="field">
          <label>Dificuldade</label>
          <select value={form.dificuldade} onChange={(e) => set("dificuldade", e.target.value)}>
            <option>Fácil</option><option>Médio</option><option>Difícil</option>
          </select>
        </div>
        <div className="field">
          <label>Instituição</label>
          <input value={form.instituicao} onChange={(e) => set("instituicao", e.target.value)} placeholder="USP, ENARE…" />
        </div>
        <div className="field">
          <label>Essencial</label>
          <select value={form.essencial ? "TRUE" : "FALSE"} onChange={(e) => set("essencial", e.target.value === "TRUE")}>
            <option>TRUE</option><option>FALSE</option>
          </select>
        </div>
        <div className="full">
          <label className="field-label">Tags</label>
          <TagsInput value={form.tags} onChange={(v) => set("tags", v)} placeholder="Digite uma tag e pressione Enter" />
        </div>
        <div className="full field">
          <label>Feedback do professor (opcional)</label>
          <textarea value={form.feedback || ""} onChange={(e) => set("feedback", e.target.value)}
            placeholder="Comentário pedagógico sobre a questão…"
            style={{ width: "100%", minHeight: 80, resize: "vertical", padding: "10px 12px",
              border: "1px solid var(--border)", borderRadius: 8, fontSize: 13.5, outline: "none",
              fontFamily: "var(--font-sans)", background: "var(--surface)" }} />
        </div>
      </div>
      <style>{`
        .field-label { display:block; font-family:var(--font-mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--fg-soft); margin-bottom:6px; }
        textarea:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(15,118,110,.12); }
      `}</style>
    </ModalQ>);

  };

  // ───── Import modal ─────
  const ImportModal = ({ open, onClose, onImport, kind }) => {
    const [file, setFile] = useStateQ(null);
    const [over, setOver] = useStateQ(false);
    const onDrop = (e) => {
      e.preventDefault();setOver(false);
      const f = e.dataTransfer.files?.[0];
      if (f) setFile(f);
    };
    return (
      <ModalQ open={open} onClose={() => {setFile(null);onClose();}}
      title={`Importar ${kind === "questoes" ? "questões" : "flashcards"} via XLSX`}
      subtitle="Arraste um arquivo .xlsx ou clique para selecionar."
      footer={
      <>
          <button className="btn btn-secondary" onClick={() => {setFile(null);onClose();}}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => {onImport(file);setFile(null);}} disabled={!file}>Importar</button>
        </>
      }>
      <label className={`dropzone ${over ? "over" : ""} ${file ? "has-file" : ""}`}
        onDragOver={(e) => {e.preventDefault();setOver(true);}}
        onDragLeave={() => setOver(false)}
        onDrop={onDrop}>
        <input type="file" accept=".xlsx" style={{ display: "none" }} onChange={(e) => setFile(e.target.files?.[0])} />
        <span className="ico"><IQ.file /></span>
        {file ?
          <div style={{ flex: 1 }}>
            <div className="label">{file.name}</div>
            <div className="hint">{(file.size / 1024).toFixed(1)} KB · pronto para importar</div>
          </div> :

          <div>
            <div className="label">Solte o arquivo aqui ou clique para selecionar</div>
            <div className="hint">Apenas arquivos .xlsx · máx. 10 MB</div>
          </div>
          }
      </label>

      <div className="column-spec">
        <strong style={{ color: "var(--fg)", fontSize: 12, textTransform: "uppercase", letterSpacing: ".08em", fontFamily: "Roboto" }}>Colunas esperadas</strong><br />
        {kind === "questoes" ?
          <>
            <span className="col-name">curso_id</span> · <span className="col-name">enunciado</span> · <span className="col-name">alt_a</span>…<span className="col-name">alt_e</span><br />
            <span className="col-name">gabarito</span> · <span className="col-name">ano</span> · <span className="col-name">dificuldade</span> · <span className="col-name">instituicao</span> · <span className="col-name">essencial</span><br />
            <span className="col-opt">imagem_url (opcional)</span> · <span className="col-name">tags</span> · <span className="col-opt">feedback (opcional)</span>
          </> :

          <>
            <span className="col-name">curso_id</span> · <span className="col-name">frente</span> · <span className="col-name">verso</span><br />
            <span className="col-opt">exemplo (opcional)</span> · <span className="col-name">tags</span>
          </>
          }
      </div>

      <a className="template-link" href="#" onClick={(e) => e.preventDefault()} style={{ marginTop: 14, display: "inline-flex" }}>
        <IQ.download /> Baixar modelo XLSX de {kind === "questoes" ? "questões" : "flashcards"}
      </a>
    </ModalQ>);

  };

  window.Questoes = { QuestoesList, QuestoesDetail, ImportModal };

})();

// ===== flashcards.jsx =====
(() => {
  // Flashcards — Listagem + Detalhe + Modais
  const { useState: useStateF, useMemo: useMemoF } = React;
  const { Icon: IF, Modal: ModalF, RichEditor: RichEditorF, TagsInput: TagsInputF, ConfirmDelete: ConfirmDeleteF } = window.UI;

  const FlashcardsFilters = ({ onSearch, onImport }) => {
    const [open, setOpen] = useStateF(false);
    const [q, setQ] = useStateF("");
    const [adv, setAdv] = useStateF({ id: "", tags: "" });
    return (
      <form className="filter-bar" onSubmit={(e) => {e.preventDefault();onSearch({ q, ...adv });}}>
      <div className="filter-row">
        <div className="search">
          <IF.search />
          <input placeholder="Buscar por nome do curso…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <button type="button" className={`advanced-toggle ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
          Filtro avançado <span className="chev"><IF.chev /></span>
        </button>
        <button type="submit" className="btn btn-primary"><IF.search /> Pesquisar</button>
        <button type="button" className="btn btn-secondary" onClick={onImport}><IF.upload /> Importar XLSX</button>
      </div>
      {open &&
        <div className="adv-panel">
          <div className="field"><label>ID do curso</label><input value={adv.id} onChange={(e) => setAdv({ ...adv, id: e.target.value })} placeholder="ex. 2572" /></div>
          <div className="field"><label>Tags</label><input value={adv.tags} onChange={(e) => setAdv({ ...adv, tags: e.target.value })} placeholder="vasculite, ANCA…" /></div>
        </div>
        }
    </form>);

  };

  const FlashcardsList = ({ courses, onOpen, onDeleteAll, onImport }) => {
    const [filter, setFilter] = useStateF({ q: "", id: "" });
    const [confirm, setConfirm] = useStateF(null);
    const filtered = useMemoF(() => courses.filter((c) => {
      if (filter.q && !c.nome.toLowerCase().includes(filter.q.toLowerCase())) return false;
      if (filter.id && String(c.id) !== filter.id) return false;
      return true;
    }), [filter, courses]);

    return (
      <>
      <FlashcardsFilters onSearch={setFilter} onImport={onImport} />
      <div className="table-card">
        <div className="table-head">
          <h3>Cursos com flashcards</h3>
          <span className="meta">{filtered.length} curso{filtered.length !== 1 ? "s" : ""}</span>
        </div>
        <table>
          <thead><tr>
            <th style={{ width: 80 }}>ID</th><th>Curso</th><th>Tipo</th><th>Especialidade</th>
            <th style={{ textAlign: "right" }}>Flashcards</th><th style={{ width: 120, textAlign: "right" }}>Ações</th>
          </tr></thead>
          <tbody>
            {filtered.map((c) =>
              <tr key={c.id}>
                <td className="cell-id">#{c.id}</td>
                <td className="cell-name">{c.nome}<span className="sub">{c.diagnostico}</span></td>
                <td><span className="badge">{c.tipo}</span></td>
                <td style={{ color: "var(--fg-muted)" }}>{c.especialidade}</td>
                <td style={{ textAlign: "right" }}>
                  <span className="cell-count"><span className="num">{c.flashcards}</span><span className="lbl">flashcards</span></span>
                </td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Ver flashcards" onClick={() => onOpen(c.id)}><IF.view /></button>
                    <button className="btn-icon danger" title="Excluir todos" onClick={() => setConfirm(c)}><IF.trash /></button>
                  </div>
                </td>
              </tr>
              )}
            {filtered.length === 0 &&
              <tr><td colSpan={6}><div className="empty"><h4>Nenhum curso encontrado</h4><p>Ajuste os filtros ou importe um arquivo XLSX.</p></div></td></tr>
              }
          </tbody>
        </table>
      </div>
      <ConfirmDeleteF open={!!confirm} onClose={() => setConfirm(null)}
        onConfirm={() => onDeleteAll(confirm.id)}
        title="Excluir todos os flashcards"
        message={confirm ? <>Isso vai excluir todos os <strong>{confirm.flashcards} flashcards</strong> do curso <strong>#{confirm.id}</strong>. Essa ação não pode ser desfeita.</> : ""}
        confirmLabel="Excluir todos" />
        
    </>);

  };

  const FlashcardsDetail = ({ course, flashcards, onBack, onSave, onDelete, onCreate }) => {
    const [editing, setEditing] = useStateF(null);
    const [deleting, setDeleting] = useStateF(null);

    return (
      <>
      <button className="detail-back" onClick={onBack}><IF.arrowLeft /> Voltar para listagem</button>
      <div className="course-card">
        <div>
          <div className="id-chip">Curso · <span className="num">#{course.id}</span></div>
          <h2>{course.nome}</h2>
          <p className="subtitle">
            {course.tipo}<span className="dot" />{course.especialidade}<span className="dot" />{course.diagnostico}
          </p>
          <div className="tag-list">
            {course.tags.map((t) => <span key={t} className="badge">{t}</span>)}
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
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <span className="meta">{flashcards.length} flashcards</span>
            <button className="btn btn-primary btn-sm" onClick={onCreate}><IF.plus /> Novo flashcard</button>
          </div>
        </div>
        <table>
          <thead><tr>
            <th style={{ width: 60 }}>ID</th><th>Frente</th><th>Verso</th><th><span className="tip">Exemplo <i className="tip-trigger" tabIndex={0} aria-label="O que é Exemplo?">i</i><span className="tip-bubble" role="tooltip">O <strong>Exemplo</strong> funciona como um <em>feedback</em> do flashcard — uma aplicação prática, caso clínico ou mnemônico que reforça o que foi aprendido no verso.</span></span></th><th>Tags</th>
            <th style={{ width: 90, textAlign: "right" }}>Ações</th>
          </tr></thead>
          <tbody>
            {flashcards.map((f) =>
              <tr key={f.id}>
                <td className="cell-id">#{f.id}</td>
                <td className="cell-truncate" style={{ maxWidth: 240, color: "var(--fg)" }}>
                  <span dangerouslySetInnerHTML={{ __html: f.frente }} />
                </td>
                <td className="cell-truncate" style={{ maxWidth: 260 }}>
                  <span dangerouslySetInnerHTML={{ __html: f.verso }} />
                </td>
                <td className="cell-truncate" style={{ maxWidth: 200, fontStyle: f.exemplo ? "italic" : "normal", color: f.exemplo ? "var(--fg-soft)" : "var(--fg-faint)" }}>
                  {f.exemplo ? <span dangerouslySetInnerHTML={{ __html: f.exemplo }} /> : "—"}
                </td>
                <td><div className="tag-list">{f.tags.slice(0, 3).map((t) => <span key={t} className="badge badge-soft-accent">{t}</span>)}</div></td>
                <td>
                  <div className="cell-actions">
                    <button className="btn-icon" title="Editar" onClick={() => setEditing(f)}><IF.edit /></button>
                    <button className="btn-icon danger" title="Excluir" onClick={() => setDeleting(f)}><IF.trash /></button>
                  </div>
                </td>
              </tr>
              )}
          </tbody>
        </table>
      </div>

      <FlashcardEditModal open={!!editing} onClose={() => setEditing(null)}
        flashcard={editing} onSave={(f) => {onSave(f);setEditing(null);}} />
      <ConfirmDeleteF open={!!deleting} onClose={() => setDeleting(null)}
        onConfirm={() => onDelete(deleting.id)}
        title="Excluir flashcard"
        message={deleting ? <>Tem certeza que deseja excluir o <strong>Flashcard #{deleting.id}</strong>? Essa ação não pode ser desfeita.</> : ""} />
        
    </>);

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
          <button className="btn btn-primary" onClick={() => onSave(form)}>{isNew ? "Criar flashcard" : "Salvar alterações"}</button>
        </>
      }>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <label className="field-label-f">Frente</label>
          <RichEditorF value={form.frente} onChange={(v) => set("frente", v)} placeholder="Pergunta ou conceito…" minHeight={80} />
        </div>
        <div>
          <label className="field-label-f">Verso</label>
          <RichEditorF value={form.verso} onChange={(v) => set("verso", v)} placeholder="Resposta, definição ou explicação…" minHeight={100} />
        </div>
        <div>
          <label className="field-label-f" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span className="tip">Exemplo (opcional) <i className="tip-trigger" tabIndex={0} aria-label="O que é Exemplo?">i</i><span className="tip-bubble" role="tooltip">O <strong>Exemplo</strong> funciona como um <em>feedback</em> do flashcard — aplicação prática, caso clínico ou mnemônico que reforça o aprendizado do verso.</span></span></label>
          <RichEditorF value={form.exemplo || ""} onChange={(v) => set("exemplo", v)} placeholder="Aplicação prática, caso clínico, mnemônico…" minHeight={70} />
        </div>
        <div>
          <label className="field-label-f">Tags</label>
          <TagsInputF value={form.tags} onChange={(v) => set("tags", v)} placeholder="Digite uma tag e pressione Enter" />
        </div>
      </div>
      <style>{`.field-label-f { display:block; font-family:var(--font-mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--fg-soft); margin-bottom:6px; }`}</style>
    </ModalF>);

  };

  window.Flashcards = { FlashcardsList, FlashcardsDetail };

})();

// ===== app.jsx =====
(() => {
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
    const [coursesQ, setCoursesQ] = useState(() => window.COURSES.map((c) => ({ ...c })));
    const [questoesMap, setQuestoesMap] = useState(() => {
      const m = {};
      Object.entries(window.QUESTOES_BY_COURSE).forEach(([cid, arr]) => m[cid] = arr.map((x) => ({ ...x, alternativas: x.alternativas.map((a) => ({ ...a })), tags: [...x.tags] })));
      return m;
    });
    const [flashMap, setFlashMap] = useState(() => {
      const m = {};
      Object.entries(window.FLASHCARDS_BY_COURSE).forEach(([cid, arr]) => m[cid] = arr.map((x) => ({ ...x, tags: [...x.tags] })));
      return m;
    });

    const [importOpen, setImportOpen] = useState(false);
    const toast = useToast();

    // When section changes, reset to list
    const switchSection = (s) => {
      setSection(s);
      setCourseId(null);
    };

    const currentCourse = useMemo(() => coursesQ.find((c) => c.id === courseId), [courseId, coursesQ]);

    // ── Handlers — questões ──
    const handleSaveQ = (q) => {
      setQuestoesMap((prev) => ({
        ...prev,
        [courseId]: prev[courseId].map((x) => x.id === q.id ? q : x)
      }));
      toast({ type: "success", msg: `Questão #${q.id} atualizada com sucesso` });
    };
    const handleDeleteQ = (qid) => {
      setQuestoesMap((prev) => ({
        ...prev,
        [courseId]: prev[courseId].filter((x) => x.id !== qid)
      }));
      setCoursesQ((prev) => prev.map((c) => c.id === courseId ? { ...c, questoes: Math.max(0, c.questoes - 1) } : c));
      toast({ type: "danger", msg: `Questão #${qid} excluída` });
    };
    const handleDeleteAllQ = (cid) => {
      const count = questoesMap[cid]?.length || 0;
      setQuestoesMap((prev) => ({ ...prev, [cid]: [] }));
      setCoursesQ((prev) => prev.map((c) => c.id === cid ? { ...c, questoes: 0 } : c));
      toast({ type: "danger", msg: `${count} questões do curso #${cid} excluídas` });
    };

    // ── Handlers — flashcards ──
    const handleSaveF = (f) => {
      const isNew = !flashMap[courseId]?.find((x) => x.id === f.id);
      setFlashMap((prev) => {
        const arr = prev[courseId] || [];
        const next = isNew ? [...arr, { ...f, id: Math.max(1000, ...arr.map((x) => x.id)) + 1 }] : arr.map((x) => x.id === f.id ? f : x);
        return { ...prev, [courseId]: next };
      });
      if (isNew) {
        setCoursesQ((prev) => prev.map((c) => c.id === courseId ? { ...c, flashcards: c.flashcards + 1 } : c));
        toast({ type: "success", msg: `Flashcard criado com sucesso` });
      } else {
        toast({ type: "success", msg: `Flashcard #${f.id} atualizado com sucesso` });
      }
    };
    const handleDeleteF = (fid) => {
      setFlashMap((prev) => ({ ...prev, [courseId]: prev[courseId].filter((x) => x.id !== fid) }));
      setCoursesQ((prev) => prev.map((c) => c.id === courseId ? { ...c, flashcards: Math.max(0, c.flashcards - 1) } : c));
      toast({ type: "danger", msg: `Flashcard #${fid} excluído` });
    };
    const handleDeleteAllF = (cid) => {
      const count = flashMap[cid]?.length || 0;
      setFlashMap((prev) => ({ ...prev, [cid]: [] }));
      setCoursesQ((prev) => prev.map((c) => c.id === cid ? { ...c, flashcards: 0 } : c));
      toast({ type: "danger", msg: `${count} flashcards do curso #${cid} excluídos` });
    };

    const [creatingFlash, setCreatingFlash] = useState(false);

    // Filter courses by what they have
    const coursesWithQ = coursesQ.filter((c) => (questoesMap[c.id]?.length || 0) > 0);
    const coursesWithF = coursesQ.filter((c) => (flashMap[c.id]?.length || 0) > 0);

    return (
      <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="mark"> <em></em></span>
          <span className="dot" />
          <span className="kicker"></span>
        </div>
        <nav className="breadcrumb">
          <span></span>
          <span className="sep"></span>
          <span className="current">{section === "questoes" ? "Questões — Trilha" : "Flashcards"}</span>
          {currentCourse && <><span className="sep">/</span><span className="current">#{currentCourse.id}</span></>}
        </nav>
      </header>

      <div className="section-tabs">
        <button className={section === "questoes" ? "active" : ""} onClick={() => switchSection("questoes")}>
          Questões
          <span className="count">{coursesWithQ.reduce((a, c) => a + (questoesMap[c.id]?.length || 0), 0)}</span>
        </button>
        <button className={section === "flashcards" ? "active" : ""} onClick={() => switchSection("flashcards")}>
          Flashcards
          <span className="count">{coursesWithF.reduce((a, c) => a + (flashMap[c.id]?.length || 0), 0)}</span>
        </button>
      </div>

      {courseId === null &&
        <div className="page-head">
          <h1 style={{ fontWeight: "500", fontFamily: "Roboto" }}>{section === "questoes" ? <><span style={{ color: "#475569", fontWeight: "500" }}>Questões</span> <em style={{ fontFamily: "Roboto" }}></em></> : <>Flashcards</>}</h1>
          <p>
            {section === "questoes" ?
            "Gerencie o banco de questões por curso. Importe via XLSX, edite alternativas e gabaritos, ou faça exclusões em massa quando preciso recomeçar." :
            "Cartões de estudo (frente / verso / exemplo) organizados por curso. Importe em lote ou crie um a um direto pela interface."}
          </p>
        </div>
        }

      {section === "questoes" && courseId === null &&
        <QuestoesList
          courses={coursesWithQ}
          onOpen={setCourseId}
          onDeleteAll={handleDeleteAllQ}
          onImport={() => setImportOpen(true)} />

        }
      {section === "questoes" && currentCourse &&
        <QuestoesDetail
          course={currentCourse}
          questoes={questoesMap[courseId] || []}
          onBack={() => setCourseId(null)}
          onSave={handleSaveQ}
          onDelete={handleDeleteQ} />

        }
      {section === "flashcards" && courseId === null &&
        <FlashcardsList
          courses={coursesWithF}
          onOpen={setCourseId}
          onDeleteAll={handleDeleteAllF}
          onImport={() => setImportOpen(true)} />

        }
      {section === "flashcards" && currentCourse &&
        <FlashcardsDetail
          course={currentCourse}
          flashcards={flashMap[courseId] || []}
          onBack={() => setCourseId(null)}
          onSave={handleSaveF}
          onDelete={handleDeleteF}
          onCreate={() => setCreatingFlash(true)} />

        }

      <ImportModal open={importOpen} onClose={() => setImportOpen(false)}
        kind={section}
        onImport={(file) => {
          setImportOpen(false);
          if (file) toast({ type: "success", msg: `${file.name} importado com sucesso · 0 erros` });
        }} />

      {/* New flashcard modal */}
      {creatingFlash &&
        <NewFlashcardModal
          onClose={() => setCreatingFlash(false)}
          onSave={(f) => {handleSaveF(f);setCreatingFlash(false);}} />

        }
    </div>);

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
          <button className="btn btn-primary" onClick={() => onSave(form)}>Criar flashcard</button>
        </>
      }>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div><label className="lf">Frente</label><RichEditor value={form.frente} onChange={(v) => set("frente", v)} placeholder="Pergunta ou conceito…" minHeight={80} /></div>
        <div><label className="lf">Verso</label><RichEditor value={form.verso} onChange={(v) => set("verso", v)} placeholder="Resposta, definição ou explicação…" minHeight={100} /></div>
        <div><label className="lf" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span className="tip">Exemplo (opcional) <i className="tip-trigger" tabIndex={0} aria-label="O que é Exemplo?">i</i><span className="tip-bubble" role="tooltip">O <strong>Exemplo</strong> funciona como um <em>feedback</em> do flashcard — aplicação prática, caso clínico ou mnemônico que reforça o aprendizado do verso.</span></span></label><RichEditor value={form.exemplo} onChange={(v) => set("exemplo", v)} placeholder="Aplicação prática, caso clínico, mnemônico…" minHeight={70} /></div>
        <div><label className="lf">Tags</label><TagsInput value={form.tags} onChange={(v) => set("tags", v)} placeholder="Digite uma tag e pressione Enter" /></div>
      </div>
      <style>{`.lf { display:block; font-family:var(--font-mono); font-size:10px; letter-spacing:.1em; text-transform:uppercase; color:var(--fg-soft); margin-bottom:6px; }`}</style>
    </Modal>);

  };

  ReactDOM.createRoot(document.getElementById("root")).render(
    <ToastProvider><App /></ToastProvider>
  );

})();