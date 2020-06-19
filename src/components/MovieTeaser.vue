<template>
  <div class="movie-teaser__item">
    <router-link
      :to="{ name: 'movie', params: { movieId: movie.id } }"
      class="movie-teaser__item-link"
    >
      <div class="movie-teaser__item-poster">
        <img :src="movie.poster_path" :alt="`${movie.title} poster image`" />
      </div>
      <div class="movie-teaser__item-info">
        <div class="movie-teaser__item-title">
          {{ movie.title }}
        </div>
        <div
          class="movie-teaser__item-date-released text--small"
          v-if="movie.release_date"
        >
          {{ releaseDate }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
// 3rd
import moment from 'moment';

export default {
  name: 'MovieTeaser',
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    releaseDate() {
      return moment(this.movie.release_date).format('Y');
    }
  }
};
</script>
