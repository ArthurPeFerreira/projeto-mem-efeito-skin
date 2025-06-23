# Cálculo do Efeito Skin - Projeto Acadêmico

> Um aplicativo para auxiliar os cálculos de efeito skin em condutores, desenvolvido por **Arthur Pedro Ferreira** como trabalho de faculdade.

---

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

## ⚙️ Comandos Disponíveis

No diretório raiz do projeto, execute:

```bash
# 1) Desenvolvimento Web:
npm run dev             # Inicia Next.js em modo dev com Turbopack

# 2) Build para produção (Web):
npm run build           # Compila Next.js
npm run start           # Inicia servidor Next.js em modo production

# 3) Empacotar Electron:
npm run prepack-electron  # Prepare dependências nativas
npm run build:electron    # Transpila código Electron (tsconfig.electron.json)
npm run dist              # Empacota tudo e gera instaladores (.exe, .dmg, etc.)
```

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