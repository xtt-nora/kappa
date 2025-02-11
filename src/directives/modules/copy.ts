/**
 * v-copy
 * 复制某个值至剪贴板
 * 接收参数：string类型/Ref<string>类型/Reactive<string>类型
 */
import type { Directive, DirectiveBinding } from "vue";
import naiveui from "@/utils/naiveui";
import useClipboard from "vue-clipboard3";
const { toClipboard } = useClipboard();

interface ElType extends HTMLElement {
  copyData: string | number;
  __handleClick__: any;
}
const copy: Directive = {
  mounted(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
    el.addEventListener("click", handleClick);
  },
  updated(el: ElType, binding: DirectiveBinding) {
    el.copyData = binding.value;
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener("click", el.__handleClick__);
  }
};

async function handleClick(this: any) {
  try {
    await toClipboard(this.copyData, this);
    naiveui.message.success("复制成功");
  } catch (err) {
    console.error("复制操作不被支持或失败: ", err);
  }
}

export default copy;
