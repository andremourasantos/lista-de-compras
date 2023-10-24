<template>
    <button :aria-label="optionAriaLabel" :title="optionAriaLabel" @click="goToPage">
      {{ optionText }}
      <component :is="optionIconName" :size="24" color="#333333" weight="light"/>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
  props: {
    optionIconName: {
      required: true,
      type: String
    },
    optionText: {
      required: true,
      type: String
    },
    optionAriaLabel: {
      required: true,
      type: String
    },
    optionRedirectTo: {
      required: true,
      type: String
    }
  },
  setup (props) {
    const goToPage = ():void => {
      setTimeout(() => {
        router.push(props.optionRedirectTo);
      }, 250);
    }

    return {
      goToPage
    }
  }
})
</script>

<style scoped>
  a {text-decoration: none;}

  button {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    padding: 4px 8px;
    background: transparent;
    border: none;
    border-radius: 8px;
    font-size: 16px;
  }

  button:hover, button:active {
    background-color: var(--accent-color);
  }
</style>