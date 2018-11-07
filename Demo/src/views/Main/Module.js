export default {
    data (){
        return {
          list: [],
          num: 65,
          topfixed: false,
          fileList: [{
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }, {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }]
        }
        },
  created() {
    this.axios.get('http://localhost:8889/api/article/getArticle?')
      .then((response) => {
        console.log(response);
        this.list = response.data.data || [];

      })
      .catch(function (error) {
        console.log(error);
      });
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 250) {
        this.topfixed = true;
      } else if (scrollTop < 250) {
        this.topfixed = false;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);

    },
    turnToCurArticle(item){
      if(item){

        this.$router.push({ path: '/details',query:{id:item._id}});
      }

    },
    handlePreview(e) {
      let file = e.currentTarget.files[0];
      var oMyForm = new FormData();
      oMyForm.append("name", 'crazyJiaLin');
      oMyForm.append("file", file);
      this.axios({
        method: "post",
        url: "http://localhost:8889/api/upload",
        headers: {
          'Content-type': 'application/x-www-form-urlencoded'
        },
        data: oMyForm

      }).then((res) => {

        console.log(res.data);
      })
      // this.axios.post('http://localhost:8889/api/upload',headers:{
      //   'Content-type': 'application/x-www-form-urlencoded'
      // }, {data:file}).then(function (response) {
      //    debugger
      // }).catch(function (error) {
      //   alert(error);
      // });
      // console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${ file.name }？`);
    }
  }
}
