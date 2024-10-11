import { onActivated, onDeactivated, ref } from "vue";
import { debounce } from "@/utils/tool";

// 控制页面侧边工具栏状态
export const useResize = () => {
  const showLeft = ref(true);
  const showRight = ref(true);

  const resize = () => {
    const screenWidth = window.screen.width;
    const innerWidth = window.innerWidth;
    switch (true) {
      case innerWidth > screenWidth / 1.5:
        showLeft.value = showRight.value = true;
        break;
      case innerWidth <= screenWidth / 1.5 && innerWidth >= screenWidth / 2:
        showLeft.value = false;
        showRight.value = true;
        break;
      case innerWidth < screenWidth / 2:
        showLeft.value = showRight.value = false;
        break;
      default:
        break;
    }
  };

  onActivated(() => {
    window.addEventListener("resize", debounce(resize, 100));
  });

  onDeactivated(() => {
    window.removeEventListener("resize", debounce(resize, 100));
  });

  return {
    showLeft,
    showRight
  };
};
