/**
 * Chackara Admin — API Service
 * Mapeado para o backend p360 (Node/Express, porta 3002)
 *
 * Configure VITE_API_URL no .env.local, ex:
 *   VITE_API_URL=http://localhost:3002/api
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002/api';

// ─────────────────────────────────────────────
// Fetch base
// ─────────────────────────────────────────────

const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || '';

async function request(method, path, body) {
  const opts = { method, headers: {} };

  if (ADMIN_TOKEN) opts.headers['Authorization'] = `Bearer ${ADMIN_TOKEN}`;

  if (body instanceof FormData) {
    opts.body = body;
  } else if (body) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE_URL}${path}`, opts);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || `Erro HTTP ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

// ─────────────────────────────────────────────
// Normalização helpers
// ─────────────────────────────────────────────

/**
 * Normaliza dificuldade: aceita número (1/2/3), string com acento ou sem.
 * Backend retorna "Media" (sem acento) — cobrimos todos os casos.
 */
function normalizeDificuldade(val) {
  if (!val) return 'Médio';
  const map = {
    1: 'Fácil', '1': 'Fácil',
    2: 'Médio', '2': 'Médio',
    3: 'Difícil', '3': 'Difícil',
    'Facil': 'Fácil', 'Fácil': 'Fácil', 'facil': 'Fácil',
    'Media': 'Médio', 'Médio': 'Médio', 'medio': 'Médio', 'Medio': 'Médio',
    'Dificil': 'Difícil', 'Difícil': 'Difícil', 'dificil': 'Difícil',
  };
  return map[val] ?? String(val);
}

function denormalizeDificuldade(val) {
  const map = {
    'Fácil': 'Facil', 'Facil': 'Facil', 1: 'Facil', '1': 'Facil',
    'Médio': 'Media', 'Medio': 'Media', 'Media': 'Media', 2: 'Media', '2': 'Media',
    'Difícil': 'Dificil', 'Dificil': 'Dificil', 3: 'Dificil', '3': 'Dificil',
  };
  return map[val] ?? 'Media';
}

/**
 * Normaliza alternativas: aceita objeto {A: "...", B: "..."} ou array [{letra, texto}].
 * Sempre retorna array de objetos { letra, texto }.
 */
function normalizeAlternativas(alt) {
  if (!alt) return [];

  // Já é array — verifica se é array de objetos ou array de strings
  if (Array.isArray(alt)) {
    return alt.map((item, i) => {
      if (typeof item === 'object' && item !== null) {
        return { letra: item.letra || item.key || String.fromCharCode(65 + i), texto: item.texto || item.text || '' };
      }
      return { letra: String.fromCharCode(65 + i), texto: String(item) };
    });
  }

  // É objeto JSONB: { A: "texto A", B: "texto B", ... }
  if (typeof alt === 'object') {
    return Object.entries(alt).map(([letra, texto]) => ({ letra, texto: String(texto) }));
  }

  return [];
}

function denormalizeAlternativas(alt) {
  if (!alt || !Array.isArray(alt)) return {};
  return Object.fromEntries(alt.map(({ letra, texto }) => [letra, texto]));
}

function tagsToArray(tags) {
  if (Array.isArray(tags)) return tags;
  if (!tags) return [];
  // Suporta separador '::' (flashcards do estudo-manual) e ',' (questões)
  const sep = tags.includes('::') ? '::' : ',';
  return tags.split(sep).map((t) => t.trim()).filter(Boolean);
}

function tagsToString(tags) {
  if (!tags) return '';
  if (Array.isArray(tags)) return tags.join(',');
  return tags;
}

// aula → formato esperado pelos componentes
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
    id:           q.id,
    aula_id:      q.aula_id,
    enunciado:    q.enunciado   || '',
    alternativas: normalizeAlternativas(q.alternativas),
    gabarito:     q.gabarito    || '',
    instituicao:  q.instituicao || '',
    ano:          String(q.ano  || ''),
    dificuldade:  normalizeDificuldade(q.dificuldade),
    tags:         tagsToArray(q.tags),
    essencial:    !!q.essencial,
    feedback:     q.feedback_prof || '',
    imagem:       q.img_url       || '',
  };
}

function denormalizeQuestao(q) {
  return {
    aula_id:       q.aula_id,
    img_url:       q.imagem      || '',
    alternativas:  denormalizeAlternativas(q.alternativas),
    gabarito:      q.gabarito,
    feedback_prof: q.feedback    || '',
    instituicao:   q.instituicao || '',
    ano:           Number(q.ano) || null,
    dificuldade:   denormalizeDificuldade(q.dificuldade),
    tags:          tagsToString(q.tags),
    essencial:     !!q.essencial,
  };
}

function normalizeFlashcard(f) {
  // Defende tanto o shape de /estudo-manual quanto de /admin/flashcards
  return {
    id:      f.id,
    aula_id: f.aula_id,
    frente:  f.frente  || f.pergunta || '',
    verso:   f.verso   || f.resposta || '',
    exemplo: f.exemplo || f.exemplo_clinico || '',
    tags:    tagsToArray(f.tags),
  };
}

function denormalizeFlashcard(f) {
  return {
    aula_id: f.aula_id,
    verso:   f.verso,
    exemplo: f.exemplo || '',
    tags:    tagsToString(f.tags),
  };
}

// ─────────────────────────────────────────────
// Auth — /api/auth
// ─────────────────────────────────────────────

export const authAPI = {
  solicitarCodigo: (email) =>
    request('POST', '/auth/solicitar-codigo', { email }),

  validarCodigo: (email, codigo) =>
    request('POST', '/auth/validar-codigo', { email, codigo }),
};

