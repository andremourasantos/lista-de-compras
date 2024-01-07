<template>
  <article>
    <img src="@/assets/ilustrations/verificar-email.gif" height="256" width="256">
    <div id="content">
      <h2>Verificação de email</h2>
      <p>Para contas criadas com email e senha é necessário confirmar o endereço de email fornecido.</p>
      <p>Após criar a sua conta, um email foi automaticamente enviado para a sua caixa de entrada (verifique também o spam), confira-o e siga as instruções fornecidas para confirmar a sua conta.</p>
      <p>Caso não tenha conseguido encontrar o email, você pode solicitar um novo envio pelo botão abaixo.</p>
    </div>
    <Button :disabled="buttonDisabled" :button-text="'Reenviar email de autenticação'" :has-icon="'No'" @click="handleButtonClick"/>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, inject } from 'vue';

//Composables
import { sendEmailToVerifyAccount } from '@/composables/auth';

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

    //Handle button
    const buttonDisabled = ref<boolean>(false);

    const handleButtonClick = ():void => {
      sendEmailToVerifyAccount()
        .then((res) => {
          let icon:notificationHeaderIcon = 'PhBellRinging';
          let msg:string = '';

          if(res === 'sended-successfully'){
            msg = 'Um novo email foi enviado com sucesso!';
          } else if (res === 'already-verified'){
            msg = 'Você já tem seu email verificado!';
          } else if (res === 'wait-timeout'){
            icon = 'PhWarningCircle';
            msg = 'Aguarde, parece que um email já foi enviado recentemente.';
          }

          notificationIcon.value = icon;
          notificationText.value = msg;
          buttonDisabled.value = true;
        })
        .catch((error) => {
          console.error(error);
          
          notificationIcon.value = 'PhSealWarning';
          notificationText.value = 'Ocorreu um erro ao enviar um novo email.';

          buttonDisabled.value = true;
        })
    }

    return {
      handleButtonClick,
      buttonDisabled
    }
  }
})
</script>

<style scoped>

</style>