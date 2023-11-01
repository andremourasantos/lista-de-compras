<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, provide } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";

//Stores
import userInfo from '@/store/user-info';

export default defineComponent({
  setup () {
    const auth = getAuth();
    const userData = ref<userInfo>(userInfo);

    onAuthStateChanged(auth, user => {
      if(!user){return;}

      userData.value.fullName = user.displayName;
      userData.value.email = user.email;
      userData.value.imageURL = user.photoURL;
      userData.value.isAnonymous = user.isAnonymous;
      userData.value.isEmailVerified = user.emailVerified;
      userData.value.uid = user.uid;
    })

    //PWA installation related
    const pwaPrompt = ref<BeforeInstallPromptEvent | null>(null);

    onMounted(() => {
      window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();

        pwaPrompt.value = e as BeforeInstallPromptEvent;
      })
    })

    provide('pwaPrompt', pwaPrompt);

    return {}
  }
})
</script>

<style>
@charset "UTF-8";

:root {
  /*FONTS*/
  --font-header: 'Space Grotesk', sans-serif;
  --font-header-color: #1F1F1F;
  --font-paragraph: 'Poppins', sans-serif;
  --font-paragraph-color: #333333;
  --font-footer-color: #707070;
  --font-loading: 'Flow Circular', sans-serif;
  --font-loading-color: #808080;
  --font-size: 16px;

  /*COLORS*/
  --background: #FFFFFF;
  --primary-color: #6ECCAF;
  --secondary-color: #DDE5EE;
  --accent-color: #ADE792;
  --disabled-color: #D3D3D3;
  --error-color: #FFC0C0;
  --warning-color: #FFEDC0;

  /*EFFECTS*/
  --light-shadow: 0px 0px 10px #1F1F1F10;
  --heavy-shadow: 0px 0px 10px #1F1F1F20;
  --transition-regular: all 250ms ease-out;
  --transition-slow: all 500ms ease-out;
  --transition-quick: all 100ms ease-out;
}

@media screen and (min-width: 425px) {
  :root {
    /*FONTS*/
    --font-size: 14px;
  }
}

* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body {
  position: relative;
  height: 100%;
  height: 100dvh;
  width: 100%;
  max-width: 768px;
  margin: auto;
  padding: 16px;
  font-family: var(--font-paragraph);
  color: var(--font-paragraph-color);
}

#app {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-header);
  color: var(--font-header-color);
}

p, label {
  font-size: var(--font-size);
  font-weight: 300;
  color: var(--font-paragraph-color);
}

button {
  font-family: var(--font-header);
  cursor: pointer;
}

button:disabled {
  background-color: var(--disabled-color);
  cursor: not-allowed;
}
</style>