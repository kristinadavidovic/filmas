<template>
  <div class="tabs" :class="{ 'tabs--vertical': vertical }">
    <div class="tabs__header">
      <div
        class="tabs__header-item text--small"
        v-for="tab in tabs"
        :class="{ 'tabs__header-item--active': tab.isActive }"
        @click="selectTab(tab)"
      >
        {{ tab.name }}
      </div>
    </div>

    <div class="tabs__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'el-tabs',
  props: {
    vertical: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      tabs: []
    };
  },
  methods: {
    selectTab(selectedTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name == selectedTab.name;
      });
    }
  },
  created() {
    this.tabs = this.$children;
  }
};
</script>
