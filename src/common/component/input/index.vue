<template>
  <a-input
    :modeValue="modeValue"
    @input="$emit('update:modelValue', $event.target.value)"
    class="w-max200"
  >
    <template v-slot:addonBefore>
      <slot name="addonBefore"></slot>
    </template>
  </a-input>
</template>
<script lang="ts">
// comp
import { Input } from "ant-design-vue";
// type
import { defineComponent } from "vue";

const MiniInput = defineComponent({
  name: "MiniInput",
  props: {
    modeValue: String
  },
  components: {
    [Input.name]: Input
  },
  setup() {
    return {};
  }
});
export default MiniInput;
</script>
<style lang="scss" scoped></style>
