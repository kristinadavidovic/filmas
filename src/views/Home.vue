<template>
  <div class="content content--home">
    <movies-slider
      :movies="moviesAll"
      title="Discover Movies"
      :show-all="true"
    ></movies-slider>
    <hr />
    <movies-slider
      :movies="moviesTrendingWeek"
      title="Popular movies this week"
      :show-all="false"
    ></movies-slider>
    <hr />
  </div>
</template>

<script>
// components
import MoviesSlider from '../components/elements/slider/MoviesSlider';
// models
import Movie from '../models/Movie';
import MovieTrending from '../models/MovieTrending';

export default {
  name: 'Home',
  components: { MoviesSlider },
  computed: {
    moviesTrendingWeek() {
      return MovieTrending.getTrendingWeek();
    },
    moviesAll() {
      return Movie.getLimited();
    }
  },
  mounted() {
    Movie.fetch();
    MovieTrending.fetchTrendingWeek();
  }
};
</script>
