# 🏥 Anamnese Fast

> Sistema completo de registro de anamnese médica desenvolvido por **Silvestre Azevedo** - Acadêmico de Medicina

## 📋 Características Principais

### 🔐 Sistema de Autenticação
- Login/Cadastro seguro com hash SHA-256
- Sessão persistente durante navegação
- Reset de credenciais quando necessário
- Histórico mantido após reset de login

### 📝 Formulário Completo de Anamnese
- **Dados do Paciente**: Nome, idade, sexo, religião, unidade
- **Alergias e Internações**: Campos destacados em vermelho para alertas
- **Hábitos de Vida**: 
  - Tabagismo com calculadora automática de carga tabágica
  - Etilismo e drogas ilícitas
- **História Clínica**: QP, HDA, HPP, HF
- **Medicamentos**: Listagem numerada automática
- **Exames**: Laboratoriais e de imagem
- **Sinais Vitais**: PA, FC, FR, SatO₂, Temperatura, Glicemia
- **Exame Físico**: Ectoscopia, cabeça/pescoço, ACV, AP, ABD, neuro, membros
- **Exame Neurológico Detalhado**: Template completo

### 🏥 Especialidades

#### 🔥 Gastroenterologia (Completa)
Sistema de checklist detalhado para anamnese gastroenterológica:
- Dor abdominal (localização, tipo, intensidade, irradiação)
- Sintomas digestivos altos e baixos
- Características das fezes
- Icterícia/sintomas hepatobiliares
- Sintomas sistêmicos
- Antecedentes GI
- Medicamentos em uso
- Hábitos alimentares
- História familiar
- Sinais de alarme

#### ⏳ Em Desenvolvimento
- Cardiologia
- Pneumologia
- Neurologia

### 📊 Scores Médicos
Botão flutuante com calculadoras:
- **CURB-65**: Avaliação de pneumonia
- **Escala de Glasgow**: Nível de consciência (E, V, M)

### 📚 Histórico de Pacientes
- Salvar pacientes completos no localStorage
- Busca por nome
- Carregar dados salvos
- Excluir registros
- Data/hora de cada salvamento

### 📄 Geração de Relatórios
- **Visualização**: Modal com texto formatado
- **Copiar**: Para área de transferência
- **PDF**: Impressão otimizada com cabeçalho e assinatura
- Templates automáticos por gênero (M/F)

### ✨ Recursos Adicionais
- Design responsivo e moderno
- Cores profissionais (verde hospitalar)
- Templates automáticos de exame físico por gênero
- Auto-numeração de medicamentos
- Campos inteligentes que aparecem conforme necessidade
- Smooth scroll e animações

## 🚀 Como Usar

1. **Abra o arquivo `index.html`** em qualquer navegador moderno
2. **Primeiro acesso**: Crie suas credenciais
3. **Preencha a anamnese**: Todos os campos são opcionais
4. **Use especialidades**: Clique no botão "Especialidades" se necessário
5. **Gere o relatório**: Botão "GERAR EVOLUÇÃO"
6. **Salve o paciente**: Opção após gerar relatório
7. **Consulte histórico**: Botão flutuante 📋

## 💾 Armazenamento

Todos os dados são salvos localmente no navegador:
- Credenciais (hash SHA-256)
- Histórico de pacientes
- Sessão ativa

**Nenhum dado é enviado para servidores externos.**

## 🎨 Tecnologias

- HTML5
- CSS3 (Grid, Flexbox, Animações)
- JavaScript Vanilla (ES6+)
- localStorage/sessionStorage
- Web Crypto API

## 📱 Compatibilidade

✅ Chrome, Edge, Firefox, Safari (versões recentes)
✅ Desktop e Mobile
✅ Impressão otimizada

## 🔒 Segurança

- Senhas com hash SHA-256
- Validação de campos
- Armazenamento local apenas
- Sem envio de dados externos

## 📞 Suporte

Desenvolvido por **Silvestre Azevedo**
Acadêmico de Medicina

---

**Versão**: 1.0
**Data**: 2026
