<template>
  <div class="content content--movie" v-if="movie">
    <movie-detail :movie="movie"></movie-detail>
  </div>
</template>

<script>
// components
import MovieDetail from '../components/MovieDetail';
// models
import Movie from '../models/Movie';

export default {
  name: 'movie-single',
  props: ['movieId'],
  components: {
    MovieDetail
  },
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
