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
    flashcards: 8,
  },
  {
    id: 2589,
    nome: "ENARE 2024 — Clínica Médica",
    tipo: "Residência",
    especialidade: "Clínica Médica",
    diagnostico: "Multitemático",
    tags: ["ENARE", "2024", "Banco oficial"],
    questoes: 84,
    flashcards: 42,
  },
  {
    id: 2604,
    nome: "Cardiologia — IAM com supra de ST",
    tipo: "Especialização",
    especialidade: "Cardiologia",
    diagnostico: "Síndrome Coronariana Aguda",
    tags: ["Emergência", "ECG", "Dupla antiagregação"],
    questoes: 36,
    flashcards: 22,
  },
  {
    id: 2611,
    nome: "Pediatria — Sepse Neonatal Precoce",
    tipo: "Residência",
    especialidade: "Pediatria",
    diagnostico: "Sepse Neonatal",
    tags: ["UTI Neo", "GBS", "Antibioticoterapia"],
    questoes: 18,
    flashcards: 14,
  },
  {
    id: 2628,
    nome: "USP-RP — Vias Aéreas Difíceis",
    tipo: "Concurso",
    especialidade: "Anestesiologia",
    diagnostico: "Manejo de Via Aérea",
    tags: ["USP-RP", "2024", "Cormack-Lehane"],
    questoes: 24,
    flashcards: 16,
  },
  {
    id: 2645,
    nome: "UNIFESP — Hepatites Virais Crônicas",
    tipo: "Residência",
    especialidade: "Gastroenterologia",
    diagnostico: "Hepatite B/C",
    tags: ["UNIFESP", "Sorologia", "DAA"],
    questoes: 28,
    flashcards: 18,
  },
];

