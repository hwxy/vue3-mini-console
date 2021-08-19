import { useRouter } from "vue-router";
export default function useJump() {
  const { push, back } = useRouter();
  return {
    // jumpHref(path: string) {},
    jumpRouterPush(path: string) {
      push(path);
    },
    jumpRouterBack() {
      back();
    }
  };
}
