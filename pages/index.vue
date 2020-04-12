<template>
  <div class="container">
    <div>
      <logo />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Logo from '~/components/Logo.vue'
export default {
    components: {
        Logo
    },
    async fetch(context) {
        const ip = (await axios.get('http://icanhazip.com')).data
        context.store.dispatch('setIp', ip)
        context.redirect('/en/home')
        // The fetch method is used to fill the store before rendering the page
    }
}
</script>
