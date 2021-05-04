<template>
<div class="container">
    首页
    <img src="../../assets/images/indexBg2.jpeg" style="height: 700px;width: 100%">
</div>
</template>
<script>
  import { addClass, removeClass } from '@/utils'
  import '@/assets/custom-theme/science-blue.css' // the theme changed version element-ui css
  export default {
    data() {
      return {
        homeTotalData: [],
        homeDetailItem: [],
        rankList: [],
        numAnim: null
      }
    },
    methods: {

    },
    created() {
      addClass(document.body, 'science-blue')
    },
    mounted() {},
    updated() {

    }
  }
</script>
<style scoped >
    .container{

    }
</style>
