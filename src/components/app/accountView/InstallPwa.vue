<template>
  <article>
    <img src="@/assets/ilustrations/pwa.gif" height="256" width="256">
    <div id="content">
      <h2>Sua lista sempre com você</h2>
      <p>Você pode adicionar a sua lista de compras à tela inicial do seu dispositivo facilmente, ganhando acesso instantâneo ao aplicativo, sem precisar digitar a URL ou abrir o navegador.</p>
      <p>Além de facilitar o acesso ao aplicativo, você pode colocá-lo em um local especial para sempre lembrar de conferir a sua lista antes de sair para o mercado!</p>
    </div>
    <Button :disabled="disableButton" :button-text="'Adicionar à tela inicial'" :has-icon="'No'" @click="handleInstallation"/>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, inject, onMounted } from 'vue';

//Components
import Button from '@/components/Button.vue';

export default defineComponent({
  components: {Button},
  setup () {
    //AccountView parent related
    const headerTitle = inject('headerTitle') as Ref<string>;
    const goBackAction = inject('goBackAction') as Ref<'goBackToApp' | 'goBackToMainView'>;

    headerTitle.value = 'Adiconar à tela inicial';
    goBackAction.value = 'goBackToMainView';

    //Notification related
    const notificationIcon = inject('notificationIcon') as Ref<notificationHeaderIcon>;
    const notificationText = inject('notificationText') as Ref<string>;

    //PWA installation related
    const disableButton = ref<boolean>(false);
    const pwaPrompt = inject('pwaPrompt') as Ref<BeforeInstallPromptEvent>;

    const handleInstallation = async ():Promise<void> => {
      try {
        disableButton.value = true;

        pwaPrompt.value.prompt();

        const { outcome } = await pwaPrompt.value.userChoice;

        if(outcome === 'accepted'){
          notificationIcon.value = 'ph-bell-ringing';
          notificationText.value = 'Sucesso, agora sua lista estará sempre com você!';
        } else {
          disableButton.value = false;
          notificationIcon.value = 'ph-warning-circle';
          notificationText.value = 'Você recusou a instalação, mas pode tentar novamente.';
        }
      } catch (error) {
        console.error(error);
        disableButton.value = true;

        notificationIcon.value = 'ph-seal-warning';
        notificationText.value = 'Ocorreu um erro inesperado.';
      }
    }

    return {
      handleInstallation,
      disableButton
    }
  }
})
</script>

<style scoped>
  
</style>