<template>
  <div>
    <a-button type="link" @click="goBack"> ← 返回</a-button>
    <a-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="商品名称" name="productName">
        <a-input v-model:value="form.productName" />
      </a-form-item>
      <a-form-item label="库存" name="inventory">
        <a-input v-model:value.number="form.inventory" />
      </a-form-item>
      <a-form-item label="型号" name="model">
        <a-input v-model:value="form.model" />
      </a-form-item>
      <a-form-item label="上传商品图片" name="pics">
        <mini-upload
          @change="handleChange"
          v-if="!formLoading"
          :filelist="form.pics"
        ></mini-upload>
      </a-form-item>
      <a-form-item class="mt15" :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
          保存
        </a-button>
        <a-button style="margin-left: 10px;" @click="resetForm">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
// comp
import {
  Form,
  Button,
  Radio,
  Input,
  Select,
  DatePicker,
  Switch,
  Checkbox
} from "ant-design-vue";
import MiniUpload from "common/component/upload";
// vue
import { defineComponent } from "vue";
// composables
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
    [Radio.name]: Radio,
    [Form.Item.name]: Form.Item,
    [Input.name]: Input,
    [Radio.Group.name]: Radio.Group,
    [Input.TextArea.name]: Input.TextArea,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [DatePicker.name]: DatePicker,
    [Switch.name]: Switch,
    [Checkbox.name]: Checkbox,
    [Checkbox.Group.name]: Checkbox.Group,
    [MiniUpload.name]: MiniUpload
  },
  props: {
    id: String
  },
  setup(props) {
    const formData = useForm(
      {
        productName: "",
        inventory: 0,
        model: "",
        pics: []
      },
      () => {
        return apiGet(
          "https://mock.mengxuegu.com/mock/611ce7233d1d4a721df5a027/product/productid",
          {
            id: props.id
          }
        ).then(res => {
          const product = get(res, "data.product", {});
          product.pics = product.pics.map((item: any, index: number) => {
            return {
              ...item,
              status: "done",
              uid: -index
            };
          });
          const data = product;
          return data;
        });
      },
      (ruleForm: any, form: any) => {
        console.log(ruleForm, form);
      }
    );

    const handleChange = (pics: any) => {
      formData.form.pics = pics;
      console.log(formData.form.pics);
    };

    return {
      ...formData,
      rules: {
        productName: [
          {
            required: true,
            message: "请输入商品名称",
            trigger: "change"
          }
        ],
        inventory: [
          {
            required: true,
            message: "请输入库存",
            trigger: "change",
            type: "number"
          }
        ],
        model: [
          {
            required: true,
            message: "请输入型号",
            trigger: "change"
          }
        ],
        pics: [
          {
            required: true,
            message: "请上传图片",
            type: "array"
          }
        ]
      },
      handleChange
    };
  }
});
export default ProductEdit;
</script>

<style></style>
