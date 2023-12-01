<template>
  <dialog ref="modalEl">
    <div v-if="modalAction === 'AddItem'">
      <h1>Adicionar item</h1>
      <p>O que você vai adicionar?</p>
    </div>
    <div v-if="modalAction === 'EditItem'">
      <h1>Editar item</h1>
      <p>O que você vai alterar?</p>
    </div>
    <form @submit.prevent="modalAction === 'AddItem' ? addItem() : editItem()">
      <div id="etiquetas">
        <input required type="text" inputmode="text" placeholder="Escreva o nome do item..." v-model="itemName">
        <div>
          <label for="quantidade">Quantidade:</label>
          <div class="multiInputs">
            <input required id="quantidade" inputmode="numeric" type="number" min="1" max="9999" step="1" placeholder="Ex.: 6" v-model="itemQuantity">
            <select required aria-label="Selecionar unidade" v-model="itemQuantityMetric">
              <option value="Un." title="Unidade">Un.</option>
              <option value="Kg" title="Quilograma">Kg</option>
              <option value="g" title="Grama">g</option>
              <option value="L" title="Litro">L</option>
              <option value="ml" title="Mililitro">ml</option>
              <option value="Oz." title="Onça">Oz.</option>
            </select>
          </div>
        </div>
        <div>
          <label for="preco" style="width: 150px;">Preço (R$):</label>
          <input id="preco" required placeholder="Ex.: 12,90" inputmode="numeric" type="number" min="0.00" max="999.99" step="0.01" v-model="itemPrice">
        </div>
      </div>
      <div>
        <Button type="button" aria-label="Fechar popup" :disabled="addButtonState !== 'Standby'" :button-text="'Voltar'" :has-icon="'No'" :button-type="'Secondary'" @click="closeDialog"/>

        <Button v-if="modalAction !== 'EditItem'" aria-label="Adicionar item à lista" :disabled="addButtonState !== 'Standby'" id="adicionarItem" :button-text="addButtonState !== 'Loading' ? 'Adicionar' : 'Adicionando...'" :has-icon="'No'"/>

        <Button v-if="modalAction === 'EditItem'" aria-label="Editar item da lista" :disabled="addButtonState !== 'Standby'" id="editarItem" :button-text="addButtonState !== 'Loading' ? 'Editar' : 'Salvando...'" :has-icon="'No'"/>

      </div>
    </form>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, onMounted, onBeforeUnmount, inject } from 'vue';

//Composables
import { addDocToList, editDocFromList } from '@/composables/data-base';

//Components
import Button from '@/components/Button.vue';

//Store
import userInfo from '@/store/user-info';

export default defineComponent({
  components: {Button},
  props: {
    modalAction: {
      required: true,
      type: String as () => 'AddItem' | 'EditItem'
    }
  },
  emits: ['dialogClosed'],
  setup (props, {emit}) {
    const modalEl = ref<HTMLDialogElement | null>(null);
    const itemName = ref<string | null>(null);
    const itemQuantity = ref<number | null>(null);
    const itemQuantityMetric = ref<quantityMetrics | null>(null);
    const itemPrice = ref<number | null>(null);

    const addButtonState = ref<'Standby' | 'Loading' | 'Disabled'>('Standby');
    const itemIdForEditAction = inject('itemId') as Ref<string | undefined>;
    const userData = ref<userInfo>(userInfo);

    const observeOpenAttribute = ():void => {
      if(!(modalEl.value instanceof HTMLDialogElement)){return}

      const el = modalEl.value;
      const observer = new MutationObserver((mutationList) => {
        for (const mutation of mutationList) {
          if(mutation.type === 'attributes' && mutation.attributeName === 'open'){
            if(!el.hasAttribute('open')){
              emit('dialogClosed');
            }
          }
        }
      });

      observer.observe(el, {attributes: true});

      onBeforeUnmount(() => {
        observer.disconnect();
      })
    }

    const closeDialog = ():void => {
      if(!(modalEl.value instanceof HTMLDialogElement)){return}

      const el = modalEl.value;
      el.close();
    }

    const addItem = ():void => {
      if(itemName.value === null || itemQuantity.value === null || itemQuantityMetric.value === null || itemPrice.value === null ){return alert('Ocorreu um erro.')}
      addButtonState.value = 'Loading';

      const itemInfo:itemInfo = {
        name: itemName.value.trim(),
        tags: {
          quantity: itemQuantity.value,
          quantityMetric: itemQuantityMetric.value,
          price: itemPrice.value
        }
      }

      addDocToList(itemInfo)
        .then(() => {closeDialog();})
        .catch((error) => {alert(error); closeDialog();})
    }

    const editItem = ():void => {
      if(itemName.value === null || itemQuantity.value === null || itemQuantityMetric.value === null || itemPrice.value === null || itemIdForEditAction.value === undefined){return alert('Ocorreu um erro.')}
      addButtonState.value = 'Loading';

      const changesObj:updateDocOnCloud = {
        name: itemName.value,
        tags: {
          quantity: itemQuantity.value,
          quantityMetric: itemQuantityMetric.value,
          price: itemPrice.value
        }
      }

      editDocFromList(itemIdForEditAction.value, changesObj)
        .then(() => {closeDialog();})
        .catch((error) => {alert(error); closeDialog();})
    }

    onMounted(() => {
      if(!(modalEl.value instanceof HTMLDialogElement)){return}

      const el = modalEl.value;
      if(props.modalAction === 'EditItem' && userData.value.userList !== null){
        const itemObj = userData.value.userList.filter(obj => {return obj.id === itemIdForEditAction.value});

        itemName.value = itemObj[0].name;
        itemQuantity.value = itemObj[0].tags.quantity;
        itemQuantityMetric.value = itemObj[0].tags.quantityMetric;
        itemPrice.value = itemObj[0].tags.price;
      }

      el.showModal();
      observeOpenAttribute();
    })

    return {
      modalEl,
      itemName,
      itemQuantity,
      itemQuantityMetric,
      itemPrice,
      addButtonState,
      closeDialog,
      addItem,
      editItem
    }
  }
})
</script>

<style scoped>
dialog {
  margin: auto;
  height: fit-content;
  width: 100%;
  max-width: 300px;
  padding: 32px;
  border: none;
  border-radius: 24px;
  box-shadow: var(--heavy-shadow);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

div:first-of-type {
  text-align: center;
}

h1 {
  font-size: 24px;
}

form input, form select {
  height: 42px;
  width: 100%;
  border: solid 2px var(--accent-color);
  border-radius: 8px;
  padding: 0px 8px;
  background-color: var(--background);
}

div#etiquetas {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 16px;
}

div#etiquetas div:has(label) {
  display: flex;
  align-items: center;
  gap: 8px;
}

.multiInputs {
  display: flex;
  gap: 8px;
}

form > div:last-of-type {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}


#adicionarItem, #editarItem {
  width: 100%;
}
</style>