<template>
  <div class="body-container">
    <header>
      <div class="fixed-bar">
        <div class="tel">
          <i class="fas fa-phone-alt mr-1"></i>
          {{ companyInfo.tel }}
        </div>
        <div>
          <a @click="changeLanguage" class="green-btn">中/EN</a>
        </div>
      </div>
      <div class="header-title container">
        <div class="logo">
          <img :src="companyInfo.logo" />
        </div>
        <div class="company-name">{{ companyInfo.appName }}</div>
        <div class="toolbar">
          <a @click="changeLanguage">中/EN</a>
        </div>
      </div>
      <b-navbar toggleable="lg" type="blue" variant="blue">
        <b-navbar-brand>{{ title }}</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <section v-for="item in navbars" :key="item.id">
              <b-nav-item-dropdown
                v-if="item.children&&item.children.length>0"
                :class="[currentPath.code&&currentPath.code.includes(item.code)?'active':'']"
                :text="$L(item.displayName)"
              >
                <b-dropdown-item
                  v-for="ditem in item.children"
                  :key="ditem.id"
                  :to="ditem.url"
                >{{ $L(ditem.displayName) }}</b-dropdown-item>
              </b-nav-item-dropdown>
              <b-nav-item
                v-else
                :class="[currentPath.code&&currentPath.code.includes(item.code)?'active':'']"
                :to="item.url"
              >{{ $L(item.displayName) }}</b-nav-item>
            </section>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </header>
    <section :class="['banner',currentPath.navbarType!==5?'sub':'']">
      <client-only>
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper position-relative">
            <div
              v-for="(item, index) in bannerImgs"
              :key="index"
              class="swiper-slide"
            >
              <img :src="getImgUrl(item.imgUrl)" />
              <div class="carousel-caption">
                <div :class="currentFontPosition(item)">
                  <h2>{{ item.title }}</h2>
                  <p>{{ item.subTitle }}</p>
                </div>
              </div>
            </div>
          </div>
          <div slot="button-prev" class="swiper-button-prev"></div>
          <div slot="button-next" class="swiper-button-next"></div>
          <div class="swiper-pagination"></div>
        </div>
      </client-only>
    </section>
    <section class="main">
      <div v-if="!currentPath.isHome" class="container mt-2 breadCrumb">
        <b-breadcrumb :items="breadCrumbItems"></b-breadcrumb>
      </div>
      <nuxt-child ref="main" />
    </section>
    <footer>
      <div class="contact-info container">
        <ul>
          <li>
            <i class="fas fa-map-marked-alt mr-2 fa-1x"></i>
            <div>
              <span>{{ Address }}:</span>
              <span class="val">{{ companyInfo.appAddress }}</span>
            </div>
          </li>
          <li>
            <i class="fas fa-phone-alt mr-2 fa-1x"></i>
            <div>
              <span>{{ Tel }}:</span>
              <span class="val">{{ companyInfo.tel }}</span>
            </div>
          </li>

          <li>
            <i class="fas fa-envelope mr-2 fa-1x"></i>
            <div>
              <span>{{ Email }}:</span>
              <span class="val">{{ companyInfo.email }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="container icp">
        <dl>
          <dt>{{ companyInfo.appName }}</dt>
          <dd v-for="item in companyInfo.icps">
            <a
              class="gongan white"
              target="_blank"
              href="http://beian.miit.gov.cn/publish/query/indexFirst.action"
            >
              <p>津ICP备{{ item }}</p>
            </a>
          </dd>
          <dd v-for="item in companyInfo.gongAns">
            <a
              :href="`http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=${item}`"
              class="gongan white"
              target="_blank"
            >
              <img src="@/assets/imgs/gongan.png" />
              <p>津公网安备{{ item }}号</p>
            </a>
          </dd>
          <dd>
            技术支持：
            <a
              href="https://www.ednet.cn"
              class="white"
              target="_blank"
            >e德互联</a>
          </dd>
        </dl>
      </div>
    </footer>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import AppConsts from '../utiltools/appconst'
export default {
  head() {
    return {
      title: this.currentPath.displayName + ' - ' + this.companyInfo.appName + '-' + this.companyInfo.seoKeyWords,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.companyInfo.seoKeyWords },
        { hid: 'description', name: 'description', content: this.companyInfo.description }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: this.companyInfo.icon }]
    }
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      isWeixinShow: false,
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
      location: state => state.location,
      abp: state => state.abp,
      companyInfo: state => state.app.companyInfo,
      navbars: state => state.app.navbars,
      currentPath: state => state.app.currentPath,
      currentPathParent: state => state.app.currentPathParent,
      breadCrumbItems: state => state.app.breadCrumbItems,
      bannerImgs: state =>
        state.app.currentPath.bannerImgs
          ? state.app.currentPath.bannerImgs.length > 0
            ? state.app.currentPath.bannerImgs
            : state.app.currentPathParent.bannerImgs
          : []
    }),
    title() {
      return this.$L(this.currentPath.displayName)
    },
    Address() {
      return this.$L(`Address`)
    },
    Tel() {
      return this.$L(`Tel`)
    },
    Email() {
      return this.$L(`Email`)
    }
  },
  watch: {
    $route(val) {
      this.setcurrentPath({ path: this.$route.path })
    }
  },
  asyncData(context) {
    return { name: 'Main', userAgent: context.userAgent }
  },
  created() {
    this.setcurrentPath({ path: this.$route.path })
  },
  mounted() {},
  methods: {
    changeLanguage() {
      let lang = `en`
      if (this.location.culture === 'en') lang = `zh-CN`
      this.$cookies.set(this.location.headerName, lang, {
        path: this.abp.appPath || '/',
        maxAge: 5 * 365 * 86400000
      })
      window.location.href = '/'
    },
    ...mapActions({ setcurrentPath: 'app/setcurrentPath' }),
    go(url) {
      this.$router.push({ path: url })
    },
    getImgUrl(val) {
      if (val) return AppConsts.remoteServiceBaseUrl + val
      else return null
    },
    currentFontPosition(item) {
      return `banner-font ${item.titleAlign} ${item.titleVertical}`
    }
  }
}
</script>
