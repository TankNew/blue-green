<template>
  <div class="page-container insider">
    <h4 class="page-title">
      <i class="fas fa-bookmark" />
      <span>{{ currentPath.displayName }}</span>
    </h4>
    <section class="position-relative">
      <div
        v-if="currentPath.children&&currentPath.children.length>0"
        :class="['page-sub-groups',collapse?'':'expand']"
      >
        <div class="mobile-bar">
          <a v-if="collapse" @click="collapse=!collapse">
            <i class="fas fa-angle-down"></i>
            {{ $L(`Expand`) }}
          </a>
          <a v-else @click="collapse=!collapse">
            <i class="fas fa-angle-up"></i>
            {{ $L(`Collapse`) }}
          </a>
        </div>
        <div @click="collapse=true" class="table">
          <div class="web-choose">{{ $L(`Choose`) }}</div>
          <div @click.stop.prevent class="list">
            <dl>
              <dd v-for="child in currentPath.children" :key="child.id">
                <a
                  @click.stop.prevent="goNewsGroup(child.catalogGroupId,3)"
                  href="javascript:void(0)"
                >{{ child.displayName }}</a>
              </dd>
            </dl>
          </div>
          <div class="web-collapse">
            <a v-if="collapse" @click.stop.prevent="collapse=!collapse">
              {{ $L(`Expand`) }}
              <i class="fas fa-angle-double-down ml-1"></i>
            </a>
            <a v-else @click="collapse=!collapse">
              {{ $L(`Collapse`) }}
              <i class="fas fa-angle-double-up ml-1"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="page-product-list">
        <ul>
          <li
            v-for="item in pageContent.items"
            :key="item.id"
            @click="goNewsDetail(item.id,3)"
          >
            <span class="cover">
              <img :src="item.cover" />
            </span>
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
    </section>
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
      perPage: p,
      collapse: true
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
