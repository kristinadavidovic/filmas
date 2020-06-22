<template>
  <list-genres :genreId="genreId"></list-genres>
</template>

<script>
// components
import ListGenres from '../components/ListGenres';

export default {
  name: 'ListsGenre',
  components: {
    ListGenres
  },
  props: ['genreId']
};
</script>
