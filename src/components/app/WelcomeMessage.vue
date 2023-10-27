<template>
  <div>
    <transition>
      <div v-if="messageStatus === 'Loading'">
        <img src="@/assets/icons/retriving.png" height="96" width="96">
        <h1>Recolhendo lista</h1>
        <p>Aguarde enquanto coletamos suas informações.</p>
      </div>
    </transition>
    <transition>
      <div v-if="messageStatus === 'Success & Empty'">
        <img src="@/assets/icons/welcome.png" height="96" width="96">
        <h1>Lista vazia</h1>
        <p>Adicione um item para começar.</p>
      </div>
    </transition>
    <transition>
      <div v-if="messageStatus === 'Error'">
        <img src="@/assets/icons/error.png" height="96" width="96">
        <h1>Ocorreu um erro</h1>
        <p>Tente novamente mais tarde.</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    messageStatus: {
      required: true,
      type: String as () => 'Loading' | 'Success' | 'Success & Empty' | 'Error'
    }
  },
  setup() {

    return {
    }
  },
})

</script>

<style scoped>
div {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 250px;
  text-align: center;
  opacity: 0.5;
  background-color: var(--background);
}

img {
  margin-bottom: 16px;
}

h1 {
  font-size: 26px;
}

.v-enter-active,
.v-leave-active {
  transition: all 300ms ease-out;
}

.v-enter-from,
.v-leave-to {
  scale: 0.90;
  translate: 0px -20px;
  opacity: 0;
}
</style>