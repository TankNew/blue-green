const state = () => ({
  navbars: [],
  currentPath: {},
  currentPathParent: {},
  breadCrumbItems: [],
  companyInfo: {},
  partners: [],
  homePage: {}
})
const mutations = {
  setCompanyInfo(state, val) {
    state.companyInfo = val
  }
}

const actions = {
  async getNavbars(context) {
    const res = await this.$axios.get('/api/services/app/Navbar/GetAll')
    if (res.data.success) {
      context.state.navbars = res.data.result[0].children
      context.state.currentPath = context.state.navbars[0]
    }
  },
  async getCompanyInfo(context) {
    const res = await this.$axios.get('/api/services/app/CompanyInfo/GetOrCreate')
    if (res.data.success) {
      context.commit('setCompanyInfo', res.data.result)
    }
  },
  setcurrentPath(context, { path, groupId }) {
    const array = context.state.navbars
    const home = actions.findChildByUrl(array, `/main/home`)
    let child = actions.findChildByUrl(array, path)

    if (child === null) {
      if (groupId) {
        child = actions.findChildByGroupId(array, groupId)
      }
    }

    if (child !== null) {
      context.state.currentPath = child
      actions.changeBreadCrumb(context, home, child)

      const parentId = context.state.currentPath.parentId
      context.state.currentPathParent = actions.findParentById(array, parentId)
    }
  },
  changeBreadCrumb(context, ...args) {
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
      if (arry[i].catalogGroupId && id && arry[i].catalogGroupId === id) {
        res = arry[i]
        break
      } else if (arry[i].children && arry[i].children.length > 0) {
        res = actions.findChildByGroupId(arry[i].children, id)
        if (res) return res
      }
    }
    return res
  },
  findParentById(arry, id) {
    let res = null
    for (let i = 0; i < arry.length; i++) {
      if (arry[i].id && id && arry[i].id === id) {
        res = arry[i]
        break
      } else if (arry[i].children && arry[i].children.length > 0) {
        res = actions.findParentById(arry[i].children, id)
        if (res) return res
      }
    }
    return res
  },
  async getPartner(context) {
    const res = await this.$axios.get('/api/services/app/Partner/GetAll')
    if (res.data.success) context.state.partners = res.data.result
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
