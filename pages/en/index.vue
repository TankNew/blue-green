<template>
  <section></section>
</template>
<script>
export default {
  fetch(context) {
    context.redirect('/en/home')
    // The fetch method is used to fill the store before rendering the page
  }
}
</script>
