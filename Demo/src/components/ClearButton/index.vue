<template>
  <div class="clear-button-group" :value="value">
    <div class="btn-model "  :style="setStyle"></div>
    <div class="clear-button-group-model" >
    <div class="clear-button" :style="setStyle" v-for="(item,index) in btns" @click="setCurBtn(item,index)">
      {{item.label}}
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "index",
    props: {
      btns: {
        type: Array,
        default: function () {
          return [];
        }
      },
      span: {
        type: Number,
        default: 2
      },
      margin:{
        type: Number,
        default: 5
      },
      value: {},
    },

    data() {
      return {}
    },
    computed:{
      setStyle(){

        let width='calc((100% - '+this.margin*this.span+'px)'+' / '+this.span+')';

        return {
          width:width,
          'margin-left': this.margin+'px',
          'margin-bottom':this.margin+'px',

        }
      }
    },
    methods:{
      setCurBtn(item,index){

      }
    }
  }
</script>

<style scoped>
  .clear-button-group{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .clear-button{

    float: left;
    box-sizing: border-box;
    height: 27px;
    line-height: 27px;
    border: 1px solid #000;
    text-align: center;
    text-indent:0px;
    cursor: pointer;
    z-index: 1;

  }
  .btn-model{
    position: absolute;
    background-color: #1e6abc;
    z-index: 0;
    box-sizing: border-box;
    height: 27px;
    line-height: 27px;
    border: 1px solid #000;
    text-align: center;
    text-indent:0px;
    cursor: pointer;

  }
  .clear-button-group-model{
    width: 100%;
    position: absolute;

  }
</style>
