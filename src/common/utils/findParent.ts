const findParent = (component: any, componentName: string) => {
  let parent = component.$parent;
  let name = parent.$options.componentName || parent.$options.name;
  while (parent && (!name || name !== componentName)) {
    parent = parent.$parent;

    if (parent) {
      name = parent.$options.componentName || parent.$options.name;
    }
  }
  return parent;
};

export default findParent;
