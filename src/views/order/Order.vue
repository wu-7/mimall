<template>
  <div>
    <router-view />
    <nav-footer />
  </div>
</template>

<script>
  import NavFooter from 'components/content/public/NavFooter'
  export default {
    name:'order',
    components: {
      NavFooter
    }
  }

</script>
<style scoped>

</style>