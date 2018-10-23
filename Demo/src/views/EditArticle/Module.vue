<template lang="html">
  <div class="content">
    <div class="title" :style="{'border-color':$store.state.layout.headerColor}">
      编辑
    </div>
    <div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="标题" prop="title">
          <el-input v-model="ruleForm.title" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="封面图片" prop="coverimg">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:8889/api/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="ruleForm.coverimg" :src="ruleForm.coverimg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

        </el-form-item>
        <el-form-item label="作者" prop="author">
          <el-input v-model="ruleForm.author" style="width:200px"></el-input>
        </el-form-item>

        <el-form-item label="备注" prop="desc">
          <el-input v-model="ruleForm.desc" style="width:200px"></el-input>
        </el-form-item>



        <el-form-item >
          <Tinymce v-model="ruleForm.content"></Tinymce>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="colorSelect">


    </div>
  </div>
</template>

<script>
  import moduleJs from './Module.js';

  export default moduleJs;

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
  }

  .title {
    border-left: 5px solid;
    text-indent: 10px;
    font-weight: 600;
  }

  .colorSelect {
    margin-top: 20px;
    /*text-indent: 40px;*/
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
