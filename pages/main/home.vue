<template>
  <section class="home">
 
  </section>
</template>
<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import tools from '../../utiltools/tools'
export default {
  data() {
    return {
      firstGroup: {},
      firstPhotoGroup: {},
      firstPhotoGroupItems: [],
      secondGroup: {},
      secondGroupItems: [],
      fourthGroup: {},
      fourthGroupItems: [],
      fifthGroup: {},
      fifthGroupItemsTop: {},
      fifthGroupItemsOther: [],
      sixGroup: {},
      sixGroupItems: [],
      thirdGroup: {},
      thirdGroupItems: []
    }
  },
  computed: {
    ...mapState({
      currentPath: state => state.app.currentPath,
      homePage: state => state.app.homePage
    })
  },
  async fetch(context) {
    await context.store.dispatch('app/getHomePage')
  },
  /**存放异步方法 */
  created() {
    this.loadFirstPhotoGroup()
    this.loadFirstGroup()
    this.loadSecondGroup()
    this.loadThird()
    this.loadFourthGroup()
    this.loadFifthGroup()
    this.loadSixGroup()
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
    async loadFirstGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 0) {
        this.firstGroup = Groups[0].catalogGroup
        const res = await this.$store.dispatch('app/getCatalogGroupList', { params: { id: this.firstGroup.id } })
        this.firstGroup.children = res
      }
    },
    async loadFirstPhotoGroup() {
      const Groups = this.$store.state.app.homePage.groups.filter(
        x => x.catalogGroup && x.catalogGroup.catalogType === 3
      )
      if (Groups.length > 0) {
        this.firstPhotoGroup = Groups[0].catalogGroup
        const params = {
          params: {
            CatalogGroupId: this.firstPhotoGroup.id,
            SkipCount: 0,
            MaxResultCount: 8,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.firstPhotoGroupItems = res.items
      }
    },
    async loadSecondGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 1) {
        this.secondGroup = Groups[1].catalogGroup
        const params = {
          params: {
            CatalogGroupId: this.secondGroup.id,
            SkipCount: 0,
            MaxResultCount: 2,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.secondGroupItems = res.items
      }
    },
    async loadThird() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 2) {
        this.thirdGroup = Groups[2].catalogGroup
        const params = {
          params: {
            CatalogGroupId: this.thirdGroup.id,
            SkipCount: 0,
            MaxResultCount: 6,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.thirdGroupItems = res.items
      }
    },
    async loadFourthGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 2)
      if (Groups.length > 0) {
        this.fourthGroup = Groups[0].catalogGroup

        const params = {
          params: {
            CatalogGroupId: this.fourthGroup.id,
            SkipCount: 0,
            MaxResultCount: 5,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.fourthGroupItems = res.items
      }
    },
    async loadFifthGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 3) {
        this.fifthGroup = Groups[3].catalogGroup

        const params = {
          params: {
            CatalogGroupId: this.fifthGroup.id,
            SkipCount: 0,
            MaxResultCount: 4,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.fifthGroupItemsTop = res.items[0]
        this.fifthGroupItemsOther = res.items.filter((x, index) => index > 0)
      }
    },
    async loadSixGroup() {
      const Groups = this.homePage.groups.filter(x => x.catalogGroup && x.catalogGroup.catalogType === 1)
      if (Groups.length > 4) {
        this.sixGroup = Groups[4].catalogGroup

        const params = {
          params: {
            CatalogGroupId: this.sixGroup.id,
            SkipCount: 0,
            MaxResultCount: 5,
            Sorting: 'IsTop DESC, Number DESC'
          }
        }
        const res = await this.$store.dispatch('app/getCatalogList', params)
        this.sixGroupItems = res.items
      }
    }
  }
}
</script>