// ─────────────────────────────────────────────
// Aulas (exibidas como "cursos" na UI)
// ─────────────────────────────────────────────

export const cursosAPI = {
  /**
   * Carrega aulas separadamente para questoes e flashcards.
   * - questoes: /api/questoes/aulas-disponiveis
   * - flashcards: agrupa /api/estudo-manual?limite=todos por aula_id
   *   (inclui aulas que so tem flashcards, sem questoes)
   */
  listar: async () => {
    const [aulasData, flashcardsData] = await Promise.all([
      request('GET', '/questoes/aulas-disponiveis'),
      request('GET', '/estudo-manual?limite=todos').catch(() => []),
    ]);

    const flashList = Array.isArray(flashcardsData)
      ? flashcardsData
      : (flashcardsData?.flashcards || flashcardsData?.data || []);

    // Agrupa flashcards por aula_id, guardando metadados da aula
    const flashByAula = {};
    for (const f of flashList) {
      if (!f.aula_id) continue;
      if (!flashByAula[f.aula_id]) {
        flashByAula[f.aula_id] = { count: 0, aula_nome: f.aula_nome, grande_area: f.grande_area };
      }
      flashByAula[f.aula_id].count += 1;
    }

    // Aulas de questoes (com flashcards_count cruzado)
    const aulasQ = (aulasData || []).map((aula) => ({
      ...normalizeAula(aula),
      flashcards_count: flashByAula[aula.aula_id]?.count ?? 0,
    }));

    // Aulas que so tem flashcards (nao estao em aulas-disponiveis)
    const idsComQuestoes = new Set((aulasData || []).map((a) => a.aula_id));
    const aulasSoFlash = Object.entries(flashByAula)
      .filter(([aula_id]) => !idsComQuestoes.has(aula_id))
      .map(([aula_id, info]) => ({
        id:               aula_id,
        nome:             info.aula_nome || aula_id,
        tipo:             info.grande_area || '---',
        especialidade:    info.grande_area || '---',
        diagnostico:      '',
        tags:             [],
        questoes_count:   0,
        flashcards_count: info.count,
      }));

    return [...aulasQ, ...aulasSoFlash];
  },
};

// ─────────────────────────────────────────────
// Questões — /api/questoes e /api/admin/questoes
// ─────────────────────────────────────────────

export const questoesAPI = {
  /**
   * GET /api/questoes?aula_id=X&limite=todos
   */
  listarPorCurso: async (aulaId) => {
    const data = await request('GET', `/questoes?aula_id=${aulaId}&limite=todos`);
    return (data || []).map(normalizeQuestao);
  },

  /**
   * GET /api/questoes?limite=todos
   * Lista TODAS as questões (sem filtro de aula) — para a listagem global.
   */
  listarTodas: async (params = {}) => {
    const qs = new URLSearchParams({ limite: 'todos', ...params }).toString();
    const data = await request('GET', `/questoes?${qs}`);
    return (data || []).map(normalizeQuestao);
  },

  atualizar: async (id, data) => {
    const updated = await request('PUT', `/admin/questoes/${id}`, denormalizeQuestao(data));
    return normalizeQuestao(updated);
  },

  excluir: (id) => request('DELETE', `/admin/questoes/${id}`),

  excluirTodas: async (_aulaId, ids = []) => {
    for (const id of ids) await request('DELETE', `/admin/questoes/${id}`);
    return { deleted: ids.length };
  },

  importarArray: (questoes) =>
    request('POST', '/admin/questoes', questoes),
};

// ─────────────────────────────────────────────
// Flashcards — /api/estudo-manual e /api/admin/flashcards
// ─────────────────────────────────────────────

export const flashcardsAPI = {
  /**
   * GET /api/estudo-manual?aula_id=X&limite=todos
   */
  listarPorCurso: async (aulaId) => {
    const data = await request('GET', `/estudo-manual?aula_id=${aulaId}&limite=todos`);
    // estudo-manual pode retornar { flashcards: [...] } ou diretamente [...]
    const list = Array.isArray(data) ? data : (data?.flashcards || data?.data || []);
    return list.map(normalizeFlashcard);
  },

  /**
   * GET /api/estudo-manual?limite=todos
   * Lista TODOS os flashcards — para listagem global.
   */
  listarTodos: async (params = {}) => {
    const qs = new URLSearchParams({ limite: 'todos', ...params }).toString();
    const data = await request('GET', `/estudo-manual?${qs}`);
    const list = Array.isArray(data) ? data : (data?.flashcards || data?.data || []);
    return list.map(normalizeFlashcard);
  },

  criar: async (aulaId, data) => {
    const payload = denormalizeFlashcard({ ...data, aula_id: aulaId });
    const created = await request('POST', '/admin/flashcards', payload);
    const item = Array.isArray(created) ? created[0] : created;
    return normalizeFlashcard(item);
  },

  atualizar: async (id, data) => {
    const updated = await request('PUT', `/admin/flashcards/${id}`, denormalizeFlashcard(data));
    return normalizeFlashcard(updated);
  },

  excluir: (id) => request('DELETE', `/admin/flashcards/${id}`),

  excluirTodos: async (_aulaId, ids = []) => {
    for (const id of ids) await request('DELETE', `/admin/flashcards/${id}`);
    return { deleted: ids.length };
  },

  importarArray: (flashcards) =>
    request('POST', '/admin/flashcards', flashcards),
};


// ─────────────────────────────────────────────
// Admin — notificações
// ─────────────────────────────────────────────

export const adminAPI = {
  notificarImport: (dados) =>
    request('POST', '/admin/notificar-import', dados),
};
