<template>
    <div class="articlecontent" v-html="content">

    </div>
</template>

<script>
    export default {
        name: "Articlecontent",
        props: {
            content:{
              type: String,
              default: ''
            }
        }
    }
</script>

<style scoped>
.articlecontent{
  width: 100%;
  position: relative;
}
</style>
