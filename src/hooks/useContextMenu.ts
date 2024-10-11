import { nextTick, ref } from "vue";

export default () => {
  const showDropdown = ref(false);
  const x = ref(0);
  const y = ref(0);
  const selectedKey = ref("");

  const onClickoutside = () => {
    showDropdown.value = false;
  };

  const handleContextMenu = (e: MouseEvent, value: string) => {
    e.preventDefault();
    showDropdown.value = false;
    nextTick().then(() => {
      showDropdown.value = true;
      selectedKey.value = value;
      x.value = e.clientX;
      y.value = e.clientY;
    });
  };

  return {
    showDropdown,
    x,
    y,
    selectedKey,
    onClickoutside,
    handleContextMenu
  };
};
