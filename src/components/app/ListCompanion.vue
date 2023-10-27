<template>
  <div>
    <section>
      <ph-hand-coins :size="20" color="#707070" weight="light" />
      <span>Total: R$ {{ styledTotalCost }}</span>
    </section>
    <section>
      <ph-circles-four :size="20" color="#707070" weight="light" />
      <span>{{ totalItems }} {{ styledItemsString }} na lista</span>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';

//Stores
import userInfo from '@/store/user-info';

export default defineComponent({
  setup () {
    const userData = ref<userInfo>(userInfo);
    const totalCost = ref<number>(0.00);
    const totalItems = ref<number>(0);
    const styledTotalCost:string = Intl.NumberFormat().format(totalCost.value);
    const styledItemsString:string = totalItems.value === 1 ? 'item' : 'itens';

    return {
      styledTotalCost,
      totalItems,
      styledItemsString
    }
  }
})
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0px 16px;
  gap: 16px;
  border-radius: 12px;
  margin-top: 8px;
  background-color: var(--secondary-color);
  font-size: 12px;
  font-weight: 300;
}

section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  height: fit-content;
  width: fit-content;
}
</style>