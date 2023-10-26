import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { getUserData } from '@/composables/auth';

import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
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
    getUserData();
    next();
  }
})

export default router
