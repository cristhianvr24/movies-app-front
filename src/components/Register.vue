<!-- eslint-disable -->
<template>
    <div class="container mt-4">
      <!-- Register Form -->
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h1 class="mb-4 text-center">Register</h1>
          <form @submit.prevent="register">
            <div class="mb-3">
              <label for="name" class="form-label">Name:</label>
              <input
                type="text"
                v-model="name"
                class="form-control"
                id="name"
                placeholder="Juan Perez"
                required
              />
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">Username:</label>
              <input
                type="text"
                v-model="username"
                class="form-control"
                id="username"
                placeholder="El JuanPi"
                required
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email:</label>
              <input
                type="email"
                v-model="email"
                class="form-control"
                id="email"
                required
                placeholder="juanPerez@example.com"
              />
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password:</label>
              <input
                type="password"
                v-model="password"
                class="form-control"
                id="password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary w-100">Register</button>
            <p v-if="error" class="text-danger mt-3">{{ error }}</p>
          </form>
          
          <!-- Login Link -->
          <div class="mt-4 text-center">
            <p>Already have an account?</p>
            <router-link to="/" class="btn btn-secondary">Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from '../services/axios';
  
  export default {
    name: 'Register',
    data() {
      return {
        name: '',
        username: '',
        email: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async register() {
        try {
          await axios.post('/users', {
            name: this.name,
            username: this.username,
            email: this.email,
            password: this.password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          
          this.$router.push('/');
        } catch (error) {
          this.error = error.response ? error.response.data.message : 'Registration failed';
          console.error('Registration failed:', error.response ? error.response.data : error.message);
        }
      },
    },
  };
  </script>