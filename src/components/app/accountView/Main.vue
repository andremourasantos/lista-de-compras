<template>
  <section id="userInfo">
    <img v-if="accountImageToShow === 'userProfilePicture'" :src="userProfilePicture !== null ? userProfilePicture : ''" alt="Foto de perfil do usuário." height="128" width="128">
    <ph-user-circle v-if="accountImageToShow === 'userIcon'" :size="128" color="'#333333'" :weight="'light'" />
    <ph-detective v-if="accountImageToShow === 'anonymousIcon'" :size="128" color="#333333" weight="light" />

    <div>
      <h1>{{ nameToShow }}</h1>
      <p>{{ identificationToShow }}</p>
      <p v-if="memberSince !== ''">Membro desde {{ memberSince }}</p>
    </div>
  </section>

  <section id="accountOptions">
    <AccountLinkOptions :option-icon="'ph-info'" :option-name="'Sobre'" :option-description="'Sobre o aplicativo.'" :option-go="'AccViewAbout'"/>

    <AccountLinkOptions v-if="false" :option-icon="'ph-sparkle'" :option-name="'Novidades'" :option-description="'Veja as últimas atualizações.'" :option-go="'AccViewAbout'"/>

    <AccountLinkOptions v-if="showLinkAccountOption" :option-icon="'ph-link'" :option-name="'Vincular conta'" :option-description="'Crie uma conta permanente.'" :option-go="'AccViewAbout'"/>

    <AccountLinkOptions v-if="showVerifyEmailOption" :option-icon="'ph-envelope'" :option-name="'Verificar email'" :option-description="'Confirme sua conta.'" :option-go="'AccViewVerifyEmail'"/>

    <AccountLinkOptions v-if="showPwaOption" :option-icon="'ph-download-simple'" :option-name="'Adicionar à tela inicial'" :option-description="'Tenha acesso instantâneo.'" :option-go="'AccViewPwa'"/>

    <AccountLinkOptions :option-icon="'ph-shield-check'" :option-name="'Política de privacidade'" :option-description="'Revise a política de privacidade do aplicativo.'" :option-go="'pp'"/>

    <AccountLinkOptions :option-icon="'ph-trash-simple'" :option-name="'Deletar conta'" :option-description="'Solicite a eliminação da sua conta.'" :option-go="'AccViewDelete'"/>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, inject, onBeforeUnmount, onMounted } from 'vue';

//Compsables
import { getUserObject } from '@/composables/auth';

//Composables
import { isUserAnonymous, isUserEmailVerified } from '@/composables/auth';

//Components
import AccountLinkOptions from './AccountLinkOptions.vue';

//Stores
import userInfo from '@/store/user-info';

export default defineComponent({
  components: {AccountLinkOptions},
  setup () {
    //Related to AccountView.vue
    const headerTitle = inject('headerTitle') as Ref<string>;
    const goBackAction = inject('goBackAction') as Ref<'goBackToApp' | 'goBackToMainView'>;

    headerTitle.value = 'Conta';
    goBackAction.value = 'goBackToApp';

    //Notification related
    const notificationIcon = inject('notificationIcon') as Ref<notificationHeaderIcon>;
    const notificationText = inject('notificationText') as Ref<string>;

    //Notification check chain
    onMounted(() => {
      if(isUserAnonymous() === true){
        notificationIcon.value = 'ph-warning-circle';
        notificationText.value = 'Você está utilizando uma conta anônima.';
      } else if(isUserEmailVerified() === false){
        notificationIcon.value = 'ph-warning-circle';
        notificationText.value = 'Verifique sua conta, confira a sua caixa de entrada!';
      }
    })

    //Related to #userInfo
    const userData = ref<userInfo>(userInfo);
    const accountImageToShow = ref<'userProfilePicture' | 'userIcon' | 'anonymousIcon'>('userIcon');
    const userProfilePicture = userData.value.imageURL;
    const nameToShow = ref<string>('');
    const identificationToShow = ref<string>('');
    const memberSince = ref<string>('');

    onMounted(async () => {
      if(userData.value.isAnonymous){
        accountImageToShow.value = 'anonymousIcon';
        nameToShow.value = 'Usuário anônimo';
        identificationToShow.value = userData.value.uid as NonNullable<null>;
        
      } else if (userData.value.imageURL !== null){
        
        accountImageToShow.value = 'userProfilePicture';
        nameToShow.value = userData.value.fullName as NonNullable<null>;
        identificationToShow.value = userData.value.email as NonNullable<null>;
      } else {
        nameToShow.value = userData.value.fullName as NonNullable<null>;
        identificationToShow.value = userData.value.email as NonNullable<null>;
      }
        const userAccCreation = await getUserObject().then((res) => {return res})

        const date = new Intl.DateTimeFormat('pt-BR').format(new Date(userAccCreation?.metadata.creationTime as NonNullable<undefined>));
        memberSince.value = date;
    })

    //Related to #accountOptions
    const showPwaOption = ref<boolean>(false);
    const showVerifyEmailOption = ref<boolean>(false);
    const showLinkAccountOption = ref<boolean>(false);

    if(!(window.matchMedia('(display-mode: standalone)').matches)){
      showPwaOption.value = true;
    };

    if(!userData.value.isAnonymous && userData.value.isEmailVerified === false){
      showVerifyEmailOption.value = true;
    };

    if(userData.value.isAnonymous === true){
      showLinkAccountOption.value = true;
    };

    return {
      accountImageToShow,
      userProfilePicture,
      nameToShow,
      identificationToShow,
      memberSince,
      showPwaOption,
      showVerifyEmailOption,
      showLinkAccountOption
    }
  }
})
</script>

<style scoped>
#userInfo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 32px;
  text-align: center;
}

#userInfo img {
  border-radius: 32px;
  box-shadow: var(--light-shadow);
}

#userInfo h1 {
  font-size: 20px;
}

#userInfo > div > p {
  font-size: 14px;
  color: var(--font-footer-color);
}

#accountOptions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 16px;
  overflow-y: scroll;
}
</style>