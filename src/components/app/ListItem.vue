<template>
  <div>
    <p>{{ itemObject.name }}</p>
    <section class="tags">
      <p>{{ itemObject.tags.quantity }} {{ itemObject.tags.quantityMetric }}</p>
      <p>R$ {{itemObject.tags.price}}</p>
    </section>
    <Button :button-text="''" :button-type="'Accent'" :has-icon="'Yes-Right'" :icon-name="'ph-check-circle'" :icon-size="24" :icon-color="'#333333'"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from '@/components/Button.vue';

export default defineComponent({
  components: {Button},
  props: {
    itemObject: {
      required: true,
      type: Object as () => itemInfoClient
    }
  },
  setup (props) {

    return {}
  }
})
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 8px;
  width: 160px;
  height: fit-content;
  padding: 16px;
  box-shadow: var(--light-shadow);
  border-radius: 32px;
  cursor: pointer;
}

div > p:first-of-type {
  font-family: var(--font-header);
  font-weight: 600;
  font-size: 20px;
}

section.tags {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
  gap: 8px;
  align-items: center;
  justify-content: flex-start;
}

button {
  height: 40px !important;
}
</style>