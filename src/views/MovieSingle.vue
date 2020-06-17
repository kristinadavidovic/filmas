<template>
  <div class="content content--movie" v-if="movie">
    <div class="movie-single">
      <div class="movie-single__backdrop">
        <div
          class="movie-single__backdrop-image"
          :style="`backgroundImage: url('${movie.backdrop_path}')`"
        ></div>
        <div class="movie-single__backdrop-fade"></div>
      </div>
      <div class="movie-single__content">
        <div class="container movie-single__container">
          <div class="movie-single__image-wrapper">
            <img
              :src="movie.poster_path"
              :alt="`${movie.title} poster image`"
            />
          </div>
          <div class="movie-single__info">
            <h1>{{ movie.title }}</h1>
          </div>
        </div>
      </div>
    </div>
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
