<template>
  <Oil v-if="obj.type === 'Oil'"></Oil>
  <Gas v-else-if="obj.type === 'Gas'"></Gas>
  <OilGas v-else-if="obj.type === 'Oil & Gas'"></OilGas>
  <Water v-else></Water>
</template>
<script setup lang="ts">
import Oil from "./general/oil.vue";
import Gas from "./general/gas.vue";
import Water from "./general/water.vue";
import OilGas from "./general/oilGas.vue";
const obj = defineModel({
  type: Object,
  default: {
    showModal: false,
    pvt: "singlePhase",
    referenceFluid: "oil",
    type: "oil"
  }
});
</script>
<style lang="scss" scoped>
.inlineForm {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
</style>
