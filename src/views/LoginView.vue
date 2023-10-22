<template>
  <main v-if="showView === 'Main'" class="mainView">
    <div>
      <img src="@/assets/logo.png" height="128" width="128" alt="Ícone de sacola com frutas e legumes.">
      <h1>Entre na sua conta</h1>
      <p>Selecione uma das opções de entrada abaixo para continuar.</p>
    </div>
    <div>
      <LoginButton :button-title="'Continuar com Google'" :icon-title="'ph-google-logo'" @click="showView = 'ThirdyParties'"/>
      <LoginButton :button-title="'Continuar com e-mail'" :icon-title="'ph-envelope'" @click="showView = 'EmailLogin'"/>
      <div>
        <p>ou teste sem fazer login:</p>
        <LoginButton class="secondary_login" :button-title="'Continuar anônimo'" :icon-title="'ph-detective'" @click="showView = 'Anonymous'"/>
      </div>
    </div>
  </main>

  <Header v-if="showView !== 'Main'" :header-type="'Secondary'" :header-title="headerTitle" @go-back="showView = 'Main'"/>
  <main v-if="showView === 'ThirdyParties'" class="loginView">
    <img src="@/assets/icons/conta-conectada.png" height="96" width="96" alt="Ilustração de presente.">
    <h1>Conecte a sua conta!</h1>
    <p>Você pode conectar a sua conta do Google para criar uma conta do tipo permanente. Contas permanentes tem acesso a mais funções, como a sincronização entre dispositivos!</p>
    <Button :button-text="'Concetar conta'" :has-icon="'No'" @click=""/>
  </main>

  <main v-if="showView === 'EmailLogin'" class="loginView">
    <img src="@/assets/icons/email.png" height="96" width="96" alt="Ilustração de presente.">
    <h1>Faça login</h1>
    <p>Insira as informações da sua conta para entrar na aplicação.</p>
    <form class="emailCredentials" @submit.prevent>
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="email@exemplo.com" v-model="userEmail">
      </div>
      <div>
        <label for="password">Senha</label>
        <input id="password" type="password" placeholder="********" v-model="userPassword">
      </div>
      <div>
        <Button :button-text="'Criar conta'" :button-type="'Secondary'" :has-icon="'No'" @click="showView = 'EmailSingIn'"/>
        <Button :disabled="!userEmail || !userPassword" type="submit" :button-text="'Continuar'" :has-icon="'Yes-Right'" :icon-name="'ph-arrow-circle-right'" :icon-size="24" :icon-weight="'Regular'" @click="loginIntoAccount"/>
      </div>
    </form>
  </main>

  <main v-if="showView === 'EmailSingIn'" class="loginView">
    <img src="@/assets/icons/criar-conta.png" height="96" width="96" alt="Ilustração de presente.">
    <h1>Crie sua conta!</h1>
    <p>Insira um e-mail e senha para criar uma conta do tipo permanente. Contas permanentes tem acesso a mais funções, como a sincronização entre dispositivos!</p>
    <p>Você terá que confirmar o e-mail em sua caixa de entrada.</p>
    <form class="emailCredentials" @submit.prevent="createAccount">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="email@exemplo.com" v-model="userEmail">
      </div>
      <div>
        <label for="password">Senha</label>
        <input id="password" type="password" placeholder="********" v-model="userPassword">
      </div>
      <div>
        <Button :disabled="!userEmail || !userPassword" type="submit" :button-text="'Criar conta'" :has-icon="'No'"/>
      </div>
    </form>
  </main>
  
  <main v-if="showView === 'Anonymous'" class="loginView">
    <img src="@/assets/icons/presente.png" height="96" width="96" alt="Ilustração de presente.">
    <h1>Vamos começar!</h1>
    <p>Com uma conta anônima, você pode testar a aplicação por um tempo limitado antes de decidir compartilhar suas informações pessoais para criar uma conta permanente.</p>
    <p>Você pode não ter acesso a determinados recursos que requerem uma conta permanente, como a sincronização entre dispositivos, porém nos esforçaremos para tornar a sua experiência fluída.</p>
    <Button :button-text="'Continuar'" :has-icon="'No'" @click="anonymousLogin"/>
  </main>
  
  <footer v-if="showView === 'Main'">
    <p>Ao usar este aplicativo, você concorda com a <router-link to="pp">política de privacidade</router-link>.</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { getAuth, signInAnonymously, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import router from '@/router';

//components
import LoginButton from '@/components/login/LoginButton.vue';
import Button from '@/components/Button.vue';
import Header from '@/components/Header.vue';

export default defineComponent({
  components: {LoginButton, Button, Header},
  setup () {
    const showView = ref<'Main' | 'ThirdyParties'  | 'EmailLogin' | 'EmailSingIn' | 'Anonymous'>('Main');
    const headerTitle = ref<string>('');

    watch(showView, (newValue) => {
      switch (newValue) {
        case 'ThirdyParties':
          headerTitle.value = 'Conectar conta';
          break;
      
        case 'EmailLogin':
          headerTitle.value = 'Login por email';
          break;

        case 'EmailSingIn':
          headerTitle.value = 'Crie sua conta';
          break;

        case 'Anonymous':
          headerTitle.value = 'Conta anônima';
          break;

        default:
          headerTitle.value = '';
          break;
      }
    });

    //Login methods
    const auth = getAuth();
    const userEmail = ref<string>('');
    const userPassword = ref<string>('');

    const googleLogin = ():void => {

    };

    const createAccount = ():void => {
      createUserWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then(() => {
          alert('usuário criado!')
          router.push({name:'home'})
        })
        .catch((error) => alert(error))
    };

    const loginIntoAccount = ():void => {
      signInWithEmailAndPassword(auth, userEmail.value, userPassword.value)
        .then(() => {
          alert('usuário logado!')
          router.push({name:'home'})
        })
        .catch((error) => alert(error))
    }

    const anonymousLogin = ():void => {
      signInAnonymously(auth)
        .then(() => {
          router.push({name:'home'})
        })
        .catch((error) => {
          console.error(error);
        })
    };

    return {
      showView,
      headerTitle,
      userEmail,
      userPassword,
      createAccount,
      loginIntoAccount,
      anonymousLogin
    }
  }
})
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
}
</style>

