import React, { useCallback, useEffect, useState } from 'react';
import { ToastProvider, useToast } from './components/ui/Toast.jsx';
import { QuestoesList } from './components/questoes/QuestoesList.jsx';
import { QuestoesDetail } from './components/questoes/QuestoesDetail.jsx';
import { ImportModal } from './components/questoes/ImportModal.jsx';
import { FlashcardsList } from './components/flashcards/FlashcardsList.jsx';
import { FlashcardsDetail } from './components/flashcards/FlashcardsDetail.jsx';
import { FlashcardEditModal } from './components/flashcards/FlashcardEditModal.jsx';
import { cursosAPI, questoesAPI, flashcardsAPI } from './services/api.js';

function AdminApp() {
  const toast = useToast();

  const [section, setSection] = useState('questoes');
  const [courseId, setCourseId] = useState(null);

  // Courses list
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  // Detail data
  const [questoes, setQuestoes] = useState([]);
  const [questoesLoading, setQuestoesLoading] = useState(false);
  const [flashcards, setFlashcards] = useState([]);
  const [flashcardsLoading, setFlashcardsLoading] = useState(false);

  // Modals
  const [importOpen, setImportOpen] = useState(false);
  const [creatingFlash, setCreatingFlash] = useState(false);

  // Load courses on mount
  useEffect(() => {
    setCoursesLoading(true);
    cursosAPI.listar()
      .then(setCourses)
      .catch((err) => toast({ type: 'danger', msg: `Erro ao carregar cursos: ${err.message}` }))
      .finally(() => setCoursesLoading(false));
  }, []);

  const currentCourse = courses.find((c) => c.id === courseId) ?? null;

  // Load questions when entering a course detail (questões tab)
  useEffect(() => {
    if (!courseId || section !== 'questoes') return;
    setQuestoesLoading(true);
    questoesAPI.listarPorCurso(courseId)
      .then(setQuestoes)
      .catch((err) => toast({ type: 'danger', msg: `Erro ao carregar questões: ${err.message}` }))
      .finally(() => setQuestoesLoading(false));
  }, [courseId, section]);

  // Load flashcards when entering a course detail (flashcards tab)
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
      toast({ type: 'success', msg: `Questão #${q.id} atualizada com sucesso` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao salvar questão: ${err.message}` });
    }
  }, [courseId]);

  const handleDeleteQ = useCallback(async (qid) => {
    try {
      await questoesAPI.excluir(qid);
      setQuestoes((prev) => prev.filter((x) => x.id !== qid));
      setCourses((prev) => prev.map((c) =>
        c.id === courseId
          ? { ...c, questoes_count: Math.max(0, (c.questoes_count ?? c.questoes ?? 1) - 1) }
          : c
      ));
      toast({ type: 'danger', msg: `Questão #${qid} excluída` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao excluir questão: ${err.message}` });
    }
  }, [courseId]);

  const handleDeleteAllQ = useCallback(async (cid) => {
    try {
      await questoesAPI.excluirTodas(cid);
      setQuestoes([]);
      setCourses((prev) => prev.map((c) =>
        c.id === cid ? { ...c, questoes_count: 0, questoes: 0 } : c
      ));
      toast({ type: 'danger', msg: `Questões do curso #${cid} excluídas` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao excluir questões: ${err.message}` });
    }
  }, []);

  const handleImportQ = useCallback(async (file) => {
    if (!file) return;
    setImportOpen(false);
    try {
      const result = await questoesAPI.importarXLSX(courseId, file);
      toast({ type: 'success', msg: `${file.name} importado · ${result?.importadas ?? 0} questões · ${result?.erros ?? 0} erros` });
      // Reload list after import
      if (courseId) {
        const updated = await questoesAPI.listarPorCurso(courseId);
        setQuestoes(updated);
      } else {
        const updatedCourses = await cursosAPI.listar();
        setCourses(updatedCourses);
      }
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao importar: ${err.message}` });
    }
  }, [courseId]);

  // ── Handlers — flashcards ──

  const handleSaveF = useCallback(async (f) => {
    const isNew = !f.id || String(f.id).startsWith('new-');
    try {
      if (isNew) {
        const created = await flashcardsAPI.criar(courseId, f);
        setFlashcards((prev) => [...prev, created]);
        setCourses((prev) => prev.map((c) =>
          c.id === courseId
            ? { ...c, flashcards_count: (c.flashcards_count ?? c.flashcards ?? 0) + 1 }
            : c
        ));
        toast({ type: 'success', msg: 'Flashcard criado com sucesso' });
      } else {
        const updated = await flashcardsAPI.atualizar(f.id, f);
        setFlashcards((prev) => prev.map((x) => x.id === updated.id ? updated : x));
        toast({ type: 'success', msg: `Flashcard #${f.id} atualizado com sucesso` });
      }
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao salvar flashcard: ${err.message}` });
    }
  }, [courseId]);

  const handleDeleteF = useCallback(async (fid) => {
    try {
      await flashcardsAPI.excluir(fid);
      setFlashcards((prev) => prev.filter((x) => x.id !== fid));
      setCourses((prev) => prev.map((c) =>
        c.id === courseId
          ? { ...c, flashcards_count: Math.max(0, (c.flashcards_count ?? c.flashcards ?? 1) - 1) }
          : c
      ));
      toast({ type: 'danger', msg: `Flashcard #${fid} excluído` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao excluir flashcard: ${err.message}` });
    }
  }, [courseId]);

  const handleDeleteAllF = useCallback(async (cid) => {
    try {
      await flashcardsAPI.excluirTodos(cid);
      setFlashcards([]);
      setCourses((prev) => prev.map((c) =>
        c.id === cid ? { ...c, flashcards_count: 0, flashcards: 0 } : c
      ));
      toast({ type: 'danger', msg: `Flashcards do curso #${cid} excluídos` });
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao excluir flashcards: ${err.message}` });
    }
  }, []);

  const handleImportF = useCallback(async (file) => {
    if (!file) return;
    setImportOpen(false);
    try {
      const result = await flashcardsAPI.importarXLSX(courseId, file);
      toast({ type: 'success', msg: `${file.name} importado · ${result?.importados ?? 0} flashcards · ${result?.erros ?? 0} erros` });
      if (courseId) {
        const updated = await flashcardsAPI.listarPorCurso(courseId);
        setFlashcards(updated);
      } else {
        const updatedCourses = await cursosAPI.listar();
        setCourses(updatedCourses);
      }
    } catch (err) {
      toast({ type: 'danger', msg: `Erro ao importar: ${err.message}` });
    }
  }, [courseId]);

  // Derived counts
  const totalQuestoes = courses.reduce((a, c) => a + (c.questoes_count ?? c.questoes ?? 0), 0);
  const totalFlashcards = courses.reduce((a, c) => a + (c.flashcards_count ?? c.flashcards ?? 0), 0);
  const coursesWithQ = courses.filter((c) => (c.questoes_count ?? c.questoes ?? 0) > 0);
  const coursesWithF = courses.filter((c) => (c.flashcards_count ?? c.flashcards ?? 0) > 0);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="mark">Admin Flashcards e Questões <em>3.0</em></span>
          <span className="dot" />
          <span className="kicker">Admin · Curso</span>
        </div>
        <nav className="breadcrumb">
          <span>Curso</span>
          <span className="sep">/</span>
          <span className="current">
            {section === 'questoes' ? 'Questões — Trilha' : 'Flashcards'}
          </span>
          {currentCourse && (
            <>
              <span className="sep">/</span>
              <span className="current">#{currentCourse.id}</span>
            </>
          )}
        </nav>
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
      </div>

      {courseId === null && (
        <div className="page-head">
          <h1>
            {section === 'questoes'
              ? <><span style={{ color: '#475569', fontWeight: 500 }}>Questões</span> <em>— Trilha</em></>
              : <span style={{ color: '#475569', fontWeight: 500 }}>Flashcards</span>
            }
          </h1>
          <p>
            {section === 'questoes'
              ? 'Gerencie o banco de questões por curso. Importe via XLSX, edite alternativas e gabaritos, ou faça exclusões em massa quando preciso recomeçar.'
              : 'Cartões de estudo (frente / verso / exemplo) organizados por curso. Importe em lote ou crie um a um direto pela interface.'
            }
          </p>
        </div>
      )}

      {section === 'questoes' && courseId === null && (
        <QuestoesList
          courses={coursesWithQ}
          loading={coursesLoading}
          onOpen={setCourseId}
          onDeleteAll={handleDeleteAllQ}
          onImport={() => setImportOpen(true)}
        />
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

      {section === 'flashcards' && courseId === null && (
        <FlashcardsList
          courses={coursesWithF}
          loading={coursesLoading}
          onOpen={setCourseId}
          onDeleteAll={handleDeleteAllF}
          onImport={() => setImportOpen(true)}
        />
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
        onImport={section === 'questoes' ? handleImportQ : handleImportF}
      />

      <FlashcardEditModal
        open={creatingFlash}
        onClose={() => setCreatingFlash(false)}
        flashcard={creatingFlash ? { id: `new-${Date.now()}`, frente: '', verso: '', exemplo: '', tags: [] } : null}
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
