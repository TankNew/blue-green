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
            v-for="(item,index) in pageContent.items"
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
      <div class="my-5">
        <b-pagination
          v-model="currentPage"
          :per-page="perPage"
          :total-rows="pageContent.totalCount"
          @input="pageChange"
          align="center"
          pills
        ></b-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
const c = 1
const p = 8
export default {
  data() {
    return {
      currentPage: c,
      perPage: p
    }
  },
  computed: {
    ...mapState({
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const param = {
      params: {
        IsActive: true,
        SkipCount: (c - 1) * p,
        MaxResultCount: p
      }
    }
    const json = await store.dispatch('app/getPartner', param)

    return { pageContent: json }
  },

  created() {},
  methods: {
    async pageChange() {
      const params = {
        params: {
          SkipCount: (this.currentPage - 1) * this.perPage,
          MaxResultCount: this.perPage
        }
      }
      this.pageContent = await this.$store.dispatch('app/getPartner', params)
    }
  }
}
</script>