<style scoped>
main.mainView {
  height: calc(100% - 50px);
  width: 100%;
  display: grid;
  align-content: center;
  justify-items: center;
  row-gap: 32px;
}

main.mainView div:nth-of-type(1) {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

main.mainView div:nth-of-type(1) img {
  margin-bottom: 16px;
}

main.mainView div:nth-of-type(2) {
  display: grid;
  row-gap: 16px;
}

main.mainView div:nth-of-type(2) > div {
  display: grid;
  row-gap: 4px;
}

main.mainView div:nth-of-type(2) > div p {
  font-size: 14px;
}

main.loginView {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  overflow-y: scroll;
  margin-top: 32px;
  text-align: center;
}

main.loginView img {
  margin-bottom: 16px;
}

main.loginView h1+p {
  margin-top: 4px;
}

main.loginView h1 {
  font-size: 28px;
}

main.loginView p {
  margin-bottom: 8px;
}

form.emailCredentials {
  height: fit-content;
  width: 100%;
  margin-top: 32px;
  padding: 16px;
  border-radius: 16px;
  background: #F3F3F3;
}

form.emailCredentials div:has(input) {
  display: grid;
  justify-items: start;
  margin-bottom: 16px;
}

form.emailCredentials div > label {
  margin-bottom: 4px;
}

form.emailCredentials div:has(button) {
  display: flex;
  gap: 16px;
  margin-top: 16px;
}

form.emailCredentials div:has(button) button {
  width: 100%;
}

form.emailCredentials input[type="email"],
form.emailCredentials input[type="password"] {
  height: 42px;
  width: 100%;
  border-radius: 16px;
  padding-inline: 16px;
  border: 2px solid var(--accent-color);
}

footer {
  display: grid;
  align-items: center;
  height: 50px;
  text-align: center;
}

footer p {
  font-size: 14px;
}
</style>