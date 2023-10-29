<template>
  <div :class="{
    error: notificationIcon === 'ph-seal-warning',
    alert: notificationIcon === 'ph-warning-circle'
  }" @click="emitEvent">
    <component :is="notificationIcon" :size="16" weight="regular"/>
    {{ notificationText }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
    const emitEvent = ():void => {
      emit('headerNotificationClick');
    }

    return {
      emitEvent
    }
  }
})
</script>

<style scoped>
div {
  display: flex;
  font-size: 12px;
  font-weight: 300;
  background-color: var(--accent-color);
  padding: 0px 16px;
  height: 40px;
  align-items: center;
  justify-content: center;
  gap: 4px;
  border-radius: 12px;
  margin-top: 8px;
}

div.error {
  background-color: #FFC0C0;
}

div.alert {
  background-color: #FFEDC0;
}
</style>