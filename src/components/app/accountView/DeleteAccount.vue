<template>
  <article>
    <img src="@/assets/ilustrations/deletar-conta.gif" height="256" width="256">
    <div id="content">
      <h2>Exclusão de conta</h2>
      <p>No momento, o aplicativo não suporta a exclusão automática da conta a pedido do usuário.</p>
      <p>Contudo, você pode enviar uma solicitação para exclusão manual da sua conta e das informações da lista de compras associada a ela. Seu pedido será atendido e executado assim que possível. Você receberá um e-mail informando o resultado.</p>
      <p>A exclusão da conta tem efeito irreversível.</p>
    </div>
    <Button :button-text="'Solicitar exclusão da conta'" :has-icon="'No'" @click="handleDeleteButton"/>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, inject } from 'vue';

//Components
import Button from '@/components/Button.vue';

export default defineComponent({
  components: {Button},
  setup () {
    const headerTitle = inject('headerTitle') as Ref<string>;
    const goBackAction = inject('goBackAction') as Ref<'goBackToApp' | 'goBackToMainView'>;

    headerTitle.value = 'Deletar conta';
    goBackAction.value = 'goBackToMainView';

    const handleDeleteButton = ():void => {
      window.open('mailto:contato@andremourasantos.com.br?subject=Solicita%C3%A7%C3%A3o%20de%20exclus%C3%A3o%20de%20conta&body=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20a%20exclus%C3%A3o%20da%20minha%20conta%20andrezinho81111@gmail.com%20do%20aplicativo%20lista-de-compras.andremourasantos.com.br.%20Obrigado.', '_blank')
    }

    return {
      handleDeleteButton
    }
  }
})
</script>

<style scoped>
  button {
    background-color: var(--error-color);
    color: var(--font-paragraph-color);
  }
</style>