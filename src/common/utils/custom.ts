type tkey = string | number;

type tobject = {
  [propName: number]: any;
  [propName: string]: any;
};

export const shallowReactive = (obj: object) => {
  return new Proxy(obj, {
    get(obj: tobject, key: tkey) {
      return obj[key];
    },
    set(obj: tobject, key: tkey, val) {
      obj[key] = val;
      console.log("UI更新");
      return true;
    }
  });
};

export const shallowRef = (value: any) => {
  return shallowReactive({
    value
  });
};

// 递归监听
interface Obj {
  [key: string]: any;
}
export const reactive = (obj: Obj) => {
  if (typeof obj == "object") {
    if (obj instanceof Array) {
      obj.forEach((item, index) => {
        if (typeof item == "object") {
          obj[index] = reactive(item);
        }
      });
    } else {
      for (const key in obj) {
        const item = obj[key as keyof Obj];
        if (typeof item == "object") {
          obj[key as keyof Obj] = reactive(item);
        }
      }
    }

    return new Proxy(obj, {
      get(obj: tobject, key: tkey) {
        return obj[key];
      },
      set(obj: tobject, key: tkey, val) {
        obj[key] = val;
        console.log("UI更新");
        return true;
      }
    });
  } else {
    console.warn(`message: ${obj} is not object'`);
  }
};

export const ref = (value: Obj) => {
  return reactive({
    value
  });
};
