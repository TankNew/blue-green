<template>
  <div class="container insider">
    <h4 class="page-title">
      <i class="fas fa-bookmark" />
      <span>{{ currentPath.displayName }}</span>
    </h4>
    <div v-html="companyInfo.content" class="page-content limit-width"></div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      navbars: state => state.app.navbars,
      companyInfo: state => state.app.companyInfo,
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  created() {},
  methods: {}
}
</script>
