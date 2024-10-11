import { App, Directive } from "vue";
// import disabled from "./modules/disabledMenu";
import copy from "./modules/copy.ts";

const directivesList: { [key: string]: Directive } = {
  // disabled,
  copy
};

const directives = {
  install: function (app: App<Element>) {
    Object.keys(directivesList).forEach(key => {
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;
