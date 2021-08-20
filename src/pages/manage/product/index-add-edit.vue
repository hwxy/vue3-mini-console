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
          @change="handleUploadChange"
          v-if="!formLoading"
          :filelist="form.pics"
        ></mini-upload>
      </a-form-item>

      <a-form-item label="商品详情" name="productDetail">
        <mini-tinymce v-model:value="form.productDetail"></mini-tinymce>
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
import MiniTinymce from "common/component/tinymce";
// vue
import { defineComponent, markRaw, reactive } from "vue";
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
    [MiniUpload.name]: MiniUpload,
    [MiniTinymce.name]: MiniTinymce
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
        pics: [],
        productDetail: "123"
      },
      () => {
        return apiGet(
          "https://mock.mengxuegu.com/mock/611ce7233d1d4a721df5a027/product/productid",
          {
            id: props.id
          }
        ).then(res => {
          const product = get(res, "data.product", {});
          product.pics = markRaw(
            product.pics.map((item: any, index: number) => {
              return {
                ...item,
                status: "done",
                uid: -index
              };
            })
          );
          product.pics = []
          const data = product;
          return data;
        });
      },
      (ruleForm: any, form: any) => {
        console.log(ruleForm, form);
      }
    );

    const handleUploadChange = (pics: any) => {
      formData.form.value.pics = pics;      
    };

    return {
      ...formData,
      labelCol: { span: 4 },
      wrapperCol: { span: 12 },
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
        ],
        productDetail: [
          {
            required: true,
            message: "请填写商品详情",
            type: "string"
          }
        ]
      },
      handleUploadChange
    };
  }
});
export default ProductEdit;
</script>

<style></style>
