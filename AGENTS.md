# Instruções do projeto — Atlas Contabilidade Digital

## Contexto do projeto

Este projeto é uma landing page institucional para a Atlas Contabilidade Digital.

A página deve apresentar a empresa, seus serviços, diferenciais, funcionalidades e caminhos de contato de forma profissional, moderna e confiável.

O objetivo principal é transmitir credibilidade e gerar interesse de possíveis clientes, direcionando-os para contato, explicações de serviços, blog/notícias e páginas institucionais como Sobre.

---

## Stack obrigatória

Usar prioritariamente:

- HTML
- CSS puro
- JavaScript puro

Não usar frameworks por padrão.

Caso alguma solução com biblioteca ou framework seja sugerida, explique antes:

- por que ela seria útil;
- o que ela faz;
- se é simples o suficiente para um estudante iniciante entender;
- quais alternativas existem usando apenas HTML, CSS e JavaScript puro.

Evite tecnologias avançadas ou complexas sem necessidade.

---

## Perfil do desenvolvedor

O desenvolvedor é estudante da primeira fase de Análise e Desenvolvimento de Sistemas.

Por isso, sempre explique o que o código está fazendo de forma didática, simples e objetiva.

Ao sugerir código:

- explique a função de cada parte importante;
- evite termos avançados sem explicação;
- ensine o raciocínio por trás da solução;
- não presuma conhecimento avançado.

---

## Regra principal de trabalho

Nunca escrever ou enviar o código inteiro da landing page de uma vez.

O desenvolvimento deve ser feito por partes e por sessões.

Trabalhar apenas na seção solicitada pelo usuário no momento.

Antes de avançar para uma nova seção, aguarde o comando do usuário.

---

## Alterações

Qualquer alteração importante deve ser consultada com o usuário antes de ser aplicada.

Não alterar estrutura, paleta, textos principais, layout geral ou estratégia da página sem pedir confirmação.

Sempre explique:

- o que será alterado;
- por que a alteração é recomendada;
- qual impacto ela terá no projeto.

---

## Estilo visual desejado

O design deve transmitir:

- modernidade;
- riqueza;
- elegância;
- profissionalismo corporativo;
- minimalismo;
- confiança;
- sofisticação discreta.

A página deve parecer premium, mas sem exageros visuais.

Evitar aparência genérica, amadora ou muito carregada.

---

## Paleta de cores

Usar como base:

- tons de azul claro;
- tons de azul escuro;
- branco;
- dourado discreto;
- cores presentes na logo da Atlas Contabilidade Digital.

Antes de definir cores finais, sugerir uma paleta com variáveis CSS.

Exemplo de organização esperada:

```css
:root {
  --color-primary: ;
  --color-secondary: ;
  --color-accent: ;
  --color-background: ;
  --color-text: ;
}
```

Não inventar cores definitivas sem explicar a escolha.

---

## Inspiração de estrutura

Usar como referência estrutural o site:

https://www.atlascontabilidade.com.br/

Importante:

- usar apenas como inspiração de organização e fluxo de conteúdo;
- não copiar o visual;
- não copiar textos;
- não copiar layout de forma idêntica;
- criar uma identidade própria, premium e moderna.

---

## Seções planejadas

A landing page deve ser construída em etapas, contendo:

1. Header
2. Hero
3. Serviços
4. Propaganda ou bloco de destaque
5. Descrição da empresa
6. Depoimentos
7. CTA
8. Footer

Também deve prever redirecionamentos para:

- explicações de serviços;
- blog ou notícias;
- contato;
- página Sobre.

---

## Requisitos técnicos

O código deve ser:

- organizado;
- semântico;
- acessível;
- responsivo;
- mobile first quando possível;
- fácil de entender;
- separado em arquivos HTML, CSS e JS;
- comentado apenas quando o comentário realmente ajudar no aprendizado.

Usar HTML semântico sempre que possível:

- header
- main
- section
- nav
- article
- footer
- button
- a

Evitar excesso de divs sem necessidade.

---

## Acessibilidade

Garantir boas práticas como:

- textos com bom contraste;
- botões e links claros;
- textos alternativos em imagens;
- navegação compreensível;
- uso correto de headings;
- foco visível em elementos interativos;
- aria-label apenas quando fizer sentido.

---

## Responsividade

A página deve funcionar bem em:

- celular;
- tablet;
- desktop.

Sempre pensar primeiro na experiência mobile.

Depois adaptar para telas maiores com media queries.

---

## Organização sugerida dos arquivos

Estrutura recomendada:

```txt
atlas-contabilidade/
│
├── AGENTS.md
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── images/
│   └── icons/
└── README.md
```

---

## Forma correta de responder

Quando o usuário pedir uma seção, seguir este formato:

1. Explicar rapidamente o objetivo da seção.
2. Mostrar apenas o código daquela parte.
3. Explicar o que cada bloco faz.
4. Avisar onde o código deve ser colocado.
5. Perguntar se o usuário quer ajustar algo antes de continuar.

Nunca continuar para a próxima seção sem autorização.

---

## Preferências de implementação

Usar:

- CSS variables;
- classes com nomes claros;
- layout com flexbox e grid quando necessário;
- animações suaves e simples;
- JavaScript apenas quando agregar valor real.

Evitar:

- código muito longo;
- dependências desnecessárias;
- frameworks complexos;
- animações exageradas;
- soluções difíceis para iniciantes;
- copiar sites prontos.

---

## Objetivo final

Criar uma landing page premium para a Atlas Contabilidade Digital, com aparência moderna, elegante e corporativa, mantendo o código simples o suficiente para um estudante iniciante entender, editar e evoluir.