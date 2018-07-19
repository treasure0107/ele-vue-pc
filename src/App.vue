<template>
  <div id="app" v-cloak>
    <index-header></index-header>
    <router-view></router-view>
    <index-footer></index-footer>
  </div>
</template>

<script type="text/babel">
  import IndexHeader from "@/components/Header";
  import IndexFooter from "@/components/Footer";
  export default {
    name: 'App',
    components: {
      IndexFooter,
      IndexHeader
    }
  }
</script>

<style type="text/css">
  [v-cloak] {
    display: none !important;
  }

  html, body, #app {
    height: 100%;
  }
</style>
