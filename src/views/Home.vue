<template>
  <div class="home">
    <movies-slider
      :movies="moviesTrendingWeek"
      title="Popular movies this week"
    ></movies-slider>
  </div>
</template>

<script>
// components
import MoviesSlider from '../components/MoviesSlider';
// models
import Movie from '../models/Movie';

export default {
  name: 'Home',
  components: { MoviesSlider },
  computed: {
    moviesTrendingWeek() {
      return Movie.getTrendingWeek();
    }
  },
  mounted() {
    Movie.fetch();
  }
};
</script>
