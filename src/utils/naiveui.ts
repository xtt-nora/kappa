import type { DialogApiInjection } from "naive-ui/es/dialog/src/DialogProvider";
import type { MessageApiInjection } from "naive-ui/es/message/src/MessageProvider";
import type { LoadingBarApiInjection } from "naive-ui/lib/loading-bar/src/LoadingBarProvider";
interface Naiveui {
  message: MessageApiInjection;
  dialog: DialogApiInjection;
  loading: LoadingBarApiInjection;
}
const naiveui: Naiveui = {
  message: {},
  dialog: {},
  loading: {}
} as any;
export default naiveui;
