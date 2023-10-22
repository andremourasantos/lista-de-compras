<template>
  <main>
    <div>
      <img src="@/assets/logo.png" height="128" width="128" alt="Ícone de sacola com frutas e legumes.">
      <h1>Entre na sua conta</h1>
      <p>Selecione uma das opções de entrada abaixo para continuar.</p>
    </div>
    <div>
      <LoginButton :button-title="'Continuar com Google'" :icon-title="'ph-google-logo'"/>
      <LoginButton :button-title="'Continuar com e-mail'" :icon-title="'ph-envelope'" @click="changeView = 'Email'"/>
      <div>
        <p>ou teste sem fazer login:</p>
        <LoginButton class="secondary_login" :button-title="'Continuar anônimo'" :icon-title="'ph-detective'" @click="changeView = 'Anonymous'"/>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, Ref, inject } from 'vue';

//components
import LoginButton from '@/components/login/LoginButton.vue';

export default defineComponent({
  components: {LoginButton},
  setup () {
    const changeView:Ref<string> | undefined = inject('componentToGo');

    return {
      changeView
    }
  }
})
</script>

<style scoped>
main {
  height: 100%;
  width: 100%;
  display: grid;
  align-content: center;
  justify-items: center;
  row-gap: 32px;
}

main div:nth-of-type(1) {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

main div:nth-of-type(1) img {
  margin-bottom: 16px;
}

main div:nth-of-type(2) {
  display: grid;
  row-gap: 16px;
}

main div:nth-of-type(2) > div {
  display: grid;
  row-gap: 4px;
}

main div:nth-of-type(2) > div p {
  font-size: 14px;
}
</style>