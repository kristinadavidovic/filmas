<template>
  <div class="home">
    <h2>Trending movies this week.</h2>
    <div v-for="movie in movies" :key="movie.id">
      <movie :movie="movie"></movie>
    </div>
  </div>
</template>

<script>
// 3rd
import axios from 'axios';
// components
import Movie from '../components/card/Movie';

export default {
  name: 'Home',
  components: {
    Movie
  },
  data() {
    return {
      movies: []
    };
  },
  mounted() {
    // get latest trending movies
    axios
      .get(
        'https://api.themoviedb.org/3/trending/movie/week?api_key=69e4613562492d3cc5726b7b65888503'
      )
      .then(response => {
        if (!response) return;

        const { data } = response;
        const { results } = data;
        this.movies = results;
      });
  }
};
</script>
