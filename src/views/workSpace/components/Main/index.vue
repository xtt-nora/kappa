<template>
  <div class="main">
    <router-view v-slot="{ Component, route }">
      <transition appear name="slide-fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.main {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  z-index: 1;
  /*
    进入和离开动画可以使用不同
    持续时间和速度曲线。
  */
  .slide-fade-enter-active {
    transition: all 0.25s ease-out;
  }
  .slide-fade-leave-active {
    transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
}
</style>
