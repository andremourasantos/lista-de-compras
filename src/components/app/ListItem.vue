<template>
  <div class="item" :class="{
    editItem: elementStatus === 'Edit'
  }" @click="editItem($event, 'oi')">
    <p class="itemName">{{ itemObject.name }}</p>
    <section class="tags">
      <div>
        <p>{{ itemObject.tags.quantity }} {{ itemObject.tags.quantityMetric }}</p>
        <p>{{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL', minimumFractionDigits:2}).format(itemObject.tags.price)}}</p>
      </div>
    </section>
    <Button aria-label="Remover item" :disabled="buttonStatus === 'Loading'" :button-text="''" :button-type="'Accent'" :has-icon="'Yes-Right'" :icon-name="'ph-check-circle'" :icon-size="24" :icon-color="'#333333'" @click="deleteItem($event, itemObject.id)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, inject, Ref, watch } from 'vue';
import Button from '@/components/Button.vue';

//Composables
import { deleteDocFromList } from '@/composables/data-base';

export default defineComponent({
  components: {Button},
  props: {
    itemObject: {
      required: true,
      type: Object as () => itemInfoClient
    }
  },
  emits: ['editItem'],
  setup (props, ctx) {
    const elementStatus = ref<'Standby' | 'Edit'>('Standby');
    const buttonStatus = ref<'Standby' | 'Loading'>('Standby');
    const modalStatus = inject('modalStatus') as Ref<boolean | undefined>;

    const deleteItem = (event:Event, itemId:string):void => {
      event.stopPropagation();
      buttonStatus.value = 'Loading';

      deleteDocFromList(itemId)
        .catch(() => {
          buttonStatus.value = 'Standby';
        });
    }

    const editItem = (event:Event, newItemInfo:string):void => {
      event.stopPropagation();

      if(elementStatus.value === 'Edit'){elementStatus.value = 'Standby'; return;}
      elementStatus.value = 'Edit';
      
      ctx.emit('editItem');
    }

    watch(modalStatus, (newValue) => {
      if(newValue === false){
        elementStatus.value = 'Standby';
      }
    })

    return {
      deleteItem,
      editItem, 
      elementStatus,
      buttonStatus
    }
  }
})
</script>

<style scoped>
div.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
  gap: 8px;
  width: 150px;
  height: fit-content;
  padding: 16px;
  box-shadow: var(--light-shadow);
  border-radius: 32px;
  cursor: pointer;
  border: 0px solid white;
  overflow: hidden;
}

div.editItem {
  border: 2px solid var(--accent-color);
}

p.itemName {
  font-family: var(--font-header);
  font-weight: 600;
  font-size: 20px;
}

section.tags {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  height: fit-content;
  width: 100%;
  overflow-x: auto;
  gap: 8px;
  white-space: nowrap;
}

section.tags > div {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  gap: 8px;
  overflow-x: auto;
}

button {
  height: 40px !important;
}
</style>