import React, { useCallback, useEffect, useState } from 'react';
import { ToastProvider, useToast } from './components/ui/Toast.jsx';
import { QuestoesList } from './components/questoes/QuestoesList.jsx';
import { QuestoesDetail } from './components/questoes/QuestoesDetail.jsx';
import { ImportModal } from './components/questoes/ImportModal.jsx';
import { FlashcardsList } from './components/flashcards/FlashcardsList.jsx';
import { FlashcardsDetail } from './components/flashcards/FlashcardsDetail.jsx';
import { FlashcardEditModal } from './components/flashcards/FlashcardEditModal.jsx';
import { BuscaGlobal } from './components/BuscaGlobal.jsx';
import { cursosAPI, questoesAPI, flashcardsAPI } from './services/api.js';

function AdminApp() {
  const toast = useToast();

  // ── Navigation ──
  // section: 'questoes' | 'flashcards' | 'busca'
  const [section, setSection]   = useState('questoes');
  const [courseId, setCourseId] = useState(null);

  // ── Data ──
  const [courses, setCourses]                     = useState([]);
  const [coursesLoading, setCoursesLoading]       = useState(false);
  const [questoes, setQuestoes]                   = useState([]);
  const [questoesLoading, setQuestoesLoading]     = useState(false);
  const [flashcards, setFlashcards]               = useState([]);
  const [flashcardsLoading, setFlashcardsLoading] = useState(false);

  // ── Modals ──
  const [importOpen, setImportOpen]       = useState(false);
  const [creatingFlash, setCreatingFlash] = useState(false);

  // ── Load courses on login ──
  useEffect(() => {
    setCoursesLoading(true);
    cursosAPI.listar()
      .then(setCourses)
      .catch((err) => toast({ type: 'danger', msg: `Erro ao carregar aulas: ${err.message}` }))
      .finally(() => setCoursesLoading(false));
  }, [section]);

  const currentCourse = courses.find((c) => c.id === courseId) ?? null;

  // ── Load questions when entering detail ──
  useEffect(() => {
    if (!courseId || section !== 'questoes') return;
    setQuestoesLoading(true);
    questoesAPI.listarPorCurso(courseId)
      .then(setQuestoes)
      .catch((err) => toast({ type: 'danger', msg: `Erro ao carregar questões: ${err.message}` }))
      .finally(() => setQuestoesLoading(false));
  }, [courseId, section]);

  // ── Load flashcards when entering detail ──
  useEffect(() => {
    if (!courseId || section !== 'flashcards') return;
    setFlashcardsLoading(true);
    flashcardsAPI.listarPorCurso(courseId)
      .then(setFlashcards)
      .catch((err) => toast({ type: 'danger', msg: `Erro ao carregar flashcards: ${err.message}` }))
      .finally(() => setFlashcardsLoading(false));
  }, [courseId, section]);

  const switchSection = (s) => {
    setSection(s);
    setCourseId(null);
    setQuestoes([]);
    setFlashcards([]);
  };

  // ── Handlers — questões ──

  const handleSaveQ = useCallback(async (q) => {
    try {
      const updated = await questoesAPI.atualizar(q.id, q);
      setQuestoes((prev) => prev.map((x) => x.id === updated.id ? updated : x));
      toast({ type: 'success', msg: `Questão #${q.id} atualizada` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao salvar: ${err.message}` });
    }
  }, []);

  const handleDeleteQ = useCallback(async (qid) => {
    try {
      await questoesAPI.excluir(qid);
      setQuestoes((prev) => prev.filter((x) => x.id !== qid));
      setCourses((prev) => prev.map((c) =>
        c.id === courseId
          ? { ...c, questoes_count: Math.max(0, c.questoes_count - 1) }
          : c
      ));
      toast({ type: 'danger', msg: `Questão #${qid} excluída` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao excluir: ${err.message}` });
    }
  }, [courseId]);

  const handleDeleteAllQ = useCallback(async (cid) => {
    const ids = questoes.map((q) => q.id);
    if (!ids.length) return;
    try {
      await questoesAPI.excluirTodas(cid, ids);
      setQuestoes([]);
      setCourses((prev) => prev.map((c) =>
        c.id === cid ? { ...c, questoes_count: 0 } : c
      ));
      toast({ type: 'danger', msg: `${ids.length} questões excluídas` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro: ${err.message}` });
    }
  }, [questoes]);

  // ── Handlers — flashcards ──

  const handleSaveF = useCallback(async (f) => {
    const isNew = !f.id || String(f.id).startsWith('new-');
    try {
      if (isNew) {
        const created = await flashcardsAPI.criar(courseId, f);
        setFlashcards((prev) => [...prev, created]);
        setCourses((prev) => prev.map((c) =>
          c.id === courseId
            ? { ...c, flashcards_count: c.flashcards_count + 1 }
            : c
        ));
        toast({ type: 'success', msg: 'Flashcard criado' });
      } else {
        const updated = await flashcardsAPI.atualizar(f.id, f);
        setFlashcards((prev) => prev.map((x) => x.id === updated.id ? updated : x));
        toast({ type: 'success', msg: `Flashcard #${f.id} atualizado` });
      }
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao salvar: ${err.message}` });
    }
  }, [courseId]);

  const handleDeleteF = useCallback(async (fid) => {
    try {
      await flashcardsAPI.excluir(fid);
      setFlashcards((prev) => prev.filter((x) => x.id !== fid));
      setCourses((prev) => prev.map((c) =>
        c.id === courseId
          ? { ...c, flashcards_count: Math.max(0, c.flashcards_count - 1) }
          : c
      ));
      toast({ type: 'danger', msg: `Flashcard #${fid} excluído` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao excluir: ${err.message}` });
    }
  }, [courseId]);

  const handleDeleteAllF = useCallback(async (cid) => {
    const ids = flashcards.map((f) => f.id);
    if (!ids.length) return;
    try {
      await flashcardsAPI.excluirTodos(cid, ids);
      setFlashcards([]);
      setCourses((prev) => prev.map((c) =>
        c.id === cid ? { ...c, flashcards_count: 0 } : c
      ));
      toast({ type: 'danger', msg: `${ids.length} flashcards excluídos` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro: ${err.message}` });
    }
  }, [flashcards]);

  // ── Render ──

  const totalQuestoes   = courses.reduce((a, c) => a + (c.questoes_count   ?? 0), 0);
  const totalFlashcards = courses.reduce((a, c) => a + (c.flashcards_count ?? 0), 0);
  const coursesWithQ    = courses.filter((c) => (c.questoes_count   ?? 0) > 0);
  const coursesWithF    = courses.filter((c) => (c.flashcards_count ?? 0) > 0);

  const breadcrumbSection = {
    questoes:   'Questões — Trilha',
    flashcards: 'Flashcards',
    busca:      'Busca Global',
  }[section];

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="mark">Admin Flashcards e Questões <em>3.0</em></span>
          <span className="dot" />
          <span className="kicker">Admin · Aulas</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <nav className="breadcrumb">
            <span>Aulas</span>
            <span className="sep">/</span>
            <span className="current">{breadcrumbSection}</span>
            {currentCourse && section !== 'busca' && (
              <>
                <span className="sep">/</span>
                <span className="current">{currentCourse.nome}</span>
              </>
            )}
          </nav>

        </div>
      </header>

      <div className="section-tabs">
        <button
          className={section === 'questoes' ? 'active' : ''}
          onClick={() => switchSection('questoes')}
        >
          Questões — Trilha
          <span className="count">{totalQuestoes}</span>
        </button>
        <button
          className={section === 'flashcards' ? 'active' : ''}
          onClick={() => switchSection('flashcards')}
        >
          Flashcards
          <span className="count">{totalFlashcards}</span>
        </button>
        <button
          className={section === 'busca' ? 'active' : ''}
          onClick={() => switchSection('busca')}
        >
          Busca Global
        </button>
      </div>

      {/* ── Busca Global ── */}
      {section === 'busca' && (
        <BuscaGlobal
          onSaveQ={handleSaveQ}
          onDeleteQ={(id) => handleDeleteQ(id)}
          onSaveF={handleSaveF}
          onDeleteF={(id) => handleDeleteF(id)}
        />
      )}

      {/* ── Questões ── */}
      {section === 'questoes' && courseId === null && (
        <>
          <div className="page-head">
            <h1>
              <span style={{ color: '#475569', fontWeight: 500 }}>Questões</span>{' '}
              <em>— Trilha</em>
            </h1>
            <p>Gerencie o banco de questões por aula. Edite alternativas e gabaritos, ou faça exclusões quando precisar recomeçar.</p>
          </div>
          <QuestoesList
            courses={coursesWithQ}
            loading={coursesLoading}
            onOpen={setCourseId}
            onDeleteAll={handleDeleteAllQ}
            onImport={() => setImportOpen(true)}
          />
        </>
      )}

      {section === 'questoes' && currentCourse && (
        <QuestoesDetail
          course={currentCourse}
          questoes={questoes}
          loading={questoesLoading}
          onBack={() => { setCourseId(null); setQuestoes([]); }}
          onSave={handleSaveQ}
          onDelete={handleDeleteQ}
        />
      )}

      {/* ── Flashcards ── */}
      {section === 'flashcards' && courseId === null && (
        <>
          <div className="page-head">
            <h1>
              <span style={{ color: '#475569', fontWeight: 500 }}>Flashcards</span>
            </h1>
            <p>Cartões de estudo (frente / verso / exemplo) organizados por aula. Crie um a um ou importe em lote.</p>
          </div>
          <FlashcardsList
            courses={coursesWithF}
            loading={coursesLoading}
            onOpen={setCourseId}
            onDeleteAll={handleDeleteAllF}
            onImport={() => setImportOpen(true)}
          />
        </>
      )}

      {section === 'flashcards' && currentCourse && (
        <FlashcardsDetail
          course={currentCourse}
          flashcards={flashcards}
          loading={flashcardsLoading}
          onBack={() => { setCourseId(null); setFlashcards([]); }}
          onSave={handleSaveF}
          onDelete={handleDeleteF}
          onCreate={() => setCreatingFlash(true)}
        />
      )}

      <ImportModal
        open={importOpen}
        onClose={() => setImportOpen(false)}
        kind={section}
        onImportDone={({ ok, failed }) => {
          // Recarrega cursos para atualizar contagens
          cursosAPI.listar().then(setCourses).catch(() => {});
          // Recarrega questões/flashcards do curso atual se estiver em detalhe
          if (courseId && section === 'questoes') {
            questoesAPI.listarPorCurso(courseId).then(setQuestoes).catch(() => {});
          }
          if (courseId && section === 'flashcards') {
            flashcardsAPI.listarPorCurso(courseId).then(setFlashcards).catch(() => {});
          }
        }}
      />

      <FlashcardEditModal
        open={creatingFlash}
        onClose={() => setCreatingFlash(false)}
        flashcard={creatingFlash ? { id: `new-${Date.now()}`, frente: '', verso: '', exemplo: '', tags: [], aula_id: courseId } : null}
        onSave={(f) => { handleSaveF(f); setCreatingFlash(false); }}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AdminApp />
    </ToastProvider>
  );
}