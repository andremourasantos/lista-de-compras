<template>
  <h1>Home</h1>
  <button @click="singUserOut">Log out</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getAuth, signOut } from "firebase/auth";
import router from '@/router';

export default defineComponent({
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