<template>
  <div class="workSpace">
    <Menu />
    <Main />
    <Footer />
  </div>
</template>
<script lang="ts" setup>
import Menu from "./components/Menu/index.vue";
import Main from "./components/Main/index.vue";
import Footer from "./components/Footer/index.vue";
</script>
<style scoped lang="scss">
.workSpace {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
