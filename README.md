# 🧮 KaTeX JS — Editor Online de Fórmulas Matemáticas

Um editor online focado em **renderização de fórmulas matemáticas via KaTeX** com exportação para PDF — tudo em uma única página HTML, sem backend.

---

## 🚀 Recursos

✅ Renderização de **fórmulas matemáticas** em bloco `$$...$$` e inline `$...$` com **KaTeX**  
✅ **Toolbar de snippets** com atalhos para frações, raízes, somatórios, integrais, matrizes e mais  
✅ **Auto-render** com debounce — renderiza enquanto você digita  
✅ **Exportação direta para PDF** com preservação das fórmulas renderizadas  
✅ Mensagens de erro inline quando a sintaxe KaTeX for inválida  
✅ Design dark minimalista, responsivo e limpo  
✅ Funciona **100% offline** após carregar as libs via CDN  

---

## 🧩 Tecnologias

| Tecnologia | Função |
|---|---|
| [KaTeX](https://katex.org/) | Renderização rápida de fórmulas matemáticas |
| HTML5 + CSS3 | Estrutura e estilização |
| JavaScript puro | Lógica do editor, snippets e exportação |

---

## 📁 Estrutura

```
index.html   → estrutura e marcação HTML
style.css    → tema dark, layout dois painéis, responsividade
script.js    → render, snippets, auto-render, exportar PDF
```

---

## ✍️ Sintaxe suportada

| Tipo | Sintaxe | Exemplo |
|---|---|---|
| Bloco (display) | `$$...$$` | `$$\frac{a}{b}$$` |
| Inline | `$...$` | `$E = mc^2$` |

---

## 🖨️ Exportar PDF

Clique em **Exportar PDF** — o painel do editor é ocultado automaticamente e a janela de impressão do navegador é aberta com o conteúdo renderizado.