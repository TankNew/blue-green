export default async function({ store, app, route }, inject) {
  let language = app.$cookies.get(store.state.app.headerName) || 'zh-CN'
  app.$cookies.set(store.state.app.headerName, language, {
    path: store.state.abp.appPath || '/',
    maxAge: 5 * 365 * 86400000
  })
  store.commit('app/setCulture', language)
  await store.dispatch('getAbp')
}
