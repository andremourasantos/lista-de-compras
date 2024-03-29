<template>
  <main v-if="showView === 'Main'" class="mainView">
    <div>
      <img src="@/assets/logo.png" height="128" width="128" alt="Ícone de sacola com frutas e legumes.">
      <h1>Entre na sua conta</h1>
      <p>Selecione uma das opções de entrada abaixo para continuar.</p>
    </div>
    <div>
      <LoginButton :button-title="'Continuar com Google'" :icon-title="'PhGoogleLogo'" @click="showView = 'ThirdyParties'"/>
      <LoginButton :button-title="'Continuar com e-mail'" :icon-title="'PhEnvelope'" @click="showView = 'EmailLogin'"/>
      <div>
        <p>ou teste sem fazer login:</p>
        <LoginButton class="secondary_login" :button-title="'Continuar anônimo'" :icon-title="'PhDetective'" @click="showView = 'Anonymous'"/>
      </div>
    </div>
  </main>

  <Header v-if="showView !== 'Main'" :header-type="'Secondary'" :header-title="headerTitle" @go-back="showView = 'Main'">
    <template #notification>
      <HeaderNoti v-if="headerNotiText !== ''" :notification-icon="headerNotiIcon" :notification-text="headerNotiText" />
    </template>
  </Header>
  <main v-if="showView === 'ThirdyParties'" class="loginView">
    <img src="@/assets/ilustrations/conectar-conta.gif" height="256" width="256" alt="Desenho de duas pessoas conectando blocos de quebra-cabeça.">
    <h1>Conecte a sua conta!</h1>
    <p>Você pode conectar a sua conta do Google para criar uma conta do tipo permanente. Contas permanentes tem acesso a mais funções, como a sincronização entre dispositivos!</p>
    <Button :disabled="userActionButton" :button-text="'Concetar conta'" :has-icon="'No'" @click="googleLogin"/>
  </main>

  <main v-if="showView === 'EmailLogin'" class="loginView">
    <img src="@/assets/ilustrations/login.gif" height="256" width="256" alt="Desenho de uma pessoa conferindo uma longa lista de compras.">
    <h1>Faça login</h1>
    <p>Insira as informações da sua conta para entrar.</p>
    <form class="emailCredentials" @submit.prevent="emailSingIn">
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="email@exemplo.com" v-model="userEmail">
      </div>
      <div>
        <label for="password">Senha</label>
        <input id="password" type="password" placeholder="********" v-model="userPassword">
      </div>
      <div>
        <Button :disabled="userActionButton" type="button" :button-text="'Criar conta'" :button-type="'Secondary'" :has-icon="'No'" @click="showView = 'EmailSingUp'"/>
        <Button :disabled="!userEmail || !userPassword || userActionButton" type="submit" :button-text="'Continuar'" :has-icon="'Yes-Right'" :icon-name="'PhArrowCircleRight'" :icon-size="24" :icon-weight="'Regular'"/>
      </div>
    </form>
  </main>

  <main v-if="showView === 'EmailSingUp'" class="loginView">
    <img src="@/assets/ilustrations/criar-conta.gif" height="256" width="256" alt="Desenho de uma pessoa inserindo suas informações em um telefone.">
    <h1>Crie sua conta!</h1>
    <p>Insira um e-mail e senha para criar uma conta do tipo permanente. Contas permanentes tem acesso a mais funções, como a sincronização entre dispositivos!</p>
    <form class="emailCredentials" @submit.prevent="emailSingUp">
      <div>
        <label for="name">Nome</label>
        <input id="name" type="text" placeholder="Seu nome..." v-model="userName">
      </div>
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" placeholder="email@exemplo.com" v-model="userEmail">
      </div>
      <div>
        <label for="password">Senha</label>
        <input id="password" type="password" placeholder="********" v-model="userPassword">
      </div>
      <div>
        <Button :disabled="!userEmail || !userPassword || userActionButton" type="submit" :button-text="'Criar conta'" :has-icon="'No'"/>
      </div>
    </form>
  </main>
  
  <main v-if="showView === 'Anonymous'" class="loginView">
    <img src="@/assets/ilustrations/conta-anonima.gif" height="256" width="256" alt="Desenho de uma pessoa criativa, com várias ideias projetadas em seus pensamentos.">
    <h1>Vamos começar!</h1>
    <p>Com uma conta anônima, você pode testar a aplicação por um tempo limitado antes de decidir criar uma conta permanente.</p>
    <p>Você pode não ter acesso a determinados recursos que requerem uma conta permanente, como a sincronização entre dispositivos.</p>
    <Button :disabled="userActionButton" :button-text="'Continuar'" :has-icon="'No'" @click="anonymousLogin"/>
  </main>
  
  <footer v-if="showView === 'Main'">
    <p>Ao usar este aplicativo, você concorda com a <router-link :to="{name:'pp'}">política de privacidade</router-link>.</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import router from '@/router';

//Composables
import { loginWithGoogle, loginWithEmail, createAnAccount, loginAnonymously } from '@/composables/auth';

//Components
import LoginButton from '@/components/login/LoginButton.vue';
import Button from '@/components/Button.vue';
import Header from '@/components/Header.vue';
import HeaderNoti from '@/components/HeaderNotification.vue';
import { RouteRecordName } from 'vue-router';

