<template>
  <div>
    <img :src="require(`@/assets/icons/${img}.png`)" height="96" width="96">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  props: {
    messageStatus: {
      required: true,
      type: String as () => 'Loading' | 'Success' | 'Success & Empty' | 'Error'
    }
  },
  setup(props) {
    const img = ref<string>('retriving');
    const title = ref<string>('Recolhendo lista');
    const message = ref<string>('Aguarde enquanto a sua lista de compras está carregando.');

    watch(()=>props.messageStatus, (newValue) => {
      let imgName:string;
      let titleMsg:string;
      let msg:string;

      switch (newValue) {
        case 'Loading':
          imgName = 'retriving'
          titleMsg = 'Recolhendo lista';
          msg = 'Aguarde enquanto a sua lista de compras está carregando.';
          break;

        case 'Error':
          imgName = 'error';
          titleMsg = 'Ocorreu um erro';
          msg = 'Tente novamente mais tarde.';
          break;

        default:
          imgName = 'welcome';
          titleMsg = 'Lista vazia';
          msg = 'Adicione um item para começar.';
          break;
      }

      img.value = imgName;
      title.value = titleMsg;
      message.value = msg;
    })

    return {
      img,
      title,
      message
    }
  },
})

</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 230px;
  text-align: center;
  opacity: 0.5;
}

img {
  margin-bottom: 16px;
}

h1 {
  font-size: 28px;
}
</style>