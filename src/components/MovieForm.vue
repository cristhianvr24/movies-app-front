<!-- eslint-disable -->

<template>
   <div class="container mt-5">
    <div class="d-flex justify-content-between mb-4">
      <h1>{{ movieId ? 'Edit Movie' : 'Add Movie' }}</h1>
      <button @click="logout" class="btn btn-danger">Logout</button>
    </div>
    <form @submit.prevent="saveMovie">
      <div class="mb-3">
        <label for="title" class="form-label">Title:</label>
        <input type="text" v-model="movie.title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="genre" class="form-label">Genre:</label>
        <input type="text" v-model="movie.genre" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Description:</label>
        <textarea v-model="movie.description" class="form-control"></textarea>
      </div>
      <div class="mb-3">
        <label for="release_date" class="form-label">Release Date:</label>
        <input type="number" v-model="movie.release_year" class="form-control" min="1900" max="2024" required placeholder="YYYY" />
      </div>
      <div class="mb-3">
        <label for="copies" class="form-label">Copies:</label>
        <input type="number" v-model="movie.copies_available" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">{{ movieId ? 'Update Movie' : 'Add Movie' }}</button>
      <router-link to="/movies" class="btn btn-secondary ms-3">Back to List</router-link>
    </form>
  </div>
</template>

<script>
import axios from '../services/axios';

export default {
  data() {
    return {
      movieId: null,
      movie: {
        title: '',
        genre: '',
        description: '',
        release_year: '',
        copies_available: '',
      },
    };
  },
  async created() {
    this.movieId = this.$route.params.id;
    if (this.movieId) {
      try {
        const response = await axios.get(`movies/${this.movieId}`, {  
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, 'Content-Type': 'application/json'},
        });
        this.movie = response.data;
      } catch (error) {
        console.error('Failed to fetch movie:', error);
      }
    }
  },
  methods: {
    async saveMovie() {
      try {
        const headersData = {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
        }
        if (this.movieId) {
          await axios.put(`movies/${this.movieId}`, this.movie, { 
            headers: headersData,
            withCredentials: true,
          });
        } else {
          await axios.post('movies', this.movie, { 
            headers: headersData,
            withCredentials: true,
          });
        }
        this.$router.push('/movies');
      } catch (error) {
        console.error('Failed to save movie:', error);
      }
    },
    logout(){
        localStorage.removeItem('token');
        this.$router.push('/');
    },
    goToMovieList(){
        this.$router.push('/movies')
    }
  },
};
</script>
