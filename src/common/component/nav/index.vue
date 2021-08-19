<template>
  <a-layout class="app-container">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="app-container__logo"></div>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        @click="handleMenuClick"
      >
        <a-menu-item
          v-for="navItem in routes"
          :key="navItem.key"
          :router="navItem.router"
        >
          <PieChartOutlined />
          <span>{{ navItem.navName }}</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="app-container__header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="menu-item__trigger"
          @click="toggleCollapsed"
        />
        <menu-fold-outlined
          v-else
          class="menu-item__trigger"
          @click="toggleCollapsed"
        />
      </a-layout-header>
      <nav-content>
        <a-layout-content>
          <slot name="content"></slot>
        </a-layout-content>
      </nav-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
// comp
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined
} from "@ant-design/icons-vue";
import { Layout, Menu } from "ant-design-vue";
// type
import { defineComponent, ref, watch, h, onUnmounted } from "vue";
// json
import routes from "./index.json";
// router
import { useRoute } from "vue-router";

import useJump from "common/composables/useJump";

const MiniNav = defineComponent({
  name: "MiniNav",
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    PieChartOutlined,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider,
    [Layout.Header.name]: Layout.Header,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Menu.SubMenu.name]: Menu.SubMenu,
    NavContent: {
      name: "NavContent",
      render() {
        return h(
          "div",
          {
            class: "app-container__content"
          },
          this.$slots.default()
        );
      }
    }
  },
  setup() {
    const $route = useRoute();

    const { jumpRouterPush } = useJump();

    const collapsed = ref(false);
    const selectedKeys = ref<string[]>([location.pathname]);
    const openKeys = ref([]);
    const preOpenKeys = ref([]);

    const setSelectedKeys = (value: string[]) => {
      selectedKeys.value = value;
    };

    const unwatchOne = watch(
      () => $route.meta,
      to => {
        setSelectedKeys([to.sign] as Array<string>);
      }
    );

    onUnmounted(() => {
      unwatchOne();
    });

    return {
      routes,
      selectedKeys,
      openKeys,
      collapsed,
      theme: "dark",
      preOpenKeys,
      setSelectedKeys,
      handleMenuClick(params: {
        key: string | number;
        keyPath: string[] | number[];
        item: any;
        domEvent: MouseEvent;
      }) {
        jumpRouterPush(params.key as string);
      },
      toggleCollapsed() {
        collapsed.value = !collapsed.value;
        openKeys.value = collapsed.value ? [] : preOpenKeys.value;
        preOpenKeys.value = openKeys.value;
      }
    };
  }
});
export default MiniNav;
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
    line-height: 32px;
    color: white;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
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
    height: calc(100vh - 112px);
    box-sizing: border-box;
    overflow: scroll;
  }
}
</style>
