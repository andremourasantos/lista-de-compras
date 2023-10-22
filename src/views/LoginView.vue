<template>
  <component :is="currentView"/>
  <footer>
    <p>Ao usar este aplicativo, você concorda com a <router-link to="pp">política de privacidade</router-link>.</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, provide } from 'vue';

//Components
import Main from '@/components/login/Main.vue';
import Anonymous from '@/components/login/Anonymous.vue';
import Email from '@/components/login/Email.vue';

export default defineComponent({
  components: {Main, Anonymous, Email},
  setup () {
    const currentView:Ref<string> = ref<string>('Main');

    provide('componentToGo', currentView);

    return {
      currentView,
    }
  }
})
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 24px;
  text-align: center;
  height: fit-content;
  width: calc(100% - 32px);
}

footer p {
  font-size: 14px;
}
</style>