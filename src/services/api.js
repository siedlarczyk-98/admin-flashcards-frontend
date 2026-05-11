/**
 * Chackara Admin — API Service
 * Mapeado para o backend p360 (Node/Express, porta 3002)
 *
 * Configure VITE_API_URL no .env.local, ex:
 *   VITE_API_URL=http://localhost:3002/api
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

// ─────────────────────────────────────────────
// Token JWT (localStorage)
// ─────────────────────────────────────────────

export const token = {
  get: ()        => localStorage.getItem('p360_admin_token'),
  set: (t)       => localStorage.setItem('p360_admin_token', t),
  clear: ()      => localStorage.removeItem('p360_admin_token'),
  exists: ()     => !!localStorage.getItem('p360_admin_token'),
};

// ─────────────────────────────────────────────
// Fetch base (injeta Authorization em todo request)
// ─────────────────────────────────────────────

async function request(method, path, body) {
  const jwt = token.get();
  const opts = { method, headers: {} };

  if (jwt) opts.headers['Authorization'] = `Bearer ${jwt}`;

  if (body instanceof FormData) {
    opts.body = body;
  } else if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, opts);

  if (res.status === 401) {
    token.clear();
    window.dispatchEvent(new Event('p360:logout'));
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || `Erro HTTP ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ─────────────────────────────────────────────
// Normalização: backend → frontend
// ─────────────────────────────────────────────

const DIFICULDADE_LABEL = { 1: 'Fácil', 2: 'Médio', 3: 'Difícil' };
const DIFICULDADE_NUM   = { 'Fácil': 1, 'Médio': 2, 'Difícil': 3 };

function tagsToArray(tags) {
  if (Array.isArray(tags)) return tags;
  if (!tags) return [];
  return tags.split(',').map((t) => t.trim()).filter(Boolean);
}

function tagsToString(tags) {
  if (!tags) return '';
  if (Array.isArray(tags)) return tags.join(',');
  return tags;
}

// aula → formato esperado pelos componentes (equivalente a "curso")
function normalizeAula(aula) {
  return {
    id:               aula.aula_id,
    nome:             aula.aula_nome,
    tipo:             aula.grande_area || '—',
    especialidade:    aula.grande_area || '—',
    diagnostico:      aula.descricao   || '',
    tags:             [],
    questoes_count:   Number(aula.total_questoes   ?? aula.questoes_count   ?? 0),
    flashcards_count: Number(aula.total_flashcards ?? aula.flashcards_count ?? 0),
  };
}

function normalizeQuestao(q) {
  return {
    id:          q.id,
    aula_id:     q.aula_id,
    enunciado:   q.enunciado   || '',
    alternativas: Array.isArray(q.alternativas) ? q.alternativas : [],
    gabarito:    q.gabarito    || '',
    instituicao: q.instituicao || '',
    ano:         String(q.ano  || ''),
    dificuldade: DIFICULDADE_LABEL[q.dificuldade] || q.dificuldade || 'Médio',
    tags:        tagsToArray(q.tags),
    essencial:   !!q.essencial,
    feedback:    q.feedback_prof || '',
    imagem:      q.img_url       || '',
  };
}

function denormalizeQuestao(q) {
  return {
    aula_id:       q.aula_id,
    enunciado:     q.enunciado,
    img_url:       q.imagem      || '',
    alternativas:  q.alternativas,
    gabarito:      q.gabarito,
    feedback_prof: q.feedback    || '',
    instituicao:   q.instituicao || '',
    ano:           Number(q.ano) || null,
    dificuldade:   DIFICULDADE_NUM[q.dificuldade] ?? 2,
    tags:          tagsToString(q.tags),
    essencial:     !!q.essencial,
  };
}

function normalizeFlashcard(f) {
  return {
    id:      f.id,
    aula_id: f.aula_id,
    frente:  f.frente  || '',
    verso:   f.verso   || '',
    exemplo: f.exemplo || '',
    tags:    tagsToArray(f.tags),
  };
}

function denormalizeFlashcard(f) {
  return {
    aula_id: f.aula_id,
    frente:  f.frente,
    verso:   f.verso,
    exemplo: f.exemplo || '',
    tags:    tagsToString(f.tags),
  };
}

// ─────────────────────────────────────────────
// Auth — /api/auth
// ─────────────────────────────────────────────

export const authAPI = {
  /** POST /api/auth/solicitar-codigo  →  envia OTP por email */
  solicitarCodigo: (email) =>
    request('POST', '/auth/solicitar-codigo', { email }),

  /** POST /api/auth/validar-codigo  →  { token: "..." } */
  validarCodigo: (email, codigo) =>
    request('POST', '/auth/validar-codigo', { email, codigo }),
};

