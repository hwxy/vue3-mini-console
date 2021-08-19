import { getCurrentInstance } from "vue";
export default function useCurrentInstance() {
  const instance = getCurrentInstance();
  if (!instance) return {};
  return {
    ...instance.appContext.config.globalProperties
  };
}
