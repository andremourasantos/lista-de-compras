<template>
  <header>
    <div v-if="headerType === 'Main'">
      
    </div>
    <div v-if="headerType === 'Secondary'" class="secondary">
      <button aria-label="Retroceder" @click="emitGoBack">
        <ph-arrow-circle-left :size="24" />
        Voltar
      </button>
      <p>{{ headerTitle }}</p>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue';
import router from '@/router';

export default defineComponent({
  props: {
    headerType: {
      required: true,
      type: String as () => 'Main' | 'Secondary'
    },
    headerTitle: {
      required: false,
      type: String
    },
    fallbackComponent: {
      required: false,
      type: String
    }
  },
  emits: ['goBack'],
  setup (props, {emit}) {
    const emitGoBack = ():void => {
      emit('goBack');
    }
    return {
      emitGoBack
    }
  }
})
</script>

<style scoped>
header {
  height: 60px;
  box-shadow: var(--heavy-shadow);
  border-radius: 24px;
  padding: 8px 16px;
}

header > div.secondary {
  display: grid;
  grid-template-columns: 70px auto;
  align-items: center;
  justify-content: start;
  height: 100%;
  column-gap: 16px;
}

div.secondary button {
  height: fit-content;
  font-size: 12px;
  background-color: var(--secondary-color);
  font-family: var(--font-header);
  cursor: pointer;
  border: none;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  align-items: center;
  gap: 4px;
  box-shadow: var(--light-shadow);
}

div.secondary p {
  font-family: var(--font-header);
  font-weight: bold;
}
</style>