// ─────────────────────────────────────────────
// Aulas (exibidas como "cursos" na UI)
// ─────────────────────────────────────────────

export const cursosAPI = {
  /**
   * GET /api/questoes/aulas-disponiveis
   * Retorna aulas com contagem de questões.
   * Usado em ambas as abas (questões e flashcards).
   */
  listar: async () => {
    const data = await request('GET', '/questoes/aulas-disponiveis');
    return (data || []).map(normalizeAula);
  },
};

// ─────────────────────────────────────────────
// Questões — /api/admin/questoes
// ─────────────────────────────────────────────

export const questoesAPI = {
  /**
   * GET /api/questoes?aula_id=X&limite=todos
   * Lista questões de uma aula.
   */
  listarPorCurso: async (aulaId) => {
    const data = await request('GET', `/questoes?aula_id=${aulaId}&limite=todos`);
    return (data || []).map(normalizeQuestao);
  },

  /**
   * PUT /api/admin/questoes/:id
   * Atualiza campos de uma questão.
   */
  atualizar: async (id, data) => {
    const updated = await request('PUT', `/admin/questoes/${id}`, denormalizeQuestao(data));
    return normalizeQuestao(updated);
  },

  /**
   * DELETE /api/admin/questoes/:id
   * Remove uma questão.
   */
  excluir: (id) => request('DELETE', `/admin/questoes/${id}`),

  /**
   * Exclusão em massa — sem endpoint bulk no backend.
   * Faz deletes individuais em série com a lista já carregada.
   */
  excluirTodas: async (_aulaId, ids = []) => {
    for (const id of ids) {
      await request('DELETE', `/admin/questoes/${id}`);
    }
    return { deleted: ids.length };
  },

  /**
   * POST /api/admin/questoes  (aceita array)
   * Para importação XLSX — o serviço de conversão fica no front ou num endpoint dedicado.
   * Adapte conforme o backend suportar upload de arquivo.
   */
  importarArray: (questoes) =>
    request('POST', '/admin/questoes', questoes),
};

// ─────────────────────────────────────────────
// Flashcards — /api/admin/flashcards
// ─────────────────────────────────────────────

export const flashcardsAPI = {
  /**
   * GET /api/estudo-manual?aula_id=X&limite=todos
   * Lista todos os flashcards de uma aula (sem filtro SRS).
   */
  listarPorCurso: async (aulaId) => {
    const data = await request('GET', `/estudo-manual?aula_id=${aulaId}&limite=todos`);
    return (data || []).map(normalizeFlashcard);
  },

  /**
   * POST /api/admin/flashcards
   * Cria um flashcard. Aceita objeto único ou array.
   */
  criar: async (aulaId, data) => {
    const payload = denormalizeFlashcard({ ...data, aula_id: aulaId });
    const created = await request('POST', '/admin/flashcards', payload);
    const item = Array.isArray(created) ? created[0] : created;
    return normalizeFlashcard(item);
  },

  /**
   * PUT /api/admin/flashcards/:id
   * Atualiza campos de um flashcard.
   */
  atualizar: async (id, data) => {
    const updated = await request('PUT', `/admin/flashcards/${id}`, denormalizeFlashcard(data));
    return normalizeFlashcard(updated);
  },

  /**
   * DELETE /api/admin/flashcards/:id
   * Remove um flashcard.
   */
  excluir: (id) => request('DELETE', `/admin/flashcards/${id}`),

  /**
   * Exclusão em massa — sem endpoint bulk. Deletes individuais.
   */
  excluirTodos: async (_aulaId, ids = []) => {
    for (const id of ids) {
      await request('DELETE', `/admin/flashcards/${id}`);
    }
    return { deleted: ids.length };
  },

  /**
   * POST /api/admin/flashcards  (array)
   */
  importarArray: (flashcards) =>
    request('POST', '/admin/flashcards', flashcards),
};
