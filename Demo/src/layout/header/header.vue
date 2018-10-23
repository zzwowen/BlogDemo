<template lang="html">
  <div class="header" :style="setHeaderStyle">
<div class="header-view">
      <div class="setting" @click="turnToSetting" :style="{'margin-top':setIconMargin}">
          <i class="iconfont icon-settings" ></i>
      </div>
      <div class="setting" @click="turnToEdit" :style="{'margin-top':setIconMargin}">
        <i class="iconfont icon-bianji" ></i>
      </div>
</div>
  </div>
</template>

<script>
export default {
  methods: {
    // setHeight() {
    //   this.$store.dispatch('set_header', {
    //     headerHeight: 100
    //   })
    // }
    turnToSetting () {
      this.$router.push('/setting')
    },
    turnToEdit(){
      this.$router.push('/edit')
    }
  },
  computed: {
    setIconMargin () {
      return (this.$store.state.layout.headerHeight / 2 - 14) + 'px'
    },
    setHeaderStyle () {

      return {
        'height':this.$store.state.layout.headerHeight + 'px',
        'line-height':this.$store.state.layout.headerHeight + 'px',
        // 'backgroundColor':this.$store.state.layout.headerColor
      }
    }
  }
}
</script>

<style lang="css" scoped>
  .header{
    /*width: 100%;*/
    transition: all .3s;
    text-align: right;
    border-color: #ddd;
    position: fixed;
    top: 0;
    right: 20px;
    float: right;
  }
  .header-view{
    width: 200px;
  }
  .setting{
    width: 28px;
    height: 28px;
    box-sizing: border-box;
    border: 1px solid #fff;
    border-radius: 50% ;
    cursor: pointer;
    transition: all .3s;
    line-height: 26px;
    text-align: center;
    margin-right: 10%;
    color: #fff;
    float: right;
  }
  i{
    font-weight: bold;
  }
  .setting:hover{
    /* box-shadow:0px 2px 10px #282828; */
    transition: all .5s ;
    animation: xz 1.5s linear infinite;
  }
  @keyframes xz {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
