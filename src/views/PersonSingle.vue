<template>
  <div class="content content--pesron-single" v-if="person">
    <person-detail :person="person"></person-detail>
  </div>
</template>

<script>
// components
import PersonDetail from '../components/PersonDetail';
// models
import Person from '../models/Person';

export default {
  name: 'PersonSingle',
  props: ['personId'],
  components: {
    PersonDetail
  },
  computed: {
    person() {
      return Person.getDetails(this.personId);
    }
  },
  async mounted() {
    await Person.fetchPerson(this.personId);
  }
};
</script>
