<template lang="html">
  <div class="content" :class="{'fixed':topfixed}">
    <div class="top">
      <div class="selfinfo">
        <div class="selfinfo-left">
          <ul>
            <li class="selfinfo_item">
              <div class="selfinfo_item-right">
                文章数 <span>{{list.length}}</span>
              </div>
            </li>
            <li class="selfinfo_item">
              <div class="selfinfo_item-right">
                访问量 <span>{{num}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="selfinfo-right">
          <ul>
            <li class="selfinfo_item">
              <div class="selfinfo_item-right">
                文章数 <span>{{num}}</span>
              </div>
            </li>
            <li class="selfinfo_item">
              <div class="selfinfo_item-right">
                访问量 <span>{{num}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="portrait">
        <div class="portrait-img">
          <img
            src="http://bpic.588ku.com/element_origin_min_pic/18/06/09/0dd85a21cf16ea88f62ffbd0ba8af9a4.jpg"
            style="width: 110%;">
        </div>
      </div>
    </div>
    <div class="content-list">
      <!--我是首页-->
      <div class="list-item" v-for="item in list">
        <div class="list-item-div" @click="turnToCurArticle(item)">
          <div class="list-item_img">
            <img :src="item.coverimg"/>
          </div>
          <div class="list-item_title">
           <span style="float: left;">{{item.title}}</span>
            <span style="float: right;font-size: 12px;color:#a6a9ad;">By {{item.author}}</span>
          </div>

          <div>

          </div>
        </div>

      </div>

      <!--{{list}}list-->
      <!--&lt;!&ndash; {{list}} &ndash;&gt;-->
      <!--<el-upload-->
      <!--class="upload-demo"-->
      <!--action="http://localhost:8889/api/upload"-->
      <!--:on-preview="handlePreview"-->
      <!--:on-remove="handleRemove"-->
      <!--:before-remove="beforeRemove"-->
      <!--multiple-->
      <!--:limit="3"-->
      <!--:on-exceed="handleExceed"-->
      <!--:file-list="fileList">-->
      <!--<el-button size="small" type="primary">点击上传</el-button>-->
      <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      <!--</el-upload>-->
      <!--<input type="file" @change="handlePreview"/>-->
    </div>
  </div>
</template>

<script>
  import moduleJs from './Module.js';

  export default moduleJs;
</script>

<style lang="css" scoped>
  .content {
    width: 100%;
    height: 100%;
    /*box-shadow: 0px 5px 10px #ddd;*/
    min-width: 1400px;
    /*position: relative;*/
    /*overflow: auto;*/
  }

  .top {
    height: 320px;
    width: 100%;

    /*max-width: 100%;*/
    background: url("assets/images/bg.jpg");
    background-size: cover;
    background-position: 0px -335px;
    /*opacity: 0.7;*/
    position: relative;
    z-index: 1;
  }

  .top {
    background-position: -1px -335px;
    /*transition: all 0.5s;*/
    animation: mymove ease 15s infinite;
  }

  .selfinfo {
    width: 100%;
    height: 60px;

    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    bottom: 0px;
    min-width: 1400px;
  }

  .fixed .top {
    height: 60px;
    position: fixed;

    top: 0;
  }

  .fixed .portrait {
    left: calc(120px);
    transition: all 1.5s;
  }

  .portrait {
    width: 100px;
    height: 100px;
    position: absolute;
    background-color: #fff;
    border-radius: 50% 50%;
    left: calc(50% - 50px);
    bottom: -50px;
    transition: all 1.5s;

  }

  .top:hover .portrait {
    /*left: calc(75px);*/
    /*transition: all 5s;*/
  }

  .portrait-img {
    width: 94px;
    height: 94px;
    background-color: #e6f1fe;
    border-radius: 50% 50%;
    margin-top: 3px;
    margin-left: 3px;
    position: relative;
    line-height: 140px;
    text-align: center;
    box-shadow: 0px 0px 10px #909399;
    overflow: hidden;
    cursor: pointer;
    transition: all .3s;
    text-align: center;
    line-height: 94px;
  }


  .portrait-img:hover {
    transition: all .3s;
    width:100px;
    height: 100px;
    margin-top: 0px;
    margin-left: 0px;
  }

  .selfinfo-left,
  .selfinfo-right {
    width: 50%;
    height: 100%;
    float: left;

    box-sizing: border-box;

  }

  .selfinfo-right {
    padding-left: 80px;
  }

  .selfinfo-left {
    padding-right: 80px;
  }

  .selfinfo-left ul {
    float: right;
    height: 100%;
    position: relative;
  }

  .selfinfo-right ul {
    float: left;
    padding: 0;
  }

  .selfinfo_item {

    float: left;
    height: 40px;
    width: 200px;
    border-right: 1px solid #b5b5b5;
    margin-top: 10px;
    /*background-color: #67c23a;*/
  }

  .selfinfo-left .selfinfo_item:last-child,
  .selfinfo-right .selfinfo_item:last-child {
    border-right: 0px solid #000000;
  }

  .selfinfo_item-left {
    width: 30%;
    text-align: center;
    line-height: 60px;
    float: left;
  }

  .selfinfo_item-left > i {
    font-size: 40px;
  }

  .selfinfo_item-right {
    float: left;
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    color: #c7bdbd;
  }

  .selfinfo_item-right span {
    padding-left: 20px;
    font-weight: bold;
    font-size: 20px;
    color: #ffd100;
  }

  .content-list {
    height: 1500px;

    width: 1400px;
    background-color: #FFF;
    padding-top: 100px;
    box-sizing: border-box;
    margin-left: calc((100% - 1400px) / 2);
  }

  .fixed .content-list {
    padding-top: 400px;
  }

  .list-item {
    width: calc(100% / 4);
    height: 350px;
    background-color: #fff;

    border-radius: 2px;
    overflow: hidden;
    /*margin-left: 70px;*/
    margin-top: 15px;
    float: left;
  }
  .list-item-div{
    width: 280px;
    height: 340px;
    margin-left: 35px;
    box-shadow: 0px 0px 10px #ddd;
    border:1px solid #d9edf7;
    margin-top: 5px;
  }
  .list-item:first-child{
    margin-left: 0px;
  }
  .list-item_img {
    width: 280px;
    height: 280px;
    position: relative;
    overflow: hidden;
    text-align: center;
    border-bottom: 1px solid #d9edf7;
    box-sizing: border-box;
  }
  .list-item_img img{
    /*width: 100%;*/
    height: 100%;
    transition: all .3s;
  }
  .list-item_title{
    line-height: 40px;
    height: 40px;
    width: 100%;

    padding-left: 15px;
    padding-right: 15px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: bold;
  }
  .list-item_img img:hover{
    height: 103%;
    transition: all .3s;
  }
  @media screen和（max-width：1400px） {
    body {
      width:1400px;
    }
    .content-list{
      margin-left:0px;
    }
  }
  @keyframes mymove {
    25% {
      background-position: 10px -330px;
    }
    50% {
      background-position: 20px -335px;
    }
    75% {
      background-position: 10px -320px;
    }
    100% {
      background-position: 0px -335px;
    }
  }

  @keyframes mymove1 {
    from {
      left: 1px -335px;
    }
    to {
      background-position: 20px -335px;
    }

  }

  /*@-moz-keyframes mymove !* Firefox *!*/
  /*{*/
  /*from {top:0px;}*/
  /*to {top:200px;}*/
  /*}*/

  /*@-webkit-keyframes mymove !* Safari 和 Chrome *!*/
  /*{*/
  /*from {top:0px;}*/
  /*to {top:200px;}*/
  /*}*/

  /*@-o-keyframes mymove !* Opera *!*/
  /*{*/
  /*from {top:0px;}*/
  /*to {top:200px;}*/
  /*}*/
</style>
