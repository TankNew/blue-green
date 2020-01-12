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
    <div class="page-product-list">
      <ul>
        <li
          v-for="item in pageContent.items"
          :key="item.id"
          @click="goNewsDetail(item.id,2)"
        >
          <img :src="item.cover" />
          <span class="cover-title">
            <a href="javascript:void(0)">{{ item.title }}</a>
          </span>
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
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
const c = 1
const p = 10
export default {
  data() {
    return {
      currentPage: c,
      perPage: p
    }
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
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const param = {
      params: {
        IsActive: true,
        CatalogGroupId: route.params.id,
        SkipCount: (c - 1) * p,
        MaxResultCount: p
      }
    }
    const json = await store.dispatch('app/getCatalogList', param)

    return { pageContent: json }
  },
  created() {},
  methods: {
    goNewsGroup(id, type) {
      switch (type) {
        case 1:
          this.$router.push('/main/news/' + String(id))
          break
        case 2:
          this.$router.push('/main/photonews/' + String(id))
          break
        case 3:
          this.$router.push('/main/product/' + String(id))
          break
      }
    },
    goNewsDetail(id, type) {
      let typename
      switch (type) {
        case 1:
          typename = 'news'
          break
        case 2:
          typename = 'photonews'
          break
        case 3:
          typename = 'product'
          break
      }
      window.open('/main/' + typename + '/detail/' + String(id), '_blank')
    },
    async pageChange() {
      const params = {
        params: {
          IsActive: true,
          CatalogGroupId: this.$route.params.id,
          SkipCount: (this.currentPage - 1) * this.perPage,
          MaxResultCount: this.perPage
        }
      }
      this.pageContent = await this.$store.dispatch('app/getCatalogList', params)
    }
  }
}
</script>
