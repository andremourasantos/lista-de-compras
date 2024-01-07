<template>
  <Header :header-type="'Main'" @toggle-options-menu="showOptionsMenu = !showOptionsMenu">
    <template #notification>
      <HeaderNotification v-if="showNotification" :notification-icon="notificationIcon" :notification-text="notificationText" />
    </template>
    <template #listCompanion>
      <ListCompanion />
    </template>
  </Header>
  <transition name="optionsMenu">
    <OptionsMenu v-if="showOptionsMenu">
      <OptionsMenuItem v-if="showPWAInstallButton" :option-icon-name="'PhDownloadSimple'" :option-text="'Adicionar à tela inicial'" :option-aria-label="'Adicionar lista de compras à tela incial do dispositivo'" :option-redirect-to="'AccViewPwa'"/>
    </OptionsMenu>
  </transition>
  <main>
    <transition name="faded-appear">
      <WelcomeMessage id="welcomeMessage" v-if="appStatus !== 'Success'" :message-status="appStatus"/>
    </transition>
    
    <transition-group tag="ul" name="listItems" id="list" v-show="appStatus === 'Success'">
        <ListItem v-for="item in userData.userList" :key="item.id" :item-object="item" @edit-item="editItemAction(item.id)"/>
    </transition-group>

    <transition name="faded-appear">
      <AddItemModal ref="addItemModalEl" v-if="showItemModal" :modal-action="modalAction" @dialog-closed="dialogClosed"/>
    </transition>

    <Button id="addItem" :disabled="appStatus !== 'Success' && appStatus !== 'Success & Empty'" :button-text="'Adicionar item'" :has-icon="'Yes-Right'" :icon-name="'PhShoppingCart'" :icon-weight="'Light'" :icon-size="20" @click="addItemAction"/>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, watch, provide, inject } from 'vue';
import { PhShoppingCart } from "@phosphor-icons/vue";

//Composables
import { isUserEmailVerified, isUserAnonymous } from '@/composables/auth';
import { getUserGroceriesList } from '@/composables/data-base';

//Components
import Header from '@/components/Header.vue';
import OptionsMenu from '@/components/app/OptionsMenu.vue';
import OptionsMenuItem from '@/components/app/OptionsMenuItem.vue';
import ListCompanion from '@/components/app/ListCompanion.vue';
import HeaderNotification from '@/components/HeaderNotification.vue';
import Button from '@/components/Button.vue';
import WelcomeMessage from '@/components/app/WelcomeMessage.vue';
import AddItemModal from '@/components/app/AddItemModal.vue';
import ListItem from '@/components/app/ListItem.vue';

//Stores
import userInfo from '@/store/user-info';

export default defineComponent({
  components: {Header, OptionsMenu, OptionsMenuItem, ListCompanion, HeaderNotification, WelcomeMessage, Button, AddItemModal, ListItem, PhShoppingCart},
  setup () {
    const showOptionsMenu = ref<boolean>(false);
    const appStatus = ref<'Loading' | 'Success' | 'Success & Empty' | 'Error'>('Loading');
    const showPWAInstallButton = ref<boolean>(false);
    const showItemModal = ref<boolean>(false);
    const modalAction = ref<'AddItem' | 'EditItem'>('AddItem');
    const itemIdForEditAction = ref<string>('');
    const userData = ref<userInfo>(userInfo);

    //Notification related
    const showNotification = ref<boolean>(false);
    const notificationIcon = ref<notificationHeaderIcon>('PhBellRinging');
    const notificationText = ref<string>('');

    onMounted(() => {
      console.log('Recolhendo informações...');
      getUserGroceriesList()
        .then(() => {
          if(userData.value.userList === null || userData.value.userList.length === 0){
            appStatus.value = 'Success & Empty';
          } else {
            appStatus.value = 'Success';
          }

          console.log('Sucesso!');
        })
        .catch((error) => {
          appStatus.value = 'Error';
          return console.error('Ocorreu um erro.', error)
      })

      //PWA installation reletaed
      if(!(window.matchMedia('(display-mode: standalone)').matches)){
        showPWAInstallButton.value = true;
      };

      //Notification check chain
      if(isUserAnonymous() === true){
        showNotification.value = true;
        notificationIcon.value = 'PhWarningCircle';
        notificationText.value = 'Você está utilizando uma conta anônima.';

      } else if(isUserEmailVerified() === false){
        showNotification.value = true;
        notificationIcon.value = 'PhWarningCircle';
        notificationText.value = 'Verifique sua conta, confira a sua caixa de entrada!';
      }
    })

    watch(userData.value, (newValue) => {
      if(newValue.userList === null){return}
      else if (newValue.userList.length > 0){
        appStatus.value = 'Success';
      }
      else {
        //Wait for the animation of the last ListItem.
        setTimeout(() => {
          appStatus.value = 'Success & Empty';
        }, 500);
      };
    })

    const addItemAction = ():void => {
      modalAction.value = 'AddItem';
      showItemModal.value = true;
    }

    const editItemAction = (itemId:string):void => {
      modalAction.value = 'EditItem';
      showItemModal.value = true;

      itemIdForEditAction.value = itemId;
    }

    const dialogClosed = ():void => {
      showItemModal.value = false;
    }

    provide('itemId', itemIdForEditAction);
    provide('modalStatus', showItemModal);
    provide('appStatus', appStatus);

    return {
      showOptionsMenu,
      appStatus,
      showPWAInstallButton,
      showNotification,
      notificationIcon,
      notificationText,
      showItemModal,
      modalAction,
      userData,
      addItemAction,
      editItemAction,
      dialogClosed
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

main {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}

main #list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  row-gap: 32px;
  overflow-y: scroll;
  padding: 24px 0px 72px 0px;
  list-style: none;
}

  @media screen and (min-width: 425px) {
    main #list {
      justify-content: center;
      gap: 32px;
    }
  }

#addItem {
  position: absolute;
  bottom: 0px;
  right: 0px;
}

.optionsMenu-enter-active, .optionsMenu-leave-active {
  transition: var(--transition-regular);
}

.optionsMenu-enter-from, .optionsMenu-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.listItems-move, .listItems-enter-active, .listItems-leave-active {
  transition: var(--transition-slow);
}

.listItems-enter-from, .listItems-leave-to {
  opacity: 0;
  transform: scale(0.90);
}

.listItems-leave-active {
  position: absolute;
}

.faded-appear-enter-active, .faded-appear-leave-active {
  transition: var(--transition-regular);
}

.faded-appear-enter-from, .faded-appear-leave-to {
  opacity: 0;
  transform: scale(0.90);
}
</style>