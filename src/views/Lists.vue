<template>
  <div v-if="type == 'genres'">
    <!-- todo: dynamic component? -->
    <list-genres></list-genres>
  </div>
</template>

<script>
// components
import ListGenres from '../components/ListGenres';

export default {
  name: 'Lists',
  components: {
    ListGenres
  },
  data() {
    return {
      type: 'genres'
    };
  }
};
</script>
