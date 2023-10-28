<template>
  <router-link :to="{name: optionGo}">
    <component :is="optionIcon" :size="29" color="#333333" weight="thin"/>
    <div>
      <h2>{{ optionName }}</h2>
      <p>{{ optionDescription }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    optionGo: {
      required: true,
      type: String
    },
    optionIcon: {
      required: true,
      type: String
    },
    optionName: {
      required: true,
      type: String
    },
    optionDescription: {
      required: true,
      type: String
    }
  },
  setup () {
    

    return {}
  }
})
</script>

<style scoped>
a {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: fit-content;
  width: 100%;
  gap: 8px;
  text-decoration: none;
  padding: 8px;
}

h2 {
  font-size: 16px;
  font-family: var(--font-paragraph);
  font-weight: 400;
  color: var(--font-paragraph-color);
}

p {
  margin-top: -2px;
  font-size: 12px;
}
</style>