<template>
  <Header :header-type="'Main'">

  </Header>
  <button @click="singUserOut">Log out</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAuth, signOut } from "firebase/auth";
import router from '@/router';

//Components
import Header from '@/components/Header.vue';

export default defineComponent({
  components: {Header},
  setup () {
    const auth = getAuth();

    const singUserOut = () => {
      signOut(auth)
        .then(() => {router.replace({name: 'login'})})
        .catch((error) => alert(error))
    }

    return {
      singUserOut
    }
  }
})
</script>

<style scoped>

</style>