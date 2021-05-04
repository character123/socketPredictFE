<template>
  <div class="table">
      <h1 class="title">白云机场(600004)</h1>
      <div class="select-table">
      （代码名称）搜索：<el-input class="search-input" v-model="search"> </el-input>
          <el-select v-model="year" placeholder="请选择">
              <el-option
                      v-for="item in years"
                      :key="item"
                      :label="item"
                      :value="item">
              </el-option>
          </el-select>
          <el-select v-model="quarter" placeholder="请选择">
              <el-option
                      v-for="item in quarters"
                      :key="item"
                      :label="item"
                      :value="item">
              </el-option>
          </el-select>
          <el-button @click="searchData" type="primary" icon="el-icon-search">查询</el-button>
      </div>
      <h3 class="title">历史交易数据</h3>
      <el-table
              :data="tableData"
              style="width: 1500px;height: 500px; overflow: auto;"
              height="500"
              :row-class-name="tableRowClassName">
          <el-table-column
                  prop="date"
                  label="日期">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="开盘价">
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="最高价">
          </el-table-column>
          <el-table-column
                  prop="date"
                  label="最低价">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="收盘价"
                 >
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="涨跌幅(%)">
          </el-table-column>
          <el-table-column
                  prop="date"
                  label="成交量(手)"
                 >
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="成交金额(万元)"
                  >
          </el-table-column>
          <el-table-column
                  prop="address"
                  label="振幅(%)">
          </el-table-column>
          <el-table-column
                  prop="date"
                  label="换手率(%)"
                  width="180">
          </el-table-column>
      </el-table>
  </div>
</template>

<script>

export default {
  name: 'socketMarket',
  data() {
    return {
      search: '',
      year: '2021',
      quarter: '一季度',
      years: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'],
      quarters: ['一季度', '二季度', '三季度', '四季度'],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '  1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '  1518 弄'
      }]
    }
  },
  methods: {
    tableRowClassName({row, rowIndex}) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      }
      return ''
    },
    searchData() {

    }
  },
  created() {
  }
}
</script>

<style scoped>
      .el-table .warning-row {
          background: rgba(253, 245, 230, 0.47);
      }
      .table {
          height: 100%;
          overflow: auto;
      }
    .select-table {
        margin-bottom: 20px;
        margin-top: 20px;
        height: 30px;
        width: 100%;

    }
    .title {
        text-align: center;
    }
    .search-input {
        width: 150px;
        height: 30px;
    }

</style>
