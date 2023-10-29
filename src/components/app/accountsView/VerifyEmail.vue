<template>
  <article>
    <img src="@/assets/ilustrations/verificar-email.gif" height="256" width="256">
    <div id="content">
      <h2>Verificação de email</h2>
      <p>Para contas criadas com email e senha é necessário confirmar o endereço de email fornecido.</p>
      <p>Após criar a sua conta, um email foi automaticamente enviado para a sua caixa de entrada — mas verifique também o spam — confira-o e siga as intruções fornecidas para confirmar a sua conta.</p>
      <p>Caso não tenha conseguido encontrar o email, você podesolicitar um novo envio pelo botão abaixo.</p>
    </div>
    <Button :button-text="'Reenviar email de autenticação'" :has-icon="'No'" @click="handleButtonClick"/>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, inject } from 'vue';

//Components
import Button from '@/components/Button.vue';

export default defineComponent({
  components: {Button},
  setup () {
    //AccountView parent related
    const headerTitle = inject('headerTitle') as Ref<string>;
    const goBackAction = inject('goBackAction') as Ref<'goBackToApp' | 'goBackToMainView'>;

    headerTitle.value = 'Verificar email';
    goBackAction.value = 'goBackToMainView';

    //Notification related
    const notificationIcon = inject('notificationIcon') as Ref<notificationHeaderIcon>;
    const notificationText = inject('notificationText') as Ref<string>;


    const handleButtonClick = ():void => {
      notificationIcon.value = 'ph-warning-circle';
      notificationText.value = 'Funcionalidade não operacional no momento.';

      //Wipe notification
      setTimeout(() => {
        notificationText.value = '';
      }, 5000);
    }

    return {
      handleButtonClick
    }
  }
})
</script>

<style scoped>

</style>