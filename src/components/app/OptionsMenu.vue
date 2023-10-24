<template>
  <dialog ref="optionsMenuEl">
    <OptionsMenuItems :option-icon-name="'ph-user-circle'" :option-text="'Conta'" :option-aria-label="'Ir para conta do usuário'" :option-redirect-to="'conta'"/>
    <slot></slot>
    <OptionsMenuItems :option-icon-name="'ph-x'" :option-text="'Sair'" :option-aria-label="'Sair da conta e volta à tela de login'" :option-redirect-to="'login'" @click="singUserOut"/>
  </dialog>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getAuth, signOut } from 'firebase/auth';

//Components
import OptionsMenuItems from './OptionsMenuItem.vue';

export default defineComponent({
  components: {OptionsMenuItems},
  setup () {
    const auth = getAuth();
    const optionsMenuEl = ref<HTMLDialogElement | null>(null);

    onMounted(() => {
      if(!(optionsMenuEl.value instanceof HTMLElement)){return};

      const el = optionsMenuEl.value;
      el.show();
    });

    const singUserOut = ():void => {
      signOut(auth);
    }

    return {
      optionsMenuEl,
      singUserOut
    }
  }
})
</script>

<style scoped>
  dialog {
    position: absolute;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 4px;
    background-color: var(--background);
    width: fit-content;
    top: 64px;
    border: none;
    margin-left: auto;
    border-radius: 12px;
    padding: 8px;
    box-shadow: var(--heavy-shadow);
  }
</style>