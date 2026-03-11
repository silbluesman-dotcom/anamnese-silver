
// ============ SIDEBAR ============
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const icon = document.getElementById('sidebar-toggle-icon');
  sidebar.classList.toggle('collapsed');
  icon.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✕';
}

function novaAnamneseForm() {
  if (confirm('Iniciar nova anamnese? Os dados não salvos serão perdidos.')) {
    document.querySelectorAll('input[type="text"], input[type="number"], input[type="date"], textarea').forEach(el => { el.value = ''; });
    document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el => { el.checked = false; });
    document.querySelectorAll('select').forEach(el => { el.selectedIndex = 0; });
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
}

// ============ AUTOCOMPLETE DE MEDICAMENTOS ============
const MEDICAMENTOS_LISTA = [
  // Cardiovascular / Anti-hipertensivos
  "Enalapril 5mg","Enalapril 10mg","Enalapril 20mg",
  "Losartana 25mg","Losartana 50mg","Losartana 100mg",
  "Valsartana 80mg","Valsartana 160mg",
  "Amlodipino 5mg","Amlodipino 10mg",
  "Nifedipino 10mg","Nifedipino 20mg retard",
  "Propranolol 10mg","Propranolol 40mg","Propranolol 80mg",
  "Atenolol 25mg","Atenolol 50mg","Atenolol 100mg",
  "Metoprolol 25mg","Metoprolol 50mg","Metoprolol 100mg",
  "Carvedilol 3,125mg","Carvedilol 6,25mg","Carvedilol 12,5mg","Carvedilol 25mg",
  "Bisoprolol 2,5mg","Bisoprolol 5mg","Bisoprolol 10mg",
  "Hidroclorotiazida 12,5mg","Hidroclorotiazida 25mg",
  "Furosemida 20mg","Furosemida 40mg",
  "Espironolactona 25mg","Espironolactona 50mg",
  "Captopril 12,5mg","Captopril 25mg","Captopril 50mg",
  "Ramipril 2,5mg","Ramipril 5mg","Ramipril 10mg",
  "Olmesartana 20mg","Olmesartana 40mg",
  "Isossorbida 5mg sublingual","Isossorbida 10mg","Isossorbida 20mg",
  "Nitroglicerina spray sublingual",
  "Digoxina 0,25mg","Amiodarona 100mg","Amiodarona 200mg",
  "Warfarina 1mg","Warfarina 2,5mg","Warfarina 5mg",
  "Rivaroxabana 10mg","Rivaroxabana 15mg","Rivaroxabana 20mg",
  "Apixabana 2,5mg","Apixabana 5mg",
  "Dabigatrana 75mg","Dabigatrana 110mg","Dabigatrana 150mg",
  "AAS 81mg","AAS 100mg","AAS 200mg","AAS 500mg",
  "Clopidogrel 75mg","Ticagrelor 60mg","Ticagrelor 90mg",
  "Sinvastatina 10mg","Sinvastatina 20mg","Sinvastatina 40mg","Sinvastatina 80mg",
  "Atorvastatina 10mg","Atorvastatina 20mg","Atorvastatina 40mg","Atorvastatina 80mg",
  "Rosuvastatina 5mg","Rosuvastatina 10mg","Rosuvastatina 20mg","Rosuvastatina 40mg",
  "Bezafibrato 200mg","Fenofibrato 160mg",
  // Diabetes
  "Metformina 500mg","Metformina 850mg","Metformina 1000mg",
  "Glibenclamida 2,5mg","Glibenclamida 5mg",
  "Glicazida 30mg MR","Glicazida 60mg MR",
  "Glimepirida 1mg","Glimepirida 2mg","Glimepirida 4mg",
  "Sitagliptina 50mg","Sitagliptina 100mg",
  "Vildagliptina 50mg","Saxagliptina 5mg","Alogliptina 12,5mg","Alogliptina 25mg",
  "Empagliflozina 10mg","Empagliflozina 25mg",
  "Dapagliflozina 10mg","Canagliflozina 100mg","Canagliflozina 300mg",
  "Semaglutida 0,5mg","Semaglutida 1mg","Semaglutida 2mg",
  "Liraglutida 0,6mg","Liraglutida 1,2mg","Liraglutida 1,8mg",
  "Insulina NPH 100UI/ml","Insulina Regular 100UI/ml",
  "Insulina Glargina 100UI/ml","Insulina Detemir 100UI/ml",
  "Insulina Lispro 100UI/ml","Insulina Aspart 100UI/ml","Insulina Glulisina 100UI/ml",
  // Tireoide
  "Levotiroxina 25mcg","Levotiroxina 50mcg","Levotiroxina 75mcg",
  "Levotiroxina 100mcg","Levotiroxina 125mcg","Levotiroxina 150mcg","Levotiroxina 200mcg",
  "Propiltiouracil 50mg","Metimazol 5mg","Metimazol 10mg","Metimazol 20mg",
  // Gastrointestinal
  "Omeprazol 10mg","Omeprazol 20mg","Omeprazol 40mg",
  "Pantoprazol 20mg","Pantoprazol 40mg",
  "Esomeprazol 20mg","Esomeprazol 40mg",
  "Lansoprazol 15mg","Lansoprazol 30mg",
  "Ranitidina 75mg","Ranitidina 150mg","Ranitidina 300mg",
  "Ondansetrona 4mg","Ondansetrona 8mg",
  "Metoclopramida 10mg","Domperidona 10mg",
  "Loperamida 2mg","Simeticona 40mg","Simeticona 80mg",
  "Mesalazina 400mg","Mesalazina 800mg","Mesalazina 1g",
  "Prednisona 5mg","Prednisona 10mg","Prednisona 20mg","Prednisona 40mg",
  // Respiratório
  "Salbutamol (Ventolin) 100mcg inalação",
  "Formoterol 6mcg inalação","Formoterol 12mcg inalação",
  "Salmeterol 25mcg inalação","Salmeterol 50mcg inalação",
  "Beclometasona 50mcg inalação","Beclometasona 100mcg inalação","Beclometasona 250mcg inalação",
  "Budesonida 100mcg inalação","Budesonida 200mcg inalação","Budesonida 400mcg inalação",
  "Fluticasona 50mcg inalação","Fluticasona 125mcg inalação","Fluticasona 250mcg inalação",
  "Ipratrópio 20mcg inalação","Tiotrópio 18mcg inalação","Tiotrópio 2,5mcg spray",
  "Montelucaste 4mg","Montelucaste 5mg","Montelucaste 10mg",
  "Cetirizina 5mg","Cetirizina 10mg","Loratadina 10mg","Fexofenadina 120mg","Fexofenadina 180mg",
  "Desloratadina 5mg","Bilastina 20mg","Rupatadina 10mg",
  // SNC / Psiquiatria
  "Sertralina 25mg","Sertralina 50mg","Sertralina 100mg",
  "Fluoxetina 10mg","Fluoxetina 20mg","Fluoxetina 40mg",
  "Escitalopram 5mg","Escitalopram 10mg","Escitalopram 20mg",
  "Citalopram 10mg","Citalopram 20mg","Citalopram 40mg",
  "Paroxetina 10mg","Paroxetina 20mg","Paroxetina 30mg","Paroxetina 40mg",
  "Venlafaxina 37,5mg","Venlafaxina 75mg","Venlafaxina 150mg",
  "Desvenlafaxina 50mg","Desvenlafaxina 100mg",
  "Duloxetina 30mg","Duloxetina 60mg",
  "Amitriptilina 10mg","Amitriptilina 25mg","Amitriptilina 50mg","Amitriptilina 75mg",
  "Nortriptilina 10mg","Nortriptilina 25mg","Nortriptilina 50mg",
  "Bupropiona 75mg","Bupropiona 150mg SR","Bupropiona 300mg XL",
  "Mirtazapina 15mg","Mirtazapina 30mg",
  "Trazodona 50mg","Trazodona 100mg",
  "Quetiapina 25mg","Quetiapina 50mg","Quetiapina 100mg","Quetiapina 200mg","Quetiapina 300mg",
  "Olanzapina 2,5mg","Olanzapina 5mg","Olanzapina 10mg","Olanzapina 20mg",
  "Risperidona 0,5mg","Risperidona 1mg","Risperidona 2mg","Risperidona 3mg","Risperidona 4mg",
  "Haloperidol 1mg","Haloperidol 2mg","Haloperidol 5mg","Haloperidol 10mg",
  "Clozapina 25mg","Clozapina 100mg","Aripiprazol 10mg","Aripiprazol 15mg","Aripiprazol 20mg",
  "Carbonato de lítio 150mg","Carbonato de lítio 300mg",
  "Ácido valproico 250mg","Ácido valproico 500mg","Valproato de sódio 250mg","Valproato de sódio 500mg",
  "Carbamazepina 200mg","Carbamazepina 400mg","Oxcarbazepina 150mg","Oxcarbazepina 300mg","Oxcarbazepina 600mg",
  "Lamotrigina 25mg","Lamotrigina 50mg","Lamotrigina 100mg","Lamotrigina 200mg",
  "Topiramato 25mg","Topiramato 50mg","Topiramato 100mg",
  "Clonazepam 0,5mg","Clonazepam 1mg","Clonazepam 2mg",
  "Diazepam 2mg","Diazepam 5mg","Diazepam 10mg",
  "Alprazolam 0,25mg","Alprazolam 0,5mg","Alprazolam 1mg",
  "Bromazepam 1,5mg","Bromazepam 3mg","Bromazepam 6mg",
  "Lorazepam 1mg","Lorazepam 2mg",
  "Zolpidem 5mg","Zolpidem 10mg","Zopiclona 7,5mg",
  "Metilfenidato 10mg","Metilfenidato 20mg","Metilfenidato LA 20mg","Metilfenidato LA 30mg","Metilfenidato LA 40mg",
  "Lisdexanfetamina 20mg","Lisdexanfetamina 30mg","Lisdexanfetamina 50mg","Lisdexanfetamina 70mg",
  "Atomoxetina 10mg","Atomoxetina 18mg","Atomoxetina 25mg","Atomoxetina 40mg","Atomoxetina 60mg","Atomoxetina 80mg",
  // Neurologia / Dor
  "Levodopa + Carbidopa 100/25mg","Levodopa + Carbidopa 250/25mg",
  "Pramipexol 0,125mg","Pramipexol 0,25mg","Pramipexol 0,5mg","Pramipexol 1mg",
  "Donepezila 5mg","Donepezila 10mg","Rivastigmina 1,5mg","Rivastigmina 3mg","Rivastigmina 4,5mg","Rivastigmina 6mg",
  "Memantina 5mg","Memantina 10mg",
  "Gabapentina 100mg","Gabapentina 300mg","Gabapentina 400mg",
  "Pregabalina 25mg","Pregabalina 50mg","Pregabalina 75mg","Pregabalina 150mg","Pregabalina 300mg",
  "Paracetamol 500mg","Paracetamol 750mg",
  "Dipirona 500mg","Dipirona 1g",
  "Ibuprofeno 200mg","Ibuprofeno 400mg","Ibuprofeno 600mg",
  "Naproxeno 250mg","Naproxeno 500mg","Naproxeno 550mg",
  "Diclofenaco 25mg","Diclofenaco 50mg",
  "Tramadol 50mg","Tramadol 100mg",
  "Codeína 30mg","Morfina 10mg","Morfina 30mg",
  "Sumatriptano 50mg","Sumatriptano 100mg",
  "Amitriptilina 25mg (profilaxia enxaqueca)","Topiramato 50mg (profilaxia enxaqueca)",
  // Antibióticos / Infecções
  "Amoxicilina 250mg","Amoxicilina 500mg","Amoxicilina 875mg",
  "Amoxicilina + Clavulanato 500/125mg","Amoxicilina + Clavulanato 875/125mg",
  "Azitromicina 250mg","Azitromicina 500mg",
  "Claritromicina 250mg","Claritromicina 500mg",
  "Cefalexina 250mg","Cefalexina 500mg",
  "Ciprofloxacino 250mg","Ciprofloxacino 500mg","Ciprofloxacino 750mg",
  "Levofloxacino 250mg","Levofloxacino 500mg","Levofloxacino 750mg",
  "Doxiciclina 100mg","Minociclina 50mg","Minociclina 100mg",
  "Metronidazol 250mg","Metronidazol 400mg","Metronidazol 500mg",
  "Sulfametoxazol + Trimetoprima 400/80mg","Sulfametoxazol + Trimetoprima 800/160mg",
  "Nitrofurantoína 50mg","Nitrofurantoína 100mg",
  "Fluconazol 50mg","Fluconazol 100mg","Fluconazol 150mg","Fluconazol 200mg",
  // Osteoarticular
  "Alopurinol 100mg","Alopurinol 200mg","Alopurinol 300mg",
  "Febuxostate 40mg","Febuxostate 80mg","Colchicina 0,5mg","Colchicina 1mg",
  "Metotrexato 2,5mg","Hidroxicloroquina 200mg","Leflunomida 10mg","Leflunomida 20mg",
  "Sulfassalazina 500mg","Sulfassalazina 1g",
  "Alendronato 10mg","Alendronato 35mg","Alendronato 70mg",
  "Risedronato 5mg","Risedronato 35mg",
  "Calcitonina spray nasal","Carbonato de cálcio 500mg","Carbonato de cálcio 1g",
  // Outros comuns
  "Levonorgestrel + Etinilestradiol 0,15/0,03mg","Drospirenona + Etinilestradiol 3/0,02mg",
  "Medroxiprogesterona 2,5mg","Medroxiprogesterona 5mg","Medroxiprogesterona 10mg",
  "Testosterona 250mg/ml injetável","Testosterona gel 50mg",
  "Ferro sulfato 200mg","Ferro polimaltosado 100mg","Ferro polimaltosado 50mg/ml",
  "Ácido fólico 0,4mg","Ácido fólico 5mg",
  "Vitamina B12 1000mcg","Vitamina D 400UI","Vitamina D 1000UI","Vitamina D 2000UI","Vitamina D 7000UI",
  "Vitamina D + Cálcio 500UI/200mg","Vitamina K2 + D3",
  "Ômega 3 1g","Complexo B",
];

let medsSelecionada = '';

function filtrarMedicamentos(texto) {
  const div = document.getElementById('meds-sugestoes');
  if (!texto || texto.length < 2) { div.style.display = 'none'; return; }
  const lower = texto.toLowerCase();
  const filtrados = MEDICAMENTOS_LISTA.filter(m => m.toLowerCase().includes(lower)).slice(0, 10);
  if (!filtrados.length) { div.style.display = 'none'; return; }
  div.innerHTML = filtrados.map(m =>
    `<div class="meds-sugestao-item" onclick="selecionarMedicamento('${m.replace(/'/g,"\\'")}')">💊 ${m}</div>`
  ).join('');
  div.style.display = 'block';
}

function selecionarMedicamento(med) {
  const textarea = document.getElementById('meds_continuos');
  const input = document.getElementById('meds-input');
  const linhas = textarea.value ? textarea.value.split('\n').filter(l => l.trim()) : [];
  const num = String(linhas.length + 1).padStart(2, '0');
  textarea.value = (textarea.value ? textarea.value + '\n' : '') + `${num} - ${med}`;
  input.value = '';
  document.getElementById('meds-sugestoes').style.display = 'none';
}

function adicionarMedicamento() {
  const input = document.getElementById('meds-input');
  if (input.value.trim()) selecionarMedicamento(input.value.trim());
}

document.addEventListener('click', function(e) {
  if (!e.target.closest('.meds-autocomplete-wrapper')) {
    const d = document.getElementById('meds-sugestoes');
    if (d) d.style.display = 'none';
  }
});

