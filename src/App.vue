<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

//Composables
import { saveUserData } from '@/composables/auth';

export default defineComponent({
  setup () {
  
    onMounted(() => {
      saveUserData();
    })

    return {}
  }
})
</script>

<style>
@charset "UTF-8";

@import url('https://fonts.googleapis.com/css2?family=Flow+Circular&family=Poppins:ital,wght@0,100;0,200;0,300;0,500;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

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