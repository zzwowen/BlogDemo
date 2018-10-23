<template lang="html">
  <div class="content">
  <article-content :content="content">

  </article-content>
  </div>
</template>

<script>
  import Articlecontent from '@/components/Articlecontent'
export default {
    components: {'article-content':Articlecontent},
    data () {
      return {
        color:this.$store.state.layout.headerColor,
        content:''
    }
  },
  methods: {
    setCurColor() {
      let color = this.color;
      this.$store.dispatch('set_header_color', {
          headerColor: color
      });
    }
  },
  activated(){
      let newContent=this.$route;
      this.content=newContent.query.content;
    debugger
  }
}
</script>

<style lang="css" scoped>
.content{
  width: 80%;
  min-width: 1200px;
  height: 100%;
  margin-left: 10%;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0px 5px 10px #ddd;
}
.title{
  border-left: 5px solid;
  text-indent: 10px;
  font-weight: 600;
}
.colorSelect{
  margin-top: 20px;
  text-indent: 40px;
  font-weight: 400;
  font-size: 14px;
  position: relative;
}
.left{
  width: 150px;
  float: left;
}
.right{
  width: calc(100% - 200px);
  float: left;
  border-left: #808080 1px solid;
  box-sizing: border-box;
  min-height: 100px;
  text-indent: 10px;
}
.styleItem{
  min-height:32px;
  line-height: 32px;
  padding-bottom: 20px;
}
</style>
