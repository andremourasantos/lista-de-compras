<template>
  <button>
    <component :is="iconTitle" weight="regular" size="24"/>
    {{ buttonTitle }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {PhGoogleLogo, PhEnvelope, PhDetective} from "@phosphor-icons/vue";

export default defineComponent({
  components: {PhGoogleLogo, PhEnvelope, PhDetective},
  props: {
    buttonTitle: {
      required: true,
      type: String
    },
    iconTitle: {
      required: true,
      type: String
    }
    },
    setup() {
        return {};
    }
})
</script>

<style scoped>
button {
  font-size: 16px;
  background-color: var(--primary-color);
  color: white;
  padding: 8px 16px;
  width: 250px;
  border: none;
  font-weight: 500;
  border-radius: 100px;
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
  transition: 250ms ease-in-out;
}

button:active {
  transform: scale(0.95);
}

button.secondary_login {
  background-color: var(--secondary-color);
  color: var(--font-paragraph-color);
}
</style>