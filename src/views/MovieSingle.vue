<template>
  <div v-if="movie">
    <img :src="movie.backdrop_path" :alt="`${movie.title} poster image`" />
    <h1>{{ movie.title }}</h1>
    <img :src="movie.poster_path" :alt="`${movie.title} poster image`" />
  </div>
</template>

<script>
// models
import Movie from '../models/Movie';

export default {
  name: 'movie-single',
  props: ['movieId'],
  computed: {
    movie() {
      return Movie.getDetails(this.movieId);
    }
  },
  async mounted() {
    await Movie.fetchDetails(this.movieId);
  }
};
</script>
