<template>
  <div @click="setNum">
    {{ num.count }}
  </div>
</template>

<script>
import MiniLoading from "common/component/loading/index.ts";
import { defineComponent, reactive } from "vue";

const ManageProduct = defineComponent({
  components: {
    [MiniLoading.name]: MiniLoading
  },
  setup() {
    const num = reactive({
      count: 0
    });
    const setNum = () => {
      num.count++;
    };
    return {
      num,
      setNum
    };
  }
});
export default ManageProduct;
</script>
<style lang="scss"></style>
