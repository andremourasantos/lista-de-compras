<template>
  <div :class="{
    error: notificationIcon === 'PhSealWarning',
    alert: notificationIcon === 'PhWarningCircle'
  }" @click="emitEvent">
    <component :is="notificationIcon" :size="16" weight="regular"/>
    <p>{{ notificationText }}</p>
</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { PhSealWarning, PhWarningCircle, PhBellRinging } from "@phosphor-icons/vue";

export default defineComponent({
  components: {PhSealWarning, PhWarningCircle, PhBellRinging},
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

.error {
  background-color: #FFC0C0;
}

.alert {
  background-color: #FFEDC0;
}
</style>