<template>
  <Header :header-type="'Secondary'" :header-title="'Conta anônima'" @go-back="changeView = 'Main'"/>
  <main>
    <h1>Login anônimo</h1>
  </main>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, inject } from 'vue';
import { getAuth, signInAnonymously } from "firebase/auth";
import router from '@/router';

//components
import Header from '@/components/Header.vue';

export default defineComponent({
  components: {Header},
  setup () {
    const auth = getAuth();

    const anonymousLogin = ():void => {
      signInAnonymously(auth)
        .then(() => {
          router.push({name:'home'})
        })
        .catch((error) => {
          console.error(error);
        })
    };

    const changeView:Ref<string> | undefined = inject('componentToGo');

    return {
      changeView
    }
  }
})
</script>

<style scoped>

</style>