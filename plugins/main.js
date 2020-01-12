export default async function({ store, app, route }, inject) {
  let language = app.$cookies.get(store.state.location.headerName)
  if (!language) {
    language = 'en'
    app.$cookies.set(store.state.location.headerName, language, {
      path: store.state.abp.appPath || '/',
      maxAge: 5 * 365 * 86400000
    })
  }
  store.commit('location/setCulture', language)
  await store.dispatch('getAbp')
  await store.dispatch('app/getCompanyInfo')
  await store.dispatch('app/getNavbars')
}
