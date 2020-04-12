<template>
  <div class="container">
    <h4 class="page-title">
      <span>{{ currentPathParent!==null?currentPathParent.displayName:currentPath.displayName }}</span>
    </h4>
    <div v-if="currentPathParent!==null" class="page-inside-nav">
      <dl>
        <dd v-for="child in currentPathParent.children" :key="child.id">
          <nuxt-link
            :to="child.url"
            :class="[child.id===currentPath.id?'active':'','white']"
          >{{ child.displayName }}</nuxt-link>
        </dd>
      </dl>
    </div>
    <nuxt-child />
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
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
  created() {},
  methods: {}
}
</script>