// ============ FRASES SEMIOLÓGICAS ============
const FRASES_SEMIO = [
  // DOR
  {cat:'dor', texto:'Dor em queimação, localizada em epigástrio, sem irradiação, de início gradual.'},
  {cat:'dor', texto:'Dor em cólica, de forte intensidade (8/10), localizada em fossa ilíaca direita, com irradiação para região inguinal.'},
  {cat:'dor', texto:'Dor em aperto, retroesternal, de início súbito, com irradiação para membro superior esquerdo e mandíbula.'},
  {cat:'dor', texto:'Dor latejante, hemicraniana, acompanhada de náuseas e fotofobia.'},
  {cat:'dor', texto:'Dor em facada, localizada em hipocôndrio direito, de forte intensidade, irradiando para escápula direita.'},
  {cat:'dor', texto:'Dor lombar, de início gradual, piora com movimentação, sem irradiação, com intensidade 6/10.'},
  {cat:'dor', texto:'Dor contínua, de moderada intensidade (5/10), sem irradiação, sem fatores de melhora ou piora claros.'},
  {cat:'dor', texto:'Dor em pontada, de início súbito, localizada no hemitórax direito, que piora com a inspiração profunda.'},
  {cat:'dor', texto:'Dor difusa, de difícil localização, sem irradiação, associada a distensão abdominal.'},
  {cat:'dor', texto:'Dor em cólica com intensidade progressiva (7/10), associada a sudorese e náuseas.'},
  // DISPNEIA
  {cat:'dispneia', texto:'Dispneia aos médios esforços, de início gradual há ___ meses, sem ortopneia.'},
  {cat:'dispneia', texto:'Dispneia paroxística noturna, que melhora com ortopneia (2 travesseiros), associada a edema de membros inferiores.'},
  {cat:'dispneia', texto:'Dispneia de instalação súbita em repouso, acompanhada de dor pleurítica e hemoptise.'},
  {cat:'dispneia', texto:'Dispneia progressiva aos pequenos esforços, associada a tosse produtiva crônica e tabagismo.'},
  {cat:'dispneia', texto:'Dispneia expiratória com sibilância, de caráter episódico, com piora noturna.'},
  {cat:'dispneia', texto:'Dispneia com sensação de sufocamento, associada a ansiedade e parestesias em extremidades.'},
  {cat:'dispneia', texto:'Dispneia de início agudo após ingestão de ___, associada a urticária e angioedema.'},
  // DIGESTIVO
  {cat:'digestivo', texto:'Náuseas e vômitos pós-prandiais, de conteúdo alimentar, sem bílis, desde há ___ dias.'},
  {cat:'digestivo', texto:'Vômitos em jato, sem náusea prévia, de conteúdo alimentar.'},
  {cat:'digestivo', texto:'Diarreia aquosa, sem sangue ou muco, ___ evacuações/dia, associada a cólicas abdominais.'},
  {cat:'digestivo', texto:'Diarreia com sangue e muco (disenteria), acompanhada de tenesmo e febre.'},
  {cat:'digestivo', texto:'Constipação intestinal há ___ dias, última evacuação em ___, sem sangue nas fezes.'},
  {cat:'digestivo', texto:'Pirose e regurgitação ácida, de predomínio pós-prandial e decúbito, há ___ meses.'},
  {cat:'digestivo', texto:'Disfagia progressiva inicialmente para sólidos e depois para líquidos, associada a emagrecimento.'},
  {cat:'digestivo', texto:'Icterícia progressiva, colúria e acolia fecal há ___ dias, sem dor abdominal significativa.'},
  {cat:'digestivo', texto:'Melena há ___ dias, associada a tontura e palidez cutânea.'},
  {cat:'digestivo', texto:'Hematêmese em grande quantidade, associada a hipotensão e taquicardia.'},
  // NEUROLÓGICO
  {cat:'neurologico', texto:'Cefaleia holocraniana, de forte intensidade (8/10), de início súbito ("como uma bomba"), a pior da vida.'},
  {cat:'neurologico', texto:'Cefaleia hemicraniana pulsátil, precedida de aura visual (escotoma cintilante), associada a náuseas e fotofobia.'},
  {cat:'neurologico', texto:'Tontura rotatória (vertigem), associada a nistagmo, náuseas e vômitos, sem componente auditivo.'},
  {cat:'neurologico', texto:'Síncope precedida de pródromo (tontura, palidez, sudorese fria), com recuperação rápida e espontânea.'},
  {cat:'neurologico', texto:'Convulsão tônico-clônica generalizada de ___ minutos de duração, com período pós-ictal de confusão.'},
  {cat:'neurologico', texto:'Hemiparesia súbita à direita, associada a afasia de expressão, de início ___ horas atrás.'},
  {cat:'neurologico', texto:'Tremor de repouso em extremidades, associado a rigidez e bradicinesia, de início há ___ anos.'},
  {cat:'neurologico', texto:'Parestesias em "bota e luva" em membros inferiores, de progressão distal para proximal.'},
  {cat:'neurologico', texto:'Confusão mental de início agudo, com flutuação do nível de consciência, piora noturna.'},
  // CARDIOVASCULAR
  {cat:'cardiovascular', texto:'Palpitações de início súbito e término súbito, de ritmo regular, associadas a dispneia.'},
  {cat:'cardiovascular', texto:'Palpitações irregulares, persistentes, associadas a fadiga e dispneia aos esforços.'},
  {cat:'cardiovascular', texto:'Edema bilateral de membros inferiores, fóvea positivo, de predomínio vespertino, que melhora com elevação dos MMII.'},
  {cat:'cardiovascular', texto:'Claudicação intermitente em panturrilhas, após ___ metros de caminhada, que melhora com repouso.'},
  {cat:'cardiovascular', texto:'Dor precordial típica, opressiva, irradiada para MSE, desencadeada por esforço, com duração de ___ minutos.'},
  {cat:'cardiovascular', texto:'Síncope durante esforço físico intenso, sem pródromo, com recuperação espontânea.'},
  {cat:'cardiovascular', texto:'Dispneia progressiva, ortopneia, dispneia paroxística noturna, com edema de MMII e ganho ponderal.'},
  // GERAL / EXAME FÍSICO
  {cat:'geral', texto:'Paciente em bom estado geral, lúcido e orientado em tempo, espaço e pessoa, eupneico, anictérico, acianótico, afebril.'},
  {cat:'geral', texto:'Paciente em regular estado geral, consciente, taquidispneico, com uso de musculatura acessória.'},
  {cat:'geral', texto:'Paciente em mau estado geral, prostrado, hipocorado (++/4+), desidratado, taquicárdico.'},
  {cat:'geral', texto:'PA: ___/___mmHg, FC: ___bpm, FR: ___irpm, T: ___°C, SpO2: ___%, peso: ___kg, altura: ___m.'},
  {cat:'geral', texto:'Febre de início há ___ dias, temperatura máxima de ___°C, de padrão ___, associada a calafrios.'},
  {cat:'geral', texto:'Astenia e adinamia progressivas há ___ semanas, associadas a emagrecimento não intencional de ___kg.'},
  {cat:'geral', texto:'Paciente nega febre, nega perda de peso, nega sudorese noturna.'},
  {cat:'geral', texto:'Sem queixas urinárias ou intestinais associadas.'},
  {cat:'geral', texto:'Sem sintomas constitucionais (febre, sudorese noturna, emagrecimento).'},
  {cat:'geral', texto:'Início do quadro há ___ dias/semanas/meses, de evolução progressiva/estável/flutuante.'},
];

let frasesCategoria = 'dor';
let frasesSelecionadas = new Set();

function abrirFrasesSemiologicas() {
  document.getElementById('modal-frases').style.display = 'flex';
  filtrarFrases('dor');
}

function filtrarFrases(cat) {
  frasesCategoria = cat;
  document.querySelectorAll('.frases-tab').forEach(t => t.classList.remove('active'));
  const tab = document.getElementById('tab-' + cat);
  if (tab) tab.classList.add('active');
  renderizarFrases(FRASES_SEMIO.filter(f => f.cat === cat));
}

function buscarFrases(texto) {
  if (!texto.trim()) { filtrarFrases(frasesCategoria); return; }
  const lower = texto.toLowerCase();
  renderizarFrases(FRASES_SEMIO.filter(f => f.texto.toLowerCase().includes(lower)));
}

function renderizarFrases(lista) {
  const div = document.getElementById('frases-lista');
  if (!lista.length) { div.innerHTML = '<p style="color:#999;font-size:0.9rem;">Nenhuma frase encontrada.</p>'; return; }
  div.innerHTML = lista.map(f => {
    const sel = frasesSelecionadas.has(f.texto);
    return `<div class="frase-card ${sel ? 'selecionada' : ''}" onclick="toggleFrase(this, '${f.texto.replace(/'/g, "\\'").replace(/\n/g,"\\n")}')">${f.texto}</div>`;
  }).join('');
}

