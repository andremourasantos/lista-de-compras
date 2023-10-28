<template>
  <section id="userInfo">
    <img v-if="accountImageToShow === 'userProfilePicture'" :src="userProfilePicture !== null ? userProfilePicture : ''" alt="Foto de perfil do usuário." height="128" width="128">
    <ph-user-circle v-if="accountImageToShow === 'userIcon'" :size="128" color="'#333333'" :weight="'light'" />
    <ph-detective v-if="accountImageToShow === 'anonymousIcon'" :size="128" color="#333333" weight="light" />

    <div>
      <h1>{{ nameToShow }}</h1>
      <p>{{ identificationToShow }}</p>
      <p>Membro desde {{ memberSince }}</p>
    </div>
  </section>

  <section id="accountOptions">
    <AccountLinkOptions :option-icon="'ph-info'" :option-name="'Sobre'" :option-description="'Sobre o aplicativo.'" :option-go="'AccViewAbout'"/>

    <AccountLinkOptions :option-icon="'ph-sparkle'" :option-name="'Novidades'" :option-description="'Veja as últimas atualizações.'" :option-go="'AccViewAbout'"/>

    <AccountLinkOptions :option-icon="'ph-link'" :option-name="'Vincular conta'" :option-description="'Crie uma conta permanente.'" :option-go="'AccViewAbout'"/>

    <AccountLinkOptions :option-icon="'ph-envelope'" :option-name="'Verificar email'" :option-description="'Confirme sua conta.'" :option-go="'AccViewAbout'"/>

    <AccountLinkOptions :option-icon="'ph-download-simple'" :option-name="'Adicionar à tela inicial'" :option-description="'Tenha acesso instantâneo.'" :option-go="'AccViewPwa'"/>

    <AccountLinkOptions :option-icon="'ph-shield-check'" :option-name="'Política de privacidade'" :option-description="'Revise a política de privacidade do aplicativo.'" :option-go="'pp'"/>

    <AccountLinkOptions :option-icon="'ph-trash-simple'" :option-name="'Deletar conta'" :option-description="'Solicite a eliminação da sua conta.'" :option-go="'AccViewDelete'"/>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, inject } from 'vue';

//Components
import AccountLinkOptions from './AccountLinkOptions.vue';

//Stores
import userInfo from '@/store/user-info';

export default defineComponent({
  components: {AccountLinkOptions},
  setup () {
    const headerTitle = inject('headerTitle') as Ref<string>;
    const goBackAction = inject('goBackAction') as Ref<'goBackToApp' | 'goBackToMainView'>;

    headerTitle.value = 'Conta';
    goBackAction.value = 'goBackToApp';

    const userData = ref<userInfo>(userInfo);
    const accountImageToShow = ref<'userProfilePicture' | 'userIcon' | 'anonymousIcon'>('userIcon');
    const userProfilePicture = userData.value.imageURL;
    const nameToShow = ref<string>('');
    const identificationToShow = ref<string>('');
    const memberSince = ref<string>('01/01/2024');

    if(userData.value.isAnonymous){
      accountImageToShow.value = 'anonymousIcon';
      nameToShow.value = 'Usuário anônimo';
      identificationToShow.value = userData.value.uid as NonNullable<null>;
      
    } else if (userData.value.imageURL !== null){
      
      accountImageToShow.value = 'userProfilePicture';
      nameToShow.value = userData.value.fullName as NonNullable<null>;
      identificationToShow.value = userData.value.email as NonNullable<null>;
    } else {
      nameToShow.value = 'Nome não informado';
      identificationToShow.value = userData.value.email as NonNullable<null>;
    }

    return {
      accountImageToShow,
      userProfilePicture,
      nameToShow,
      identificationToShow,
      memberSince
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
  gap: 8px;
  margin-top: 16px;
  overflow-y: scroll;
}
</style>