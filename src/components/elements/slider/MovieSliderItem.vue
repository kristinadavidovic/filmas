<template>
  <div class="movie-slider__item">
    <movie-teaser :movie="movie"></movie-teaser>
  </div>
</template>

<script>
// components
import MovieTeaser from '../../MovieTeaser';

export default {
  name: 'MovieSliderItem',
  components: {
    MovieTeaser
  },
  props: {
    movie: {
      required: true,
      type: Object
    }
  }
};
</script>
