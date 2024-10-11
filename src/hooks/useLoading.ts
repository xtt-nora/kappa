// useLoading.ts
import { ref, computed } from "vue";

export default () => {
  // 使用number类型的loadingIndex，而不是boolean类型，用于有多个请求的场景
  const loadingIndex = ref(0);

  // 计算属性，根据loadingIndex的值判断为true/false
  const isLoading = computed(() => {
    return loadingIndex.value <= 0 ? false : true;
  });

  // 进入loading，loadingIndex的值加1
  const enterLoading = () => {
    loadingIndex.value += 1;
  };

  // 退出loading，loadingIndex的值减1
  const quitLoading = () => {
    if (loadingIndex.value > 0) {
      loadingIndex.value -= 1;
    } else {
      console.warn("no need quit loading");
    }
  };

  // loadingWrapper方法，自动完成进入/退出loading的设置
  const loadingWrapper = <T>(promise: Promise<T>) => {
    return new Promise<void>((resolve, reject) => {
      // 进入loading
      enterLoading();
      promise.finally(() => {
        // 退出loading
        quitLoading();
        resolve();
      });
    });
  };
  return {
    isLoading,
    enterLoading,
    quitLoading,
    loadingWrapper
  };
};
