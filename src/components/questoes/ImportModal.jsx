import React, { useState, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { Modal } from '../ui/Modal.jsx';
import { Icon } from '../ui/Icon.jsx';
import { questoesAPI, flashcardsAPI, adminAPI } from '../../services/api.js';
import { useToast } from '../ui/Toast.jsx';

// ─── Conversão XLSX → array ───────────────────────────────

function parseDificuldade(val) {
  if (!val && val !== 0) return 'Media';
  const s = String(val)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
  if (s === 'facil' || s === '1' || s === 'easy' || s === 'baixa') return 'Facil';
  if (s === 'dificil' || s === '3' || s === 'hard' || s === 'alta') return 'Dificil';
  if (s === 'media' || s === 'medio' || s === '2' || s === 'medium' || s === 'moderada') return 'Media';
  return 'Media';
}

function parseQuestoes(rows) {
  return rows.map((row, i) => {
    const alternativas = {};
    if (row.alt_a) alternativas.A = String(row.alt_a);
    if (row.alt_b) alternativas.B = String(row.alt_b);
    if (row.alt_c) alternativas.C = String(row.alt_c);
    if (row.alt_d) alternativas.D = String(row.alt_d);
    if (row.alt_e) alternativas.E = String(row.alt_e);

    return {
      _row: i + 2,
      aula_id:       String(row.aula_id || row.curso_id || ''),
      enunciado:     String(row.enunciado || ''),
      alternativas,
      gabarito:      String(row.gabarito || '').toUpperCase(),
      ano:           Number(row.ano) || null,
      dificuldade:   parseDificuldade(row.dificuldade),
      instituicao:   String(row.instituicao || ''),
      essencial:     String(row.essencial).toLowerCase() === 'true' || row.essencial === true || row.essencial === 1,
      img_url:       String(row.imagem_url || ''),
      tags:          String(row.tags || ''),
      feedback_prof: String(row.feedback || ''),
    };
  });
}

function parseFlashcards(rows) {
  return rows.map((row, i) => ({
    _row: i + 2,
    aula_id: String(row.aula_id || row.curso_id || ''),
    frente:  String(row.frente || ''),
    verso:   String(row.verso || ''),
    exemplo: String(row.exemplo || ''),
    tags:    String(row.tags || ''),
  }));
}

function validateQuestao(q) {
  const erros = [];
  if (!q.aula_id)    erros.push('aula_id ausente');
  if (!q.enunciado)  erros.push('enunciado ausente');
  if (!q.gabarito)   erros.push('gabarito ausente');
  if (Object.keys(q.alternativas).length < 2) erros.push('menos de 2 alternativas');
  return erros;
}

function validateFlashcard(f) {
  const erros = [];
  if (!f.aula_id) erros.push('aula_id ausente');
  if (!f.frente)  erros.push('frente ausente');
  if (!f.verso)   erros.push('verso ausente');
  return erros;
}

// ─── Componente ───────────────────────────────────────────

const STEPS = { idle: 'idle', preview: 'preview', importing: 'importing', done: 'done' };

export function ImportModal({ open, onClose, kind, onImportDone }) {
  const toast = useToast();
  const [step, setStep]         = useState(STEPS.idle);
  const [file, setFile]         = useState(null);
  const [over, setOver]         = useState(false);
  const [rows, setRows]         = useState([]);
  const [errors, setErrors]     = useState([]);
  const [result, setResult]     = useState(null);
  const [progress, setProgress] = useState(0);

  const isQuestoes = kind === 'questoes';

  const reset = () => {
    setStep(STEPS.idle);
    setFile(null);
    setRows([]);
    setErrors([]);
    setResult(null);
    setProgress(0);
  };

  const handleClose = () => { reset(); onClose(); };

  const readFile = useCallback((f) => {
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const wb = XLSX.read(e.target.result, { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const raw = XLSX.utils.sheet_to_json(ws, { defval: '' });

        const parsed = isQuestoes ? parseQuestoes(raw) : parseFlashcards(raw);
        const validate = isQuestoes ? validateQuestao : validateFlashcard;

        const erros = [];
        parsed.forEach((r) => {
          const e = validate(r);
          if (e.length) erros.push({ row: r._row, erros: e });
        });

        setRows(parsed);
        setErrors(erros);
        setStep(STEPS.preview);
      } catch (err) {
        toast({ type: 'danger', msg: `Erro ao ler arquivo: ${err.message}` });
      }
    };
    reader.readAsArrayBuffer(f);
  }, [isQuestoes]);

  const onDrop = (e) => {
    e.preventDefault();
    setOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) readFile(f);
  };

  const handleImport = async () => {
    const valid = rows.filter((r) => {
      const validate = isQuestoes ? validateQuestao : validateFlashcard;
      return validate(r).length === 0;
    }).map(({ _row, ...rest }) => rest);

    setStep(STEPS.importing);
    setProgress(0);

    const BATCH = 50;
    const ok = [];
    const failed = [];

    for (let i = 0; i < valid.length; i += BATCH) {
      const batch = valid.slice(i, i + BATCH);
      try {
        const res = isQuestoes
          ? await questoesAPI.importarArray(batch)
          : await flashcardsAPI.importarArray(batch);
        const created = Array.isArray(res) ? res : [res];
        ok.push(...created);
      } catch (err) {
        failed.push({ batch: `linhas ${i + 2}–${i + batch.length + 1}`, erro: err.message });
      }
      setProgress(Math.round(((i + BATCH) / valid.length) * 100));
    }

    setResult({ ok: ok.length, failed, skipped: rows.length - valid.length });
    setStep(STEPS.done);
    if (onImportDone) onImportDone({ ok: ok.length, failed });

    // Envia email de resumo — falha silenciosa
    try {
      await adminAPI.notificarImport({
        tipo: kind,
        total: rows.length,
        ok: ok.length,
        falhas: failed.length,
        email: import.meta.env.VITE_ADMIN_EMAIL,
      });
    } catch (e) { /* falha silenciosa */ }
  };

  // ── Render ──

  const titles = {
    [STEPS.idle]:      `Importar ${isQuestoes ? 'questões' : 'flashcards'} via XLSX`,
    [STEPS.preview]:   `Preview — ${rows.length} ${isQuestoes ? 'questões' : 'flashcards'} encontradas`,
    [STEPS.importing]: 'Importando…',
    [STEPS.done]:      'Importação concluída',
  };

  const footers = {
    [STEPS.idle]: (
      <>
        <button className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
        <button className="btn btn-primary" disabled={!file} onClick={() => file && readFile(file)}>
          Continuar
        </button>
      </>
    ),
    [STEPS.preview]: (
      <>
        <button className="btn btn-secondary" onClick={reset}>← Voltar</button>
        <button
          className="btn btn-primary"
          disabled={rows.length === 0 || rows.length === errors.length}
          onClick={handleImport}
        >
          Importar {rows.length - errors.length} {isQuestoes ? 'questões' : 'flashcards'} válidas
        </button>
      </>
    ),
    [STEPS.importing]: null,
    [STEPS.done]: (
      <button className="btn btn-primary" onClick={handleClose}>Fechar</button>
    ),
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      size="wide"
      title={titles[step]}
      subtitle={step === STEPS.idle ? 'Arraste um arquivo .xlsx ou clique para selecionar.' : ''}
      footer={footers[step]}
    >
      {/* ── STEP: idle ── */}
      {step === STEPS.idle && (
        <>
          <label
            className={`dropzone ${over ? 'over' : ''} ${file ? 'has-file' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setOver(true); }}
            onDragLeave={() => setOver(false)}
            onDrop={onDrop}
          >
            <input
              type="file"
              accept=".xlsx"
              style={{ display: 'none' }}
              onChange={(e) => { const f = e.target.files?.[0]; if (f) readFile(f); }}
            />
            <span className="ico"><Icon.file /></span>
            {file ? (
              <div style={{ flex: 1 }}>
                <div className="label">{file.name}</div>
                <div className="hint">{(file.size / 1024).toFixed(1)} KB · pronto para importar</div>
              </div>
            ) : (
              <div>
                <div className="label">Solte o arquivo aqui ou clique para selecionar</div>
                <div className="hint">Apenas arquivos .xlsx · máx. 10 MB</div>
              </div>
            )}
          </label>

          <div className="column-spec" style={{ marginTop: 16 }}>
            <strong style={{ color: 'var(--fg)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em' }}>
              Colunas esperadas
            </strong>
            <br />
            {isQuestoes ? (
              <>
                <span className="col-name">aula_id</span> · <span className="col-name">enunciado</span> · <span className="col-name">alt_a</span>…<span className="col-name">alt_e</span><br />
                <span className="col-name">gabarito</span> · <span className="col-name">ano</span> · <span className="col-name">dificuldade</span> · <span className="col-name">instituicao</span> · <span className="col-name">essencial</span><br />
                <span className="col-opt">imagem_url (opcional)</span> · <span className="col-name">tags</span> · <span className="col-opt">feedback (opcional)</span>
              </>
            ) : (
              <>
                <span className="col-name">aula_id</span> · <span className="col-name">frente</span> · <span className="col-name">verso</span><br />
                <span className="col-opt">exemplo (opcional)</span> · <span className="col-name">tags</span>
              </>
            )}
          </div>

          <a
            className="template-link"
            href={isQuestoes
              ? "https://docs.google.com/spreadsheets/d/10gzIywoiREvjeROVFCqoJaZ66uftrHGL/edit?usp=sharing"
              : "https://docs.google.com/spreadsheets/d/1h2CsSVnnNNxjHqu35YvTVyNpb3kDDqzV/edit?usp=sharing"
            }
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginTop: 14, display: 'inline-flex' }}
          >
            <Icon.download /> Baixar modelo XLSX de {isQuestoes ? 'questões' : 'flashcards'}
          </a>
        </>
      )}

      {/* ── STEP: preview ── */}
      {step === STEPS.preview && (
        <div>
          {errors.length > 0 && (
            <div style={{
              background: 'var(--danger-soft)', border: '1px solid var(--danger)',
              borderRadius: 'var(--r)', padding: '12px 16px', marginBottom: 16,
              fontSize: 13, color: 'var(--danger)'
            }}>
              <strong>{errors.length} linha{errors.length !== 1 ? 's' : ''} com erro</strong> serão ignoradas na importação:
              <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                {errors.slice(0, 5).map((e) => (
                  <li key={e.row}>Linha {e.row}: {e.erros.join(', ')}</li>
                ))}
                {errors.length > 5 && <li>…e mais {errors.length - 5} erros</li>}
              </ul>
            </div>
          )}

          <div style={{ overflowX: 'auto', maxHeight: 340, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--r)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
              <thead>
                <tr>
                  <th style={thStyle}>#</th>
                  {isQuestoes ? (
                    <>
                      <th style={thStyle}>aula_id</th>
                      <th style={{ ...thStyle, maxWidth: 240 }}>Enunciado</th>
                      <th style={thStyle}>Gabarito</th>
                      <th style={thStyle}>Instituição</th>
                      <th style={thStyle}>Ano</th>
                      <th style={thStyle}>Dificuldade</th>
                      <th style={thStyle}>Status</th>
                    </>
                  ) : (
                    <>
                      <th style={thStyle}>aula_id</th>
                      <th style={{ ...thStyle, maxWidth: 200 }}>Frente</th>
                      <th style={{ ...thStyle, maxWidth: 200 }}>Verso</th>
                      <th style={thStyle}>Tags</th>
                      <th style={thStyle}>Status</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => {
                  const validate = isQuestoes ? validateQuestao : validateFlashcard;
                  const erros = validate(r);
                  const hasError = erros.length > 0;
                  return (
                    <tr key={r._row} style={{ background: hasError ? 'var(--danger-soft)' : 'inherit' }}>
                      <td style={tdStyle}>{r._row}</td>
                      {isQuestoes ? (
                        <>
                          <td style={tdStyle}>{r.aula_id}</td>
                          <td style={{ ...tdStyle, maxWidth: 240, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                            title={r.enunciado?.replace(/<[^>]+>/g, '')}>
                            {r.enunciado?.replace(/<[^>]+>/g, '').slice(0, 80)}…
                          </td>
                          <td style={{ ...tdStyle, textAlign: 'center' }}>{r.gabarito}</td>
                          <td style={tdStyle}>{r.instituicao}</td>
                          <td style={tdStyle}>{r.ano}</td>
                          <td style={tdStyle}>{{ Facil: 'Fácil', Media: 'Médio', Dificil: 'Difícil' }[r.dificuldade] || r.dificuldade}</td>
                        </>
                      ) : (
                        <>
                          <td style={tdStyle}>{r.aula_id}</td>
                          <td style={{ ...tdStyle, maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.frente?.slice(0, 60)}</td>
                          <td style={{ ...tdStyle, maxWidth: 200, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.verso?.slice(0, 60)}</td>
                          <td style={tdStyle}>{r.tags}</td>
                        </>
                      )}
                      <td style={tdStyle}>
                        {hasError
                          ? <span style={{ color: 'var(--danger)', fontWeight: 600 }}>✗ {erros[0]}</span>
                          : <span style={{ color: 'var(--success)', fontWeight: 600 }}>✓ OK</span>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── STEP: importing ── */}
      {step === STEPS.importing && (
        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
          <div className="spinner" style={{ width: 32, height: 32, margin: '0 auto 16px', borderWidth: 3 }} />
          <p style={{ color: 'var(--fg)', fontWeight: 600, margin: '0 0 8px' }}>Importando…</p>
          <p style={{ color: 'var(--fg-muted)', fontSize: 13, margin: '0 0 16px' }}>{Math.min(progress, 100)}% concluído</p>
          <div style={{ background: 'var(--bg-soft)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
            <div style={{
              background: 'var(--accent)', height: '100%', borderRadius: 999,
              width: `${Math.min(progress, 100)}%`, transition: 'width .3s'
            }} />
          </div>
        </div>
      )}

      {/* ── STEP: done ── */}
      {step === STEPS.done && result && (
        <div>
          <div style={{
            background: result.ok > 0 ? 'var(--success-soft)' : 'var(--danger-soft)',
            border: `1px solid ${result.ok > 0 ? 'var(--success)' : 'var(--danger)'}`,
            borderRadius: 'var(--r-md)', padding: '20px 24px', marginBottom: 16, textAlign: 'center'
          }}>
            <div style={{ fontSize: 36, fontWeight: 700, color: result.ok > 0 ? 'var(--success)' : 'var(--danger)', lineHeight: 1 }}>
              {result.ok}
            </div>
            <div style={{ fontSize: 13, color: 'var(--fg-muted)', marginTop: 4 }}>
              {isQuestoes ? 'questões' : 'flashcards'} importados com sucesso
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            <div style={statBox}>
              <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--fg)' }}>{rows.length}</span>
              <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>linhas no arquivo</span>
            </div>
            <div style={statBox}>
              <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--warning)' }}>{result.skipped}</span>
              <span style={{ fontSize: 12, color: 'var(--fg-muted)' }}>ignoradas (validação)</span>
            </div>
          </div>

          {result.failed.length > 0 && (
            <div style={{
              background: 'var(--danger-soft)', border: '1px solid var(--danger)',
              borderRadius: 'var(--r)', padding: '12px 16px', fontSize: 13, color: 'var(--danger)'
            }}>
              <strong>{result.failed.length} lote{result.failed.length !== 1 ? 's' : ''} com falha na API:</strong>
              <ul style={{ margin: '8px 0 0', paddingLeft: 20 }}>
                {result.failed.map((f, i) => (
                  <li key={i}>{f.batch}: {f.erro}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}

const thStyle = {
  textAlign: 'left',
  fontFamily: 'var(--font-mono)',
  fontSize: 10,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--fg-soft)',
  padding: '10px 12px',
  background: 'var(--bg-soft)',
  borderBottom: '1px solid var(--border)',
  whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: '10px 12px',
  borderBottom: '1px solid var(--border)',
  fontSize: 12.5,
  verticalAlign: 'middle',
};

const statBox = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  justifyContent: 'center', gap: 4, padding: '16px',
  background: 'var(--bg-soft)', border: '1px solid var(--border)',
  borderRadius: 'var(--r)', textAlign: 'center',
};