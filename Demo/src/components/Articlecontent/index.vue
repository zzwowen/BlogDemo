<template>
    <div class="articlecontent" v-html="content">
111
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

}
</style>
