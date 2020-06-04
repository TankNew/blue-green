<template>
  <div class="container">
    <div>
      <logo />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  },
  computed: {
    ...mapState({
      abp: state => state.abp
    })
  },
  fetch(context) {
    // const ip = (await axios.get('http://icanhazip.com')).data
    // context.store.dispatch('setIp', ip)
    let abp = context.store.state.abp
    let temp = abp.setting.values['Abp.Localization.LanguageDefineByBrower']
    let isLanguageDefineByBrower = temp === 'true' || temp === 'True'

    if (!isLanguageDefineByBrower) {
      let langs = abp.localization.languages
      let defaultLang = 'zh-CN'
      langs.forEach(x => {
        if (x.isDefault) defaultLang = x
      })
      context.redirect(`/${defaultLang.name}/home`)
    }
    // The fetch method is used to fill the store before rendering the page
  },
  mounted() {
    let navigatorLanguage = navigator.language
    let langs = this.abp.localization.languages
    if (langs.find(x => x.name === navigatorLanguage) !== undefined) this.$router.replace(`/${navigatorLanguage}/home`)
    else this.$router.replace(`/${'zh-CN'}/home`)
  }
}
</script>
