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
    <WelcomeMessage id="welcomeMessage" v-if="appStatus !== 'Success'" :message-status="appStatus"/>
    <div id="list" v-show="false">

    </div>
    <AddItemModal ref="addItemModalEl" v-if="showItemModal" @dialog-closed="showItemModal = false"/>
    <Button id="addItem" :disabled="appStatus !== 'Success' && appStatus !== 'Success & Empty'" :button-text="'Adicionar item'" :has-icon="'Yes-Right'" :icon-name="'ph-shopping-cart'" :icon-weight="'Light'" :icon-size="20" @click="showItemModal = true"/>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

//Composables
import { isUserEmailVerified, isUserAnonymous } from '@/composables/auth';
import { getUserGroceriesList } from '@/composables/data-base';

//Components
import Header from '@/components/Header.vue';
import OptionsMenu from '@/components/app/OptionsMenu.vue';
import OptionsMenuItem from '@/components/app/OptionsMenuItem.vue';
import ListCompanion from '@/components/ListCompanion.vue';
import HeaderNotification from '@/components/HeaderNotification.vue';
import Button from '@/components/Button.vue';
import WelcomeMessage from '@/components/app/WelcomeMessage.vue';
import AddItemModal from '@/components/app/AddItemModal.vue';

export default defineComponent({
  components: {Header, OptionsMenu, OptionsMenuItem, ListCompanion, HeaderNotification, WelcomeMessage, Button, AddItemModal},
  setup () {
    const showOptionsMenu = ref<boolean>(false);
    const appStatus = ref<'Loading' | 'Success' | 'Success & Empty' | 'Error'>('Loading');
    const showPWAInstallButton = ref<boolean>(false);
    const showNotification = ref<boolean>(false);
    const showItemModal = ref<boolean>(false);

    onMounted(() => {
      console.log('Recolhendo informações...');
      getUserGroceriesList()
        .then(() => {
          appStatus.value = 'Success & Empty';
          console.log('Sucesso!')
        })
        .catch((error) => {
          appStatus.value = 'Error';
          return console.error('Ocorreu um erro.', error)
      })

      if(!(window.matchMedia('(display-mode: standalone)').matches)){
        showPWAInstallButton.value = true;
      };
    })

    return {
      showOptionsMenu,
      appStatus,
      showPWAInstallButton,
      showNotification,
      showItemModal
    }
  }
})
</script>

<style scoped>
main:has(#welcomeMessage) {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

#addItem {
  position: absolute;
  bottom: 0px;
  right: 0px;
}
</style>