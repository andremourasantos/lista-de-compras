<template>
  <div ref="container" :class="{
    error: notificationIcon === 'ph-seal-warning',
    alert: notificationIcon === 'ph-warning-circle'
  }" @click="emitEvent">
    <component :is="notificationIcon" :size="16" weight="regular"/>
    <p :class="{
      animated: animateText
    }" ref="textContent">{{ notificationText }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';

export default defineComponent({
  props: {
    notificationIcon: {
      required: true,
      type: String as () => notificationHeaderIcon
    },
    notificationText: {
      required: true,
      type: String
    }
  },
  emits: ['headerNotificationClick'],
  setup (props, {emit}) {
    const container = ref<HTMLDivElement | null>(null);
    const textContent = ref<HTMLParagraphElement | null>(null);
    const animateText = ref<boolean>(false);

    const emitEvent = ():void => {
      emit('headerNotificationClick');
    }

    return {
      container,
      textContent,
      animateText,
      emitEvent
    }
  }
})
</script>

<style scoped>
div {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: 16px auto;
  background-color: var(--accent-color);
  padding: 0px 16px;
  height: 40px;
  gap: 4px;
  border-radius: 12px;
  margin-top: 8px;
}

div p {
  font-size: 12px;
  font-weight: 300;
  white-space: nowrap;
  overflow-x: scroll;
}

div.error {
  background-color: #FFC0C0;
}

div.alert {
  background-color: #FFEDC0;
}
</style>