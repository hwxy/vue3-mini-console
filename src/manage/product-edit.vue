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
      <a-form-item ref="name" label="Activity name" name="name">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="Activity zone" name="region">
        <a-select
          v-model:value="form.region"
          placeholder="please select your zone"
        >
          <a-select-option value="shanghai">
            Zone one
          </a-select-option>
          <a-select-option value="beijing">
            Zone two
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="Activity time" required name="date1">
        <a-date-picker
          v-model:value="form.date1"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%;"
        />
      </a-form-item>
      <a-form-item label="Instant delivery" name="delivery">
        <a-switch v-model:checked="form.delivery" />
      </a-form-item>
      <a-form-item label="Activity type" name="type">
        <a-checkbox-group v-model:value="form.type">
          <a-checkbox value="1" name="type">
            Online
          </a-checkbox>
          <a-checkbox value="2" name="type">
            Promotion
          </a-checkbox>
          <a-checkbox value="3" name="type">
            Offline
          </a-checkbox>
        </a-checkbox-group>
      </a-form-item>
      <a-form-item label="Resources" name="resource">
        <a-radio-group v-model:value="form.resource">
          <a-radio value="1">
            Sponsor
          </a-radio>
          <a-radio value="2">
            Venue
          </a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="Activity form" name="desc">
        <a-textarea v-model:value="form.desc" />
      </a-form-item>
      <a-form-item label="Activity form" name="desc">
        <a-textarea v-model:value="form.desc" />
      </a-form-item>
      <a-form-item label="Activity form" name="desc">
        <a-textarea v-model:value="form.desc" />
      </a-form-item>
      <a-form-item label="Activity form" name="desc">
        <a-textarea v-model:value="form.desc" />
      </a-form-item>
      <a-form-item label="Activity form" name="desc">
        <a-textarea v-model:value="form.desc" />
      </a-form-item>
      <a-form-item label="Activity form" name="desc">
        <a-textarea v-model:value="form.desc" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
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
// vue
import { defineComponent } from "vue";
import useForm from "common/composables/useForm";

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
    [Checkbox.Group.name]: Checkbox.Group
  },
  setup() {
    return {
      ...useForm({
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }),
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change"
          }
        ],
        date1: [
          {
            required: true,
            message: "Please pick a date",
            trigger: "change",
            type: "object"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur"
          }
        ]
      }
    };
  }
});
export default ProductEdit;
</script>

<style></style>
