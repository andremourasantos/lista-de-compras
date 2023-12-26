# Sobre o repositório

Esse repositório guarda os arquivos do meu [projeto de lista de compras 🡥](https://lista-de-compras.andremourasantos.com.br), que iniciei no começo de 2023 como forma de aprofundar e aplicar meus conhecimentos com o Firebase V9 JS SDK e também Progressive Web Apps (PWA).

> Esta nova versão finaliza o ciclo de versões de teste desta aplicação, formalizando meu aprendizado em um produto consico e 100% funcional.

---

## Tecnologias usadas

_*Atualizado em outubro de 2023._

<div align="center">
  <img height="48" title="HTML5" src="data/html5.png">
  <img height="48" title="CSS3" src="data/css3.png">
  <img height="48" title="JavaScript" src="data/js.png">
  <img height="48" title="TypeScript" src="data/ts.png">
  <img height="48" title="VueJS 3" src="data/vuejs.png">
  <img height="48" title="Firebase Hosting" src="data/firebase-hosting.png">
  <img height="48" title="Firebase Auth" src="data/firebase-auth.png">
  <img height="48" title="Firebase Firestore" src="data/firebase-firestore.png">
</div>

---

## O que aprendi com este projeto?

- Animação de elementos usando os componentes Transition e TransitionGroup.
- Aplicação de princípios de programação funcional para modulação do código e facilitação de manutenção e atualização;
- Confirmar e-mail via Firebase Auth;
- Criação, edição e exclusão de contas no Firebase Auth;
- Otimização para PWA, com ícones, imagens e descrições;
- Restringir rotas no Vue Router com base em parâmetros pré-definidos (usuário autenticado);
- Utilização da nova exibição de instalação de PWAs exclusiva do Chrome;

---

## Árvore de componentes e lógica

_*Atualizado em outubro de 2023._

Veja abaixo a árvore de componentes do VueJS e também o fluxograma de lógica da aplicação, assim, você poderá ter um bom entendimento de como o projeto foi estruturado desde o começo para permitir uma fácil manutenção e adição de funcionalidades.

<img title="Fluxograma de lógica de autenticação da aplicação" src="data/router-fluxogram.png">

---

## Fotos do projeto

_*Atualizado em dezembro de 2023._

![Lista preenchida (visão de telefone)](/public/img/promotional/1-lista-preenchida.png)
![Editando item da lista (visão de computador)](/public/img/promotional/2-wide-editando-item.png)

---

## Desempenho do site

_*Atualizado em dezembro de 2023._

O desempenho do site pode ser visto a partir de testes do [PageSpeed Insights 🡥](https://pagespeed.web.dev/analysis?url=https%3A%2F%2Flista-de-compras.andremourasantos.com.br%2F). Os problemas de desempenho surgem devido à instalação da biblioteca do PhosphorIcons globalmente (para testes), o que impossibilita o tree-shaking. Em breve irei alterar a instalação para importação dos componentes individualmente (permitindo o tree-shaking).

![pagespeed-insights-teste-telefone](https://github.com/andremourasantos/lista-de-compras/assets/92397834/4a046871-6269-43db-88b7-249925bb82ec)
![pagespeed-insights-teste-pc](https://github.com/andremourasantos/lista-de-compras/assets/92397834/275c038b-dcee-4f78-acc4-57af1599a880)