export default defineComponent({
  components: {LoginButton, Button, Header, HeaderNoti},
  setup () {
    const showView = ref<'Main' | 'ThirdyParties'  | 'EmailLogin' | 'EmailSingUp' | 'Anonymous'>('Main');
    const headerTitle = ref<string>('');

    watch(showView, (newValue) => {
      switch (newValue) {
        case 'ThirdyParties':
          headerTitle.value = 'Conectar conta';
          break;
      
        case 'EmailLogin':
          headerTitle.value = 'Login por email';
          break;

        case 'EmailSingUp':
          headerTitle.value = 'Crie sua conta';
          break;

        case 'Anonymous':
          headerTitle.value = 'Conta anônima';
          break;

        default:
          headerTitle.value = '';
          break;
      }

      headerNotiText.value = '';
      userName.value = '';
      userEmail.value = '';
      userPassword.value = '';
    });

    //Login inputs refs 
    const userName = ref<string>('');
    const userEmail = ref<string>('');
    const userPassword = ref<string>('');
    const userActionButton = ref<boolean>(false);

    //Notification refs
    const headerNotiIcon = ref<notificationHeaderIcon>('PhBellRinging');
    const headerNotiText = ref<string>('');

    const wipeHeaderNoti = (type:'Error' | 'Success'):void => {
      setTimeout(():void => {
        headerNotiText.value = '';
      }, type === 'Error' ? 5000 : 3000)
    };

    //Redirect related
    const redirectTo = ref<RouteRecordName>('app');

    const redirectUser = ():void => {
      setTimeout(() => {
        router.push({name: redirectTo.value});
      }, 5000);
    }

    //Deleting user account related
    onMounted(() => {
      if(router.currentRoute.value.query.redirecionar === 'AccViewDelete'){
        redirectTo.value = 'AccViewDelete';
      }
    })

    const googleLogin = ():void => {
      userActionButton.value = true;

      loginWithGoogle()
        .then(() => {
          headerNotiIcon.value = 'PhBellRinging';
          headerNotiText.value = 'Sucesso, vinculação concluída!';

          redirectUser();
        })
        .catch((error) => {
          headerNotiIcon.value = 'PhSealWarning';
          headerNotiText.value = 'Ocorreu um erro, tente novamente mais tarde.';

          wipeHeaderNoti('Error');
          userActionButton.value = false;
        })
    };

    const emailSingIn = ():void => {
      userActionButton.value = true;

      loginWithEmail(userEmail.value, userPassword.value)
        .then(() => {
          headerNotiIcon.value = 'PhBellRinging';
          headerNotiText.value = 'Sucesso, suas informações conferem!';

          redirectUser();
        })
        .catch((error) => {
          let msg:string;

          switch (error) {
            case 'auth/user-not-found':
              msg = 'O email informado não está cadastrado.';
              break;

            case 'auth/wrong-password':
              msg = 'Senha incorreta, tente novamente.';
              break;
          
            default:
              msg = 'Ocorreu um erro, tente novamente mais tarde.';
              console.error(error);
              break;
          }

          headerNotiIcon.value = 'PhSealWarning';
          headerNotiText.value = msg;

          wipeHeaderNoti('Error');
          userActionButton.value = false;
        })
    };

    const emailSingUp = ():void => {
      userActionButton.value = true;

      createAnAccount(userEmail.value, userPassword.value, userName.value.trim())
        .then(() => {
          headerNotiIcon.value = 'PhBellRinging';
          headerNotiText.value = 'Sucesso, sua conta foi criada!';

          redirectUser();
        })
        .catch((error) => {
          let msg:string;

          switch (error) {
            case 'auth/email-already-in-use':
              msg = 'O email informado já está cadastrado.';
              break;
            
            case 'auth/weak-password':
              msg = 'Senha fraca, tente novamente.'
              break;
          
            default:
              msg = 'Ocorreu um erro, tente novamente.';
              console.error(error);
              break;
          }

          headerNotiIcon.value = 'PhSealWarning';
          headerNotiText.value = msg;

          wipeHeaderNoti('Error');
          userActionButton.value = false;
        })
    };

    const anonymousLogin = ():void => {
      userActionButton.value = true;

      loginAnonymously()
        .then(() => {
          headerNotiIcon.value = 'PhBellRinging';
          headerNotiText.value = 'Sucesso! Entrando na sua conta anônima.';
          
          redirectUser();
        })
        .catch((error) => {
          headerNotiIcon.value = 'PhSealWarning';
          headerNotiText.value = 'Ocorreu um erro, tente novamente mais tarde.';

          wipeHeaderNoti('Error');
          userActionButton.value = false;
        })
    };

    return {
      showView,
      headerTitle,
      userName,
      userEmail,
      userPassword,
      userActionButton,
      headerNotiIcon,
      headerNotiText,
      googleLogin,
      emailSingIn,
      emailSingUp,
      anonymousLogin
    }
  }
})
</script>

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
  max-width: 500px;
  margin-inline: auto;
  padding: 32px 24px;
  overflow-y: scroll;
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

main.loginView > button {
  height: 52px;
  width: 100%;
  margin-top: 16px;
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

form.emailCredentials input[type="text"], form.emailCredentials input[type="email"], form.emailCredentials input[type="password"] {
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