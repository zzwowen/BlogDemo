<template>
  <div class="navContent" :style="{'height':$store.state.layout.headerHeight+'px','background-color':$store.state.base.theme}">
    <ul :style="{'margin-top':($store.state.layout.headerHeight-50)/2+'px'}">
      <li class="item" v-for="item in routerList" @click="checkCurRoute(item)">
        {{item.name}}
        <div class="sildeChecked" :style="{'display':setCurRouter(item.path)?'block':'none'}">

        </div>
        <div class="sildeCheckedClone" >

        </div>
      </li>

    </ul>
  </div>
</template>

<script>
  export default {
    name: "nav",
    data() {
      return {
        routerList:[]
      }
    },
    methods: {
      setCurRouter(path){

        let is=false;
        if(path){
          if(this.$route.path===path){
            is=true;
          }
        }
        return is


      },
      checkCurRoute(item){
        if(item){
          this.$router.push(item.path)
        }
      }
    },
    created(){


    },
    mounted(){

     this.routerList=this.$$navRouterConfig;
    },
    activated: {}
  }
</script>

<style scoped>
  .navContent {
    width: 100%;

    position: fixed;
    z-index: 2;
    padding-left: 10%;
    padding-right: 10%;
    box-sizing: border-box;

  }
  ul{
    position: relative;
  }
  .item{
    width: 120px;
    height: 50px;
    line-height: 50px;
    float: left;
    text-align: center;
    /*border-top:1px solid #000000 ;*/
    /*border-bottom:1px solid #000000 ;*/
    position: relative;
  }
  .item:hover .sildeCheckedClone{
    display: block;
    transition: all .5s;
    animation: dash 0.3s ease-in;
  }
  .sildeChecked,.sildeCheckedClone{
    width: 80%;
    margin-left: 10%;
    position: absolute;
    bottom: 4px;
    height: 42px;
    background-color: transparent;
    box-sizing: border-box;
    /*border-top:2px solid #000000 ;*/
    border-bottom:2px solid #000000 ;
    display: none;

    cursor: pointer;


  }
  .item .sildeCheckedClone{
    transition: all .5s;
    animation: undash 0.3s ease-out;
  }
  .sildeChecked{
    border-top:0px solid #000000 ;
  }
  .triangle_border_up{
    display: none;
    width:0;
    height:0;
    border-width:0 8px 8px;
    border-style:solid;
    border-color:transparent transparent #333;/*透明 透明  灰*/
    margin:0px auto;
    position:absolute;
    margin-top: -8px;
    margin-left: calc(50% - 8px);
  }
  @keyframes dash {
    from{
      width: 0%;
      margin-left: 50%;
    }
    to{
      width: 80%;
      margin-left: 10%;
    }
  }

</style>
