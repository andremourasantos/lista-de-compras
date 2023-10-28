<template>
  <div :class="{
    loading: appStatus === 'Loading'
  }">
    <section>
      <ph-hand-coins :size="20" color="#707070" weight="light" />
      <span>Total: R$ {{ totalCost }}</span>
    </section>
    <section>
      <ph-circles-four :size="20" color="#707070" weight="light" />
      <span>{{ totalItems }} {{ styledItemsString }} na lista</span>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, Ref, watch } from 'vue';

//Stores
import userInfo from '@/store/user-info';

export default defineComponent({
  setup () {
    const userData = ref<userInfo>(userInfo);
    const totalCost = ref<string>('0');
    const totalItems = ref<number>(0);
    const styledItemsString = ref<'item' | 'itens'>('itens');
    const appStatus = inject('appStatus') as Ref<'Loading' | 'Success' | 'Success & Empty' | 'Error' | undefined>;
    
    watch(userData.value, (newValue) => {
      if(newValue.userList === null){return}
      totalItems.value = newValue.userList.length;

      newValue.userList.length === 1 ? styledItemsString.value = 'item' : styledItemsString.value = 'itens';
      const priceList = newValue.userList.map(obj => {return obj.tags.price}).reduce((acc, price) => acc + price, 0);
      const styledNumber = new Intl.NumberFormat('pt-BR', {minimumFractionDigits: 2}).format(priceList)
      totalCost.value = styledNumber;
    })

    return {
      totalCost,
      totalItems,
      styledItemsString,
      appStatus
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

div.loading {
  font-family: var(--font-loading);
  color: var(--font-loading-color);
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