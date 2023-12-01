<template>
  <Header :header-type="'Secondary'" :header-title="'Política de Privacidade'" @go-back="goBackAction">
  </Header>
  <main>
    <div>
      <h2>Introdução</h2>
      <p>A sua privacidade é importante. Esta Política de Privacidade descreve como são coletadas, usadas, compartilhadas e protegidas as informações pessoais dos usuários da minha aplicação web. Ao utilizar nossa aplicação, você concorda com a coleta e uso das informações de acordo com esta política.</p>
    </div>

    <div>
      <h2>Informações pessoais coletadas</h2>
      <ul>
        <li>E-mail: Coletamos o endereço de e-mail vinculado à sua conta do Google ou o e-mail fornecido por você no login.</li>
        <li>Foto de perfil: Se você escolher vincular uma foto de perfil à sua conta do Google, teremos acesso a essa informação para exibi-la na aplicação.</li>
        <li>Nome completo: Coletamos seu nome completo para personalizar sua experiência na aplicação.</li>
      </ul>
    </div>

    <div>
      <h2>Método de coleta</h2>
      <ul>
        <li>A coleta das informações pessoais ocorre quando você cria a sua conta ou vincula sua conta do Google à nossa aplicação.</li>
        <li>O uso contínuo do aplicativo também acarreta em coleta de dados como acessos, duração da sessão, tipo de dispositivo utilizado e localização.</li>
      </ul>
    </div>

    <div>
      <h2>Uso das informações</h2>
      <ul>
        <li>Utilizamos as informações coletadas para exibir informações personalizadas para você dentro da aplicação.</li>
        <li>As informações coletadas não são utilizadas para fins de publicidade ou marketing.</li>
        <li>Garantimos que as informações fornecidas por você sejam utilizadas apenas para os propósitos mencionados nesta política.</li>
      </ul>
    </div>

    <div>
      <h2>Compartilhamento das informações</h2>
      <ul>
        <li>Não compartilhamos suas informações pessoais com terceiros.</li>
      </ul>
    </div>

    <div>
      <h2>Medidas de segurança</h2>
      <ul>
        <li>Implementamos medidas de segurança adequadas para proteger as informações pessoais que coletamos.</li>
        <li>Utilizamos a infraestrutura do Firebase, do Google, para armazenar e proteger as informações fornecidas.</li>
        <li>Apenas o criador da aplicação tem acesso às informações coletadas.</li>
      </ul>
    </div>

    <div>
      <h2>Direitos dos usuários</h2>
      <ul>
        <li>Você tem o direito de solicitar a exclusão da sua conta. Para isso, basta acessar a aplicação, acessar as configurações da sua conta, clicar em "Deletar conta" e confirmar a exclusão.</li>
      </ul>
    </div>

    <div>
      <p>Esta Política de Privacidade entra em vigor a partir da data de utilização da nossa aplicação web de teste. Reservamo-nos o direito de atualizar ou modificar esta política a qualquer momento, e qualquer alteração será efetiva após a publicação da versão revisada nesta página.</p>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

//Components
import Header from '@/components/Header.vue';
import router from '@/router';

export default defineComponent({
  components: {Header},
  setup () {
    const goBackAction = () => {
      router.back();
    }

    return {
      goBackAction
    }
  }
})
</script>

<style scoped>
  main {
    height: 100%;
    overflow-y: auto;
    padding: 24px;
  }

  main > div {
    margin: 32px auto;
  }

  main > div:first-of-type {
    margin-top: 0px;
  }

  h2 {
    margin-bottom: 8px;
  }

  ul {
    list-style-position: inside;
    font-weight: 300;
  }
</style>