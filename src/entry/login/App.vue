<template>
  <div class="manage-login">
    <div class="login-content">
      <h3 class="lc__title">登录</h3>
      <a-form
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :colon="false"
        labelAlign="left"
      >
        <a-form-item label="用户名" name="user">
          <a-input v-model:value="form.user" />
        </a-form-item>
        <a-form-item label="密码" name="password">
          <a-input v-model:value.number="form.password" />
        </a-form-item>
        <a-button class="mt5" block type="primary" @click="onSubmit">
          登录
        </a-button>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
// comp
import { Form, Button, Input } from "ant-design-vue";
// vue
import { defineComponent, toRefs } from "vue";
import useForm from "common/composables/useForm";
// ajax
import { apiGet } from "common/network";
// lodash
import { get } from "lodash";
const ProductEdit = defineComponent({
  name: "productEdit",
  components: {
    [Button.name]: Button,
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Input.TextArea.name]: Input.TextArea
  },
  props: {
    id: String
  },
  setup(props) {
    return {
      ...useForm(
        {
          user: "",
          password: ""
        },
        undefined,
        () => {
          (location as any).href = "/manage";
        }
      ),
      labelCol: { span: 4 },
      wrapperCol: { span: 19, offset: 1 },
      rules: {
        user: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "change"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change",
            type: "number"
          }
        ]
      }
    };
  }
});
export default ProductEdit;
</script>
<style lang="scss" scoped>
.manage-login {
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  background: $backgroundColor1;
}

.login-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: $backgroundColor2;
  width: 400px;
  border-radius: 10px;
  padding-top: 20px;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 40px;
}

.lc__title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 20px;
}
</style>
