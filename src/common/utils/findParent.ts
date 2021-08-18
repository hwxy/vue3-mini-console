import { ComponentPublicInstance } from "vue";

const findParent = (
  component: ComponentPublicInstance,
  componentName: string
) => {
  let parent = component.$parent as ComponentPublicInstance;
  let name = parent.$options.componentName || parent.$options.name;
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent as ComponentPublicInstance;

    if (parent) {
      name = parent.$options.componentName || parent.$options.name;
    }
  }
  return parent;
};

export default findParent;
