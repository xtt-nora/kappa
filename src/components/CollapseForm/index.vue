<template>
  <div class="CollapseForm">
    <n-scrollbar>
      <n-collapse v-bind="$attrs">
        <n-collapse-item
          v-for="item in form"
          :key="item.name"
          :title="item.title"
          :name="item.name"
        >
          <div
            class="coll-form-item"
            v-for="(child, index) in item.children"
            :key="index"
            v-show="child.show ?? true"
          >
            <div class="coll-form-item__label item">{{ child.label }}</div>
            <div class="coll-form-item__content item">
              <n-color-picker
                v-if="child.type === 'color'"
                v-model:value="formData[child.value]"
              />
              <n-input
                v-if="child.type === 'input'"
                placeholder=" "
                v-model:value="formData[child.value]"
              ></n-input>
              <n-input-group v-else-if="child.type === 'inputGroup'">
                <n-input
                  :style="{ width: '25%' }"
                  v-model:value="child.value.first"
                />
                <n-input
                  :style="{ width: '25%' }"
                  v-model:value="child.value.second"
                />
                <n-input
                  :style="{ width: '25%' }"
                  v-model:value="child.value.third"
                />
                <n-popselect
                  v-model:value="child.unitValue"
                  :options="child.options"
                  trigger="click"
                >
                  <n-button>{{ child.unitValue }}</n-button>
                </n-popselect>
              </n-input-group>
              <n-input-group v-else-if="child.type === 'inputSelectGroup'">
                <n-select
                  :style="{ width: '33%' }"
                  :options="child.selectOptions"
                  v-model:value="child.selectValue"
                />
                <n-input
                  :style="{ width: '33%' }"
                  v-model:value="formData[child.value]"
                />
                <n-popselect
                  v-model:value="child.unitValue"
                  :options="child.options"
                  trigger="click"
                >
                  <n-button>{{ child.unitValue }}</n-button>
                </n-popselect>
              </n-input-group>
              <n-input-group v-else-if="child.type === 'group'">
                <n-input
                  v-model:value="formData[child.value]"
                  placeholder=" "
                />
                <n-popselect
                  v-model:value="child.unitValue"
                  :options="child.options"
                  trigger="click"
                >
                  <n-button>{{ child.unitValue }}</n-button>
                </n-popselect>
              </n-input-group>
              <n-select
                v-else-if="child.type === 'select'"
                v-model:value="formData[child.value]"
                :options="child.options"
              ></n-select>
              <n-checkbox
                v-else-if="child.type === 'checkbox'"
                v-model:checked="formData[child.value]"
              >
              </n-checkbox>
              <n-input-number
                v-else-if="child.type === 'numInput'"
                v-model:value="formData[child.value]"
                :min="child.min"
                :max="child.max"
              />
            </div>
          </div>
        </n-collapse-item>
      </n-collapse>
    </n-scrollbar>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  form: any;
}>();

const formData = defineModel({
  type: Object,
  default: {}
});
</script>

<style scoped lang="scss">
.CollapseForm {
  background-color: white;
  width: 100%;
  height: 100%;
  :deep(.n-collapse) {
    .n-collapse-item {
      .n-collapse-item__header {
        background-color: $tableSelectedCollapseBg;
        .n-collapse-item__header-main {
          border: none;
          border-radius: unset;
          background: none;
          line-height: unset !important;
          box-shadow: none;
          margin-bottom: 0;
        }
      }
      .n-collapse-item__header--active {
        background-color: $tableCollapseBg;
      }
      .n-collapse-item__content-wrapper {
        padding: 0;
        .n-collapse-item__content-inner {
          .coll-form-item {
            display: grid;
            grid-template-columns: 50% 50%;
            position: relative;
            .coll-form-item__label {
              white-space: nowrap; /*超出的空白区域不换行*/
              overflow: hidden; /*超出隐藏*/
              text-overflow: ellipsis; /*文本超出显示省略号*/
              padding: 0 6px;
            }
            .coll-form-item__content {
              text-align: center;
              .n-input {
                height: 18px;
                .n-input__border {
                  display: none;
                }
              }
              * {
                height: 18px;
                min-height: 18px;
                line-height: 18px;
                box-sizing: border-box;
              }
              .n-input-group {
                .n-button {
                  min-width: 100px;
                  .n-button__border {
                    border: none;
                    border-radius: 0;
                    border-left: 1px solid
                      rgba($color: $inputBorder, $alpha: 0.3);
                  }
                }
              }
              .n-select {
                .n-base-selection {
                  .n-base-selection__border {
                    display: none;
                  }
                }
              }
              .n-checkbox-box {
                max-width: 18px !important;
              }
              .n-color-picker {
                .n-color-picker-trigger {
                  .n-color-picker-trigger__fill {
                    position: unset;
                  }
                }
              }
            }
            .item {
              border: 1px solid $inputBorder;
              margin-left: -1px;
              margin-top: -1px;
            }
          }
        }
      }
    }
  }
}
</style>
