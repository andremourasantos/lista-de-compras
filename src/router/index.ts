import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import App from '../views/AppView.vue';
import Login from '../views/LoginView.vue';
import PrivacyPolicy from '../views/PrivacyPolicy.vue';
import Account from '../views/AccountView.vue';
  import AccViewMain from '../components/app/accountView/Main.vue';
  import AccViewAbout from '../components/app/accountView/About.vue';
  import AccViewVerifyEmail from '../components/app/accountView/VerifyEmail.vue';
  import AccViewPwa from '../components/app/accountView/InstallPwa.vue';
  import AccViewDelete from '../components/app/accountView/DeleteAccount.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'app',
    component: App,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/conta',
    component: Account,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '',
        name: 'AccViewMain',
        component: AccViewMain
      },
      {
        path: 'sobre',
        name: 'AccViewAbout',
        component: AccViewAbout
      },
      {
        path: 'verificar-email',
        name: 'AccViewVerifyEmail',
        component: AccViewVerifyEmail
      },
      {
        path: 'pwa',
        name: 'AccViewPwa',
        component: AccViewPwa
      },
      {
        path: 'deletar-conta',
        name: 'AccViewDelete',
        component: AccViewDelete
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/politica-de-privacidade',
    name: 'pp',
    component: PrivacyPolicy,
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {top:0}
  }
})

const isUserAuthenticated = (): Promise<boolean> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      unsubscribe();
      resolve(!!user);
    });
  });
}

router.beforeEach(async (to, from, next) => {
  const userAuth = await isUserAuthenticated();

  if(to.meta.requiresAuth && !userAuth){
    next({name:'login'})
  } else{
    next();
  }
})

export default router
