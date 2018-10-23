import Tinymce from '@/components/Tinymce'
import  qs from  'qs'
import {dateUtils} from "utils/dateUtils";

export default {
  components: {Tinymce},
  data() {
    return {
      name: 'EditArticle',
      color: this.$store.state.layout.headerColor,
      editVal: "12121",
      imageUrl:'',
      defaultImg:'http://bpic.588ku.com/element_origin_min_pic/18/06/09/7caa87c426c51c80b63e3e78b393a381.jpg',
      ruleForm: {
        title: '',
        author:'',
        desc: '',
        content:'12',
        coverimg:''

      },
      rules: {
        title: [
          {required: true, message: '请输入文章标题', trigger: 'blur'},
          {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
        ],
        author:[
          {required: true, message: '请输入文章作者', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        content:[{required: true, message: '请输入文章内容', trigger: 'blur'}]
      }
    }
  },
  methods: {
    setCurColor() {
      let color = this.color;
      this.$store.dispatch('set_header_color', {
        headerColor: color
      });
    },
    submitForm(formName) {
      this.addArticle();
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    addArticle() {
      var data = new FormData();
      let param = this.ruleForm;
      param.createtime = dateUtils.dateToStr("YYYY-MM-DD HH:mm:00");
      for (let i in param) {
        data.append(i, param[i])
      }
      // data.append('data',param)

      // param.append('data', this.ruleForm)
      this.axios({
        method: "post",
        url: "http://localhost:8889/api/addArticle",

        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',//这里以json的格式上传文件
        },

        data: data

      }).then((res) => {

        console.log(res.data);
      })
    },
 handleAvatarSuccess(res, file) {

  if(res.code===200){
    this.ruleForm.coverimg = 'http://localhost/'+res.files.file;
    debugger
  }else{
    this.ruleForm.coverimg = this.defaultImg;
  }
},
beforeAvatarUpload(file) {
  // const isJPG = file.type === 'image/jpeg';
  // const isLt2M = file.size / 1024 / 1024 < 2;
  //
  // if (!isJPG) {
  //   this.$message.error('上传头像图片只能是 JPG 格式!');
  // }
  // if (!isLt2M) {
  //   this.$message.error('上传头像图片大小不能超过 2MB!');
  // }
  return true
}

  }
}
