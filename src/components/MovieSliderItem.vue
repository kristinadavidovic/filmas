<template>
  <div class="movie-slider__item">
    <div class="movie-slider__item-poster">
      <img
        :src="`${imgBaseUrl}${posterSize}${movie.poster_path}`"
        :alt="`${movie.title} poster image`"
      />
    </div>
    <div class="movie-slider__item-info">
      <div class="movie-slider__item-title">
        {{ movie.title }}
      </div>
      <div class="movie-slider__item-date-released">
        {{ movie.release_date }}
      </div>
    </div>
  </div>
</template>

<script>
// 3rd
import axios from 'axios';

export default {
  name: 'MovieSliderItem',
  props: {
    movie: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      imgBaseUrl: null,
      posterSize: null
    };
  },
  mounted() {
    // get movie images
    axios
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=69e4613562492d3cc5726b7b65888503`
      )
      .then(response => {
        if (!response) return;

        const { data } = response;
        const { base_url, poster_sizes } = data.images;

        this.imgBaseUrl = base_url;
        this.posterSize = poster_sizes[poster_sizes.length - 1];
      });
  }
};
</script>
