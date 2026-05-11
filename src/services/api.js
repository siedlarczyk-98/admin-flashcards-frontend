/**
 * Chackara Admin — API Service
 *
 * Each function maps to a backend endpoint.
 * Replace BASE_URL via VITE_API_URL in your .env file.
 *
 * During development without a backend, set VITE_API_URL to your local server.
 */

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

async function request(method, path, body) {
  const opts = {
    method,
    headers: {},
  };
  if (body instanceof FormData) {
    opts.body = body;
  } else if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }
  const res = await fetch(`${BASE_URL}${path}`, opts);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: `HTTP ${res.status}` }));
    throw new Error(err.message || `HTTP ${res.status}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ─────────────────────────────────────────────
// Cursos
// ─────────────────────────────────────────────

export const cursosAPI = {
  /**
   * GET /cursos
   * Returns: Curso[]
   * Curso: { id, nome, tipo, especialidade, diagnostico, tags, questoes_count, flashcards_count }
   */
  listar: () => request('GET', '/cursos'),

  /**
   * GET /cursos/:id
   * Returns: Curso
   */
  buscar: (id) => request('GET', `/cursos/${id}`),
};

// ─────────────────────────────────────────────
// Questões
// ─────────────────────────────────────────────

export const questoesAPI = {
  /**
   * GET /cursos/:cursoId/questoes
   * Returns: Questao[]
   * Questao: { id, enunciado, alternativas, gabarito, instituicao, ano, dificuldade, tags, essencial, feedback, imagem? }
   */
  listarPorCurso: (cursoId) => request('GET', `/cursos/${cursoId}/questoes`),

  /**
   * PUT /questoes/:id
   * Body: Questao (parcial)
   * Returns: Questao
   */
  atualizar: (id, data) => request('PUT', `/questoes/${id}`, data),

  /**
   * DELETE /questoes/:id
   * Returns: null (204)
   */
  excluir: (id) => request('DELETE', `/questoes/${id}`),

  /**
   * DELETE /cursos/:cursoId/questoes
   * Deletes all questions for a course.
   * Returns: { deleted: number }
   */
  excluirTodas: (cursoId) => request('DELETE', `/cursos/${cursoId}/questoes`),

  /**
   * POST /cursos/:cursoId/questoes/importar
   * Body: FormData with field "arquivo" (.xlsx)
   * Returns: { importadas: number, erros: number, detalhes?: string[] }
   */
  importarXLSX: (cursoId, arquivo) => {
    const form = new FormData();
    form.append('arquivo', arquivo);
    return request('POST', `/cursos/${cursoId}/questoes/importar`, form);
  },

  /**
   * GET /questoes/template
   * Returns: Blob (.xlsx template)
   */
  downloadTemplate: async () => {
    const res = await fetch(`${BASE_URL}/questoes/template`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.blob();
  },
};

// ─────────────────────────────────────────────
// Flashcards
// ─────────────────────────────────────────────

export const flashcardsAPI = {
  /**
   * GET /cursos/:cursoId/flashcards
   * Returns: Flashcard[]
   * Flashcard: { id, frente, verso, exemplo, tags }
   */
  listarPorCurso: (cursoId) => request('GET', `/cursos/${cursoId}/flashcards`),

  /**
   * POST /cursos/:cursoId/flashcards
   * Body: { frente, verso, exemplo?, tags }
   * Returns: Flashcard
   */
  criar: (cursoId, data) => request('POST', `/cursos/${cursoId}/flashcards`, data),

  /**
   * PUT /flashcards/:id
   * Body: Flashcard (parcial)
   * Returns: Flashcard
   */
  atualizar: (id, data) => request('PUT', `/flashcards/${id}`, data),

  /**
   * DELETE /flashcards/:id
   * Returns: null (204)
   */
  excluir: (id) => request('DELETE', `/flashcards/${id}`),

  /**
   * DELETE /cursos/:cursoId/flashcards
   * Deletes all flashcards for a course.
   * Returns: { deleted: number }
   */
  excluirTodos: (cursoId) => request('DELETE', `/cursos/${cursoId}/flashcards`),

  /**
   * POST /cursos/:cursoId/flashcards/importar
   * Body: FormData with field "arquivo" (.xlsx)
   * Returns: { importados: number, erros: number, detalhes?: string[] }
   */
  importarXLSX: (cursoId, arquivo) => {
    const form = new FormData();
    form.append('arquivo', arquivo);
    return request('POST', `/cursos/${cursoId}/flashcards/importar`, form);
  },

  /**
   * GET /flashcards/template
   * Returns: Blob (.xlsx template)
   */
  downloadTemplate: async () => {
    const res = await fetch(`${BASE_URL}/flashcards/template`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.blob();
  },
};
