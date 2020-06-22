<template>
  <div class="content content-list-genres">
    <div class="container">
      <h1>
        {{ genre.name }}
      </h1>
      <div class="movies__all">
        <div
          v-for="movie in filterOutNoPosterMovies"
          :key="movie.id"
          class="movies__all-movie"
        >
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
import Genre from '../models/Genre';
import Movie from '../models/Movie';

export default {
  name: 'ListGenres',
  components: {
    MovieTeaser
  },
  props: {
    genreId: {
      type: [String, Number],
      required: true
    }
  },
  computed: {
    moviesByGenre() {
      return Movie.getAll();
    },
    filterOutNoPosterMovies() {
      return this.moviesByGenre.filter(movie => movie.poster_path != 'null');
    },
    genre() {
      return Genre.getGenre(this.genreId);
    }
  },
  mounted() {
    Movie.fetchByGenre(this.genreId);
    Genre.fetch();
  }
};
</script>
