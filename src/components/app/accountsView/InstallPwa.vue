<template>
  <div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, inject } from 'vue'

export default defineComponent({
  setup () {
    const headerTitle = inject('headerTitle') as Ref<string>;
    const goBackAction = inject('goBackAction') as Ref<'goBackToApp' | 'goBackToMainView'>;

    headerTitle.value = 'Adiconar à tela inicial';
    goBackAction.value = 'goBackToMainView';

    return {}
  }
})
</script>

<style scoped>

</style>