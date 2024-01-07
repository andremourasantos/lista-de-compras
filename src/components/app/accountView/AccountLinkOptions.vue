<template>
  <router-link :to="{name: optionGo}">
    <component :is="optionIcon" :size="29" color="#333333" weight="light"/>
    <div>
      <h2>{{ optionName }}</h2>
      <p>{{ optionDescription }}</p>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PhInfo, PhSparkle, PhLink, PhEnvelope, PhDownloadSimple, PhShieldCheck, PhTrashSimple } from "@phosphor-icons/vue";

export default defineComponent({
  components: {PhInfo, PhSparkle, PhLink, PhEnvelope, PhDownloadSimple, PhShieldCheck, PhTrashSimple},
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
  border-radius: 8px;
  transition: 250ms ease-in-out;
}

a:hover {
  background-color: #f5f5f5;
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