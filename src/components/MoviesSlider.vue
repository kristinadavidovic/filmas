<template>
  <div class="movie-slider">
    <div class="container">
      <h3 class="movie-slider__title">{{ title }}</h3>
    </div>
    <div class="movie-slider__movies">
      <swiper ref="moviesSlider" :options="swiperOptions">
        <swiper-slide v-for="movie in movies" :key="movie.id">
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
    }
  },
  data() {
    return {
      swiperOptions: {
        slidesPerView: 8,
        spaceBetween: 20,
        watchOverflow: true
      }
    };
  },
  updated() {
    this.$refs.moviesSlider.$swiper.update();
  }
};
</script>
