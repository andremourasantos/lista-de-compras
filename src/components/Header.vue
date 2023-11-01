<template>
  <div>
    <header>
      <div v-if="headerType === 'Main'" class=primary>
        <img src="@/assets/logo.png" height="30" width="30" alt="Ícone de sacola com frutas e legumes.">
        <button :class="{
          active: showActiveStatus
        }" id="userButton" aria-label="Abrir menu de opções" title="Abrir menu de opções" @click="emitToggleOptionsMenu">
          <img v-if="showProfilePic === true" :src="userProfilePic" height="40" width="40" alt="Foto de perfil do usuário.">
          <ph-user-circle-gear v-if="showProfilePic === false" :size="40" color="#333333" weight="light" />
        </button>
      </div>
      <div v-if="headerType === 'Secondary'" class="secondary">
        <button aria-label="Retroceder" @click="emitGoBack">
          <ph-arrow-circle-left :size="20" color="'#333333'" :weight="'light'" />
          Voltar
        </button>
        <p>{{ headerTitle }}</p>
      </div>
    </header>
    <transition name="notification">
      <slot name="notification">
      </slot>
    </transition>
    <slot name="listCompanion"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

//Stores
import userInfo from '@/store/user-info';

export default defineComponent({
  props: {
    headerType: {
      required: true,
      type: String as () => 'Main' | 'Secondary'
    },
    headerTitle: {
      required: false,
      type: String
    },
    fallbackComponent: {
      required: false,
      type: String
    }
  },
  emits: ['goBack', 'toggleOptionsMenu'],
  setup (props, {emit}) {
    const userData = ref<userInfo>(userInfo);
    const showProfilePic = ref<boolean>(false);
    const userProfilePic = ref<string>('');
    const showActiveStatus = ref<boolean>(false);

    if(userData.value.imageURL !== null){
      showProfilePic.value = true;
      userProfilePic.value = userData.value.imageURL;
    }

    const emitGoBack = ():void => {
      emit('goBack');
    }

    const emitToggleOptionsMenu = ():void => {
      showActiveStatus.value = !showActiveStatus.value;
      emit('toggleOptionsMenu');
    }

    return {
      showProfilePic,
      userProfilePic,
      emitGoBack,
      emitToggleOptionsMenu,
      showActiveStatus
    }
  }
})
</script>

<style scoped>
header {
  height: 56px;
  box-shadow: var(--heavy-shadow);
  border-radius: 16px;
  padding: 8px 16px;
}

header > div.primary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}

#userButton {
  height: 40px;
  width: 40px;
  border: none;
  background: transparent;
  border-radius: 16px;
  transition: var(--transition-regular);
}

#userButton.active {
  background-color: var(--accent-color);
}

#userButton img {
  border: 0px solid var(--accent-color);
  border-radius: 16px;
  transition: var(--transition-regular);
}

#userButton.active img {
  border: 4px solid var(--accent-color);
}

header > div.secondary {
  display: grid;
  grid-template-columns: 70px auto;
  align-items: center;
  justify-content: start;
  height: 100%;
  column-gap: 16px;
}

div.secondary button {
  height: 32px;
  width: 80px;
  font-size: 12px;
  background-color: var(--secondary-color);
  font-family: var(--font-header);
  cursor: pointer;
  border: none;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  padding: 4px 8px;
  align-items: center;
  gap: 4px;
  box-shadow: var(--light-shadow);
}

div.secondary p {
  font-family: var(--font-header);
  font-weight: bold;
}

.notification-enter-active, .notification-leave-active {
  transition: var(--transition-regular);
}

.notification-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.notification-leave-from {
  opacity: 1;
  transform: translateY(0px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>