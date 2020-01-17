const state = () => ({
  companyInfo: {},
  navbars: [],
  currentPath: {},
  currentPathParent: {},
  breadCrumbItems: [],
  partners: [],
  homePage: {}
})
const mutations = {
  setCompanyInfo(state, val) {
    state.companyInfo = val
  }
}
let parents = []
const actions = {
  setcurrentPath(context, { path, grandId }) {
    const homePath = `/main/home`
    const array = context.state.navbars
    const home = actions.findChildByUrl(array, homePath)
    if (path.toLowerCase() === homePath) {
      home.isHome = true
      context.state.currentPath = home
    } else {
      let child = actions.findChildByUrl(array, path)
      if (child === null) {
        if (grandId) {
          child = actions.findChildByGroupId(array, grandId)
        }
      }
      if (child !== null) {
        parents = []
        actions.findParentsByCode(array, child.code)
        parents = parents.sort((a, b) => a.code.length - b.code.length)
        context.state.currentPath = child
        actions.setBreadCrumb(context, home, ...parents)
        let currentPathParent = null
        for (let i = parents.length - 1; i > -1; i--) {
          if (parents[i].bannerImgs && parents[i].bannerImgs.length > 0) {
            currentPathParent = parents[i]
            break
          }
        }
        context.state.currentPathParent = currentPathParent
      }
    }
  },
  setBreadCrumb(context, ...args) {
    context.state.breadCrumbItems = []
    for (let i = 0; i < args.length; i++) {
      context.state.breadCrumbItems.push({
        text: args[i].displayName,
        to: args[i].url
      })
    }
  },
  findChildByUrl(arry, val) {
    let res = null
    for (let i = 0; i < arry.length; i++) {
      if (arry[i].url && val && val.toLowerCase().includes(arry[i].url.toLowerCase())) {
        res = arry[i]
        break
      } else if (arry[i].children && arry[i].children.length > 0) {
        res = actions.findChildByUrl(arry[i].children, val)
        if (res) return res
      }
    }
    return res
  },
  findChildByGroupId(arry, id) {
    let res = null
    for (let i = 0; i < arry.length; i++) {
      if (arry[i].catalogGroupId && id && id === arry[i].catalogGroupId) {
        res = arry[i]
        break
      } else if (arry[i].children && arry[i].children.length > 0) {
        res = actions.findChildByGroupId(arry[i].children, id)
        if (res) return res
      }
    }
    return res
  },
  findParentsByCode(arry, code) {
    for (let i = 0; i < arry.length; i++) {
      if (arry[i].code && code && code.includes(arry[i].code)) {
        parents.push(arry[i])
      }
      if (arry[i].children && arry[i].children.length > 0) {
        actions.findParentsByCode(arry[i].children, code)
      }
    }
  },
  async getNavbars(context) {
    const res = await this.$axios.get('/api/services/app/Navbar/GetAll')
    if (res.data.success) {
      context.state.navbars = res.data.result[0].children
    }
  },
  async getCompanyInfo(context) {
    const res = await this.$axios.get('/api/services/app/CompanyInfo/GetOrCreate')
    if (res.data.success) {
      context.commit('setCompanyInfo', res.data.result)
    }
  },
  async getPartner(context, params) {
    const res = await this.$axios.get('/api/services/app/Partner/GetAll', params)
    if (res.data.success) {
      context.state.partners = res.data.result
      return res.data.result
    }
  },
  async getHomePage(context) {
    const res = await this.$axios.get('/api/services/app/HomePage/GetOrCreate')
    if (res.data.success) context.state.homePage = res.data.result
  },
  async getAnounces(context, params) {
    const res = await this.$axios.get('/api/services/app/Announce/GetAll', params)
    if (res.data.success) return res.data.result
  },
  async getPage(context, params) {
    const res = await this.$axios.get('/api/services/app/Page/Get', params)
    if (res.data.success) return res.data.result
  },
  async getCatalogGroupList(context, params) {
    const res = await this.$axios.get('/api/services/app/CatalogGroup/GetAll', params)
    if (res.data.success) return res.data.result
  },
  async getCatalogGroup(context, params) {
    const res = await this.$axios.get('/api/services/app/CatalogGroup/Get', params)
    if (res.data.success) return res.data.result
  },
  async getCatalogList(context, params) {
    const res = await this.$axios.get('/api/services/app/Catalog/GetAll', params)
    if (res.data.success) return res.data.result
  },
  async getCatalog(context, params) {
    const res = await this.$axios.get('/api/services/app/Catalog/Get', params)
    if (res.data.success) return res.data.result
  }
}
export default {
  state,
  mutations,
  actions
}
