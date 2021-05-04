<template>
<div class="container">
    <h1 class="title">公司报告影响预测</h1>
    <h3 class="title">股票涨价可能性</h3>
    <el-tag class="tag" type="success">{{this.ans}}</el-tag>
    <el-input
            class="inputs"
            type="textarea"
            placeholder="请输入内容"
            :autosize="inputsSize"
            v-model="content">
    </el-input>
    <el-button class="button" @click="getAns" type="primary">提交</el-button>
</div>
</template>

<script>

export default {
  name: 'report-propensity-prediction',

  data() {
    return {
      // 富文本内容
      content: '',
      richMaxLength: 800,
      richCurrentLength: 0,
      ans: '0.69',
      inputsSize: { minRows: 25, maxRows: 25 }
    }
  },
  watch: {

  },
  methods: {
    getAns() {

    }

  },
  mounted() {

  },
  beforeDestroy() {

  }
}
</script>

<style scoped>
    .title {
        text-align: center;
    }
    .tag {
        width: 300px;
        text-align: center;
        margin: auto;
    }
    .container {
        width: 300px;
        margin: auto;
    }
    .inputs {
        margin-top: 20px;
        margin-bottom: 20px;
        height: 500px;
    }
    .button {
        width: 100%;

    }

</style>
