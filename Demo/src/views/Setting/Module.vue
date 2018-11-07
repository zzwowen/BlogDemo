<template lang="html">
  <div class="content">
    <div class="title" :style="{'border-color':$store.state.layout.headerColor}">
      设置
    </div>
    <div class="colorSelect">
      <div class="left">皮肤设置</div>
      <div class="right">
        <div class="styleItem">
          <span style="float:left;">主题色：</span>
          <el-color-picker style="float:left;" v-model="color" show-alpha @change="setCurColor"></el-color-picker>
        </div>
        <div class="styleItem">
          <span style="float:left;">语言：</span>
          <el-color-picker style="float:left;" v-model="color" show-alpha @change="setCurColor"></el-color-picker>
        </div>
        <div style="width: 200px;position: relative">
          <clear-btn :btns="btns" v-model="btn"></clear-btn>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
  import clearbtn from 'components/ClearButton/index.vue';

  export default {
    components: {
      'clear-btn': clearbtn
    },
    data() {
      return {
        color: this.$store.state.layout.headerColor,
        btn:'sh',
        btns: [
          {
            label: '北京',
            value: 'bj'
          },
          {
            label: '上海',
            value: 'sh'
          }
          ,
          {
            label: '杭州',
            value: 'hz'
          },
          {
            label: '深圳',
            value: 'sz'
          }
        ]
      }
    },
    methods: {
      setCurColor() {
        let color = this.color;
        this.$store.dispatch('set_header_color', {
          headerColor: color
        });
      }
    }
  }
</script>

<style lang="css" scoped>
  .content {
    width: 80%;
    min-width: 1200px;
    height: 100%;
    margin-left: 10%;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0px 5px 10px #ddd;
    position: relative;
  }

  .title {
    border-left: 5px solid;
    text-indent: 10px;
    font-weight: 600;
  }

  .colorSelect {
    margin-top: 20px;
    text-indent: 40px;
    font-weight: 400;
    font-size: 14px;
    position: relative;
  }

  .left {
    width: 150px;
    float: left;
  }

  .right {
    width: calc(100% - 200px);
    float: left;
    border-left: #808080 1px solid;
    box-sizing: border-box;
    min-height: 100px;
    text-indent: 10px;
  }

  .styleItem {
    min-height: 32px;
    line-height: 32px;
    padding-bottom: 20px;
  }
</style>
