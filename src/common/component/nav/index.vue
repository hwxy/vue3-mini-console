<template>
  <a-layout class="app-container">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="app-container__logo"></div>
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        theme="dark"
        :inline-collapsed="collapsed"
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
        <!-- <a-menu-item key="2">
          <DesktopOutlined />
          <span>Option 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <InboxOutlined />
          <span>Option 3</span>
        </a-menu-item> -->
        <!-- <a-sub-menu key="sub1">
          <template v-slot:title>
            <span><MailOutlined /><span>Navigation One</span></span>
          </template>
          <a-menu-item key="5">Option 5</a-menu-item>
          <a-menu-item key="6">Option 6</a-menu-item>
          <a-menu-item key="7">Option 7</a-menu-item>
          <a-menu-item key="8">Option 8</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template v-slot:title>
            <span><AppstoreOutlined /><span>Navigation Two</span></span>
          </template>
          <a-menu-item key="9">Option 9</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="11">
              Option 11
            </a-menu-item>
            <a-menu-item key="12">
              Option 12
            </a-menu-item>
          </a-sub-menu>
        </a-sub-menu> -->
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
  // MailOutlined,
  PieChartOutlined
  // DesktopOutlined,
  // InboxOutlined,
  // AppstoreOutlined
} from "@ant-design/icons-vue";
import { Layout, Menu } from "ant-design-vue";
// type
import { defineComponent, ref, watch, h, onUnmounted } from "vue";
// json
import routes from "./index.json";
// util
import { jumpToPush } from "common/utils/jumpTo";
// router
import router from "@/router";
const MiniNav = defineComponent({
  name: "MiniNav",
  components: {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    // MailOutlined,
    PieChartOutlined,
    // DesktopOutlined,
    // InboxOutlined,
    // AppstoreOutlined,
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
  watch: {
    $route: {
      handler(n) {
        if (!n.meta.sign) return;
        this.setSelectedKeys([n.meta.sign]);
      },
      immediate: true
    }
  },
  setup() {
    const collapsed = ref(false);
    const selectedKeys = ref<string[]>([location.pathname]);
    const openKeys = ref([]);
    const preOpenKeys = ref([]);
    const unwatchOne = watch(openKeys, (n, o) => {
      preOpenKeys.value = o;
    });
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
      setSelectedKeys(value: string[]) {
        selectedKeys.value = value;
      },
      handleMenuClick(params: {
        key: string | number;
        keyPath: string[] | number[];
        item: any;
        domEvent: MouseEvent;
      }) {
        jumpToPush(params.item.$attrs.router as string);
      },
      toggleCollapsed() {
        collapsed.value = !collapsed.value;
        openKeys.value = collapsed.value ? [] : preOpenKeys.value;
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
