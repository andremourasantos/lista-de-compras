<template>
  <article>
    <img src="@/assets/ilustrations/sobre.gif" height="256" width="256">
    <div id="content">
      <h2>Sobre este projeto</h2>
      <p>Este projeto de lista de compras foi desenvolvido inteiramente por André Moura Santos, como forma de demonstrar as capacidades de criação de ferramentas úteis, intuitivas e visualmente atraentes.</p>
    </div>
    <div id="externalLinks">
      <a href="https://github.com/andremourasantos/lista-de-compras" rel="external" target="_blank">
        <ph-arrow-square-out :size="29" color="#333333" weight="light" />
        Acessar GitGub
      </a>
      <a href="https://www.linkedin.com/in/andremourasantos/" rel="external" target="_blank">
        <ph-arrow-square-out :size="29" color="#333333" weight="light" />
        Acessar LinkedIn
      </a>
      <a href="https://andremourasantos.com.br/" rel="external" target="_blank">
        <ph-arrow-square-out :size="29" color="#333333" weight="light" />
        Site de André Moura Santos
      </a>
    </div>
    <div id="info">
      <ph-info :size="29" color="#333333" weight="light" />
      <p>Versão de Nov./23</p>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, inject } from 'vue'

export default defineComponent({
  setup () {
    const headerTitle = inject('headerTitle') as Ref<string>;
    const goBackAction = inject('goBackAction') as Ref<'goBackToApp' | 'goBackToMainView'>;

    headerTitle.value = 'Sobre';
    goBackAction.value = 'goBackToMainView';

    return {}
  }
})
</script>

<style scoped>
  #externalLinks {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    height: fit-content;
    width: 100%;
    gap: 8px;
  }

  #externalLinks a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    padding: 8px;
    text-decoration: underline;
    color: var(--font-paragraph-color);
    font-weight: 300;
  }

  #info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 16px;
    background-color: var(--secondary-color);
    padding: 8px 24px;
  }
</style>