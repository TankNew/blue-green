<template>
  <div class="container">
    <h4 class="page-title">
      <i class="fas fa-bookmark" />
      <span>{{ catalogItem.title }}</span>
    </h4>
    <h6 class="page-sub-title">{{ formatDate(catalogItem.creationTime) }}</h6>
    <div class="page-content limit-width">
      <div class="news-detail">
        <client-only>
          <div
            v-swiper:mySwiper="swiperOption"
            v-if="catalogItem.pictureWithInfos.length>0"
          >
            <div class="swiper-wrapper">
              <div
                v-for="slide in catalogItem.pictureWithInfos"
                class="swiper-slide"
              >
                <img :src="slide.picUrl" />
                <div
                  @click="picInfo=!picInfo"
                  v-if="slide.picTitle||slide.picContent"
                  class="slide-info"
                >
                  <h3>{{ slide.picTitle }}</h3>
                  <p v-if="!picInfo">{{ slide.picContent }}</p>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </client-only>
        <div slot="button-prev" class="swiper-button-prev"></div>
        <div slot="button-next" class="swiper-button-next"></div>
        <div v-html="catalogItem.content" class="content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import tools from '../../../../utiltools/tools'

export default {
  data() {
    return {
      picInfo: false,
      isloaded: false,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoHeight: true,
        on: {
          slideChange() {},
          tap() {}
        }
      }
    }
  },
  computed: {
    ...mapState({
      currentPath: state => state.app.currentPath,
      companyInfo: state => state.app.companyInfo
    })
  },
  head() {
    return {
      title: this.catalogItem.title + ' - ' + this.companyInfo.appName + '-' + this.companyInfo.seoKeyWords
    }
  },
  async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    const id = route.params.id

    const catalogItem = await store.dispatch('app/getCatalog', { params: { id } })
    let path = '/main/'
    switch (catalogItem.catalogGroup.catalogType) {
      case 1:
        path += 'news/' + catalogItem.catalogGroup.id
        break
      case 2:
        path += 'photonews/' + catalogItem.catalogGroup.id
        break
      case 3:
        path += 'product/' + catalogItem.catalogGroup.id
        break
    }

    return { catalogItem, path }
  },
  created() {
    this.$store.dispatch('app/setcurrentPath', {
      path: this.path,
      grandId: this.catalogItem.catalogGroup.id
    })
  },
  mounted() {
    // this.mySwiper.slideTo(3, 1000, false)
  },
  methods: {
    formatDate(val) {
      return tools.date(val)
    }
  }
}
</script>
