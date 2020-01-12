<template>
  <div class="container insider">
    <h4 class="page-title">
      <i class="fas fa-bookmark" />
      <span>{{ currentPath.displayName }}</span>
    </h4>
    <div class="page-content">
      <div class="partners">
        <ul>
          <li
            v-for="(item,index) in partners.items"
            :key="item.id"
            :style="'animation-delay:'+index*0.5+'s;'"
          >
            <a :href="item.url" target="_blank">
              <img :src="item.logo" />
              <span>{{ item.title }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
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
      partners: state => state.app.partners,
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  async fetch(context) {
    await context.store.dispatch('app/getPartner')
  },

  created() {}
}
</script>
