import { customRef } from "vue";

function useDebouncedRef(value: number | string, delay = 2000) {
  let timeout: number;
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: string | number) {
        clearTimeout(timeout);
        timeout = Number(
          setTimeout(() => {
            value = newValue;
            trigger();
          }, delay)
        );
      }
    };
  });
}

export default useDebouncedRef;
