<template>
<div class="container">
    <img src="../../assets/images/index.jpg" style="height: 900px;width: 100%">
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
