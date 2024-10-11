<template>
  <n-dropdown trigger="click" :options="dropOption" @select="handleSelect">
    <div class="large-btn">
      <div class="large-icon">
        <SvgIcon :name="icon" size="24"></SvgIcon>
        <div>▼</div>
      </div>
    </div>
  </n-dropdown>
</template>
<script lang="ts" setup>
withDefaults(
  defineProps<{
    dropOption: any;
    icon: string;
    disabled: boolean;
    active: boolean;
  }>(),
  {
    icon: "",
    disabled: false,
    title: "",
    active: false,
    dropOption: [
      {
        label: "布朗酒店，伦敦",
        key: "brown's hotel, london"
      },
      {
        label: "亚特兰蒂斯巴哈马，拿骚",
        key: "atlantis nahamas, nassau"
      }
    ]
  }
);

const emits = defineEmits<{
  (e: "updateValue", value: string): void;
}>();

const handleSelect = (value: string) => {
  emits("updateValue", value);
};
</script>
<style lang="scss" scoped>
.large-btn {
  padding: 4px;
  margin: 2px;
  cursor: default;
  &:hover {
    background-color: $hoveButton;
    border-radius: 4px;
    box-shadow: inset 0px 0px 2px 1px $hoverButtonBorder;
  }

  .large-icon {
    height: 24px;
    width: 30px;
    margin: 0 auto;
    background-color: $color-17;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .title {
    font-size: 12px;
    margin-top: 4px;
    white-space: pre-line;
    text-align: center;
    height: 28px;
    line-height: 14px;
  }
}

.disabled {
  pointer-events: none;
  color: $fristMenuBg;
}

.active {
  background-color: $hoveButton;
  border-radius: 4px;
  box-shadow: inset 0px 0px 2px 1px $hoverButtonBorder;
}
</style>
