<template>
  <div :class="`mb${gao}`"></div>
</template>
<script lang="ts">
// type
import { defineComponent } from "vue";

const MiniGao = defineComponent({
  name: "MiniGao",
  props: {
    gao: {
      default: "5",
      type: String
    }
  }
});
export default MiniGao;
</script>
<style lang="scss" scoped></style>
