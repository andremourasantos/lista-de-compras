<template>
  <article>
    <img src="@/assets/ilustrations/deletar-conta.gif" height="256" width="256">
    <div id="content">
      <h2>Exclusão de conta</h2>
      <p>A exclusão da conta tem efeito imediato e irreversível, prossiga com cautela.</p>
      <p>Ao excluir a sua conta, todas as suas informações fornecidas para login e outras relacionadas ao seu usuário serão removidas do aplicativo, o que também resultará em você ser redirecionada para a tela de login.</p>
      <p>Para prosseguir com a exclusão da sua conta, é necessário que você remova todos os itens da sua lista de compras e tenha feito login recentemente.</p>
    </div>
    <Button :disabled="disableButtons" :button-text="'Fazer login novamente'" :has-icon="'No'" @click="handleReauthentication"/>
    <Button :disabled="disableButtons" id="deleteAccount" :button-text="'Solicitar exclusão da conta'" :has-icon="'No'" @click="handleDeleteButton"/>
  </article>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, inject } from 'vue';

//Composables
import { getUserObject, deleteUserAccount } from '@/composables/auth';
import { deleteUserCollection } from '@/composables/data-base';

//Components
import Button from '@/components/Button.vue';
import router from '@/router';

export default defineComponent({
  components: {Button},
  setup () {
    //Related to AccountView.vue
    const headerTitle = inject('headerTitle') as Ref<string>;
    const goBackAction = inject('goBackAction') as Ref<'goBackToApp' | 'goBackToMainView'>;

    headerTitle.value = 'Deletar conta';
    goBackAction.value = 'goBackToMainView';

    //Notification related
    const notificationIcon = inject('notificationIcon') as Ref<notificationHeaderIcon>;
    const notificationText = inject('notificationText') as Ref<string>;

    //Deleting account related
    const handleReauthentication = ():void => {
      router.push({name: 'login', query: {redirecionar: 'AccViewDelete'}})
    }

    const disableButtons = ref<boolean>(false);

    const handleDeleteButton = ():void => {
      disableButtons.value = true;

      getUserObject()
        .then(async (res) => {
          if(res === null){
            notificationIcon.value = 'ph-seal-warning';
            notificationText.value = 'Ocorreu um erro. Tente fazer login novamente.';

            return;
          }

          await deleteUserCollection(res.uid)
            .then(() => {
              deleteUserAccount()
              .then(() => {
                notificationIcon.value = 'ph-bell-ringing';
                notificationText.value = 'Foi uma boa caminhada, até a próxima!';

                setTimeout(() => {
                  router.push({name: 'login'});
                }, 5000);
              })
              .catch((error) => {
                console.error(error);
                disableButtons.value = false;

                notificationIcon.value = 'ph-seal-warning';
                notificationText.value = 'Ocorreu um erro. Tente fazer login novamente.';
              })
            })
            .catch((error) => {
              if(error = 'delete-user-list'){
                notificationIcon.value = 'ph-seal-warning';
                notificationText.value = 'Primeiro, remova todos os itens da sua lista de compras.';
              }
            })
        })
    }

    return {
      disableButtons,
      handleReauthentication,
      handleDeleteButton
    }
  }
})
</script>

<style scoped>
  #deleteAccount {
    background-color: var(--error-color);
    color: var(--font-paragraph-color);
  }
</style>