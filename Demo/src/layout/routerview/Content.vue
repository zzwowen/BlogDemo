<template>
<div class="content">
  <transition name="slide-fade">
    <keep-alive>
      <router-view/>
    </keep-alive>
  </transition>
</div>
</template>
<script>
export default {}
</script>

<style scoped>
.content {
  width: 100%;
  height: 100%;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
