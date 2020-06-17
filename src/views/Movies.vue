<template>
  <div class="content content--movies">
    <div class="container">
      <h1 class="h2">
        All (almost) movies
      </h1>
      <div class="movies__all">
        <div class="movies__all-movie" v-for="movie in movies" :key="movie.id">
          <movie-teaser :movie="movie"></movie-teaser>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// components
import MovieTeaser from '../components/MovieTeaser';
// models
import Movie from '../models/Movie';

export default {
  name: 'Movies',
  components: {
    MovieTeaser
  },
  computed: {
    movies() {
      return Movie.getAll();
    }
  },
  mounted() {
    Movie.fetch();
  }
};
</script>
