<template>
  <div class="movie-slider">
    <div class="container">
      <div class="movie-slider__header">
        <h3 class="movie-slider__title">{{ title }}</h3>
        <router-link
          :to="{ name: 'movies' }"
          class="movie-slider__link"
          v-if="showAll"
          >Show all</router-link
        >
      </div>
    </div>
    <div class="movie-slider__movies" v-if="">
      <swiper
        ref="moviesSlider"
        :options="swiperOptions"
        v-if="movies && movies.length"
      >
        <swiper-slide v-for="movie in filterOutNoPosterMovies" :key="movie.id">
          <movie-slider-item :movie="movie"></movie-slider-item>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
// 3rd
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
// components
import MovieSliderItem from './MovieSliderItem';

export default {
  name: 'movies-slider',
  components: {
    MovieSliderItem,
    Swiper,
    SwiperSlide
  },
  props: {
    movies: {
      type: Array,
      required: false
    },
    title: {
      type: String,
      required: false
    },
    showAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      swiperOptions: {
        loop: true,
        slidesPerView: 8,
        spaceBetween: 20,
        watchOverflow: true
      }
    };
  },
  computed: {
    filterOutNoPosterMovies() {
      return this.movies.filter(movie => movie.poster_path != 'null');
    }
  },
  updated() {
    this.$refs.moviesSlider && this.$refs.moviesSlider.$swiper.update();
  },
  mounted() {
    this.$refs.moviesSlider && this.$refs.moviesSlider.$swiper.update();

    this.$nextTick(() => {
      this.$refs.moviesSlider && this.$refs.moviesSlider.$swiper.update();
    });
  }
};
</script>
