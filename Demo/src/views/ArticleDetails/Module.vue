<template lang="html">
  <div class="content">

    <div style="" class="selfInfo">
      <h1>{{title}}</h1>
    <span > {{author}}</span> <span>{{creatTimeStr}}</span>
    </div>
    <!--<div style="creatTime">-->

    <!--</div>-->
    <article-content v-if="detials!==null" :content="detials.content">

    </article-content>
  </div>
</template>

<script>
  import  { dateUtils } from "@/utils/dateUtils";
  import Articlecontent from '@/components/Articlecontent'

  export default {
    components: {'article-content': Articlecontent},
    data() {
      return {
        color: this.$store.state.layout.headerColor,
        detials: null,
        author: '',
        creatTimeStr:'',
        title:''

      }
    },
    methods: {
      setCurColor() {
        let color = this.color;
        this.$store.dispatch('set_header_color', {
          headerColor: color
        });
      },
      // 通过ID
      // 获取当前内容详情
      getData(id) {

        this.axios.get('http://localhost:8889/api/article/getArticleDetials', {
          params: {
            _id: id
          }
        })
          .then((response) => {
            let newObj= response.data.data[0] || [];
            this.detials =newObj;
            this.author = newObj.author||'';

            this.creatTimeStr= dateUtils.dateToStr('YYYY-MM-DD HH:mm',dateUtils.strToDate(newObj.createtime));
            this.title=newObj.title;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    activated() {
      let newContent = this.$route;
      if(newContent.query&&newContent.query.id){
        this.getData(newContent.query.id);
      }


    }
  }
</script>

<style lang="css" scoped>
  .content {
    width: 80%;
    min-width: 1200px;
    height: auto;
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
  .selfInfo{
    width: 100%;
    padding-bottom: 10px;
    border-bottom: 1px solid #d3d4d6;
  }
  .selfInfo span{
    color: #a6a9ad;
    padding-left: 10px;
  }
</style>
