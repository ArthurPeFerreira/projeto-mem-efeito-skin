# Cálculo do Efeito Skin - Projeto Acadêmico

> Um aplicativo para auxiliar os cálculos de efeito skin em condutores, desenvolvido por **Arthur Pedro Ferreira** como trabalho de faculdade.


## 🚀 Visão Geral

Este projeto foi idealizado para apresentar, de forma interativa e prática, os principais cálculos do **efeito skin** (skin effect) em fios e cabos condutores. A ferramenta combina:

* **Next.js** para interface web moderna com SSR/SSG.
* **Electron** para empacotar como aplicativo desktop multiplataforma.
* **Componentes React** e **TailwindCSS** para uma experiência visual clean e responsiva.
* **React-Toastify** para notificações ágeis e elegantes.

O objetivo é que usuários possam:

1. Selecionar materiais condutores (Cobre, Alumínio, etc.)
2. Configurar parâmetros de entrada (frequência, temperatura, dimensões)
3. Obter resultados precisos de resistividade atualizada, profundidade de penetração (skin depth) e resistências AC/DC.

---

## 🛠️ Guia de Instalação e Execução

Siga este passo a passo para clonar, configurar e rodar o aplicativo (web + desktop) sem mistérios:

1. **Pré-requisitos**:
   - Node.js (≥ v16) e npm instalados.
   - Git disponível no seu PATH.

2. **Clone o repositório**:
   ```bash
   git clone https://github.com/ArthurPeFerreira/projeto-mem-efeito-skin
   projeto-mem-efeito-skin
   ```

3. **Instale as dependências**:
   ```bash
   npm install
   ```

4. **Modo Desenvolvimento (Web)**:
   ```bash
   npm run dev
   ```
   - Abre o Next.js em `http://localhost:3000`.

5. **Build e Execução (Web)**:
   ```bash
   npm run build
   npm run start
   ```
   - Gera a versão de produção e inicia o servidor.

6. **Empacotando com Electron**:
   ```bash
   npm run dist
   ```
   - Prepara dependências nativas, transpila o main do Electron e gera os instaladores na pasta `release/`.

7. **Instale e execute**:
   - Windows: abra o `.exe` gerado em `release/`.
   - macOS/Linux: instale o pacote correspondente e execute.

Pronto! Agora você tem o app rodando tanto no navegador quanto como aplicação desktop, tudo agilizado para seu trabalho e provas de conceito. Caso surja alguma dúvida, abra uma issue ou entre em contato com o autor. Bom código e boa convergência de correntes! 🚀

---

## 🧰 Tecnologias Utilizadas

* **Next.js** v15.3.3
* **React** ^19.0.0
* **Electron** ^36.4.0
* **React-Toastify** ^11.0.5
* **TailwindCSS** v4
* **TypeScript** ^5.0.0

---

## 🎓 Contexto Acadêmico

Este projeto faz parte da disciplina de **Materiais Elétricos e Magnéticos**/ **Engenharia Elétrica** no Instituto Federal Catarinense (IFC). O foco é demonstrar:

1. **Efeito Skin:** variação da densidade de corrente na superfície do condutor em função da frequência.
2. **Resistividade versus Temperatura:** como a resistividade do material muda de acordo com a temperatura de operação.
3. **Comparativo AC vs DC:** diferenças de resistência em corrente alternada e contínua.