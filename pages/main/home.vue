<template>
  <section class="home">
    <div class="word-group-1">
      <ul>
        <li
          v-for="(item,index) in firstGroup.children"
          :key="item.id"
          :class="index===wordIndex?'active':''"
          :style="'animation-delay:'+index*0.5+'s;'"
          @click="wordIndex=index"
        >
          <div class="word-group-1-info-container">
            <div class="word-group-1-info">
              <div class="info">
                <h3>{{ item.displayName }}</h3>
                <p>Zhengbang Huitong (Tianjin) International Trade Co., Ltd. was incorporated in the Tianjin Free Trade Zone in early October 2016. It is a Sino-US joint venture trading company established by domestic natural investors and Americans. Mr. Li Zhi, the main investor (chairman) of Zhengbang Huitong (Tianjin) International Trade Co., Ltd., was the corporation and the main equity holder of Tianjin Zhengbang Industry and Trade Development Co., Ltd.</p>
              </div>
              <a
                @click="goNewsGroup(item.id,1)"
                class="green-btn white px-5 py-2"
              >{{ $L(`More`) }}</a>
            </div>
            <div class="word-group-1-cover">
              <img :src="item.cover" class="cover" />
              <h3>{{ item.displayName }}</h3>
            </div>
          </div>
          <div @click="goNewsGroup(item.id,1)" class="word-group-1-icon">
            <img
              src="https://cms.ednet.cn/UserFiles/zhengbanght/Images/icon%E5%9B%BE%E6%A0%87/jinghua.svg"
              class="icon"
            />
            <span>{{ item.displayName }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="product-group-1">
      <h5>
        <i class="fas fa-bookmark" />
        {{ productGroup1.displayName }}
      </h5>
      <dl ref="postion" class="product-sub-group">
        <dd v-for="(item,index) in productGroup1.children">
          <div>
            <a :href="'/Product/'+item.id" class="icon" target="_blank">
              <img :src="item.icon" />
            </a>
            <a
              @mouseenter="mouseenter($event,item,index)"
              @mouseout="mouseout"
              @click="mouseClick($event,item,index)"
              href="javascript:void(0)"
            >{{ item.displayName }}</a>
          </div>
        </dd>
      </dl>
      <h3 class="container">
        <span :style="`left:${productSliderPositon}px`"></span>
      </h3>
      <div class="container">
        <div class="product-list">
          <ul ref="productList">
            <li
              v-for="item in productGroup1Items"
              @click="goNewsDetail(item.id,3)"
            >
              <div class="product-cover">
                <img :src="item.cover" />
              </div>
              <span class="product-title">{{ item.title }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="home-ad-1">
        <div class="ad-img">
          <img ref="adImg" :src="ad1.img" />
        </div>
        <div class="ad-content">
          <h3 class="ad-title">{{ ad1.title }}</h3>
          <p class="ad-text">{{ ad1.text }}</p>
          <nuxt-link
            :to="ad1.url?ad1.url:'/'"
            class="green-btn white ml-2 px-5 py-2"
          >{{ $L(`More`) }}</nuxt-link>
        </div>
      </div>
    </div>
    <div ref="partners" class="partner">
      <div class="container">
        <h3>{{ $L(`Partner`) }}</h3>
        <dl>
          <dd
            v-for="(item,index) in partners.items"
            :key="item.id"
            :style="'animation-delay:'+index*0.5+'s;'"
          >
            <a :href="item.url" target="_blank">
              <img :src="item.logo" />
              <span>{{ item.title }}</span>
            </a>
          </dd>
        </dl>
      </div>
    </div>
  </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import tools from '../../utiltools/tools'
export default {
  data() {
    return {
      wordIndex: 0,
      observer: null,
      ad1: {},
      firstGroup: {},
      productGroup1: {},
      productGroup1Items: [],
      isProductLoading: false,
      productSliderIndex: -1,
      productSliderPositon: -10000,
      productSliderPositonOffsetLeft: 0
    }
  },
  computed: {
    options() {
      return {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    },
    ...mapState({
      currentPath: state => state.app.currentPath,
      partners: state => state.app.partners,
      homePage: state => state.app.homePage
    })
  },
  async fetch(context) {
    await context.store.dispatch('app/getHomePage')
  },
  /**存放异步方法 */
  created() {
    this.loadFirstGroup()
    this.loadAd1()
    this.loadProductGroup1()
  },
  mounted() {
    this.loadProductGroup1Chilidren()
    this.prodcutObserver = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        this.loadProductGroup1Items()
        this.$refs.productList.classList.add('fancy')
        this.prodcutObserver.unobserve(this.$refs.productList)
      }
    }, this.options)
    this.prodcutObserver.observe(this.$refs.productList)

    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.$store.dispatch('app/getPartner')
          entry.target.classList.add('fancy')
          this.observer.unobserve(entry.target)
        }
      })
    })
    this.observer.observe(this.$refs.partners)
    this.observer.observe(this.$refs.adImg)
  },
  methods: {
    mouseenter(e, item, index) {
      const x = e.x
      const y = e.y
      this.productSliderPositon = this.productSliderPositonOffsetLeft + index * e.target.offsetWidth
    },
    mouseClick(e, item, index) {
      if (!this.isProductLoading) {
        this.productSliderIndex = index
        this.loadProductGroup1SubGroupItems(item)
      }
    },
    mouseout(e) {
      if (this.productSliderIndex > -1)
        this.productSliderPositon = this.productSliderPositonOffsetLeft + this.productSliderIndex * e.target.offsetWidth
      else this.productSliderPositon = -100000
    },
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
    async loadFirstGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 0) {
        this.firstGroup = Groups[0].catalogGroup
        const res = await this.$store.dispatch('app/getCatalogGroupList', { params: { id: this.firstGroup.id } })
        this.firstGroup.children = res
      }
    },
    loadProductGroup1() {
      const Groups = this.$store.state.app.homePage.groups.filter(
        x => x.catalogGroup && x.catalogGroup.catalogType === 3
      )
      if (Groups.length > 0) {
        this.productGroup1 = Groups[0].catalogGroup
      }
    },
    async loadProductGroup1Chilidren() {
      this.isProductLoading = true
      if (this.productGroup1.id && this.productGroup1.id > 0) {
        const pa = {
          params: {
            Id: this.productGroup1.id
          }
        }
        const result = await this.$store.dispatch('app/getCatalogGroupList', pa)
        this.productGroup1.children = result
      }
      this.isProductLoading = false
    },
    async loadProductGroup1Items() {
      this.isProductLoading = true
      if (this.productGroup1.id && this.productGroup1.id > 0) {
        const params = {
          params: {
            CatalogGroupId: this.productGroup1.id,
            SkipCount: 0,
            MaxResultCount: 8,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.productGroup1Items = res.items
        this.$nextTick(() => {
          this.productSliderPositonOffsetLeft =
            (this.$refs.postion.offsetWidth / this.$refs.postion.children.length - 100) / 2
        })
      }
      this.isProductLoading = false
    },
    async loadProductGroup1SubGroupItems(item) {
      this.isProductLoading = true
      const params = {
        params: {
          CatalogGroupId: item.id,
          SkipCount: 0,
          MaxResultCount: 8,
          Sorting: 'IsTop DESC, Number DESC'
        }
      }
      const res = await this.$store.dispatch('app/getCatalogList', params)
      this.productGroup1Items = res.items
      this.isProductLoading = false
    },
    loadAd1() {
      this.ad1 = this.homePage.blocks.length > 0 ? this.homePage.blocks[0] : {}
    }
  }
}
</script>
