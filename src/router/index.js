import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Register from '@/components/Register.vue';
import MovieList from '../components/MovieList.vue';
import MovieForm from '../components/MovieForm.vue';

const routes = [
  { 
    path: '/',
    name: 'Login',
    component: Login 
  },
  { 
    path: '/movies',
    name: 'MovieList',
    component: MovieList,
    meta: { requiresAuth: true },
  },
  { 
    path: '/movies/new', 
    component: MovieForm 
  },
  { 
    path: '/movies/:id', 
    component: MovieForm, 
    props: true 
  },
  {
    path: '/register',
    component: Register,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
