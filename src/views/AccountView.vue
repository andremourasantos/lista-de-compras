<template>
  <Header :header-type="'Secondary'" :header-title="headerTitle" @go-back="handleGoBackAction">
    <template #notification>
      <HeaderNotification v-if="false" :notification-icon="'ph-warning-circle'" :notification-text="'Verifique sua conta, cheque seu email!'" />
    </template>
  </Header>
  <main id="content">
    <router-view></router-view>
  </main>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';
import router from '@/router';

//Components
import Header from '@/components/Header.vue';
import HeaderNotification from '@/components/HeaderNotification.vue';

export default defineComponent({
  components: {Header, HeaderNotification},
  setup () {
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

    return {
      headerTitle,
      handleGoBackAction
    }
  }
})
</script>

<style scoped>
  #content {
    height: 100%;
    overflow-y: scroll;
  }
</style>