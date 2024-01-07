<template>
  <Header :header-type="'Secondary'" :header-title="headerTitle" @go-back="handleGoBackAction">
    <template #notification>
      <HeaderNotification v-if="showNotification" :notification-icon="notificationIcon" :notification-text="notificationText" />
    </template>
  </Header>
  <main id="content">
    <router-view v-slot="{Component}">
      <transition name="page-slide">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, provide, watch } from 'vue';
import router from '@/router';

//Components
import Header from '@/components/Header.vue';
import HeaderNotification from '@/components/HeaderNotification.vue';
import { onBeforeRouteUpdate } from 'vue-router';

export default defineComponent({
  components: {Header, HeaderNotification},
  setup () {
    //AccountView related
    const headerTitle = ref<string>('Conta');
    const goBackAction = ref<'goBackToApp' | 'goBackToMainView'>('goBackToApp');
    provide('goBackAction', goBackAction);
    provide('headerTitle', headerTitle);

    const handleGoBackAction = ():void => {
      if(goBackAction.value === 'goBackToApp'){
        router.push('/');
      } else {
        router.push({name: 'AccViewMain'});
      }
    }

    //Notification related
    const showNotification = ref<boolean>(false);
    const notificationIcon = ref<notificationHeaderIcon>('PhBellRinging');
    const notificationText = ref<string>('');

    const wipeNotification = (pageHeader:string, timeDelay:string):void => {
      setTimeout(() => {
        if(headerTitle.value === 'Verificar email'){
          notificationText.value = '';
        } else {return}
      }, 5000);
    }

    provide('notificationIcon', notificationIcon);
    provide('notificationText', notificationText);
    provide('notificationWipeFunction', wipeNotification);

    watch(notificationText, (newValue) => {
      if(newValue !== ''){
        showNotification.value = true;
      } else {
        showNotification.value = false;
      }
    })

    onBeforeRouteUpdate(() => {
      notificationText.value = '';
    })

    return {
      headerTitle,
      handleGoBackAction,
      showNotification,
      notificationIcon,
      notificationText
    }
  }
})
</script>

<style scoped>
  #content {
    height: 100%;
    overflow-y: scroll;
  }

  main :deep(article:has(div#content)) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    height: fit-content;
    max-width: 500px;
    margin-inline: auto;
    gap: 32px;
    margin-top: 16px;
    padding: 0px 32px 32px 32px;
  }

  main :deep(article > div#content:has(h2, p)) {
    text-align: center;
  }

  main :deep(article > div#content > h2) {
    text-align: center;
    margin-bottom: 4px;
  }

  main :deep(article > div#content > p) {
    margin-bottom: 8px;
    text-align: justify;
  }

  main :deep(article > div#content > p:last-of-type) {
    margin-bottom: 0px;
  }

  main :deep(article > button) {
    width: 100%;
  }

  @media screen and (max-width: 425px) {
    .page-slide-enter-active, .page-slide-leave-active {
      position: absolute;
      transition: var(--transition-regular);
    }

    .page-slide-enter-from {
      opacity: 0;
      transform: translateX(100px);
    }

    .page-slide-leave-to {
      opacity: 0;
    }
  }
</style>