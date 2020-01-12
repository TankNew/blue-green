<template>
  <div class="container insider">
    <h4 class="page-title">
      <i class="fas fa-bookmark" />
      <span>{{ currentPath.displayName }}</span>
    </h4>
    <div class="page-content">
      <div class="page-news-info">
        <img :src="currentPath.catalogGroup.cover" />
        <p>{{ currentPath.catalogGroup.info }}</p>
      </div>
      <div class="page-news-list">
        <ul>
          <li
            v-for="item in pageContent.items"
            :key="item.id"
            @click="goNewsDetail(item.id,1)"
          >
            <div v-if="item.cover" class="cover-container">
              <img :src="item.cover" />
            </div>
            <div class="news-info">
              <span class="news-title">
                <a href="javascript:void(0)">{{ item.title }}</a>
              </span>
              <p class="news-intro">{{ filter(item.content,300) }}</p>
            </div>
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
import tools from '../../../utiltools/tools'
export default {
  data() {
    return {
      currentPage: 1,
      perPage: 10,
      pageContent: {}
    }
  },
  computed: {
    ...mapState({
      navbars: state => state.app.navbars,
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent
    })
  },
  watch: {
    $route(val) {
      this.currentPage = 1
      this.perPage = 10
      this.pageChange()
    }
  },
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id)
  },
  created() {
    this.pageChange()
  },
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
    filter(val, length) {
      return tools.cutString(tools._filter(val), length)
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
