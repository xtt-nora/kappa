<template>
  <n-form ref="formRef" :model="formData" size="small">
    <n-form-item path="smoothing" class="sample">
      <div v-html="culData"></div>
    </n-form-item>
  </n-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
const culData = ref(
  '<p style="text-align: center;">Analytical model</p><p style="text-align: center;">Wellbore = &nbsp;Constant</p><p style="text-align: center;">Well = Vertical</p><p style="text-align: center;">Reservoir = Homogeneous</p><p style="text-align: center;">Boundary = Fault</p><p style="text-align: center;"><br></p><p style="text-align: center;">Pi = 24.8491 MPa</p><p style="text-align: center;">kh = 79.1668 md.m</p><p style="text-align: center;">k = 52.7779md</p><p style="text-align: center;">C = 0.94629 m3/MPa</p><p style="text-align: center;">Skin = -0.358164</p><p style="text-align: center;">L = 166.141 m</p><p><br></p>'
);
const formData = ref({});
</script>
<style scoped lang="scss">
.n-form {
  height: 100%;
  background-color: #fff;
  .sample {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
