<template>
  <div>
    <div class="mini-toolbar">
      <div class="mini-toolbar-left"><slot name="left"></slot></div>
      <div class="mini-toolbar-right"><slot name="right"></slot></div>
    </div>
    <mini-gao :gao="gao"></mini-gao>
  </div>
</template>
<script>
// comp
import Gao from "common/component/gao";
// type
import { defineComponent } from "vue";

const MiniToolbar = defineComponent({
  name: "MiniToolbar",
  props: {
    gao: {
      type: String,
      default: "10"
    }
  },
  components: {
    [Gao.name]: Gao
  }
});
export default MiniToolbar;
</script>
<style lang="scss" scoped>
.mini-toolbar {
  display: flex;
}
.mini-toolbar-left {
  flex: 1;
  & > * {
    vertical-align: bottom;
  }
}
.mini-toolbar-right {
  margin-left: auto;
}
</style>
