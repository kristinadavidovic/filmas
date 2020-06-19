<template>
  <div class="person-single">
    <div class="container">
      <div class="person-single__title-wrapper">
        <h1 class="person-single__title">
          {{ person.name }}
        </h1>
      </div>
      <el-tabs>
        <el-tab-item name="Credits" ref="tabCredits">
          <!-- add crew credits -->
          <div class="person-single__credits">
            <div
              v-for="credit in castCredit"
              :key="credit.id"
              class="person-single__credit"
              v-if="credit.poster_path"
            >
              <movie-teaser :movie="credit"></movie-teaser>
            </div>
          </div>
        </el-tab-item>
        <el-tab-item name="About" :selected="true" ref="tabAbout">
          <div class="person-single__content">
            <div class="person-single__content-left">
              <div class="person-single__profile-image" v-if="hasImage">
                <img :src="person.profile_path" />
              </div>
              <div
                class="person-single__birhday person-single__label-value"
                v-if="person.birthday"
              >
                <div class="person-single__label">
                  Birthday
                </div>
                <div class="person-single__value">
                  {{ birthDay }}
                  <span v-if="!person.deathday">({{ `age ${age}` }})</span>
                </div>
              </div>
              <div class="person-single__death-day" v-if="person.deathday">
                {{ person.deathday }}
              </div>
              <div
                class="person-single__place-of-birth person-single__label-value"
                v-if="person.place_of_birth"
              >
                <div class="person-single__label">
                  Born in
                </div>
                <div class="person-single__value">
                  {{ person.place_of_birth }}
                </div>
              </div>
              <div
                class="person-single__gender person-single__label-value"
                v-if="person.gender"
              >
                <div class="person-single__label">
                  Gender
                </div>
                <div class="person-single__value" v-if="personGender">
                  {{ personGender.value }}
                </div>
              </div>
              <div
                class="person-single__homepage person-single__label-value"
                v-if="person.homepage"
              >
                <div class="person-single__label">
                  Links
                </div>
                <div class="person-single__value">
                  <a :href="person.homepage" target="_blank">{{ 'Website' }}</a>
                </div>
              </div>
              <div
                class="person-single__popularity person-single__label-value"
                v-if="person.popularity"
              >
                <div class="person-single__label">
                  Popularity
                </div>
                <div class="person-single__value">
                  {{ person.popularity }}
                </div>
              </div>
            </div>
            <div class="person-single__content-right">
              <div
                class="person-single__biography"
                v-if="person.biography"
                v-html="biographyCredited"
              ></div>
              <div class="person-single__known-for">
                <div class="person-single__label">
                  Known for
                </div>
                <div class="person-single__known-for-movies">
                  <div class="movies__all">
                    <div
                      class="movies__all-movie"
                      v-for="credit in knownForMovies"
                    >
                      <movie-teaser
                        :movie="credit"
                        v-if="credit.poster_path"
                      ></movie-teaser>
                    </div>
                  </div>
                  <div class="movies__all-link" @click="showCredits">
                    Show all filmography
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-tab-item>
      </el-tabs>
    </div>
  </div>
</template>

<script>
// 3rd
import moment from 'moment';
// components
import ElTabItem from '../components/elements/tabs/ElTabItem';
import ElTabs from '../components/elements/tabs/ElTabs';
import MovieTeaser from '../components/MovieTeaser';
// models
import Gender from '../models/Gender';

export default {
  name: 'PersonDetail',
  components: {
    ElTabItem,
    ElTabs,
    MovieTeaser
  },
  props: {
    person: {
      type: Object,
      required: true
    }
  },
  computed: {
    castCredit() {
      return this.person.credits.cast.sort(
        (a, b) => b['popularity'] - a['popularity']
      );
    },
    birthDay() {
      return moment(this.person.birthday).format('D. MMMM Y');
    },
    deathDay() {
      return moment(this.person.deathday).format('D. MMMM Y');
    },
    age() {
      return moment().diff(this.person.birthday, 'years');
    },
    biographyCredited() {
      const bio = this.person.biography.split('\n');
      const last = bio[bio.length - 1];
      const hasCredit = last.match(/^Description above from /);
      const edited = bio.slice(0, -1);
      return bio.length > 1 && hasCredit
        ? `${edited.join(
            '\n'
          )} <div class="person-single__biography-credit text--small">${last}</div>`
        : bio.join('\n');
    },
    hasImage() {
      return !!this.person.images.profiles.length;
    },
    personGender() {
      return Gender.getGender(this.person.gender);
    },
    knownForMovies() {
      return this.castCredit.slice(0, 5);
    }
  },
  methods: {
    showCredits() {
      this.$refs.tabCredits.isActive = true;
      this.$refs.tabAbout.isActive = false;
    }
  },
  mounted() {
    Gender.fetch();
  }
};
</script>
