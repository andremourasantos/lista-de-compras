<template>
    <button :aria-label="optionAriaLabel" :title="optionAriaLabel" @click="goToPage">
      {{ optionText }}
      <component :is="optionIconName" :size="29" color="#333333" weight="light"/>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';
import { PhUserCircle, PhSignOut, PhDownloadSimple } from "@phosphor-icons/vue";

export default defineComponent({
  components: {PhUserCircle, PhSignOut, PhDownloadSimple},
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
        router.push({name: props.optionRedirectTo});
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
    padding: 8px;
    background: transparent;
    border: none;
    border-radius: 8px;
    font-size: 18px;
  }

  button:hover, button:active {
    background-color: var(--accent-color);
  }
</style>