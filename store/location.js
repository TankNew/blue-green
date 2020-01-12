const state = () => ({
  culture: '',
  headerName: '.AspNetCore.Culture'
})
const mutations = {
  setCulture(state, val) {
    state.culture = val
  }
}
const getters = {
  getCulture(state) {
    return state.culture
  }
}
const actions = {}
export default {
  state,
  getters,
  mutations,
  actions
}
