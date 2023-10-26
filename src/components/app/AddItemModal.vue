<template>
  <dialog ref="modalEl">
    <div>
      <h1>Adicionar item</h1>
      <p>O que você vai adicionar?</p>
    </div>
    <form @submit.prevent="addItem">
      <div id="etiquetas">
        <input required type="text" inputmode="text" placeholder="Escreva o nome do item..." v-model="itemName">
        <div>
          <label for="quantidade">Quantidade:</label>
          <div class="multiInputs">
            <input required id="quantidade" inputmode="numeric" min="1" max="99" placeholder="6" v-model="itemQuantity">
            <select required aria-label="Selecionar unidade" v-model="itemQuantityMetric">
              <option value="un" title="Unidade">Un.</option>
              <option value="kg" title="Quilograma">Kg</option>
              <option value="g" title="Grama">g</option>
              <option value="l" title="Litro">L</option>
              <option value="ml" title="Mililitro">ml</option>
              <option value="oz" title="Onça">Oz</option>
            </select>
          </div>
        </div>
        <div>
          <label for="preco" style="width: 150px;">Preço (R$):</label>
          <input id="preco" required placeholder="12,90" inputmode="numeric" min="0.00" max="999.99" step="1" v-model="itemPrice">
        </div>
      </div>
      <div>
        <Button type="button" aria-label="Fechar popup" :button-text="'Voltar'" :has-icon="'No'" :button-type="'Secondary'" @click="closeDialog"/>
        <Button aria-label="Adicionar item à lista" :disabled="enableButton" id="adicionarItem" :button-text="'Adicionar'" :has-icon="'No'"/>
      </div>
    </form>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue';

//Components
import Button from '@/components/Button.vue';

export default defineComponent({
  components: {Button},
  emits: ['dialogClosed'],
  setup (props, {emit}) {
    const modalEl = ref<HTMLDialogElement | null>(null);
    const itemName = ref<string | null>(null);
    const itemQuantity = ref<number | null>(null);
    const itemQuantityMetric = ref<'un' | 'kg' | 'g' | 'l' | 'ml' | 'oz' | null>(null);
    const itemPrice = ref<number | null>(null);

    const enableButton = computed(():boolean => {
      if(itemName.value !== null && itemQuantity.value !== null && itemQuantityMetric.value !== null && itemPrice.value !== null){
        return false;
      } else{
        return true;
      }
    })

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
      alert('ok')
    }

    onMounted(() => {
      if(!(modalEl.value instanceof HTMLDialogElement)){return}

      const el = modalEl.value;

      el.showModal();
      observeOpenAttribute()
    })

    return {
      modalEl,
      itemName,
      itemQuantity,
      itemQuantityMetric,
      itemPrice,
      enableButton,
      closeDialog,
      addItem
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


#adicionarItem {
  width: 100%;
}
</style>