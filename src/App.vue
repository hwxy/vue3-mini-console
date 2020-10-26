<template>
  <mini-nav>
    <template v-slot:content>
      <router-view></router-view>
    </template>
  </mini-nav>
</template>
<script lang="ts">
// comp
import MinNav from "common/component/nav/index.ts";
// type
import { defineComponent } from "vue";

const App = defineComponent({
  components: {
    [MinNav.name]: MinNav
  },
  data() {
    return {};
  }
});
export default App;
</script>
<style lang="scss" scoped>
.app-container {
  .menu-item__trigger {
    font-size: 18px;
    line-height: 64px;
    padding: 0 24px;
    cursor: pointer;
    transition: color 0.3s;
  }
  .menu-item__trigger:hover {
    color: #1890ff;
  }
  &__logo {
    height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
  }
  &__header {
    background: #fff;
    padding: 0;
    height: 64px;
  }

  &__content {
    margin: 24px 16px;
    padding: 24px;
    background: #fff;
    min-height: calc(100vh - 112px);
    box-sizing: border-box;
  }
}
</style>
