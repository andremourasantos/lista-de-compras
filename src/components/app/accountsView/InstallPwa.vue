<template>
  <article>
    <img src="@/assets/ilustrations/pwa.gif" height="256" width="256">
    <div id="content">
      <h2>Sua lista sempre com você</h2>
      <p>Você pode adicionar a sua lista de compras à tela inicial do seu dispositivo facilmente, ganhando acesso instantâneo ao aplicativo, sem precisar digitar a URL ou abrir o navegador.</p>
      <p>Além de facilitar o acesso ao aplicativo, você pode colocá-lo em um local especial para sempre lembrar de conferir a sua lista antes de sair para o mercado!</p>
    </div>
    <Button :button-text="'Adicionar à tela inicial'" :has-icon="'No'" @click="handleInstallation"/>
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
    const handleInstallation = ():void => {
      notificationIcon.value = 'ph-warning-circle';
      notificationText.value = 'Funcionalidade não operacional no momento.';
    }

    return {
      handleInstallation
    }
  }
})
</script>

<style scoped>
  
</style>