function toggleFrase(el, texto) {
  const hda = document.getElementById('hda');
  if (!hda) return;
  if (frasesSelecionadas.has(texto)) {
    frasesSelecionadas.delete(texto);
    el.classList.remove('selecionada');
    hda.value = hda.value.replace('\n' + texto, '').replace(texto + '\n', '').replace(texto, '').trim();
  } else {
    frasesSelecionadas.add(texto);
    el.classList.add('selecionada');
    hda.value = (hda.value ? hda.value + '\n' : '') + texto;
  }
}

    // ============ DARK MODE ============
    function toggleDarkMode() {
      const body = document.body;
      const btn = document.getElementById('btnDarkMode');
      
      body.classList.toggle('dark-mode');
      
      if (body.classList.contains('dark-mode')) {
        btn.innerHTML = '☀️ Modo Claro';
        localStorage.setItem('darkMode', 'enabled');
      } else {
        btn.innerHTML = '🌙 Modo Escuro';
        localStorage.setItem('darkMode', 'disabled');
      }
    }

    // Carregar preferência de dark mode
    window.addEventListener('DOMContentLoaded', function() {
      const darkMode = localStorage.getItem('darkMode');
      const btn = document.getElementById('btnDarkMode');
      
      if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        if(btn) btn.innerHTML = '☀️ Modo Claro';
      }
    });

    // ============ BACKUP/EXPORTAR/IMPORTAR ============
    function toggleMenuBackup() {
      const menu = document.getElementById('menuBackup');
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    }

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
      const menu = document.getElementById('menuBackup');
      const btn = document.getElementById('btnBackup');
      if (menu && btn && !menu.contains(e.target) && !btn.contains(e.target)) {
        menu.style.display = 'none';
      }
    });

    function exportarDados() {
      try {
        // Pegar histórico
        const historico = localStorage.getItem('anamnese_historico') || '[]';
        const credenciais = localStorage.getItem('anamnese_credentials') || '{}';
        
        const backup = {
          version: '1.0',
          timestamp: new Date().toISOString(),
          data: {
            historico: JSON.parse(historico),
            credenciais: JSON.parse(credenciais)
          }
        };

        const dataStr = JSON.stringify(backup, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        const filename = `anamnese-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.href = url;
        link.download = filename;
        link.click();
        
        URL.revokeObjectURL(url);
        alert('✅ Backup exportado com sucesso!');
        toggleMenuBackup();
      } catch (e) {
        alert('❌ Erro ao exportar backup: ' + e.message);
      }
    }

    function importarDados(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const backup = JSON.parse(e.target.result);
          
          if (!backup.data || !backup.data.historico) {
            throw new Error('Arquivo de backup inválido');
          }

          if (!confirm('⚠️ Isso substituirá todos os dados atuais. Deseja continuar?')) {
            return;
          }

          // Restaurar dados
          localStorage.setItem('anamnese_historico', JSON.stringify(backup.data.historico));
          
          if (backup.data.credenciais && backup.data.credenciais.usuario) {
            localStorage.setItem('anamnese_credentials', JSON.stringify(backup.data.credenciais));
          }

          alert('✅ Backup importado com sucesso! A página será recarregada.');
          location.reload();
        } catch (e) {
          alert('❌ Erro ao importar backup: ' + e.message);
        }
      };
      reader.readAsText(file);
      
      // Limpar input
      event.target.value = '';
      toggleMenuBackup();
    }

    // ============ ATALHOS DE TECLADO ============
    document.addEventListener('keydown', function(e) {
      // Ctrl+S: Salvar paciente
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        if (typeof window.salvarPacienteAtual === 'function') {
          window.salvarPacienteAtual();
        }
      }
      
      // Ctrl+G: Gerar relatório
      if (e.ctrlKey && e.key === 'g') {
        e.preventDefault();
        if (typeof gerarRelatorio === 'function') {
          gerarRelatorio();
        }
      }
      
      // Ctrl+H: Abrir histórico
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        if (typeof window.abrirHistorico === 'function') {
          window.abrirHistorico();
        }
      }
      
      // Ctrl+E: Abrir scores
      if (e.ctrlKey && e.key === 'e') {
        e.preventDefault();
        if (typeof abrirScores === 'function') {
          abrirScores();
        }
      }
      
      // Esc: Fechar modais
      if (e.key === 'Escape') {
        const modalResultado = document.getElementById('modalResultado');
        const modalHistorico = document.getElementById('modalHistorico');
        const modalScores = document.getElementById('modal-scores');
        const modalEsp = document.getElementById('modalEspecialidades');
        
        if (modalResultado && modalResultado.style.display === 'flex') {
          fecharModal();
        }
        if (modalHistorico && modalHistorico.classList.contains('show')) {
          window.fecharHistorico();
        }
        if (modalScores && modalScores.style.display === 'block') {
          fecharScores();
        }
        if (modalEsp && modalEsp.classList.contains('active')) {
          fecharModalEspecialidades();
        }
      }
    });

    // ============ FUNÇÕES ESPECIALIDADES ============
    function abrirModalEspecialidades() {
      document.getElementById('modalEspecialidades').classList.add('active');
    }

    function fecharModalEspecialidades() {
      document.getElementById('modalEspecialidades').classList.remove('active');
    }

    function selecionarEspecialidade(tipo) {
      document.querySelectorAll('.secao-especializada').forEach(s => s.classList.remove('active'));

      if (tipo === 'gastro') {
        document.getElementById('secao-gastro').classList.add('active');
        setTimeout(() => {
          const elem = document.getElementById('secao-gastro');
          if(elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else if (tipo === 'psiq') {
        document.getElementById('secao-psiq').classList.add('active');
        setTimeout(() => {
          const elem = document.getElementById('secao-psiq');
          if(elem) elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }

      fecharModalEspecialidades();
    }

    function toggleDorAbdominal() {
      const checked = document.getElementById('dor-abdominal').checked;
      document.getElementById('dor-abdominal-detalhes').style.display = checked ? 'block' : 'none';
    }

    function toggleVomitos() {
      const checked = document.getElementById('vomitos').checked;
      document.getElementById('vomitos-detalhes').style.display = checked ? 'block' : 'none';
    }

    function toggleDisfagia() {
      const checked = document.getElementById('disfagia').checked;
      document.getElementById('disfagia-detalhes').style.display = checked ? 'block' : 'none';
    }

    function toggleDiarreia() {
      const checked = document.getElementById('diarreia').checked;
      document.getElementById('diarreia-detalhes').style.display = checked ? 'block' : 'none';
    }

    function toggleEtilismoGastro() {
      const checked = document.getElementById('hab-etil').checked;
      document.getElementById('etilismo-detalhes-gastro').style.display = checked ? 'block' : 'none';
    }

    window.addEventListener('load', function() {
      const modalEsp = document.getElementById('modalEspecialidades');
      if(modalEsp) {
        modalEsp.addEventListener('click', function(e) {
          if (e.target === this) {
            fecharModalEspecialidades();
          }
        });
      }
    });

    const state = {
      alergias: "Não",
      internacao: "Não",
      tabagismo: "Não",
      etilismo: "Não",
      drogas: "Não"
    };
    const alertTypes = new Set(["alergias","internacao","tabagismo","etilismo","drogas"]);

    // ============ ARMAZENAMENTO DE SCORES CALCULADOS ============
    const scoresCalculados = {};

    function salvarScore(nome, pontuacao, interpretacao) {
      scoresCalculados[nome] = {
        pontuacao: pontuacao,
        interpretacao: interpretacao,
        timestamp: new Date().toLocaleString('pt-BR')
      };
    }

    function limparScores() {
      Object.keys(scoresCalculados).forEach(key => delete scoresCalculados[key]);
    }

    function obterScoresTexto() {
      const keys = Object.keys(scoresCalculados);
      if (keys.length === 0) return "";
      
      let texto = "\n# SCORES CLÍNICOS CALCULADOS #\n";
      keys.forEach(nome => {
        const score = scoresCalculados[nome];
        texto += `\n**${nome}:**\n`;
        texto += `  Pontuação: ${score.pontuacao}\n`;
        texto += `  Interpretação: ${score.interpretacao}\n`;
        texto += `  Calculado em: ${score.timestamp}\n`;
      });
      return texto;
    }

    function setOption(type, value){
      state[type] = value;
      const group = document.getElementById(type + "-group");
      const btns = group.getElementsByClassName("toggle-btn");
      Array.from(btns).forEach(b => {
        b.classList.remove("active");
        b.classList.remove("alert-active");
        if (b.innerText.trim().toUpperCase() === value.toUpperCase()){
          b.classList.add("active");
          if (value === "Sim" && alertTypes.has(type)) b.classList.add("alert-active");
        }
      });

      const detail = document.getElementById(type + "-detalhe");
      if (detail){
        detail.style.display = (value === "Sim") ? "block" : "none";
        if (value !== "Sim") detail.value = "";
        if (value === "Sim") detail.focus();
      }

      if (type === "tabagismo"){
        const calcDiv = document.getElementById("tabagismo-calc");
        if (calcDiv){
          calcDiv.style.display = (value === "Sim") ? "block" : "none";
          if (value !== "Sim"){
            document.getElementById("tab_cigs_dia").value = "";
            document.getElementById("tab_anos").value = "";
            document.getElementById("tab_carga").innerText = "0";
          }
        }
      }
    }

    function v(id){
      const el = document.getElementById(id);
      return (el && el.value) ? el.value.trim() : "";
    }

    function calcularCargaTabagica(){
      const cigs = parseFloat(document.getElementById("tab_cigs_dia")?.value || "0");
      const anos = parseFloat(document.getElementById("tab_anos")?.value || "0");
      const span = document.getElementById("tab_carga");
      if (!span){
        return 0;
      }
      if (isNaN(cigs) || isNaN(anos) || cigs <= 0 || anos <= 0){
        span.innerText = "0";
        return 0;
      }
      const carga = (cigs / 20) * anos;
      const cargaFmt = carga.toFixed(1);
      span.innerText = cargaFmt;
      return carga;
    }

    const templates = {
      M: {
        ef_ectoscopia: "REG, regular estado nutricional, mucosas coradas e hidratadas, afebril, acianótico, anictérico, lúcido e orientado (alo e autopsíquico) em tempo e espaço, comunicativo, eupneico, fácies atípica.",
        ef_cp: "ausência de linfonodomegalias palpáveis, ausência de turgência jugular, não ausculto sopros carotídeos.",
        ef_acv: "RCR, BNF em 2T, sem sopros audíveis. Ictus cordis não palpável. Pulsos presentes, amplos e simétricos. TEC < 3s.",
        ef_ap: "MV+ bilateralamente audível, sem ruídos adventícios. Tórax atípico. Eupneico. Sem sinais de esforço.",
        ef_abd: "plano, flácido, normotenso, sem visceromegalias, indolor, RHA+, DB negativa, sem peritonite.",
        ef_neuro: "ECG 15, pupilas isocóricas e fotorreagentes, MOE preservada, face simétrica, sem déficits focais agudos, força e sensibilidade preservadas, coordenação normal.",
        ef_membros: "sem edemas, panturrilhas livres, TEC < 3 segs.",
        neuro_detalhado: `Nível de Consciência: Vigil e desperto, auto e alo orientado
Fala e linguagem preservadas, ausência de afasia e disartria.

Nervos cranianos: Pupilas isocóricas e fotorreagentes, MOE preservada, campimetria normal, face simétrica.

Motricidade: Tônus e trofismo preservado, força grau V global.

Sensibilidade: tátil, térmica, dolorosa e vibratória preservadas.

Reflexos: grau 2 simétricos. Cutaneoplantar em flexão bilateral.

Coordenação: Eumétrica. Romberg negativo. Sem sinais meníngeos.`
      },
      F: {
        ef_ectoscopia: "REG, regular estado nutricional, mucosas coradas e hidratadas, afebril, acianótica, anictérica, lúcida e orientada (alo e autopsíquica) em tempo e espaço, comunicativa, eupneica, fácies atípica.",
        ef_cp: "ausência de linfonodomegalias palpáveis, ausência de turgência jugular, não ausculto sopros carotídeos.",
        ef_acv: "RCR, BNF em 2T, sem sopros audíveis. Ictus cordis não palpável. Pulsos presentes, amplos e simétricos. TEC < 3s.",
        ef_ap: "MV+ bilateralamente audível, sem ruídos adventícios. Tórax atípico. Eupneica. Sem sinais de esforço.",
        ef_abd: "plano, flácido, normotenso, sem visceromegalias, indolor, RHA+, DB negativa, sem peritonite.",
        ef_neuro: "ECG 15, pupilas isocóricas e fotorreagentes, MOE preservada, face simétrica, sem déficits focais agudos, força e sensibilidade preservadas, coordenação normal.",
        ef_membros: "sem edemas, panturrilhas livres, TEC < 3 segs.",
        neuro_detalhado: `Nível de Consciência: Vigil e desperta, auto e alo orientada
Fala e linguagem preservadas, ausência de afasia e disartria.

Nervos cranianos: Pupilas isocóricas e fotorreagentes, MOE preservada, campimetria normal, face simétrica.

Motricidade: Tônus e trofismo preservado, força grau V global.

Sensibilidade: tátil, térmica, dolorosa e vibratória preservadas.

Reflexos: grau 2 simétricos. Cutaneoplantar em flexão bilateral.

Coordenação: Eumétrica. Romberg negativo. Sem sinais meníngeos.`
      }
    };

    const lastAuto = {};

    function initLastAuto(sexo){
      const t = templates[sexo] || templates.M;
      Object.keys(t).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        lastAuto[id] = (el.value || "").trim();
      });
    }

    function aplicarGenero(sexo){
      const t = templates[sexo] || templates.M;
      Object.keys(t).forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const atual = (el.value || "").trim();
        const anterior = (lastAuto[id] || "").trim();
        if (atual === "" || atual === anterior){
          el.value = t[id];
          lastAuto[id] = t[id];
        }
      });
    }

    document.getElementById("sexo").addEventListener("change", (e) => {
      aplicarGenero(e.target.value);
    });

    function pad2(n){ return String(n).padStart(2, "0"); }

    function ensureMedsPrefix(){
      const ta = document.getElementById("meds_continuos");
      if (!ta) return;
      if (ta.value.trim() === "") ta.value = "01 - ";
    }

    function nextMedsIndex(text){
      const matches = text.match(/^(\d{2})\s*-\s*/gm);
      if (!matches || matches.length === 0) return 1;
      const last = matches[matches.length - 1];
      const n = parseInt(last, 10);
      return isNaN(n) ? (matches.length + 1) : (n + 1);
    }

    function handleMedsEnter(e){
      if (e.key !== "Enter") return;
      e.preventDefault();
      const ta = e.target;
      const start = ta.selectionStart;
      const end = ta.selectionEnd;
      const before = ta.value.slice(0, start);
      const after = ta.value.slice(end);
      const idx = nextMedsIndex(before);
      const insert = `\n${pad2(idx)} - `;
      ta.value = before + insert + after;
      const caret = (before + insert).length;
      ta.selectionStart = ta.selectionEnd = caret;
    }

    function initMedsField(){
      const ta = document.getElementById("meds_continuos");
      if (!ta) return;
      ensureMedsPrefix();
      ta.addEventListener("focus", ensureMedsPrefix);
      ta.addEventListener("keydown", handleMedsEnter);
    }

    function yesNoBoldLine(label, type){
      const valYN = state[type] === "Sim" ? "SIM" : "NÃO";
      const det = v(type + "-detalhe");
      return `**${label}: ${valYN}${det ? " — " + det : ""}**`;
    }

    function habitLine(label, type){
      const sim = state[type] === "Sim";
      const det = v(type + "-detalhe");
      const yn = sim ? "**SIM**" : "NÃO";

      if (type === "tabagismo" && sim){
        const carga = calcularCargaTabagica();
        const extra = carga > 0 ? `, carga tabágica: ${carga.toFixed(1)} maços-ano` : "";
        return `${label}: ${yn}${det ? " (" + det + ")" : ""}${extra}`;
      }

      return `${label}: ${yn}${det ? " (" + det + ")" : ""}`;
    }

function capturarDadosGastro() {
  const linhas = [];
  const gastroAtiva = document.getElementById('secao-gastro')?.classList.contains('active');
  if (!gastroAtiva) return linhas;
  
  linhas.push("");
  linhas.push("# ANAMNESE - GASTROENTEROLOGIA #");
  linhas.push("");
  
  function getChecked(ids) {
    return ids.filter(id => document.getElementById(id)?.checked)
              .map(id => document.querySelector('label[for="' + id + '"]')?.textContent || id);
  }
  
  if (document.getElementById('dor-abdominal')?.checked) {
    linhas.push("**DOR ABDOMINAL:**");
    const locs = getChecked(['loc-epigastrio','loc-hd','loc-he','loc-peri','loc-fid','loc-fie','loc-difusa']);
    if (locs.length > 0) linhas.push("  Localização: " + locs.join(", "));
    const tipos = getChecked(['tipo-queimacao','tipo-colica','tipo-peso','tipo-pontada']);
    if (tipos.length > 0) linhas.push("  Tipo: " + tipos.join(", "));
    linhas.push("");
  }
  
  const altos = getChecked(['azia','regurg','nauseas','odinofagia','saciedade','plenitude']);
  if (altos.length > 0) {
    linhas.push("**SINTOMAS DIGESTIVOS ALTOS:** " + altos.join(", "));
    linhas.push("");
  }
  
  const baixos = getChecked(['constipacao','alternancia','tenesmo','urgencia']);
  if (baixos.length > 0) {
    linhas.push("**SINTOMAS DIGESTIVOS BAIXOS:** " + baixos.join(", "));
    linhas.push("");
  }
  
  const fezes = getChecked(['fezes-normais','fezes-pastosas','fezes-liquidas','fezes-duras','fezes-melena','fezes-sangue','fezes-muco','fezes-oleosas']);
  if (fezes.length > 0) {
    linhas.push("**CARACTERÍSTICAS DAS FEZES:** " + fezes.join(", "));
    linhas.push("");
  }
  
  return linhas;
}

function capturarDadosPsiq() {
  const linhas = [];
  const psiqAtiva = document.getElementById('secao-psiq')?.classList.contains('active');
  if (!psiqAtiva) return linhas;
  
  linhas.push("");
  linhas.push("# ANAMNESE - PSIQUIATRIA #");
  linhas.push("");
  
  function getChecked(ids) {
    return ids.filter(id => document.getElementById(id)?.checked)
              .map(id => document.querySelector('label[for="' + id + '"]')?.textContent || id);
  }
  
  function getTextarea(id) {
    const el = document.getElementById(id);
    return el && el.value ? el.value.trim() : "";
  }
  
  // Motivo da consulta
  const motivo = getTextarea('psiq-motivo');
  if (motivo) {
    linhas.push("**MOTIVO DA CONSULTA:**");
    linhas.push(motivo);
    linhas.push("");
  }
  
  // HDA Psiquiátrica
  const hdaPsiq = getTextarea('psiq-hda');
  if (hdaPsiq) {
    linhas.push("**HISTÓRIA DA DOENÇA ATUAL (PSIQUIÁTRICA):**");
    linhas.push(hdaPsiq);
    linhas.push("");
  }
  
  // Humor e Afeto
  const humor = getChecked(['humor-deprimido','humor-elevado','humor-irritavel','humor-ansioso','humor-labil','humor-embotado','humor-inadequado','anedonia']);
  if (humor.length > 0) {
    linhas.push("**HUMOR E AFETO:** " + humor.join(", "));
    linhas.push("");
  }
  
  // Sintomas Ansiosos
  const ansiedade = getChecked(['ansiedade-geral','panico','fobias','fobia-social','agorafobia','toc','estresse-pos','preocup-excessiva','tensao-muscular','inquietacao']);
  if (ansiedade.length > 0) {
    linhas.push("**SINTOMAS ANSIOSOS:** " + ansiedade.join(", "));
    linhas.push("");
  }
  
  // Pensamento
  const pensamento = getChecked(['pensa-lento','pensa-acelerado','pensa-desorg','pensa-persev','ideias-delic','delic-perseg','delic-grandeza','delic-ruina','delic-culpa','pensa-magico','obsessoes','ruminacoes']);
  if (pensamento.length > 0) {
    linhas.push("**PENSAMENTO:** " + pensamento.join(", "));
    linhas.push("");
  }
  
  // Percepção
  const percepcao = getChecked(['aluc-auditivas','aluc-visuais','aluc-tateis','aluc-olfativas','ilusoes','desperson','desreal']);
  if (percepcao.length > 0) {
    linhas.push("**PERCEPÇÃO:** " + percepcao.join(", "));
    linhas.push("");
  }
  
  // Orientação e Consciência
  const orientacao = getChecked(['orient-preserv','desorient-tempo','desorient-esp','desorient-pess','confusao-mental','rebaixa-consc']);
  if (orientacao.length > 0) {
    linhas.push("**ORIENTAÇÃO E CONSCIÊNCIA:** " + orientacao.join(", "));
    linhas.push("");
  }
  
  // Memória e Cognição
  const memoria = getChecked(['mem-recente-alt','mem-remota-alt','amnesia','confabula','deficit-atenc','deficit-exec','deficit-linguagem']);
  if (memoria.length > 0) {
    linhas.push("**MEMÓRIA E COGNIÇÃO:** " + memoria.join(", "));
    linhas.push("");
  }
  
  // Sono
  const sono = getChecked(['insonia-inicial','insonia-manut','insonia-terminal','hipersonia','pesadelos','terror-noturno','sono-nao-repousante']);
  if (sono.length > 0) {
    linhas.push("**SONO:** " + sono.join(", "));
    linhas.push("");
  }
  
  // Apetite
  const apetite = getChecked(['apetite-reduz','apetite-aument','perda-peso-psiq','ganho-peso','compuls-alim','restric-alim','purgacao']);
  if (apetite.length > 0) {
    linhas.push("**APETITE E ALIMENTAÇÃO:** " + apetite.join(", "));
    linhas.push("");
  }
  
  // Energia e Psicomotricidade
  const energia = getChecked(['fadiga-psiq','anergia','agitacao-psicomotora','retardo-psicomotor','catatonia','akathisia']);
  if (energia.length > 0) {
    linhas.push("**ENERGIA E PSICOMOTRICIDADE:** " + energia.join(", "));
    linhas.push("");
  }
  
  // Ideação Suicida
  const suicida = getChecked(['ideacao-suicida','ideacao-ativa','plano-suicida','tentativa-previa','autolesao','ideacao-homicida','impulsividade','agressividade']);
  if (suicida.length > 0) {
    linhas.push("**⚠️ IDEAÇÃO SUICIDA E COMPORTAMENTO:** " + suicida.join(", "));
    linhas.push("");
  }
  
  // Funcionamento Social
  const social = getChecked(['isolamento-social','prejuizo-trab','conflitos-fam','conflitos-inter','perda-autonomia','negligencia-auto']);
  if (social.length > 0) {
    linhas.push("**FUNCIONAMENTO SOCIAL E OCUPACIONAL:** " + social.join(", "));
    linhas.push("");
  }
  
  // Uso de Substâncias
  const substancias = getChecked(['uso-alcool-psiq','depend-alcool','uso-tabaco-psiq','uso-cannabis','uso-cocaina','uso-anfeta','uso-benzod','uso-opioides','uso-outras','abstinencia']);
  if (substancias.length > 0) {
    linhas.push("**USO DE SUBSTÂNCIAS:** " + substancias.join(", "));
    linhas.push("");
  }
  
  // Antecedentes Psiquiátricos
  const antPsiq = getChecked(['ant-depressao','ant-mania','ant-psicose','ant-ansiedade','ant-toc-prev','ant-tept','ant-aliment','internan-psiq']);
  if (antPsiq.length > 0) {
    linhas.push("**ANTECEDENTES PSIQUIÁTRICOS PESSOAIS:** " + antPsiq.join(", "));
    linhas.push("");
  }
  
  // Antecedentes Familiares
  const famPsiq = getChecked(['fam-depressao','fam-bipolar','fam-esquizo','fam-suicidio','fam-alcool','fam-drogas']);
  if (famPsiq.length > 0) {
    linhas.push("**ANTECEDENTES FAMILIARES PSIQUIÁTRICOS:** " + famPsiq.join(", "));
    linhas.push("");
  }
  
  // Medicações Psiquiátricas
  const meds = getTextarea('psiq-meds');
  if (meds) {
    linhas.push("**MEDICAÇÕES PSIQUIÁTRICAS:**");
    linhas.push(meds);
    linhas.push("");
  }
  
  // Tratamentos Prévios
  const tratamentos = getChecked(['trat-psicoterapia','trat-tcc','trat-psicanalise','trat-grupo','trat-ect']);
  if (tratamentos.length > 0) {
    linhas.push("**TRATAMENTOS PRÉVIOS:** " + tratamentos.join(", "));
    linhas.push("");
  }
  
  // História do Desenvolvimento
  const desenvolvimento = getTextarea('psiq-desenvolvimento');
  if (desenvolvimento) {
    linhas.push("**HISTÓRIA DO DESENVOLVIMENTO:**");
    linhas.push(desenvolvimento);
    linhas.push("");
  }
  
  // História Social
  const historiaSocial = getTextarea('psiq-historia-social');
  if (historiaSocial) {
    linhas.push("**HISTÓRIA PESSOAL E SOCIAL:**");
    linhas.push(historiaSocial);
    linhas.push("");
  }
  
  // Questões Médico-Legais
  const legal = getChecked(['judicializacao','interdicao','medida-protet','hist-forense']);
  if (legal.length > 0) {
    linhas.push("**QUESTÕES MÉDICO-LEGAIS:** " + legal.join(", "));
    linhas.push("");
  }
  
  // Observações
  const obs = getTextarea('psiq-obs');
  if (obs) {
    linhas.push("**OBSERVAÇÕES ADICIONAIS:**");
    linhas.push(obs);
    linhas.push("");
  }
  
  return linhas;
}

    function montarTextoRelatorioBase(){
      const linhas = [];
      linhas.push("## ADMISSÃO / EVOLUÇÃO ##");
      linhas.push("");
      linhas.push(`PACIENTE: ${v("nome")}`);
      linhas.push(`IDADE: ${v("idade")}    SEXO: ${v("sexo")}    RELIGIÃO: ${v("religiao")}`);
      if (v("unidade")) linhas.push(`UNIDADE/SETOR: ${v("unidade")}`);
      linhas.push("");
      linhas.push(yesNoBoldLine("ALERGIAS MEDICAMENTOSAS", "alergias"));
      linhas.push(yesNoBoldLine("INTERNAÇÃO NOS ÚLTIMOS 3 MESES?", "internacao"));
      linhas.push("");
      linhas.push("**HÁBITOS DE VIDA:**");
      linhas.push(habitLine("Tabagismo", "tabagismo"));
      linhas.push(habitLine("Etilismo", "etilismo"));
      linhas.push(habitLine("Drogas ilícitas", "drogas"));
      linhas.push("");
      linhas.push("**QUEIXA PRINCIPAL (QP):**");
      linhas.push(v("qp"));
      linhas.push("");
      linhas.push("**HISTÓRIA DA DOENÇA ATUAL (HDA):**");
      linhas.push(v("hda"));
      linhas.push("");
      linhas.push("**HISTÓRIA PATOLÓGICA PREGRESSA (HPP):**");
      linhas.push(v("hpp"));
      linhas.push("");
      linhas.push("**HISTÓRIA FAMILIAR (HF):**");
      linhas.push(v("hf"));
      linhas.push("");
      linhas.push("**MEDICAMENTOS DE USO CONTÍNUO:**");
      linhas.push(v("meds_continuos"));
      linhas.push("");
      linhas.push("**EXAMES LABORATORIAIS:**");
      linhas.push(v("labs"));
      linhas.push("");
      linhas.push("**EXAMES DE IMAGEM:**");
      linhas.push(v("imagem"));
      linhas.push("");
      linhas.push("# EXAME FÍSICO #");
      linhas.push("Sinais Vitais");
      linhas.push(`PA: ${v("pa")} mmHg    FC: ${v("fc")} bpm    FR: ${v("fr")} ipm    SatO2: ${v("sat")}%    T: ${v("temp")}°C    Glicemia: ${v("hgt")} mg/dL`);
      linhas.push("");
      linhas.push("**ECTOSCOPIA:**");
      linhas.push(v("ef_ectoscopia"));
      linhas.push("");
      linhas.push("**Cabeça e pescoço:**");
      linhas.push(v("ef_cp"));
      linhas.push("");
      linhas.push("**ACV:**");
      linhas.push(v("ef_acv"));
      linhas.push("");
      linhas.push("**AP:**");
      linhas.push(v("ef_ap"));
      linhas.push("");
      linhas.push("**ABD:**");
      linhas.push(v("ef_abd"));
      linhas.push("");
      linhas.push("**NEURO:**");
      linhas.push(v("ef_neuro"));
      linhas.push("");
      linhas.push("**MEMBROS:**");
      linhas.push(v("ef_membros"));
      linhas.push("");
      linhas.push("**EXAME NEUROLÓGICO DETALHADO:**");
      linhas.push(v("neuro_detalhado"));
      linhas.push("");
      const dadosGastro = capturarDadosGastro();
      dadosGastro.forEach(linha => linhas.push(linha));
      
      const dadosPsiq = capturarDadosPsiq();
      dadosPsiq.forEach(linha => linhas.push(linha));
      
      // Adicionar Diagnósticos
      if (v("hd1") || v("hd2") || v("hd3")) {
        linhas.push("");
        linhas.push("# DIAGNÓSTICOS DIFERENCIAIS / HIPÓTESES DIAGNÓSTICAS #");
        linhas.push("");
        if (v("hd1")) {
          const cid1 = v("hd1-cid");
          linhas.push(`**HIPÓTESE DIAGNÓSTICA 1 (Principal):** ${v("hd1")}${cid1 ? " (" + cid1 + ")" : ""}`);
        }
        if (v("hd2")) {
          const cid2 = v("hd2-cid");
          linhas.push(`**Hipótese Diagnóstica 2:** ${v("hd2")}${cid2 ? " (" + cid2 + ")" : ""}`);
        }
        if (v("hd3")) {
          const cid3 = v("hd3-cid");
          linhas.push(`**Hipótese Diagnóstica 3:** ${v("hd3")}${cid3 ? " (" + cid3 + ")" : ""}`);
        }
        linhas.push("");
      }
      
      // Adicionar Conduta e Plano
      if (v("exames-solicitados") || v("prescricao") || v("orientacoes") || v("seguimento")) {
        linhas.push("");
        linhas.push("# CONDUTA E PLANO TERAPÊUTICO #");
        linhas.push("");
        
        if (v("exames-solicitados")) {
          linhas.push("**EXAMES SOLICITADOS:**");
          linhas.push(v("exames-solicitados"));
          linhas.push("");
        }
        
        if (v("prescricao")) {
          linhas.push("**PRESCRIÇÃO / TRATAMENTO:**");
          linhas.push(v("prescricao"));
          linhas.push("");
        }
        
        if (v("orientacoes")) {
          linhas.push("**ORIENTAÇÕES AO PACIENTE:**");
          linhas.push(v("orientacoes"));
          linhas.push("");
        }
        
        if (v("seguimento")) {
          linhas.push("**PLANO DE SEGUIMENTO:**");
          linhas.push(v("seguimento"));
          linhas.push("");
        }
      }
      
      // Adicionar scores calculados (se houver)
      const scoresTexto = obterScoresTexto();
      if (scoresTexto) {
        linhas.push(scoresTexto);
      }
      
      return linhas.join("\n");
    }

    // ============ FORMATAÇÃO HDA ============
    function formatarHDA(tipo) {
      const textarea = document.getElementById('hda');
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      
      if (!selectedText) {
        alert('⚠️ Selecione o texto que deseja formatar primeiro!');
        return;
      }
      
      let formattedText = '';
      if (tipo === 'bold') {
        formattedText = `**${selectedText}**`;
      } else if (tipo === 'italic') {
        formattedText = `*${selectedText}*`;
      }
      
      textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
      
      // Manter foco e ajustar seleção
      textarea.focus();
      textarea.selectionStart = start;
      textarea.selectionEnd = start + formattedText.length;
    }
    
    function aplicarTamanhoFonteHDA() {
      const textarea = document.getElementById('hda');
      const select = document.getElementById('hdaFontSize');
      const tamanho = select.value;
      
      if (!tamanho) {
        alert('⚠️ Selecione um tamanho de fonte primeiro!');
        return;
      }
      
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const selectedText = textarea.value.substring(start, end);
      
      if (!selectedText) {
        alert('⚠️ Selecione o texto que deseja modificar primeiro!');
        return;
      }
      
      let formattedText = '';
      if (tamanho === 'small') {
        formattedText = `[PEQUENO]${selectedText}[/PEQUENO]`;
      } else if (tamanho === 'normal') {
        formattedText = `[NORMAL]${selectedText}[/NORMAL]`;
      } else if (tamanho === 'large') {
        formattedText = `[GRANDE]${selectedText}[/GRANDE]`;
      }
      
      textarea.value = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
      
      // Resetar seleção
      select.value = '';
      
      // Manter foco
      textarea.focus();
      textarea.selectionStart = start;
      textarea.selectionEnd = start + formattedText.length;
    }

    // ============ CID-10 - BANCO LOCAL PT-BR (fallback offline) ============
    const CID10_OFFLINE = [
      {c:"A00",d:"Cólera"},{c:"A01",d:"Febres tifóide e paratifóide"},{c:"A02",d:"Outras infecções por Salmonella"},
      {c:"A04",d:"Outras infecções intestinais bacterianas"},{c:"A06",d:"Amebíase"},
      {c:"A09",d:"Diarreia e gastroenterite de origem infecciosa presumível"},
      {c:"A15",d:"Tuberculose respiratória"},{c:"A36",d:"Difteria"},{c:"A37",d:"Coqueluche"},
      {c:"A38",d:"Escarlatina"},{c:"A39",d:"Infecção meningocócica"},{c:"A40",d:"Septicemia estreptocócica"},
      {c:"A41",d:"Outras septicemias"},{c:"A46",d:"Erisipela"},{c:"A49",d:"Infecção bacteriana não especificada"},
      {c:"A50",d:"Sífilis congênita"},{c:"A51",d:"Sífilis precoce"},{c:"A52",d:"Sífilis tardia"},
      {c:"A54",d:"Infecção gonocócica"},{c:"A56",d:"DST por clamídias"},{c:"A59",d:"Tricomoníase"},
      {c:"A60",d:"Infecção anogenital pelo vírus do herpes"},{c:"A69",d:"Outras infecções por espiroquetas"},
      {c:"A77",d:"Febre maculosa"},{c:"A87",d:"Meningite viral"},
      {c:"A90",d:"Dengue clássico"},{c:"A91",d:"Febre hemorrágica por vírus dengue"},
      {c:"B00",d:"Infecções pelo vírus herpes simples"},{c:"B01",d:"Varicela"},{c:"B02",d:"Herpes zoster"},
      {c:"B05",d:"Sarampo"},{c:"B06",d:"Rubéola"},{c:"B07",d:"Verrugas virais"},
      {c:"B15",d:"Hepatite aguda A"},{c:"B16",d:"Hepatite aguda B"},{c:"B17",d:"Outras hepatites virais agudas"},
      {c:"B18",d:"Hepatite viral crônica"},{c:"B20",d:"Doença pelo HIV"},{c:"B24",d:"Doença pelo HIV não especificada"},
      {c:"B34",d:"Infecção viral não especificada"},{c:"B35",d:"Dermatofitose / Tinea"},{c:"B37",d:"Candidíase"},
      {c:"B50",d:"Malária por Plasmodium falciparum"},{c:"B54",d:"Malária não especificada"},
      {c:"B65",d:"Esquistossomose"},{c:"B77",d:"Ascaridíase"},{c:"B80",d:"Enterobíase / Oxiuríase"},
      {c:"C15",d:"Neoplasia maligna do esôfago"},{c:"C16",d:"Neoplasia maligna do estômago"},
      {c:"C18",d:"Neoplasia maligna do cólon"},{c:"C20",d:"Neoplasia maligna do reto"},
      {c:"C22",d:"Neoplasia maligna do fígado"},{c:"C25",d:"Neoplasia maligna do pâncreas"},
      {c:"C34",d:"Neoplasia maligna dos brônquios e pulmões"},{c:"C43",d:"Melanoma maligno da pele"},
      {c:"C50",d:"Neoplasia maligna da mama"},{c:"C53",d:"Neoplasia maligna do colo do útero"},
      {c:"C61",d:"Neoplasia maligna da próstata"},{c:"C64",d:"Neoplasia maligna do rim"},
      {c:"C67",d:"Neoplasia maligna da bexiga"},{c:"C71",d:"Neoplasia maligna do encéfalo"},
      {c:"C73",d:"Neoplasia maligna da tireoide"},{c:"C82",d:"Linfoma não Hodgkin"},
      {c:"C90",d:"Mieloma múltiplo"},{c:"C91",d:"Leucemia linfóide"},{c:"C92",d:"Leucemia mielóide"},
      {c:"D25",d:"Leiomioma do útero"},{c:"D50",d:"Anemia por deficiência de ferro"},
      {c:"D51",d:"Anemia por deficiência de vitamina B12"},{c:"D52",d:"Anemia por deficiência de folato"},
      {c:"D57",d:"Doenças falciformes"},{c:"D64",d:"Outras anemias"},
      {c:"D65",d:"Coagulação intravascular disseminada (CIVD)"},
      {c:"E03",d:"Hipotiroidismo"},{c:"E05",d:"Tireotoxicose / Hipertireoidismo"},{c:"E06",d:"Tireoidite"},
      {c:"E10",d:"Diabetes mellitus tipo 1"},{c:"E11",d:"Diabetes mellitus tipo 2"},
      {c:"E14",d:"Diabetes mellitus não especificado"},{c:"E24",d:"Síndrome de Cushing"},
      {c:"E26",d:"Hiperaldosteronismo"},{c:"E44",d:"Desnutrição proteico-calórica"},
      {c:"E55",d:"Deficiência de vitamina D"},{c:"E66",d:"Obesidade"},{c:"E78",d:"Dislipidemia"},
      {c:"E84",d:"Fibrose cística"},{c:"E86",d:"Desidratação"},{c:"E87",d:"Transtornos do equilíbrio hidroeletrolítico"},
      {c:"F00",d:"Demência na doença de Alzheimer"},{c:"F01",d:"Demência vascular"},
      {c:"F03",d:"Demência não especificada"},{c:"F05",d:"Delirium"},
      {c:"F10",d:"Transtornos mentais pelo uso de álcool"},{c:"F11",d:"Transtornos pelo uso de opioides"},
      {c:"F12",d:"Transtornos pelo uso de canabinóides"},{c:"F14",d:"Transtornos pelo uso de cocaína"},
      {c:"F17",d:"Transtornos pelo uso de tabaco"},{c:"F19",d:"Transtornos pelo uso de múltiplas drogas"},
      {c:"F20",d:"Esquizofrenia"},{c:"F21",d:"Transtorno esquizotípico"},
      {c:"F22",d:"Transtornos delirantes persistentes"},{c:"F23",d:"Transtornos psicóticos agudos e transitórios"},
      {c:"F25",d:"Transtornos esquizoafetivos"},{c:"F30",d:"Episódio maníaco"},
      {c:"F31",d:"Transtorno afetivo bipolar"},{c:"F32",d:"Episódio depressivo"},
      {c:"F33",d:"Transtorno depressivo recorrente"},{c:"F34",d:"Ciclotimia / Distimia"},
      {c:"F40",d:"Transtornos fóbico-ansiosos"},{c:"F40.0",d:"Agorafobia"},
      {c:"F40.1",d:"Fobias sociais"},{c:"F40.2",d:"Fobias específicas"},
      {c:"F41.0",d:"Transtorno de pânico"},{c:"F41.1",d:"Ansiedade generalizada"},
      {c:"F41.2",d:"Transtorno misto ansioso e depressivo"},
      {c:"F42",d:"Transtorno obsessivo-compulsivo (TOC)"},
      {c:"F43.1",d:"Transtorno de estresse pós-traumático (TEPT)"},
      {c:"F44",d:"Transtornos dissociativos (conversivos)"},{c:"F45",d:"Transtornos somatoformes"},
      {c:"F50",d:"Transtornos alimentares"},{c:"F50.0",d:"Anorexia nervosa"},{c:"F50.2",d:"Bulimia nervosa"},
      {c:"F51",d:"Transtornos do sono / Insônia"},
      {c:"F60.3",d:"Transtorno de personalidade borderline"},
      {c:"F70",d:"Retardo mental leve"},{c:"F79",d:"Retardo mental não especificado"},
      {c:"F81",d:"Dislexia"},{c:"F84",d:"Autismo (TEA)"},
      {c:"F90",d:"TDAH"},{c:"F91",d:"Transtornos de conduta"},{c:"F95",d:"Transtornos de tiques / Tourette"},
      {c:"G00",d:"Meningite bacteriana"},{c:"G04",d:"Encefalite / mielite"},
      {c:"G10",d:"Doença de Huntington"},{c:"G20",d:"Doença de Parkinson"},
      {c:"G30",d:"Doença de Alzheimer"},{c:"G35",d:"Esclerose múltipla"},
      {c:"G40",d:"Epilepsia"},{c:"G41",d:"Estado de mal epiléptico"},
      {c:"G43",d:"Enxaqueca"},{c:"G44",d:"Outras síndromes de cefaleia"},
      {c:"G45",d:"Acidentes isquêmicos cerebrais transitórios (AIT)"},
      {c:"G47",d:"Transtornos do sono"},{c:"G51",d:"Paralisia de Bell"},
      {c:"G56",d:"Síndrome do túnel do carpo"},{c:"G61",d:"Guillain-Barré"},
      {c:"G70",d:"Miastenia gravis"},{c:"G80",d:"Paralisia cerebral"},
      {c:"G89",d:"Transtornos da dor"},{c:"G91",d:"Hidrocefalia"},
      {c:"H10",d:"Conjuntivite"},{c:"H25",d:"Catarata senil"},{c:"H40",d:"Glaucoma"},
      {c:"H52",d:"Transtornos da refração / miopia / astigmatismo"},
      {c:"H60",d:"Otite externa"},{c:"H65",d:"Otite média não supurativa"},
      {c:"H66",d:"Otite média supurativa"},{c:"H81",d:"Labirintite / Vertigem"},
      {c:"H90",d:"Perda de audição"},{c:"H91",d:"Outras perdas de audição"},
      {c:"I05",d:"Doenças reumáticas da valva mitral"},{c:"I06",d:"Doenças reumáticas da valva aórtica"},
      {c:"I10",d:"Hipertensão arterial essencial (primária)"},
      {c:"I11",d:"Doença cardíaca hipertensiva"},{c:"I12",d:"Doença renal hipertensiva"},
      {c:"I15",d:"Hipertensão secundária"},
      {c:"I20",d:"Angina pectoris"},{c:"I21",d:"Infarto agudo do miocárdio (IAM)"},
      {c:"I25",d:"Doença isquêmica crônica do coração"},{c:"I26",d:"Embolia pulmonar"},
      {c:"I27",d:"Cor pulmonale"},{c:"I30",d:"Pericardite aguda"},
      {c:"I34",d:"Transtornos não reumáticos da valva mitral"},{c:"I35",d:"Transtornos não reumáticos da valva aórtica"},
      {c:"I40",d:"Miocardite aguda"},{c:"I42",d:"Cardiomiopatias"},
      {c:"I44",d:"Bloqueio atrioventricular"},{c:"I47",d:"Taquicardia paroxística"},
      {c:"I48",d:"Fibrilação e flutter atrial"},{c:"I49",d:"Outras arritmias cardíacas"},
      {c:"I50",d:"Insuficiência cardíaca (ICC)"},
      {c:"I60",d:"Hemorragia subaracnóidea"},{c:"I61",d:"Hemorragia intracerebral"},
      {c:"I63",d:"Infarto cerebral / AVC isquêmico"},{c:"I64",d:"AVC não especificado"},
      {c:"I70",d:"Aterosclerose"},{c:"I71",d:"Aneurisma e dissecção da aorta"},
      {c:"I80",d:"Trombose venosa profunda (TVP)"},{c:"I83",d:"Varizes dos membros inferiores"},
      {c:"I84",d:"Hemorroidas"},
      {c:"J00",d:"Nasofaringite aguda (resfriado comum)"},{c:"J01",d:"Sinusite aguda"},
      {c:"J02",d:"Faringite aguda"},{c:"J03",d:"Amigdalite aguda"},
      {c:"J04",d:"Laringite e traqueíte agudas"},{c:"J06",d:"Infecções agudas das vias aéreas superiores"},
      {c:"J10",d:"Influenza (gripe) por vírus identificado"},{c:"J11",d:"Influenza (gripe) por vírus não identificado"},
      {c:"J12",d:"Pneumonia viral"},{c:"J13",d:"Pneumonia por Streptococcus pneumoniae"},
      {c:"J15",d:"Pneumonia bacteriana"},{c:"J18",d:"Pneumonia por microrganismo não especificado"},
      {c:"J20",d:"Bronquite aguda"},{c:"J21",d:"Bronquiolite aguda"},
      {c:"J30",d:"Rinite alérgica e vasomotora"},{c:"J32",d:"Sinusite crônica"},
      {c:"J35",d:"Doenças crônicas das amígdalas e adenoides"},
      {c:"J40",d:"Bronquite"},{c:"J43",d:"Enfisema pulmonar"},
      {c:"J44",d:"DPOC - Doença pulmonar obstrutiva crônica"},
      {c:"J45",d:"Asma brônquica"},{c:"J47",d:"Bronquiectasia"},
      {c:"J80",d:"SDRA - Síndrome do desconforto respiratório agudo"},
      {c:"J81",d:"Edema pulmonar"},{c:"J90",d:"Derrame pleural"},{c:"J93",d:"Pneumotórax"},
      {c:"J96",d:"Insuficiência respiratória"},
      {c:"K20",d:"Esofagite"},{c:"K21",d:"Doença do refluxo gastroesofágico (DRGE)"},
      {c:"K25",d:"Úlcera gástrica"},{c:"K26",d:"Úlcera duodenal"},
      {c:"K29",d:"Gastrite e duodenite"},{c:"K30",d:"Dispepsia funcional"},
      {c:"K35",d:"Apendicite aguda"},{c:"K40",d:"Hérnia inguinal"},
      {c:"K41",d:"Hérnia femoral"},{c:"K42",d:"Hérnia umbilical"},{c:"K43",d:"Hérnia ventral"},
      {c:"K50",d:"Doença de Crohn"},{c:"K51",d:"Colite ulcerativa"},
      {c:"K56",d:"Íleo paralítico e obstrução intestinal"},
      {c:"K57",d:"Doença diverticular do intestino"},{c:"K58",d:"Síndrome do intestino irritável"},
      {c:"K59.0",d:"Constipação intestinal"},{c:"K60",d:"Fissura anal"},{c:"K61",d:"Abscesso anal"},
      {c:"K65",d:"Peritonite"},{c:"K70",d:"Doença alcoólica do fígado"},
      {c:"K72",d:"Insuficiência hepática"},{c:"K73",d:"Hepatite crônica"},
      {c:"K74",d:"Fibrose e cirrose hepática"},{c:"K75",d:"Outras doenças inflamatórias do fígado"},
      {c:"K76",d:"Esteatose hepática / Outras doenças do fígado"},
      {c:"K80",d:"Colelitíase / Cálculo na vesícula biliar"},{c:"K81",d:"Colecistite"},
      {c:"K83",d:"Coledocolitíase / Outras doenças das vias biliares"},
      {c:"K85",d:"Pancreatite aguda"},{c:"K86",d:"Pancreatite crônica"},
      {c:"K90",d:"Má-absorção intestinal"},{c:"K92",d:"Hemorragia gastrointestinal"},
      {c:"L01",d:"Impetigo"},{c:"L02",d:"Abscesso cutâneo / furúnculo"},
      {c:"L03",d:"Celulite"},{c:"L20",d:"Dermatite atópica / Eczema"},
      {c:"L21",d:"Dermatite seborreica"},{c:"L23",d:"Dermatite alérgica de contato"},
      {c:"L29",d:"Prurido"},{c:"L40",d:"Psoríase"},{c:"L43",d:"Líquen plano"},
      {c:"L50",d:"Urticária"},{c:"L51",d:"Eritema multiforme"},
      {c:"L55",d:"Queimadura solar"},{c:"L63",d:"Alopecia areata"},{c:"L64",d:"Alopecia androgenética"},
      {c:"L70",d:"Acne"},{c:"L71",d:"Rosácea"},{c:"L80",d:"Vitiligo"},
      {c:"L89",d:"Úlcera de decúbito / Escara"},{c:"L93",d:"Lúpus eritematoso"},
      {c:"M05",d:"Artrite reumatoide"},{c:"M10",d:"Gota"},
      {c:"M13",d:"Outras artrites"},{c:"M15",d:"Polioartrose"},
      {c:"M16",d:"Coxartrose / Artrose do quadril"},{c:"M17",d:"Gonartrose / Artrose do joelho"},
      {c:"M19",d:"Outras artroses"},{c:"M23",d:"Transtornos internos dos joelhos"},
      {c:"M32",d:"Lúpus eritematoso sistêmico"},{c:"M34",d:"Esclerodermia"},
      {c:"M41",d:"Escoliose"},{c:"M45",d:"Espondilite anquilosante"},
      {c:"M47",d:"Espondilose"},{c:"M50",d:"Transtornos do disco cervical"},
      {c:"M51",d:"Hérnia de disco"},{c:"M54",d:"Dorsalgia"},
      {c:"M54.2",d:"Cervicalgia"},{c:"M54.5",d:"Dor lombar baixa (lombalgia)"},
      {c:"M65",d:"Sinovite e tenossinovite"},{c:"M75",d:"Lesões do ombro"},
      {c:"M77",d:"Epicondilite"},{c:"M79.1",d:"Mialgia"},{c:"M79.7",d:"Fibromialgia"},
      {c:"M80",d:"Osteoporose com fratura"},{c:"M81",d:"Osteoporose sem fratura"},
      {c:"N00",d:"Síndrome nefrítica aguda"},{c:"N04",d:"Síndrome nefrótica"},
      {c:"N10",d:"Pielonefrite aguda"},{c:"N17",d:"Insuficiência renal aguda"},
      {c:"N18",d:"Doença renal crônica"},{c:"N20",d:"Litíase renal / Cálculo renal"},
      {c:"N23",d:"Cólica renal"},{c:"N30",d:"Cistite"},
      {c:"N39.0",d:"Infecção do trato urinário (ITU)"},
      {c:"N40",d:"Hiperplasia benigna da próstata"},{c:"N41",d:"Prostatite"},
      {c:"N45",d:"Orquite e epididimite"},
      {c:"N70",d:"Salpingite e ooforite"},{c:"N71",d:"Doença inflamatória do útero"},
      {c:"N73",d:"Doença inflamatória pélvica"},
      {c:"N80",d:"Endometriose"},{c:"N83",d:"Cisto de ovário"},
      {c:"N87",d:"Displasia cervical"},
      {c:"N91",d:"Amenorreia"},{c:"N92",d:"Menstruação irregular"},
      {c:"N94",d:"Dismenorreia / Dor pélvica"},{c:"N95",d:"Menopausa / Climatério"},
      {c:"O00",d:"Gravidez ectópica"},{c:"O03",d:"Aborto espontâneo"},
      {c:"O10",d:"Hipertensão na gravidez"},{c:"O14",d:"Pré-eclâmpsia"},{c:"O15",d:"Eclâmpsia"},
      {c:"O21",d:"Vômitos excessivos na gravidez"},{c:"O24",d:"Diabetes mellitus na gravidez"},
      {c:"O30",d:"Gestação múltipla"},{c:"O44",d:"Placenta prévia"},
      {c:"O60",d:"Trabalho de parto prematuro"},{c:"O80",d:"Parto único espontâneo"},
      {c:"O82",d:"Parto por cesariana"},{c:"O85",d:"Sepse puerperal"},
      {c:"R00",d:"Palpitações / Alterações do batimento cardíaco"},
      {c:"R05",d:"Tosse"},{c:"R06",d:"Dispneia / Alterações da respiração"},
      {c:"R07",d:"Dor de garganta e no peito"},{c:"R10",d:"Dor abdominal e pélvica"},
      {c:"R11",d:"Náuseas e vômitos"},{c:"R12",d:"Azia / Pirose"},{c:"R13",d:"Disfagia"},
      {c:"R17",d:"Icterícia"},{c:"R18",d:"Ascite"},
      {c:"R21",d:"Erupção cutânea"},{c:"R25",d:"Movimentos involuntários / Tremores"},
      {c:"R30",d:"Disúria"},{c:"R31",d:"Hematúria"},{c:"R32",d:"Incontinência urinária"},
      {c:"R40",d:"Sonolência / Estupor / Coma"},{c:"R42",d:"Tontura e instabilidade"},
      {c:"R50",d:"Febre de origem desconhecida"},{c:"R51",d:"Cefaleia"},
      {c:"R52",d:"Dor não classificada"},{c:"R53",d:"Mal-estar e fadiga / Astenia"},
      {c:"R55",d:"Síncope e colapso"},{c:"R56",d:"Convulsões"},
      {c:"R57",d:"Choque"},{c:"R60",d:"Edema"},
      {c:"R73",d:"Hiperglicemia"},{c:"R74",d:"Valores anormais de enzimas séricas"},
      {c:"Z00",d:"Exame médico geral"},{c:"Z01",d:"Outros exames especiais"},
      {c:"Z11",d:"Rastreamento para doenças infecciosas"},{c:"Z12",d:"Rastreamento para neoplasias"},
      {c:"Z21",d:"Estado de infecção assintomática pelo HIV"},
      {c:"Z30",d:"Contracepção"},{c:"Z34",d:"Supervisão de gravidez normal"},
      {c:"Z50",d:"Reabilitação"},{c:"Z51",d:"Outros cuidados médicos"},{c:"Z54",d:"Convalescença"},
      {c:"Z71",d:"Consulta de aconselhamento e orientação médica"},
      {c:"Z72",d:"Problemas relacionados com o estilo de vida"},
      {c:"Z96",d:"Presença de implantes funcionais"},{c:"Z98",d:"Estados pós-cirúrgicos"},
    ].map(x => ({codigo: x.c, descricao: x.d}));

    let cid10SearchTimer = null;

    async function buscarCID10Online(termo) {
      const div = document.getElementById('resultados-cid');
      div.style.display = 'block';
      div.innerHTML = '<p style="color:#888;font-size:0.9rem;">🔍 Buscando CID-10...</p>';
      const termoLower = termo.toLowerCase().trim();

      const resultadosLocais = CID10_OFFLINE.filter(item =>
        item.codigo.toLowerCase().includes(termoLower) ||
        item.descricao.toLowerCase().includes(termoLower)
      );

      if (resultadosLocais.length > 0) {
        renderizarResultadosCID(resultadosLocais.slice(0, 20), true);
        return;
      }

      if (/^[a-z]\d/i.test(termo)) {
        try {
          const codLimpo = termo.toUpperCase().replace(/\./g, '');
          const res = await fetch(`https://brasilapi.com.br/api/cid10/v1/${codLimpo}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.subcategoria) {
              renderizarResultadosCID([{codigo: data.subcategoria, descricao: data.descricao}], false);
              return;
            }
          }
        } catch (e) {}
      }

      div.innerHTML = `<p style="color:#999;font-size:0.9rem;">Nenhum resultado para "<strong>${termo}</strong>". Tente: diabetes, pneumonia, J18, depressão.</p>`;
    }

    function renderizarResultadosCID(resultados, local) {
      const div = document.getElementById('resultados-cid');
      const badge = local
        ? '<span style="background:#00695c;color:white;padding:2px 8px;border-radius:10px;font-size:0.75rem;margin-left:6px;">PT-BR</span>'
        : '<span style="background:#1976d2;color:white;padding:2px 8px;border-radius:10px;font-size:0.75rem;margin-left:6px;">BrasilAPI</span>';
      let html = `<p style="font-weight:700;margin-bottom:8px;font-size:0.9rem;">${resultados.length} resultado(s) ${badge} — clique para selecionar:</p>`;
      resultados.forEach(item => {
        const codSafe = item.codigo.replace(/'/g, "\\'");
        const descSafe = item.descricao.replace(/'/g, "\\'");
        html += `<div onclick="selecionarCID('${codSafe}','${descSafe}')"
          style="padding:9px 12px;margin:4px 0;background:white;border-left:3px solid var(--primary);border-radius:4px;cursor:pointer;font-size:0.9rem;"
          onmouseover="this.style.background='#e0f7fa'" onmouseout="this.style.background='white'">
          <strong style="color:var(--primary);">${item.codigo}</strong> — ${item.descricao}</div>`;
      });
      div.innerHTML = html;
      div.style.display = 'block';
    }

    function buscarCID10() {
      const termo = document.getElementById('busca-cid').value.trim();
      if (!termo || termo.length < 2) {
        alert('⚠️ Digite ao menos 2 caracteres para buscar!');
        return;
      }
      buscarCID10Online(termo);
    }

    document.addEventListener('DOMContentLoaded', function() {
      const inputCID = document.getElementById('busca-cid');
      if (inputCID) {
        inputCID.addEventListener('keydown', e => { if (e.key === 'Enter') buscarCID10(); });
        inputCID.addEventListener('input', function() {
          clearTimeout(cid10SearchTimer);
          if (this.value.trim().length >= 3)
            cid10SearchTimer = setTimeout(() => buscarCID10Online(this.value.trim()), 400);
        });
      }
    });

    function selecionarCID(codigo, descricao) {
      const hd1 = document.getElementById('hd1');
      const hd2 = document.getElementById('hd2');
      const hd3 = document.getElementById('hd3');
      if (!hd1.value) {
        hd1.value = descricao; document.getElementById('hd1-cid').value = codigo;
      } else if (!hd2.value) {
        hd2.value = descricao; document.getElementById('hd2-cid').value = codigo;
      } else if (!hd3.value) {
        hd3.value = descricao; document.getElementById('hd3-cid').value = codigo;
      } else {
        alert('⚠️ Todas as hipóteses diagnósticas já estão preenchidas!');
        return;
      }
      document.getElementById('busca-cid').value = '';
      document.getElementById('resultados-cid').style.display = 'none';
    }

    // ============ LEMBRETES E ALERTAS ============
    const LEMBRETES_KEY = 'anamnese_lembretes';

    function salvarLembrete() {
      const nomePaciente = v('nome');
      const dataRetorno = document.getElementById('data-retorno').value;
      const obsRetorno = v('obs-retorno');
      
      if (!nomePaciente) {
        alert('⚠️ Preencha o nome do paciente primeiro!');
        return;
      }
      
      if (!dataRetorno) {
        alert('⚠️ Selecione uma data de retorno!');
        return;
      }
      
      const lembretes = obterLembretes();
      
      const lembrete = {
        id: Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        paciente: nomePaciente,
        data: dataRetorno,
        observacao: obsRetorno,
        criado: new Date().toISOString()
      };
      
      lembretes.push(lembrete);
      localStorage.setItem(LEMBRETES_KEY, JSON.stringify(lembretes));
      
      alert(`✅ Lembrete de retorno salvo para ${nomePaciente} em ${formatarDataBR(dataRetorno)}!`);
      
      // Limpar campos
      document.getElementById('data-retorno').value = '';
      document.getElementById('obs-retorno').value = '';
      
      // Atualizar badge
      atualizarBadgeLembretes();
    }

    function obterLembretes() {
      try {
        const data = localStorage.getItem(LEMBRETES_KEY);
        return data ? JSON.parse(data) : [];
      } catch (e) {
        return [];
      }
    }

    function formatarDataBR(dataISO) {
      if (!dataISO) return '';
      const partes = dataISO.split('-');
      return `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    function verificarLembretesHoje() {
      const lembretes = obterLembretes();
      const hoje = new Date().toISOString().split('T')[0];
      
      const lembretesHoje = lembretes.filter(l => l.data === hoje);
      
      if (lembretesHoje.length > 0) {
        let msg = '🔔 LEMBRETES DE HOJE:\n\n';
        lembretesHoje.forEach(l => {
          msg += `📋 ${l.paciente}\n`;
          if (l.observacao) msg += `   ${l.observacao}\n`;
          msg += '\n';
        });
        
        setTimeout(() => {
          if (confirm(msg + 'Deseja ver todos os lembretes?')) {
            abrirModalLembretes();
          }
        }, 2000);
      }
    }

    function abrirModalLembretes() {
      const lembretes = obterLembretes();
      const hoje = new Date().toISOString().split('T')[0];
      
      let html = `
        <div style="position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:10000; display:flex; align-items:center; justify-content:center;" id="modal-lembretes-overlay" onclick="fecharModalLembretes()">
          <div onclick="event.stopPropagation()" style="background:white; width:92%; max-width:700px; max-height:85vh; border-radius:12px; padding:20px; overflow-y:auto; box-shadow:0 10px 30px rgba(0,0,0,0.3);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; padding-bottom:12px; border-bottom:2px solid var(--light);">
              <h2 style="margin:0; color:var(--primary);">🔔 Lembretes de Retorno</h2>
              <button onclick="fecharModalLembretes()" style="background:var(--alert); color:white; border:none; padding:8px 16px; border-radius:6px; cursor:pointer; font-weight:800;">Fechar</button>
            </div>
      `;
      
      if (lembretes.length === 0) {
        html += '<p style="text-align:center; color:#999; padding:40px;">Nenhum lembrete cadastrado</p>';
      } else {
        // Ordenar por data
        lembretes.sort((a, b) => new Date(a.data) - new Date(b.data));
        
        lembretes.forEach(l => {
          const isPast = l.data < hoje;
          const isToday = l.data === hoje;
          const cor = isToday ? '#4caf50' : isPast ? '#f44336' : '#2196f3';
          const status = isToday ? '🔔 HOJE' : isPast ? '⚠️ ATRASADO' : '📅 FUTURO';
          
          html += `
            <div style="background:#f9f9f9; border-left:4px solid ${cor}; padding:12px; margin-bottom:10px; border-radius:6px;">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <strong style="color:var(--primary); font-size:1.05rem;">${l.paciente}</strong>
                <span style="background:${cor}; color:white; padding:4px 10px; border-radius:12px; font-size:0.75rem; font-weight:700;">${status}</span>
              </div>
              <p style="margin:4px 0; font-size:0.9rem;"><strong>Data:</strong> ${formatarDataBR(l.data)}</p>
              ${l.observacao ? `<p style="margin:4px 0; font-size:0.85rem; color:#666;">${l.observacao}</p>` : ''}
              <button onclick="excluirLembrete('${l.id}')" style="margin-top:8px; background:var(--alert); color:white; border:none; padding:6px 12px; border-radius:4px; cursor:pointer; font-size:0.8rem; font-weight:700;">🗑️ Excluir</button>
            </div>
          `;
        });
      }
      
      html += '</div></div>';
      
      const div = document.createElement('div');
      div.id = 'modal-lembretes';
      div.innerHTML = html;
      document.body.appendChild(div);
    }

    function fecharModalLembretes() {
      const modal = document.getElementById('modal-lembretes');
      if (modal) modal.remove();
    }

    function excluirLembrete(id) {
      if (!confirm('Deseja excluir este lembrete?')) return;
      
      let lembretes = obterLembretes();
      lembretes = lembretes.filter(l => l.id !== id);
      localStorage.setItem(LEMBRETES_KEY, JSON.stringify(lembretes));
      
      fecharModalLembretes();
      abrirModalLembretes();
      atualizarBadgeLembretes();
    }

    // Verificar lembretes ao carregar
    window.addEventListener('load', function() {
      setTimeout(verificarLembretesHoje, 1000);
      atualizarBadgeLembretes();
    });

    function atualizarBadgeLembretes() {
      const lembretes = obterLembretes();
      const hoje = new Date().toISOString().split('T')[0];
      
      // Contar lembretes de hoje + atrasados
      const pendentes = lembretes.filter(l => l.data <= hoje).length;
      
      const badge = document.getElementById('badge-lembretes');
      if (badge) {
        if (pendentes > 0) {
          badge.textContent = pendentes;
          badge.style.display = 'flex';
        } else {
          badge.style.display = 'none';
        }
      }
    }

    function gerarRelatorio(){
      const texto = montarTextoRelatorioBase();
      document.getElementById("finalReport").value = texto;
      document.getElementById("modalResultado").style.display = "flex";
    }

    function fecharModal(){
      document.getElementById("modalResultado").style.display = "none";
    }

    function montarTextoReceituario(tipo) {
      const nome    = v("nome")    || "—";
      const idade   = v("idade")   || "—";
      const sexo    = v("sexo")    || "—";
      const unidade = v("unidade") || "—";
      const now     = new Date();
      const data    = now.toLocaleDateString("pt-BR");

      const cabecalho = [
        "RECEITUÁRIO MÉDICO",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        `PACIENTE : ${nome}`,
        `IDADE    : ${idade}    SEXO: ${sexo}`,
        `UNIDADE  : ${unidade}`,
        `DATA     : ${data}`,
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        ""
      ];

      let corpo = [];

      if (tipo === "continuo") {
        const meds = v("meds_continuos") || "";
        corpo.push("USO CONTÍNUO:");
        corpo.push("");
        if (meds.trim()) {
          meds.split("\n").forEach((linha, i) => {
            if (linha.trim()) corpo.push(`${String(i + 1).padStart(2, "0")}. ${linha.trim()}`);
          });
        } else {
          corpo.push("(Nenhum medicamento de uso contínuo registrado)");
        }
      } else if (tipo === "conduta") {
        const presc = v("prescricao") || "";
        corpo.push("PRESCRIÇÃO / CONDUTA ATUAL:");
        corpo.push("");
        if (presc.trim()) {
          presc.split("\n").forEach((linha, i) => {
            if (linha.trim()) corpo.push(`${String(i + 1).padStart(2, "0")}. ${linha.trim()}`);
          });
        } else {
          corpo.push("(Nenhuma prescrição registrada)");
        }
      } else if (tipo === "orientacoes") {
        const orient = v("orientacoes") || "";
        corpo.push("ORIENTAÇÕES AO PACIENTE:");
        corpo.push("");
        if (orient.trim()) {
          orient.split("\n").forEach((linha, i) => {
            if (linha.trim()) corpo.push(`${String(i + 1).padStart(2, "0")}. ${linha.trim()}`);
          });
        } else {
          corpo.push("(Nenhuma orientação registrada)");
        }
      }

      const rodape = [
        "",
        "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
        "⚠️  Modelo de receituário — não substitui receita em papel timbrado institucional.",
        ""
      ];

      return [...cabecalho, ...corpo, ...rodape].join("\n");
    }

    function getTipoReceita() {
      const sel = document.querySelector('input[name="tipoReceita"]:checked');
      return sel ? sel.value : "continuo";
    }

    function gerarReceituario() {
      const tipo  = getTipoReceita();
      const texto = montarTextoReceituario(tipo);
      document.getElementById("textoReceituario").value = texto;
      document.getElementById("modalReceituario").style.display = "flex";
    }

    function atualizarReceituario() {
      const tipo  = getTipoReceita();
      const texto = montarTextoReceituario(tipo);
      document.getElementById("textoReceituario").value = texto;
    }

    function fecharModalReceituario() {
      document.getElementById("modalReceituario").style.display = "none";
    }

    function copiarReceituario() {
      const ta = document.getElementById("textoReceituario");
      ta.select();
      document.execCommand("copy");
      alert("Receituário copiado!");
    }

    function salvarPDFReceituario() {
      const tipo  = getTipoReceita();
      const now   = new Date();
      const data  = now.toLocaleDateString("pt-BR");
      const hora  = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

      const meds    = v("meds_continuos") || "";
      const presc   = v("prescricao")     || "";
      const orient  = v("orientacoes")    || "";

      function numerarLinhas(texto, vazio) {
        const linhas = texto.split("\n").filter(l => l.trim());
        if (!linhas.length) return `<p class="vazio">${vazio}</p>`;
        return linhas.map((l, i) =>
          `<div class="item-receita"><span class="num">${String(i + 1).padStart(2, "0")}.</span><span>${l.trim()}</span></div>`
        ).join("");
      }

      let titulo = "", conteudo = "";
      if (tipo === "continuo") {
        titulo   = "MEDICAMENTOS DE USO CONTÍNUO";
        conteudo = numerarLinhas(meds, "Nenhum medicamento registrado.");
      } else if (tipo === "conduta") {
        titulo   = "PRESCRIÇÃO / CONDUTA ATUAL";
        conteudo = numerarLinhas(presc, "Nenhuma prescrição registrada.");
      } else {
        titulo   = "ORIENTAÇÕES AO PACIENTE";
        conteudo = numerarLinhas(orient, "Nenhuma orientação registrada.");
      }

      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Receituário - ${v("nome")}</title>
<style>
@page { margin: 2cm; size: A5; }
* { box-sizing: border-box; }
body {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11pt;
  line-height: 1.6;
  color: #111;
  max-width: 600px;
  margin: 0 auto;
}
.header {
  text-align: center;
  border-bottom: 2.5px solid #00695c;
  padding-bottom: 10px;
  margin-bottom: 18px;
}
.header h1 {
  margin: 0 0 4px 0;
  color: #00695c;
  font-size: 16pt;
  letter-spacing: 1px;
}
.header .sub {
  font-size: 9.5pt;
  color: #555;
}
.info-box {
  background: #f7f7f7;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 10px 14px;
  margin-bottom: 18px;
  font-size: 10.5pt;
}
.info-box table { width: 100%; border-collapse: collapse; }
.info-box td { padding: 2px 6px; }
.info-box td:first-child { font-weight: bold; color: #00695c; width: 90px; }
.secao-titulo {
  font-size: 11pt;
  font-weight: bold;
  color: #00695c;
  border-bottom: 1px solid #00695c;
  margin-bottom: 10px;
  padding-bottom: 3px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.item-receita {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  align-items: baseline;
}
.item-receita .num {
  font-weight: bold;
  color: #00695c;
  min-width: 24px;
}
.vazio { color: #999; font-style: italic; }
.aviso {
  margin-top: 20px;
  font-size: 8.5pt;
  color: #999;
  border-top: 1px dashed #ccc;
  padding-top: 6px;
  text-align: center;
}
.assinatura {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
}
.assinatura .bloco { text-align: center; width: 46%; }
.assinatura .linha {
  border-top: 1.5px solid #333;
  margin-bottom: 5px;
}
.assinatura .legenda { font-size: 9pt; color: #444; }
@media print { body { margin: 0; } }
</style>
</head>
<body>

<div class="header">
  <h1>RECEITUÁRIO MÉDICO</h1>
  <div class="sub">ANAMNESE FAST &nbsp;|&nbsp; ${data} às ${hora}</div>
</div>

<div class="info-box">
  <table>
    <tr><td>Paciente:</td><td>${v("nome") || "—"}</td></tr>
    <tr><td>Idade:</td><td>${v("idade") || "—"} &nbsp;&nbsp; <strong>Sexo:</strong> ${v("sexo") || "—"}</td></tr>
    ${v("unidade") ? `<tr><td>Unidade:</td><td>${v("unidade")}</td></tr>` : ""}
  </table>
</div>

<div class="secao-titulo">${titulo}</div>
${conteudo}

<div class="aviso">
  ⚠️ Modelo de receituário — não substitui receita em papel timbrado / padrão institucional.
</div>

<div class="assinatura">
  <div class="bloco">
    <div class="linha"></div>
    <div class="legenda">Assinatura do Médico</div>
  </div>
  <div class="bloco">
    <div class="linha"></div>
    <div class="legenda">CRM / Carimbo</div>
  </div>
</div>

</body>
</html>`);
      printWindow.document.close();
      setTimeout(() => printWindow.print(), 400);
    }


    function copiar(){
      const ta = document.getElementById("finalReport");
      ta.select();
      document.execCommand("copy");
      alert("Texto copiado!");
    }

  function salvarPDF(){
  const texto = document.getElementById("finalReport").value;
  const linhas = texto.split("\n");

  const now = new Date();
  const dataHora = now.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const printWindow = window.open("", "_blank");

  function renderLinha(l){
    if (!l.trim()) return `<div class="space"></div>`;

    if (l.startsWith("##") && l.endsWith("##")){
      return `<h1>${l.replace(/#/g,"").trim()}</h1>`;
    }

    if (l.startsWith("# ") && l.endsWith(" #")){
      return `<h2>${l.replace(/#/g,"").trim()}</h2>`;
    }

    if (l.startsWith("**") && l.endsWith("**")){
      return `<h3>${l.replace(/\*/g,"").trim()}</h3>`;
    }

    if (l.startsWith("PA:")){
      return `<div class="vitals">${l}</div>`;
    }

    return `<p>${l}</p>`;
  }

  printWindow.document.write(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Anamnese - ${v("nome")}</title>
<style>
.signature{
  margin-top: 40px;
  text-align: left;
}

.signature .line{
  width: 320px;
  border-top: 1.5px solid #000;
  margin-bottom: 6px;
}

.signature .label{
  font-size: 10.5pt;
  color: #333;
}

@page { margin: 1.5cm; }

body{
  font-family: Arial, Helvetica, sans-serif;
  font-size: 11.5pt;
  line-height: 1.5;
  color: #111;
}

.header{
  text-align: center;
  border-bottom: 2px solid #00695c;
  margin-bottom: 20px;
  padding-bottom: 10px;
}

.header h1{
  margin: 0;
  color: #00695c;
  font-size: 18pt;
}

.header .info{
  font-size: 10pt;
  margin-top: 4px;
}

h1{
  font-size: 16pt;
  margin: 20px 0 10px;
  color: #00695c;
}

h2{
  font-size: 14pt;
  margin: 18px 0 8px;
  border-left: 5px solid #00695c;
  padding-left: 8px;
}

h3{
  font-size: 12pt;
  margin: 14px 0 4px;
}

p{
  margin: 0 0 6px 0;
  text-align: justify;
}

.vitals{
  background: #f2f2f2;
  padding: 8px;
  margin: 10px 0;
  font-weight: bold;
  border-radius: 6px;
}

.space{
  height: 8px;
}

@media print{
  h1,h2,h3{ page-break-after: avoid; }
  p, .vitals{ page-break-inside: avoid; }
}
</style>
</head>

<body>
<div class="header">
  <h1>ANAMNESE FAST</h1>
  <div class="info">
    PACIENTE: ${v("nome")} | IDADE: ${v("idade")} | SEXO: ${v("sexo")}
  </div>
  ${v("unidade") ? `<div class="info">UNIDADE: ${v("unidade")}</div>` : ""}
  <div class="info">DATA/HORA: ${dataHora}</div>
</div>

${linhas.map(renderLinha).join("")}
<div class="signature">
  <div class="line"></div>
  <div class="label">Responsável pelo preenchimento</div>
</div>

</body>
</html>
  `);

  printWindow.document.close();
  setTimeout(() => printWindow.print(), 400);
}

    function limparTudo(){
      if (!confirm("Deseja limpar todos os campos e iniciar uma nova anamnese?")) return;
      const sexoAtual = document.getElementById("sexo").value;
      document.getElementById("nome").value = "";
      document.getElementById("idade").value = "";
      document.getElementById("unidade").value = "";
      document.getElementById("religiao").value = "Católico";
      setOption("alergias", "Não");
      setOption("internacao", "Não");
      setOption("tabagismo", "Não");
      setOption("etilismo", "Não");
      setOption("drogas", "Não");
      document.getElementById("hpp").value = "";
      document.getElementById("hf").value = "";
      document.getElementById("meds_continuos").value = "";
      document.getElementById("labs").value = "";
      document.getElementById("qp").value = "";
      document.getElementById("hda").value = "";
      document.getElementById("pa").value = "";
      document.getElementById("fc").value = "";
      document.getElementById("fr").value = "";
      document.getElementById("sat").value = "";
      document.getElementById("temp").value = "";
      document.getElementById("hgt").value = "";
      document.getElementById("tab_cigs_dia").value = "";
      document.getElementById("tab_anos").value = "";
      document.getElementById("tab_carga").innerText = "0";
      ["ef_ectoscopia","ef_cp","ef_acv","ef_ap","ef_abd","ef_neuro","ef_membros","neuro_detalhado"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = "";
      });
      
      // Limpar scores calculados
      limparScores();
      
      aplicarGenero(sexoAtual);
      initMedsField();
      ensureMedsPrefix();
      window.scrollTo({top: 0, behavior: "smooth"});
    }

    window.addEventListener("load", () => {
      const sexoAtual = document.getElementById("sexo").value;
      aplicarGenero(sexoAtual);
      initLastAuto(sexoAtual);
      initMedsField();
    });

(function() {
  const CRED_KEY    = 'anamnese_credentials';
  const SESSION_KEY = 'anamnese_auth_session';
  const PERFIS_KEY  = 'anamnese_perfis_nuvem';

  // Credenciais JSONBin do usuário logado (atualizadas no login)
  let jsonBinKeyAtual = null;
  let jsonBinBinAtual = null;

  function carregarPerfisNuvem() {
    try { return JSON.parse(localStorage.getItem(PERFIS_KEY) || '{}'); }
    catch { return {}; }
  }

  function salvarPerfisNuvem(perfis) {
    localStorage.setItem(PERFIS_KEY, JSON.stringify(perfis));
  }

  async function hashSenha(senha) {
    const encoder = new TextEncoder();
    const data = encoder.encode(senha);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  function carregarTodosUsuarios() {
    try {
      const data = localStorage.getItem(CRED_KEY);
      if (!data) return {};
      const parsed = JSON.parse(data);
      // Migração: formato antigo {usuario, senhaHash} → novo {usuario: {senhaHash}}
      if (parsed && parsed.usuario && parsed.senhaHash && typeof parsed === 'object' && !parsed[parsed.usuario]) {
        const migrado = {};
        migrado[parsed.usuario] = { senhaHash: parsed.senhaHash };
        localStorage.setItem(CRED_KEY, JSON.stringify(migrado));
        return migrado;
      }
      return parsed || {};
    } catch (e) {
      return {};
    }
  }

  function salvarCredenciais(usuario, senhaHash) {
    try {
      const todos = carregarTodosUsuarios();
      todos[usuario] = { senhaHash };
      localStorage.setItem(CRED_KEY, JSON.stringify(todos));
    } catch (e) {
      console.error('Erro ao salvar credenciais:', e);
    }
  }

  function obterCredenciais() {
    const todos = carregarTodosUsuarios();
    return Object.keys(todos).length > 0 ? todos : null;
  }

  function usuarioExiste(usuario) {
    const todos = carregarTodosUsuarios();
    return !!todos[usuario];
  }

  function limparCredenciais(usuario) {
    try {
      if (usuario) {
        const todos = carregarTodosUsuarios();
        delete todos[usuario];
        localStorage.setItem(CRED_KEY, JSON.stringify(todos));
      } else {
        localStorage.removeItem(CRED_KEY);
      }
      sessionStorage.removeItem(SESSION_KEY);
    } catch (e) {
      console.error('Erro ao limpar credenciais:', e);
    }
  }

  function criarSessao() {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch (e) {
      console.error('Erro ao criar sessão:', e);
    }
  }

  function verificarSessao() {
    try {
      return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function esconderLogin() {
    const overlay = document.getElementById('loginOverlay');
    if (overlay) overlay.style.display = 'none';
  }

  function mostrarLogin() {
    const overlay = document.getElementById('loginOverlay');
    if (overlay) overlay.style.display = 'flex';
  }

  function mostrarTela(tela) {
    ['telaLogin', 'telaCadastro', 'telaReset'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = id === tela ? 'block' : 'none';
    });
  }
  window.mostrarTela = mostrarTela;

  window.mostrarReset = function() {
    mostrarTela('telaReset');
  };

  window.voltarLogin = function() {
    mostrarTela('telaLogin');
    limparErros();
  };

  window.fazerLogout = function() {
    // Salva automaticamente se houver nome preenchido
    const nome = document.getElementById('nome')?.value?.trim();
    if (nome && typeof window.salvarPacienteAtual === 'function') {
      window.salvarPacienteAtual();
    }

    sessionStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem('anamnese_usuario_logado');
    jsonBinKeyAtual = null;
    jsonBinBinAtual = null;
    mostrarTela('telaLogin');
    mostrarLogin();
    limparErros();
    const loginUsuario = document.getElementById('loginUsuario');
    if (loginUsuario) { loginUsuario.value = ''; loginUsuario.focus(); }
    const loginSenha = document.getElementById('loginSenha');
    if (loginSenha) loginSenha.value = '';
  };

  function limparErros() {
    const erros = ['loginErro', 'cadastroErro'];
    erros.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  function mostrarErro(id, mensagem) {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = mensagem;
      el.style.display = 'block';
    }
  }

  async function fazerLogin() {
    limparErros();
    
    const usuario = document.getElementById('loginUsuario')?.value?.trim();
    const senha = document.getElementById('loginSenha')?.value;

    if (!usuario || !senha) {
      mostrarErro('loginErro', 'Preencha usuário e senha.');
      return;
    }

    const todos = carregarTodosUsuarios();
    if (!todos[usuario]) {
      mostrarErro('loginErro', 'Usuário não encontrado.');
      return;
    }

    const senhaHash = await hashSenha(senha);

    if (senhaHash === todos[usuario].senhaHash) {
      // Guardar usuário logado na sessão
      sessionStorage.setItem('anamnese_usuario_logado', usuario);
      // Carregar credenciais JSONBin do perfil deste usuário
      const perfis = carregarPerfisNuvem();
      const perfil = perfis[usuario];
      if (perfil && perfil.jsonBinKey && perfil.jsonBinBin) {
        jsonBinKeyAtual = perfil.jsonBinKey;
        jsonBinBinAtual = perfil.jsonBinBin;
        localStorage.setItem('anamnese_jsonbin_key', jsonBinKeyAtual);
        localStorage.setItem('anamnese_jsonbin_bin', jsonBinBinAtual);
      } else {
        jsonBinKeyAtual = localStorage.getItem('anamnese_jsonbin_key') || null;
        jsonBinBinAtual = localStorage.getItem('anamnese_jsonbin_bin') || null;
      }
      criarSessao();
      esconderLogin();
      inicializarApp();
    } else {
      mostrarErro('loginErro', 'Usuário ou senha incorretos.');
    }
  }

  async function fazerCadastro() {
    limparErros();

    const usuario = document.getElementById('cadastroUsuario')?.value?.trim();
    const senha = document.getElementById('cadastroSenha')?.value;
    const senhaConfirm = document.getElementById('cadastroSenhaConfirm')?.value;

    if (!usuario || !senha || !senhaConfirm) {
      mostrarErro('cadastroErro', 'Preencha todos os campos.');
      return;
    }

    if (usuario.length < 3) {
      mostrarErro('cadastroErro', 'Usuário deve ter pelo menos 3 caracteres.');
      return;
    }

    if (senha.length < 4) {
      mostrarErro('cadastroErro', 'Senha deve ter pelo menos 4 caracteres.');
      return;
    }

    if (senha !== senhaConfirm) {
      mostrarErro('cadastroErro', 'As senhas não coincidem.');
      return;
    }

    if (usuarioExiste(usuario)) {
      mostrarErro('cadastroErro', 'Este usuário já está cadastrado. Escolha outro nome.');
      return;
    }

    const senhaHash = await hashSenha(senha);
    salvarCredenciais(usuario, senhaHash);

    // Perfil JSONBin começa vazio; usuário configura depois na tela de Nuvem
    const perfis = carregarPerfisNuvem();
    if (!perfis[usuario]) {
      perfis[usuario] = { jsonBinKey: '', jsonBinBin: '' };
      salvarPerfisNuvem(perfis);
    }

    sessionStorage.setItem('anamnese_usuario_logado', usuario);
    criarSessao();
    esconderLogin();
    inicializarApp();
    alert(`✅ Conta criada com sucesso! Bem-vindo, ${usuario}!`);
  }

  function resetarCredenciais() {
    const usuarioLogado = sessionStorage.getItem('anamnese_usuario_logado') || '';
    const msg = usuarioLogado
      ? `⚠️ Tem certeza? Isso apagará a conta "${usuarioLogado}".`
      : '⚠️ Tem certeza? Isso apagará todas as credenciais.';
    if (confirm(msg)) {
      limparCredenciais(usuarioLogado || null);
      alert('✅ Conta removida. Você pode fazer login com outra conta ou criar uma nova.');
      location.reload();
    }
  }

  function inicializarApp() {
    try {
      const sexoAtual = document.getElementById('sexo')?.value || 'M';
      if (typeof window.initLastAuto === 'function') window.initLastAuto(sexoAtual);
      if (typeof window.aplicarGenero === 'function') window.aplicarGenero(sexoAtual);
      if (typeof window.initMedsField === 'function') window.initMedsField();
    } catch (e) {
      console.warn('Erro ao inicializar app:', e);
    }
  }

  function inicializarLogin() {
    const todos = carregarTodosUsuarios();
    const temUsuarios = Object.keys(todos).length > 0;

    if (verificarSessao()) {
      esconderLogin();
      inicializarApp();
    } else if (!temUsuarios) {
      // Nenhuma conta ainda: abrir cadastro diretamente
      mostrarTela('telaCadastro');
      mostrarLogin();
      setTimeout(() => {
        const cadastroUsuario = document.getElementById('cadastroUsuario');
        if (cadastroUsuario) cadastroUsuario.focus();
      }, 100);
    } else {
      // Já existe ao menos uma conta: mostrar login
      mostrarTela('telaLogin');
      mostrarLogin();
      setTimeout(() => {
        const loginUsuario = document.getElementById('loginUsuario');
        if (loginUsuario) loginUsuario.focus();
      }, 100);
    }

    const btnLogin = document.getElementById('loginEntrar');
    if (btnLogin) btnLogin.addEventListener('click', fazerLogin);

    const btnCadastro = document.getElementById('cadastroBotao');
    if (btnCadastro) btnCadastro.addEventListener('click', fazerCadastro);

    const btnReset = document.getElementById('resetConfirmar');
    if (btnReset) btnReset.addEventListener('click', resetarCredenciais);

    const loginSenha = document.getElementById('loginSenha');
    if (loginSenha) {
      loginSenha.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') fazerLogin();
      });
    }

    const cadastroSenhaConfirm = document.getElementById('cadastroSenhaConfirm');
    if (cadastroSenhaConfirm) {
      cadastroSenhaConfirm.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') fazerCadastro();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', inicializarLogin);
})();

(function () {
  const HISTORICO_KEY = 'anamnese_historico';

  function gerarId() {
    return Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  function obterPacientes() {
    try {
      const data = localStorage.getItem(HISTORICO_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Erro ao carregar histórico:', e);
      return [];
    }
  }

  function salvarPacientes(pacientes) {
    try {
      localStorage.setItem(HISTORICO_KEY, JSON.stringify(pacientes));
    } catch (e) {
      console.warn('Erro ao salvar histórico:', e);
    }
  }

  function coletarDadosPaciente() {
    const fieldIds = [
      'responsavel', 'nome', 'idade', 'sexo', 'religiao', 'unidade',
      'alergias-detalhe', 'internacao-detalhe',
      'tabagismo-detalhe', 'tab_cigs_dia', 'tab_anos',
      'etilismo-detalhe', 'drogas-detalhe',
      'qp', 'hda', 'hpp', 'meds_continuos', 'hf', 'labs', 'imagem',
      'pa', 'fc', 'fr', 'sat', 'temp', 'hgt',
      'ef_ectoscopia', 'ef_cp', 'ef_acv', 'ef_ap', 'ef_abd', 'ef_neuro', 'ef_membros',
      'neuro_detalhado'
    ];

    const data = { fields: {}, toggles: {} };

    fieldIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        data.fields[id] = el.value || '';
      }
    });

    const toggleStates = ['alergias', 'internacao', 'tabagismo', 'etilismo', 'drogas'];
    toggleStates.forEach(key => {
      if (typeof state !== 'undefined' && state[key]) {
        data.toggles[key] = state[key];
      } else {
        data.toggles[key] = 'Não';
      }
    });

    return data;
  }

  window.salvarPacienteAtual = function () {
    const nome = document.getElementById('nome')?.value?.trim();
    
    if (!nome) {
      alert('⚠️ Digite o nome do paciente antes de salvar!');
      return;
    }

    const dados = coletarDadosPaciente();
    let pacientes = obterPacientes();
    
    // Verificar se já existe paciente com o mesmo nome
    const indiceExistente = pacientes.findIndex(p => 
      p.nome.toLowerCase() === nome.toLowerCase()
    );

    if (indiceExistente !== -1) {
      // Paciente já existe - perguntar se quer atualizar
      if (confirm(`⚠️ Já existe uma anamnese salva para "${nome}".\n\nDeseja ATUALIZAR a anamnese existente?`)) {
        // Atualizar paciente existente
        pacientes[indiceExistente] = {
          ...pacientes[indiceExistente],
          idade: dados.fields.idade || '',
          sexo: dados.fields.sexo || 'M',
          unidade: dados.fields.unidade || '',
          queixa: dados.fields.qp || '',
          dataAtualizacao: new Date().toISOString(),
          dados: dados
        };
        
        salvarPacientes(pacientes);
        alert(`✅ Anamnese de "${nome}" ATUALIZADA com sucesso!`);
        atualizarListaPacientes();
        return;
      } else {
        return; // Cancelou a atualização
      }
    }

    // Novo paciente - criar novo registro
    const paciente = {
      id: gerarId(),
      nome: nome,
      idade: dados.fields.idade || '',
      sexo: dados.fields.sexo || 'M',
      unidade: dados.fields.unidade || '',
      queixa: dados.fields.qp || '',
      dataSalvo: new Date().toISOString(),
      dados: dados
    };

    pacientes.unshift(paciente);
    salvarPacientes(pacientes);

    alert(`✅ Paciente "${nome}" salvo com sucesso!`);
    atualizarListaPacientes();
  };
  
  // Função para salvar do modal (após gerar relatório)
  window.salvarAnamneseAtual = function() {
    window.salvarPacienteAtual();
  };

  function carregarPaciente(dados) {
    if (!confirm('⚠️ Isso substituirá os dados atuais. Deseja continuar?')) {
      return;
    }

    if (dados.fields) {
      Object.keys(dados.fields).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
          el.value = dados.fields[id] || '';
        }
      });
    }

    if (dados.toggles) {
      Object.keys(dados.toggles).forEach(key => {
        const value = dados.toggles[key];
        if (typeof window.setOption === 'function') {
          try {
            window.setOption(key, value);
          } catch (e) {
            console.warn('Erro ao restaurar toggle:', key, e);
          }
        }
      });
    }

    if (typeof window.calcularCargaTabagica === 'function') {
      try {
        window.calcularCargaTabagica();
      } catch (e) {
        console.warn('Erro ao calcular carga tabágica:', e);
      }
    }

    const sexo = document.getElementById('sexo')?.value;
    if (sexo && typeof window.aplicarGenero === 'function') {
      try {
        window.aplicarGenero(sexo);
      } catch (e) {
        console.warn('Erro ao aplicar gênero:', e);
      }
    }

    fecharHistorico();
    alert('✅ Dados do paciente carregados!');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function excluirPaciente(id) {
    if (!confirm('⚠️ Tem certeza que deseja excluir este paciente do histórico?')) {
      return;
    }

    let pacientes = obterPacientes();
    pacientes = pacientes.filter(p => p.id !== id);
    salvarPacientes(pacientes);
    atualizarListaPacientes();
    alert('✅ Paciente excluído do histórico');
  }

  function formatarData(isoString) {
    try {
      const data = new Date(isoString);
      return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return 'Data inválida';
    }
  }

  function atualizarListaPacientes(filtro = '') {
    const lista = document.getElementById('listaPacientes');
    const count = document.getElementById('pacientesCount');
    
    if (!lista) return;

    const pacientes = obterPacientes();
    const filtroLower = filtro.toLowerCase();
    const pacientesFiltrados = filtro 
      ? pacientes.filter(p => p.nome.toLowerCase().includes(filtroLower))
      : pacientes;

    if (count) {
      count.textContent = `${pacientesFiltrados.length} paciente${pacientesFiltrados.length !== 1 ? 's' : ''} ${filtro ? 'encontrado' : 'salvo'}${pacientesFiltrados.length !== 1 ? 's' : ''}`;
    }

    if (pacientesFiltrados.length === 0) {
      lista.innerHTML = `
        <div class="empty-state">
          <p>📭</p>
          <p>${filtro ? 'Nenhum paciente encontrado' : 'Nenhum paciente salvo ainda'}</p>
        </div>
      `;
      return;
    }

    lista.innerHTML = pacientesFiltrados.map(p => `
      <div class="paciente-item">
        <div class="paciente-item-header">
          <div class="paciente-nome">${p.nome || 'Sem nome'}</div>
          <div class="paciente-data">${p.dataAtualizacao ? '✏️ ' + formatarData(p.dataAtualizacao) : formatarData(p.dataSalvo)}</div>
        </div>
        <div class="paciente-info">
          ${p.idade ? `${p.idade} anos` : ''} ${p.idade && p.sexo ? '•' : ''} ${p.sexo === 'M' ? 'Masculino' : 'Feminino'}
          ${p.unidade ? ` • ${p.unidade}` : ''}
        </div>
        ${p.queixa ? `<div class="paciente-info" style="font-style: italic; color: #777;">QP: ${p.queixa.substring(0, 60)}${p.queixa.length > 60 ? '...' : ''}</div>` : ''}
        <div class="paciente-actions">
          <button class="btn-carregar" onclick="window.carregarPacienteById('${p.id}')">📂 Carregar</button>
          <button class="btn-excluir" onclick="window.excluirPacienteById('${p.id}')">🗑️ Excluir</button>
        </div>
      </div>
    `).join('');
  }

  window.carregarPacienteById = function (id) {
    const pacientes = obterPacientes();
    const paciente = pacientes.find(p => p.id === id);
    if (paciente) {
      carregarPaciente(paciente.dados);
    }
  };

  window.excluirPacienteById = function (id) {
    excluirPaciente(id);
  };

  window.abrirHistorico = function () {
    const modal = document.getElementById('modalHistorico');
    if (modal) {
      modal.classList.add('show');
      atualizarListaPacientes();
      
      setTimeout(() => {
        const search = document.getElementById('searchPaciente');
        if (search) search.focus();
      }, 100);
    }
  };

  window.fecharHistorico = function () {
    const modal = document.getElementById('modalHistorico');
    if (modal) {
      modal.classList.remove('show');
      const search = document.getElementById('searchPaciente');
      if (search) search.value = '';
    }
  };

  window.addEventListener('load', function () {
    const btnHistorico = document.getElementById('btnHistorico');
    if (btnHistorico) {
      btnHistorico.addEventListener('click', abrirHistorico);
    }

    const searchInput = document.getElementById('searchPaciente');
    if (searchInput) {
      searchInput.addEventListener('input', function (e) {
        atualizarListaPacientes(e.target.value);
      });
    }

    // Interceptar geração de relatório para perguntar sobre salvamento
    const originalGerarRelatorio = window.gerarRelatorio;
    if (typeof originalGerarRelatorio === 'function') {
      window.gerarRelatorio = function () {
        originalGerarRelatorio();
        
        // Perguntar para salvar após mostrar o relatório
        setTimeout(() => {
          const nome = document.getElementById('nome')?.value?.trim();
          if (nome && confirm('💾 Deseja salvar esta anamnese no histórico?')) {
            window.salvarPacienteAtual();
          }
        }, 500);
      };
    }
  });
})();

  // Abrir/fechar modal
  function abrirScores() {
    document.getElementById("modal-scores").style.display = "block";
    document.getElementById("modal-scores-backdrop").style.display = "block";
  }

  function fecharScores() {
    document.getElementById("modal-scores").style.display = "none";
    document.getElementById("modal-scores-backdrop").style.display = "none";
  }

  // ---------- CURB-65 ----------
  function calcCURB65({confusao, ureiaAlta, respi30, pasBaixa, idade65}) {
    let score = 0;
    if (confusao) score++;
    if (ureiaAlta) score++;
    if (respi30) score++;
    if (pasBaixa) score++;
    if (idade65) score++;

    let risco;
    if (score <= 1) {
      risco = "baixo risco (~1–2% mortalidade, geralmente ambulatorial)";
    } else if (score === 2) {
      risco = "risco intermediário (~9% mortalidade, considerar internação)";
    } else if (score === 3) {
      risco = "alto risco (~22% mortalidade, internação e avaliar UTI)";
    } else {
      risco = "muito alto risco (>30% mortalidade, forte indicação de UTI)";
    }

    return { score, risco };
  }

  function atualizaCURB65() {
    const dados = {
      confusao: document.getElementById("curb-confusao").checked,
      ureiaAlta: document.getElementById("curb-ureia").checked,
      respi30: document.getElementById("curb-fr30").checked,
      pasBaixa: document.getElementById("curb-pa").checked,
      idade65: document.getElementById("curb-idade65").checked
    };

    const { score, risco } = calcCURB65(dados);
    const texto = `CURB-65: ${score} ponto(s) – ${risco}`;
    document.getElementById("curb-resultado").textContent = texto;
    
    // Salvar score calculado
    salvarScore("CURB-65", `${score}/5`, risco);
  }

  // ---------- Glasgow ----------
  function calcGCS({ocular, verbal, motora}) {
    const e = Number(ocular);
    const v = Number(verbal);
    const m = Number(motora);
    const total = e + v + m;

    let classificacao;
    if (total >= 13) {
      classificacao = "TCE leve (13–15)";
    } else if (total >= 9) {
      classificacao = "TCE moderado (9–12)";
    } else {
      classificacao = "TCE grave (3–8, geralmente coma)";
    }

    return { total, e, v, m, classificacao };
  }

  function atualizaGCS() {
    const ocular = document.getElementById("gcs-ocular").value;
    const verbal = document.getElementById("gcs-verbal").value;
    const motora = document.getElementById("gcs-motora").value;

    const { total, e, v, m, classificacao } = calcGCS({ocular, verbal, motora});
    const texto = `Glasgow: ${total} (E${e} V${v} M${m}) – ${classificacao}`;
    document.getElementById("gcs-resultado").textContent = texto;
    
    // Salvar score calculado
    salvarScore("Glasgow", `${total}/15 (E${e} V${v} M${m})`, classificacao);
  }

  // ---------- TIMI Score ----------
  function calcTIMI(dados) {
    let score = 0;
    if (dados.idade) score++;
    if (dados.fatores) score++;
    if (dados.estenose) score++;
    if (dados.aspirina) score++;
    if (dados.angina) score++;
    if (dados.st) score++;
    if (dados.marcadores) score++;

    let risco;
    if (score <= 2) {
      risco = "Baixo risco (4.7% de eventos em 14 dias)";
    } else if (score <= 4) {
      risco = "Risco intermediário (19.9% de eventos em 14 dias)";
    } else {
      risco = "Alto risco (41% de eventos em 14 dias)";
    }

    return { score, risco };
  }

  function atualizaTIMI() {
    const dados = {
      idade: document.getElementById("timi-idade").checked,
      fatores: document.getElementById("timi-fatores").checked,
      estenose: document.getElementById("timi-estenose").checked,
      aspirina: document.getElementById("timi-aspirina").checked,
      angina: document.getElementById("timi-angina").checked,
      st: document.getElementById("timi-st").checked,
      marcadores: document.getElementById("timi-marcadores").checked
    };

    const { score, risco } = calcTIMI(dados);
    const texto = `TIMI Score: ${score}/7 – ${risco}`;
    document.getElementById("timi-resultado").textContent = texto;
    
    // Salvar score calculado
    salvarScore("TIMI", `${score}/7`, risco);
  }

  // ---------- SOFA Score ----------
  function calcSOFA(dados) {
    const resp = Number(dados.resp);
    const plaq = Number(dados.plaq);
    const bili = Number(dados.bili);
    const cv = Number(dados.cv);
    const neuro = Number(dados.neuro);
    const renal = Number(dados.renal);
    
    const total = resp + plaq + bili + cv + neuro + renal;

    let interpretacao;
    if (total < 2) {
      interpretacao = "Baixo risco de mortalidade (<10%)";
    } else if (total <= 5) {
      interpretacao = "Risco intermediário de mortalidade (15-20%)";
    } else if (total <= 10) {
      interpretacao = "Alto risco de mortalidade (40-50%)";
    } else {
      interpretacao = "Risco muito alto de mortalidade (>80%)";
    }

    return { total, interpretacao };
  }

  function atualizaSOFA() {
    const dados = {
      resp: document.getElementById("sofa-resp").value,
      plaq: document.getElementById("sofa-plaq").value,
      bili: document.getElementById("sofa-bili").value,
      cv: document.getElementById("sofa-cv").value,
      neuro: document.getElementById("sofa-neuro").value,
      renal: document.getElementById("sofa-renal").value
    };

    const { total, interpretacao } = calcSOFA(dados);
    const texto = `SOFA Score: ${total}/24 – ${interpretacao}`;
    document.getElementById("sofa-resultado").textContent = texto;
    
    // Salvar score calculado
    salvarScore("SOFA", `${total}/24`, interpretacao);
  }

  // ---------- Wells Score (TVP) ----------
  function calcWells(dados) {
    let score = 0;
    if (dados.cancer) score += 1;
    if (dados.paralisia) score += 1;
    if (dados.leito) score += 1;
    if (dados.dor) score += 1;
    if (dados.edema) score += 1;
    if (dados.panturrilha) score += 1;
    if (dados.cacifo) score += 1;
    if (dados.veias) score += 1;
    if (dados.tvpPrevia) score += 1;
    if (dados.alternativo) score -= 2;

    let probabilidade;
    if (score <= 0) {
      probabilidade = "Baixa probabilidade (3% de TVP)";
    } else if (score <= 2) {
      probabilidade = "Probabilidade moderada (17% de TVP)";
    } else {
      probabilidade = "Alta probabilidade (75% de TVP)";
    }

    return { score, probabilidade };
  }

  function atualizaWells() {
    const dados = {
      cancer: document.getElementById("wells-cancer").checked,
      paralisia: document.getElementById("wells-paralisia").checked,
      leito: document.getElementById("wells-leito").checked,
      dor: document.getElementById("wells-dor").checked,
      edema: document.getElementById("wells-edema").checked,
      panturrilha: document.getElementById("wells-panturrilha").checked,
      cacifo: document.getElementById("wells-cacifo").checked,
      veias: document.getElementById("wells-veias").checked,
      tvpPrevia: document.getElementById("wells-tvp-previa").checked,
      alternativo: document.getElementById("wells-alternativo").checked
    };

    const { score, probabilidade } = calcWells(dados);
    const texto = `Wells Score: ${score} pontos – ${probabilidade}`;
    document.getElementById("wells-resultado").textContent = texto;
    
    // Salvar score calculado
    salvarScore("Wells (TVP)", `${score} pontos`, probabilidade);
  }

  // ---------- CHA2DS2-VASc Score ----------
  function calcCHA2DS2VASc(dados) {
    let score = 0;
    if (dados.chf) score += 1;
    if (dados.has) score += 1;
    if (dados.idade75) score += 2;
    if (dados.dm) score += 1;
    if (dados.avc) score += 2;
    if (dados.vasc) score += 1;
    if (dados.idade65) score += 1;
    if (dados.sexo) score += 1;

    let recomendacao;
    if (score === 0) {
      recomendacao = "Baixo risco - Sem anticoagulação (ou considerar)";
    } else if (score === 1) {
      recomendacao = "Baixo-intermediário - Considerar anticoagulação (preferível se homem)";
    } else {
      recomendacao = "Alto risco - Anticoagulação recomendada";
    }

    return { score, recomendacao };
  }

  function atualizaCHA2DS2VASc() {
    const dados = {
      chf: document.getElementById("cha2-chf").checked,
      has: document.getElementById("cha2-has").checked,
      idade75: document.getElementById("cha2-idade75").checked,
      dm: document.getElementById("cha2-dm").checked,
      avc: document.getElementById("cha2-avc").checked,
      vasc: document.getElementById("cha2-vasc").checked,
      idade65: document.getElementById("cha2-idade65").checked,
      sexo: document.getElementById("cha2-sexo").checked
    };

    const { score, recomendacao } = calcCHA2DS2VASc(dados);
    const texto = `CHA2DS2-VASc: ${score} pontos – ${recomendacao}`;
    document.getElementById("cha2-resultado").textContent = texto;
    
    // Salvar score calculado
    salvarScore("CHA2DS2-VASc", `${score}/9`, recomendacao);
  }

  // ---------- HAS-BLED Score ----------
  function calcHASBLED(dados) {
    let score = 0;
    if (dados.has) score += 1;
    if (dados.renal) score += 1;
    if (dados.hepat) score += 1;
    if (dados.avc) score += 1;
    if (dados.sangra) score += 1;
    if (dados.inr) score += 1;
    if (dados.idade) score += 1;
    if (dados.drogas) score += 1;

    let risco;
    if (score <= 2) {
      risco = "Baixo risco de sangramento (1.13% ao ano)";
    } else if (score === 3) {
      risco = "Risco intermediário (3.74% ao ano) - Cautela";
    } else {
      risco = "Alto risco (8.7% ao ano) - Considerar benefício/risco";
    }

    return { score, risco };
  }

  function atualizaHASBLED() {
    const dados = {
      has: document.getElementById("hasbled-has").checked,
      renal: document.getElementById("hasbled-renal").checked,
      hepat: document.getElementById("hasbled-hepat").checked,
      avc: document.getElementById("hasbled-avc").checked,
      sangra: document.getElementById("hasbled-sangra").checked,
      inr: document.getElementById("hasbled-inr").checked,
      idade: document.getElementById("hasbled-idade").checked,
      drogas: document.getElementById("hasbled-drogas").checked
    };

    const { score, risco } = calcHASBLED(dados);
    const texto = `HAS-BLED: ${score} pontos – ${risco}`;
    document.getElementById("hasbled-resultado").textContent = texto;
    salvarScore("HAS-BLED", `${score}/9`, risco);
  }

  // ============ SINCRONIZAÇÃO JSONBIN ============
  const JSONBIN_BASE = 'https://api.jsonbin.io/v3';

  function getJBKey() { return jsonBinKeyAtual || localStorage.getItem('anamnese_jsonbin_key') || ''; }
  function getJBBin() { return jsonBinBinAtual || localStorage.getItem('anamnese_jsonbin_bin') || ''; }

  function atualizarIndicadorNuvem(estado) {
    const btn = document.getElementById('btn-nuvem');
    if (!btn) return;
    const estados = {
      ok:       { cor: '#4caf50', titulo: 'Nuvem sincronizada' },
      sincronizando: { cor: '#ff9800', titulo: 'Sincronizando...' },
      erro:     { cor: '#f44336', titulo: 'Erro na sincronização' },
      offline:  { cor: '#9e9e9e', titulo: 'Sem conexão' },
      desconf:  { cor: '#9e9e9e', titulo: 'Nuvem não configurada' },
    };
    const e = estados[estado] || estados.desconf;
    btn.style.background = e.cor;
    btn.title = e.titulo;
  }

  async function sincronizarAgora() {
    const key = getJBKey();
    const bin = getJBBin();
    if (!key || !bin) { atualizarIndicadorNuvem('desconf'); return; }

    atualizarIndicadorNuvem('sincronizando');
    try {
      const dados = {
        historico:   JSON.parse(localStorage.getItem(HISTORICO_KEY)  || '[]'),
        lembretes:   JSON.parse(localStorage.getItem(LEMBRETES_KEY)  || '[]'),
        timestamp:   new Date().toISOString(),
      };
      const res = await fetch(`${JSONBIN_BASE}/b/${bin}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'X-Master-Key': key },
        body: JSON.stringify(dados),
      });
      if (!res.ok) throw new Error(res.status);
      atualizarIndicadorNuvem('ok');
    } catch (e) {
      atualizarIndicadorNuvem('erro');
      console.warn('Erro ao sincronizar com JSONBin:', e);
    }
  }

  async function carregarDaNuvem() {
    const key = getJBKey();
    const bin = getJBBin();
    if (!key || !bin) { atualizarIndicadorNuvem('desconf'); return; }

    atualizarIndicadorNuvem('sincronizando');
    try {
      const res = await fetch(`${JSONBIN_BASE}/b/${bin}/latest`, {
        headers: { 'X-Master-Key': key }
      });
      if (!res.ok) throw new Error(res.status);
      const json = await res.json();
      const dados = json.record;

      if (dados.historico) {
        const local   = JSON.parse(localStorage.getItem(HISTORICO_KEY) || '[]');
        const nuvem   = dados.historico;
        const merged  = mergeHistorico(local, nuvem);
        localStorage.setItem(HISTORICO_KEY, JSON.stringify(merged));
        renderizarHistorico();
      }
      if (dados.lembretes) {
        localStorage.setItem(LEMBRETES_KEY, JSON.stringify(dados.lembretes));
        renderizarLembretes();
      }
      atualizarIndicadorNuvem('ok');
    } catch (e) {
      atualizarIndicadorNuvem('erro');
      console.warn('Erro ao carregar da nuvem:', e);
    }
  }

  function mergeHistorico(local, nuvem) {
    const mapa = {};
    [...local, ...nuvem].forEach(p => {
      const id = p.id || (p.nome + '_' + p.dataNascimento);
      if (!mapa[id] || new Date(p.dataConsulta) >= new Date(mapa[id].dataConsulta)) {
        mapa[id] = p;
      }
    });
    return Object.values(mapa).sort((a, b) => new Date(b.dataConsulta) - new Date(a.dataConsulta));
  }

  function abrirConfigNuvem() {
    const key = getJBKey();
    const bin = getJBBin();
    const novaKey = prompt('Master Key do JSONBin (deixe em branco para manter a atual):', key ? '(configurada)' : '');
    if (novaKey !== null && novaKey.trim() && novaKey.trim() !== '(configurada)') {
      jsonBinKeyAtual = novaKey.trim();
      localStorage.setItem('anamnese_jsonbin_key', jsonBinKeyAtual);
    }
    const novaBin = prompt('Bin ID do JSONBin (deixe em branco para manter o atual):', bin || '');
    if (novaBin !== null && novaBin.trim()) {
      jsonBinBinAtual = novaBin.trim();
      localStorage.setItem('anamnese_jsonbin_bin', jsonBinBinAtual);
    }
    // Salvar no perfil do usuário logado
    const sessao = JSON.parse(sessionStorage.getItem('anamnese_auth_session') || 'null');
    if (sessao && sessao.usuario) {
      const perfis = carregarPerfisNuvem();
      perfis[sessao.usuario] = { jsonBinKey: getJBKey(), jsonBinBin: getJBBin() };
      salvarPerfisNuvem(perfis);
    }
    sincronizarAgora();
  }


