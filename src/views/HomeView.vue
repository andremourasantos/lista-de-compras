<template>
  <Header :header-type="'Main'" @toggle-options-menu="showOptionsMenu = !showOptionsMenu">
    <template #notification>
      <HeaderNotification v-if="showNotification" :notification-icon="'ph-warning-circle'" :notification-text="'Verifique sua conta, cheque seu email!'" />
    </template>
    <template #listCompanion>
      <ListCompanion />
    </template>
  </Header>
  <OptionsMenu v-if="showOptionsMenu">
    <OptionsMenuItem v-if="showPWAInstallButton" :option-icon-name="'ph-download-simple'" :option-text="'Adicionar à tela inicial'" :option-aria-label="'Adicionar lista de compras à tela incial do dispositivo'" :option-redirect-to="'/conta/pwa'" />
  </OptionsMenu>
  <main>
    <div id="welcomeMessage" v-show="true">
      <img src="@/assets/logo.png" height="96" width="96" alt="Ícone de sacola com frutas e legumes.">
      <h1>Lista vazia</h1>
      <p>Adicione um item para começar.</p>
    </div>
    <div id="list" v-show="false">

    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

//Composables
import { isUserEmailVerified, isUserAnonymous } from '@/composables/auth';

//Components
import Header from '@/components/Header.vue';
import OptionsMenu from '@/components/app/OptionsMenu.vue';
import OptionsMenuItem from '@/components/app/OptionsMenuItem.vue';
import ListCompanion from '@/components/ListCompanion.vue';
import HeaderNotification from '@/components/HeaderNotification.vue';
import Button from '@/components/Button.vue';

export default defineComponent({
  components: {Header, OptionsMenu, OptionsMenuItem, ListCompanion, HeaderNotification, Button},
  setup () {
    const showOptionsMenu = ref<boolean>(false);
    const showPWAInstallButton = ref<boolean>(false);
    const showNotification = ref<boolean>(false);
    const showVerifyEmailWarning = ref<boolean | null>(isUserEmailVerified());
    const showAnonymousUserWarning = ref<boolean>(isUserAnonymous());

    onMounted(() => {
      if(!(window.matchMedia('(display-mode: standalone)').matches)){
        showPWAInstallButton.value = true;
      };
    })

    return {
      showOptionsMenu,
      showPWAInstallButton,
      showNotification
    }
  }
})
</script>

<style scoped>
main:has(#welcomeMessage) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#welcomeMessage {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 200px;
  text-align: center;
  opacity: 0.5;
}

#welcomeMessage img {
  margin-bottom: 16px;
}

#welcomeMessage h1 {
  font-size: 28px;
}
</style>