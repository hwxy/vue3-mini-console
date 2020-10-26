<template>
  <a-layout class="app-container">
    <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
      <div class="app-container__logo"></div>
      <a-menu theme="dark" mode="inline" v-model:selectedKeys="selectedKeys">
        <a-menu-item key="1">
          <user-outlined />
          <span>nav 1</span>
        </a-menu-item>
        <a-menu-item key="2">
          <video-camera-outlined />
          <span>nav 2</span>
        </a-menu-item>
        <a-menu-item key="3">
          <upload-outlined />
          <span>nav 3</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="app-container__header">
        <menu-unfold-outlined
          v-if="collapsed"
          class="menu-item__trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <menu-fold-outlined
          v-else
          class="menu-item__trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content class="app-container__content">
        <slot name="content"></slot>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
// comp
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from "@ant-design/icons-vue";
import { Layout, Menu } from "ant-design-vue";
// type
import { defineComponent, ref, reactive } from "vue";

interface Data {
  selectedKeys: string[];
  collapsed: boolean;
}
const MiniNav = defineComponent({
  name: "MiniNav",
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    [Layout.name]: Layout,
    [Layout.Content.name]: Layout.Content,
    [Layout.Sider.name]: Layout.Sider,
    [Layout.Header.name]: Layout.Header,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item
  },
  setup() {
    const collapsed = ref(false);
    const selectedKeys = ref(["1"]);

    return {
      collapsed,
      selectedKeys
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
    box-sizing: border-box;
  }
}
</style>
