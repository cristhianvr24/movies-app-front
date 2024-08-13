/* eslint-disable */
<template>
   <div class="container mt-4">
    <!-- Login Form -->
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h1 class="mb-4 text-center">Login</h1>
        <form @submit.prevent="login">
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
          <button type="submit" class="btn btn-primary w-100">Login</button>
          <p v-if="error" class="text-danger mt-3">{{ error }}</p>
        </form>

        <!-- Register Section -->
        <div class="mt-4 text-center">
          <p>Don't have an account?</p>
          <router-link to="/register" class="btn btn-secondary">Register</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../services/axios';

export default {
    name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
        console.log('email: ', this.email);
        try {
            const response = await axios.post('/login', {
            email: this.email,
            password: this.password,
            }, {
            headers: {
                'Content-Type': 'application/json',
            },
            });

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', response.data.user.username);

            if (response.data) {
            this.$router.push('/movies');
            }
        } catch (error) {
            console.error('Login failed:', error.response ? error.response.data : error.message);
        }
    },
  },
};
</script>
