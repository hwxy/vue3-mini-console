<template>
  <div>
    <Suspense>
      <template #default>
        <!-- <async-component></async-component> -->
      </template>
      <template #fallback>
        <div>正在拼了命的加载…</div>
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
// util
// import { shallowReactive, reactive } from "common/utils/custom";
// vue
import {
  defineComponent,
  ref,
  h,
  reactive,
  readonly,
  watchEffect,
  defineAsyncComponent
} from "vue";

const ManageTest = defineComponent({
  components: {
    // asyncComponent: defineAsyncComponent({
    //   loadingComponent: {
    //     render() {
    //       return h("div", "loading");
    //     }
    //   },
    //   suspensible: false
    // })
  },
  setup() {
    // const state = shallowReactive({
    //   a: "a",
    //   gf: {
    //     b: "b",
    //     f: {
    //       c: "c",
    //       s: {
    //         d: "d"
    //       }
    //     }
    //   }
    // });

    const state = reactive({
      a: "a",
      gf: {
        b: "b",
        f: {
          c: "c",
          s: {
            d: "d"
          }
        }
      }
    });

    const stateTwo = reactive({
      a: "a"
    });
    const readonlyState = readonly(state);

    watchEffect(() => {
      console.log(readonlyState.a, 22);
    });
    state.a = "2";
    setTimeout(() => {
      stateTwo.a = "3";
    }, 2000);
    // const stateArr = reactive([
    //   {
    //     a: 1,
    //     gf:  {
    //       b: 2
    //     }
    //   }
    // ]);
    // state.a = "1";
    // state.gf.b = "2";
    // state.gf.f.c = "3";
    // state.gf.f.s.d = "4";
    // stateArr[0].a = 2;
    // stateArr[0].gf.b = 3;
    return {
      state
    };
  }
});
export default ManageTest;
</script>
<style lang="scss" scoped></style>