const QUESTOES_BY_COURSE = {
  2572: [
    { id: 101, enunciado: "Paciente feminina, 41 anos, com quadro de vasculite sistêmica e eosinofilia periférica. Qual a conduta mais adequada?",
      alternativas: [
        { letra: "A", texto: "Iniciar prednisona em dose alta" },
        { letra: "B", texto: "Solicitar biópsia renal imediata" },
        { letra: "C", texto: "Iniciar mepolizumabe como adjuvante" },
        { letra: "D", texto: "Prescrever ciclofosfamida isolada" },
        { letra: "E", texto: "Observação clínica e reavaliação em 30 dias" },
      ],
      gabarito: "C", instituicao: "USP", ano: "2023", dificuldade: "Médio",
      tags: ["vasculite", "GEPA", "tratamento"], essencial: true,
      feedback: "Em GEPA refratária à corticoterapia, o mepolizumabe (anti-IL5) demonstrou redução significativa de recaídas no estudo MIRRA."
    },
    { id: 102, enunciado: "Qual é o principal mecanismo de ação dos anti-IL5 no tratamento da GEPA?",
      alternativas: [
        { letra: "A", texto: "Bloqueio da interleucina-5, reduzindo eosinófilos circulantes" },
        { letra: "B", texto: "Inibição de TNF-α" },
        { letra: "C", texto: "Depleção de células B via CD20" },
        { letra: "D", texto: "Inibição de calcineurina" },
      ],
      gabarito: "A", instituicao: "UNICAMP", ano: "2022", dificuldade: "Fácil",
      tags: ["mecanismo", "biológicos"], essencial: false, feedback: "" },
    { id: 103, enunciado: "Em relação ao diagnóstico diferencial de vasculites ANCA-associadas, assinale a correta.",
      alternativas: [
        { letra: "A", texto: "GPA tem maior envolvimento renal" },
        { letra: "B", texto: "MPA cursa tipicamente com granulomas" },
        { letra: "C", texto: "GEPA está fortemente associada a asma" },
        { letra: "D", texto: "Todas anteriores estão corretas" },
      ],
      gabarito: "C", instituicao: "ENARE", ano: "2024", dificuldade: "Difícil",
      tags: ["diagnóstico", "ANCA"], essencial: true, feedback: "" },
    { id: 104, enunciado: "Mulher de 35 anos apresenta púrpura palpável em MMII, artralgia e hematúria. Considerando a hipótese de vasculite, qual o exame inicial mais indicado?",
      alternativas: [
        { letra: "A", texto: "TC de tórax" },
        { letra: "B", texto: "Pesquisa de ANCA e exame de urina I" },
        { letra: "C", texto: "Biópsia renal" },
        { letra: "D", texto: "Capilaroscopia periungueal" },
      ],
      gabarito: "B", instituicao: "USP-RP", ano: "2023", dificuldade: "Médio",
      tags: ["clínica", "investigação"], essencial: false, feedback: "" },
    { id: 105, enunciado: "Sobre o tratamento da granulomatose eosinofílica com poliangiíte, é INCORRETO afirmar que…",
      alternativas: [
        { letra: "A", texto: "Corticoide é o pilar do tratamento" },
        { letra: "B", texto: "Mepolizumabe é aprovado como adjuvante" },
        { letra: "C", texto: "Rituximabe pode ser usado em casos graves" },
        { letra: "D", texto: "Ciclofosfamida é a primeira escolha em todos os casos" },
        { letra: "E", texto: "Manutenção pode ser feita com azatioprina" },
      ],
      gabarito: "D", instituicao: "UNIFESP", ano: "2024", dificuldade: "Difícil",
      tags: ["tratamento", "imunossupressão"], essencial: true, feedback: "" },
    { id: 106, enunciado: "Qual marcador laboratorial é classicamente elevado na GEPA?",
      alternativas: [
        { letra: "A", texto: "IgE total e eosinófilos" },
        { letra: "B", texto: "Anti-DNA dupla-fita" },
        { letra: "C", texto: "Anti-Ro/SSA" },
        { letra: "D", texto: "Anti-CCP" },
      ],
      gabarito: "A", instituicao: "USP", ano: "2022", dificuldade: "Fácil",
      tags: ["laboratório"], essencial: false, feedback: "" },
    { id: 107, enunciado: "Critérios diagnósticos ACR/EULAR 2022 para GEPA incluem todos, EXCETO:",
      alternativas: [
        { letra: "A", texto: "Asma" }, { letra: "B", texto: "Eosinofilia > 1000" },
        { letra: "C", texto: "Sinusite/polipose" }, { letra: "D", texto: "Hipertensão sistêmica" },
      ],
      gabarito: "D", instituicao: "ENARE", ano: "2023", dificuldade: "Médio",
      tags: ["critérios", "ACR"], essencial: true, feedback: "" },
    { id: 108, enunciado: "Em qual situação a biópsia renal é mais indicada na suspeita de vasculite ANCA?",
      alternativas: [
        { letra: "A", texto: "Hematúria isolada sem proteinúria" },
        { letra: "B", texto: "GNRP com queda de função renal" },
        { letra: "C", texto: "Apenas elevação de PCR" },
        { letra: "D", texto: "Suspeita clínica sem alteração urinária" },
      ],
      gabarito: "B", instituicao: "UNICAMP", ano: "2024", dificuldade: "Médio",
      tags: ["diagnóstico", "renal"], essencial: false, feedback: "" },
  ],
};
// Generate placeholder questions for other courses
[2589, 2604, 2611, 2628, 2645].forEach(cid => {
  const course = COURSES.find(c => c.id === cid);
  const n = course.questoes;
  QUESTOES_BY_COURSE[cid] = Array.from({ length: Math.min(n, 6) }, (_, i) => ({
    id: cid * 10 + i + 1,
    enunciado: `Questão ${i+1} do curso ${course.especialidade}. Assinale a alternativa correta sobre o tema apresentado.`,
    alternativas: ["A","B","C","D","E"].map(l => ({ letra: l, texto: `Alternativa ${l}` })),
    gabarito: ["A","B","C","D","E"][i % 5],
    instituicao: ["USP","ENARE","UNIFESP","UNICAMP","USP-RP"][i % 5],
    ano: ["2024","2023","2022"][i % 3],
    dificuldade: ["Fácil","Médio","Difícil"][i % 3],
    tags: [course.especialidade.toLowerCase(), "prova"],
    essencial: i % 2 === 0,
    feedback: "",
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
      exemplo: "Mononeurite múltipla é altamente sugestiva.", tags: ["clínica"] },
  ],
};
[2589, 2604, 2611, 2628, 2645].forEach(cid => {
  const course = COURSES.find(c => c.id === cid);
  const n = Math.min(course.flashcards, 5);
  FLASHCARDS_BY_COURSE[cid] = Array.from({ length: n }, (_, i) => ({
    id: cid * 10 + 100 + i,
    frente: `Conceito ${i+1} — ${course.especialidade}`,
    verso: `Definição teórica do conceito ${i+1} aplicada ao contexto de ${course.diagnostico}.`,
    exemplo: i % 2 === 0 ? `Aplicação clínica típica no manejo de ${course.diagnostico}.` : "",
    tags: [course.especialidade.toLowerCase(), "conceito"],
  }));
});

window.COURSES = COURSES;
window.QUESTOES_BY_COURSE = QUESTOES_BY_COURSE;
window.FLASHCARDS_BY_COURSE = FLASHCARDS_BY_COURSE;
