<template>
  <div class="movie-slider__item">
    <router-link
      :to="{ name: 'movie', params: { movieId: movie.id } }"
      class="movie-slider__item-link"
    >
      <div class="movie-slider__item-poster">
        <img :src="movie.poster_path" :alt="`${movie.title} poster image`" />
      </div>
      <div class="movie-slider__item-info">
        <div class="movie-slider__item-title">
          {{ movie.title }}
        </div>
        <div class="movie-slider__item-date-released text-small">
          {{ movie.release_date }}
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MovieSliderItem',
  props: {
    movie: {
      required: true,
      type: Object
    }
  }
};
</script>
