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
import { textPrediction } from '@/api/apis'

export default {
  name: 'report-propensity-prediction',

  data() {
    return {
      // 富文本内容
      content: '',
      richMaxLength: 800,
      richCurrentLength: 0,
      ans: '暂无数据',
      inputsSize: { minRows: 22, maxRows: 22 }
    }
  },
  watch: {

  },
  methods: {
    getAns() {
      textPrediction(this.content).then(res => {
        if(res.data.code === 0) {
          this.ans = res.data.data.Probability
          this.$message('预测成功', 'success')
        }else {
          this.$message(res.data.msg, 'warning')
        }
      })
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
