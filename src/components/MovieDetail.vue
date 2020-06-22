<template>
  <div class="movie-detail">
    <div class="movie-detail__backdrop" v-if="movie.backdrop_path != 'null'">
      <div
        class="movie-detail__backdrop-image"
        :style="`backgroundImage: url('${movie.backdrop_path}')`"
        ref="backdropImage"
        id="backdrop-image"
      ></div>
      <div class="movie-detail__backdrop-fade"></div>
    </div>
    <div class="movie-detail__content">
      <div class="container movie-detail__container">
        <div class="movie-detail__info--left">
          <div class="movie-detail__poster">
            <img
              :src="movie.poster_path"
              :alt="`${movie.title} poster image`"
            />
          </div>
          <div class="movie-detail__rating">
            <!-- todo: improve ratings display? -->
            {{ movie.vote_average }} / {{ movie.vote_count }}
          </div>
        </div>
        <div class="movie-detail__info movie-detail__info--right">
          <div class="movie-detail__meta">
            <div class="movie-detail__release-date">
              <fa-icon :icon="isReleased ? 'calendar-check' : 'calendar'" />
              {{ releaseDate }}
            </div>
            <div class="movie-detail__runtime">
              <fa-icon icon="clock" />
              {{ runtime }}
            </div>
            <div class="movie-detail__genres">
              <template v-for="genre in movie.genres">
                <router-link
                  :to="{ name: 'genre', params: { genreId: genre.id } }"
                  :key="genre.id"
                  class="movie-detail__genre"
                >
                  {{ genre.name }}
                </router-link>
              </template>
            </div>
          </div>
          <div class="movie-detail__title-wrapper">
            <h1 class="movie-detail__title">
              {{ movie.title }}
            </h1>
            <span v-if="showOriginalTitle" class="movie-detail__title-origin">
              ({{ movie.original_title }})
            </span>
          </div>
          <div class="movie-detail__tagline" v-if="movie.tagline">
            <sup>
              <fa-icon icon="quote-left" />
            </sup>
            {{ movie.tagline }}
          </div>
          <div class="movie-detail__overview" v-if="movie.overview">
            <p>
              {{ movie.overview }}
            </p>
          </div>

          <!-- Cast & Crew & Info -->
          <!-- TODO: add links to more info seperate pages -->
          <el-tabs>
            <!-- Cast -->
            <el-tab-item name="Cast" :selected="true">
              <div class="movie-detail__cast">
                <div class="movie-detail__people">
                  <div
                    v-for="person in movieCast"
                    :key="person.id"
                    class="movie-detail__person"
                  >
                    <router-link
                      :to="{ name: 'person', params: { personId: person.id } }"
                      class="movie-detail__person-name"
                    >
                      {{ person.name }}
                    </router-link>
                    <div class="movie-detail__person-role">
                      {{ person.character }}
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-item>
            <!-- /Cast -->

            <!-- Crew -->
            <el-tab-item name="Crew">
              <div class="movie-detail__crew text--small">
                <el-tabs :vertical="true">
                  <template v-for="(persons, key, idx) in movieCrew">
                    <el-tab-item :name="key" :selected="idx == 0">
                      <div class="movie-detail__people">
                        <div
                          v-for="person in persons"
                          class="movie-detail__person"
                        >
                          <div class="movie-detail__person-name">
                            {{ person.job }}
                          </div>
                          <router-link
                            :to="{
                              name: 'person',
                              params: { personId: person.id }
                            }"
                            class="movie-detail__person-role"
                          >
                            {{ person.name }}
                          </router-link>
                        </div>
                      </div>
                    </el-tab-item>
                  </template>
                </el-tabs>
              </div>
            </el-tab-item>
            <!-- /Crew -->

            <!-- More Info -->
            <el-tab-item name="More info">
              <div class="movie-detail__more-details text--small">
                <div class="movie-detail__production-companies">
                  <h5>
                    {{ 'Production companies:' }}
                  </h5>
                  <ul>
                    <li
                      v-for="company in movie.production_companies"
                      :key="company.id"
                    >
                      {{ company.name }}
                    </li>
                  </ul>
                </div>
                <div class="movie-detail__production-countries">
                  <h5>
                    {{ 'Production countries:' }}
                  </h5>
                  <ul>
                    <li
                      v-for="country in movie.production_countries"
                      :key="country.id"
                    >
                      {{ country.name }}
                    </li>
                  </ul>
                </div>
                <div class="movie-detail__spoken-languages">
                  <h5>
                    {{ 'Spoken languages:' }}
                  </h5>
                  <ul>
                    <li
                      v-for="lang in movie.spoken_languages"
                      :key="lang.iso_639_1"
                    >
                      {{ lang.name }}
                    </li>
                  </ul>
                </div>
              </div>
            </el-tab-item>
            <!-- /More Info -->
          </el-tabs>
          <!-- / Cast & Crew & Info -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 3rd
import moment from 'moment';
// components
import ElTabs from '../components/elements/tabs/ElTabs';
import ElTabItem from '../components/elements/tabs/ElTabItem';
// models
import Genre from '../models/Genre';

export default {
  name: 'MovieDetail',
  components: {
    ElTabs,
    ElTabItem
  },
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      departments: [],
      crewMembers: []
    };
  },
  computed: {
    showOriginalTitle() {
      return (
        this.movie &&
        this.movie.original_title &&
        this.movie.original_title != this.movie.title
      );
    },
    releaseDate() {
      return moment(this.movie.release_date).format('DD. MM. Y');
    },
    isReleased() {
      return moment(this.releaseDate).diff(moment());
    },
    runtime() {
      const hours = this.movie.runtime / 60;
      const rhours = Math.floor(hours);
      const mins = Math.round((hours - rhours) * 60);
      return `${rhours}h ${mins}m`;
    },
    movieCast() {
      return this.movie.credits.cast;
    },
    movieCrew() {
      const crewMembers = this.movie.credits.crew;
      return crewMembers.reduce(function(r, a) {
        r[a.department] = r[a.department] || [];
        r[a.department].push(a);
        return r;
      }, {});
    }
  },
  methods: {
    parallax() {
      let bgImage = document.querySelector('#backdrop-image');
      let scrolltop = window.pageYOffset;
      bgImage.style &&
        (bgImage.style.backgroundPosition = `0% ${-scrolltop * 0.5}%`);
    }
  },
  created() {
    // document.addEventListener('scroll', () => {
    //   requestAnimationFrame(this.parallax);
    // });
  },
  mounted() {
    Genre.fetch();
  }
};
</script>
