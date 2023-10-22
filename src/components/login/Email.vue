<template>
  <Header :header-type="'Secondary'" :header-title="'Login com email'" @go-back="changeView = 'Main'"/>
  <div>
    <h1>Email</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, inject } from 'vue';

//Components
import Header from '@/components/Header.vue';

export default defineComponent({
  components: {Header},
  setup () {
    const changeView:Ref<string> | undefined = inject('componentToGo');

    return {
      changeView
    }
  }
})
</script>

<style scoped>

</style>