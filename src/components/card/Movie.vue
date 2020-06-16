<template>
  <div class="movie">
    <span class="movie__date-released">{{ movie.release_date }}</span>
    <h2 class="movie__title">
      {{ movie.title }}
      <span v-if="showOriginalTitle" class="movie__title-original">
        ({{ movie.original_title }})
      </span>
    </h2>
    <img
      :src="`${imgBaseUrl}${posterSize}${movie.poster_path}`"
      :alt="`${movie.title} poster image`"
    />
  </div>
</template>

<script>
// 3rd
import axios from 'axios';

export default {
  name: 'Movie',
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
  computed: {
    showOriginalTitle() {
      return this.movie.title != this.movie.original_title;
    }
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
