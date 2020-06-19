<template>
  <div class="person-single">
    <div class="container">
      <div class="person-single__title-wrapper">
        <h1 class="person-single__title">
          {{ person.name }}
        </h1>
      </div>
      <el-tabs>
        <el-tab-item name="Credits" :selected="false">
          <!-- add crew credits -->
          <div class="person-single__credits">
            <div
              v-for="credit in castCredit"
              :key="credit.id"
              class="person-single__credit"
            >
              <movie-teaser :movie="credit"></movie-teaser>
            </div>
          </div>
        </el-tab-item>
        <el-tab-item name="About" :selected="true">
          <div class="person-single__content">
            <div class="person-single__content-left">
              <div class="person-single__profile-image" v-if="hasImage">
                <img :src="person.profile_path" />
              </div>
              <div class="person-single__birhday" v-if="person.birthday">
                {{ birthDay }}
                <span v-if="!person.deathday">
                  - {{ `${age} years old` }}
                </span>
              </div>
              <div class="person-single__death-day" v-if="person.deathday">
                {{ person.deathday }}
              </div>
              <div
                class="person-single__place-of-birth"
                v-if="person.place_of_birth"
              >
                Born in: {{ person.place_of_birth }}
              </div>
              <div class="person-single__gender">
                Gender: {{ person.gender }}
              </div>
              <div class="person-single__homepage" v-if="person.homepage">
                <a :href="person.homepage" target="_blank">{{ 'Homepage' }}</a>
              </div>
              <div class="person-single__popularity" v-if="person.popularity">
                {{ person.popularity }}
              </div>
            </div>
            <div class="person-single__content-right">
              <div
                class="person-single__biography"
                v-if="person.biography"
                v-html="biographyCredited"
              ></div>
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
import Movie from '../models/Movie';

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
    movie(id) {
      return Movie.getDetails(id);
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
    }
  },
  mounted() {}
};
</script>
