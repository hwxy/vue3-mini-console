<template>
  <div>
    <a-button type="link" @click="goBack"> ← 返回</a-button>
  </div>
</template>

<script>
// comp
import { Button } from "ant-design-vue";
// vue
import { defineComponent } from "vue";
// util
import { jumpToBack, jumpToPush } from "common/utils/jumpTo";
const ProductEdit = defineComponent({
  components: {
    [Button.name]: Button
  },
  setup() {
    return {
      goBack() {
        // jumpToBack();
        jumpToPush("/");
      }
    };
  }
});
export default ProductEdit;
</script>

<style></style>
