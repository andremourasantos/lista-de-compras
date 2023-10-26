<template>
  <button :class="{
    iconOnLeft: hasIcon === 'Yes-Left',
    secondary: buttonType === 'Secondary'
  }">
    {{ buttonText }}
    <component :is="iconName" :size="iconSize" />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    buttonText: {
      required: true,
      type: String
    },
    buttonType: {
      required: false,
      type: String as () => 'Primary' | 'Secondary'
    },
    hasIcon: {
      required: true,
      type: String as () => 'Yes-Right' | 'Yes-Left' | 'No'
    },
    iconName: {
      required: false,
      type: String
    },
    iconSize: {
      required: false,
      type: Number
    },
    iconWeight: {
      required: false,
      type: String as () => 'Thin' | 'Light' | 'Regular' | 'Bold' | 'Fill'
    },
    iconColor: {
      required: false,
      type: String
    }
  },
  setup (props) {
    

    return {}
  }
})
</script>

<style scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--primary-color);
  height: 50px;
  width: fit-content;
  border: none;
  border-radius: 16px;
  padding: 8px 16px;
  gap: 8px;
  font-family: var(--font-header);
  font-weight: 500;
  font-size: 16px;
  color: white;
  cursor: pointer;
}

button.secondary {
  background-color: var(--secondary-color) !important;
  border-radius: 8px !important;
  color: var(--font-paragraph-color) !important;
}

button:disabled {
  background-color: var(--disabled-color);
  cursor: not-allowed;
}

button.iconOnLeft {
  flex-direction: row-reverse;
}
</style>