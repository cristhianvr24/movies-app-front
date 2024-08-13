<!-- eslint-disable -->
<template>
  <div class="container mt-4">
    <div class="d-flex justify-content-between mb-4">
      <h2>Welcome, {{ username }}</h2>
      <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
    
    <h1 class="mb-4">Movie List</h1>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Description</th>
          <th>Release Year</th>
          <th>Copies Available</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>{{ movie.title }}</td>
          <td>{{ movie.genre }}</td>
          <td>{{ movie.description }}</td>
          <td>{{ movie.release_year }}</td>
          <td>{{ movie.copies_available }}</td>
          <td>
            <router-link :to="'/movies/' + movie.id" class="btn btn-warning btn-sm me-2">Edit</router-link>
            <button @click="confirmDelete(movie.id)" class="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="mt-4">
      <router-link to="/movies/new" class="btn btn-primary">Add New Movie</router-link>
    </div>
  </div>
</template>

<script>
import axios from '../services/axios';

export default {
  data() {
    return {
      movies: [],
      username: '',
    };
  },
  async created() {
    try {
      const response = await axios.get('movies', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      this.movies = response.data;

      this.username = localStorage.getItem('username') || 'Guest';
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  },

  methods: {
    async confirmDelete(movieId) {
      const confirmed = confirm('Are you sure you want to delete this movie?');
      if (confirmed) {
        try {
          await axios.delete(`movies/${movieId}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          });
          this.movies = this.movies.filter(movie => movie.id !== movieId);
        } catch (error) {
          console.error('Failed to delete movie:', error);
        }
      }
    },
    logout(){
        localStorage.removeItem('token');
        this.$router.push('/');
    }
  },
};
</script>
