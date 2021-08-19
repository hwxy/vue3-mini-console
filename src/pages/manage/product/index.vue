<template>
  <div>
    <mini-toolbar>
      <template v-slot:left>
        <mini-input v-model="inputValue">
          <template v-slot:addonBefore>
            <a-select v-model:value="selectValue" style="width: 100px">
              <a-select-option
                v-for="data in productSelectOptions"
                :key="data.id"
                :value="data.value"
              >
                {{ data.label }}
              </a-select-option>
            </a-select>
          </template>
        </mini-input>
      </template>
      <template v-slot:right>
        <a-button type="primary" @click="handleClick">
          新增
        </a-button>
      </template>
    </mini-toolbar>
    <a-table
      v-bind="{
        columns: columns,
        'data-source': data,
        pagination: pagination,
        loading: loading,
        'row-key': record => record.id
      }"
      v-on="{
        change: handleTableChange
      }"
    >
      <template #action="row">
        <a-button type="link" @click="handleEdit(row)">
          <template v-slot:icon>
            <FormOutlined />
          </template>
        </a-button>
        <a-button type="link" danger @click="handleDelete(row)">
          <template v-slot:icon>
            <DeleteOutlined />
          </template>
        </a-button>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
// comp
import { Table, Select, Button } from "ant-design-vue";
import MiniInput from "common/component/input";
import MiniToolbar from "common/component/toolbar";
// composition
import useTable from "common/composables/useTable";
import useJump from "common/composables/useJump";
import useCurrentInstance from "common/composables/useCurrentInstance";
// vue
import { defineComponent, ref } from "vue";
// import { $confirm } from "common/utils/modelFunc";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons-vue";
const tableColumnsData = [
  {
    title: "商品ID",
    dataIndex: "id",
    sorter: true,
    width: "20%"
  },
  {
    title: "商品名称",
    dataIndex: "productName",
    width: "20%"
  },
  {
    title: "库存",
    dataIndex: "inventory"
  },
  {
    title: "型号",
    dataIndex: "model"
  },
  {
    title: "Action",
    key: "action",
    slots: { customRender: "action" },
    width: "20%"
  }
];

const productSelectOptions = [
  {
    label: "商品ID",
    value: "id"
  },
  {
    label: "商品名称",
    value: "product"
  }
];

const ManageProduct = defineComponent({
  name: "product",
  components: {
    [Table.name]: Table,
    [MiniInput.name]: MiniInput,
    [Select.name]: Select,
    "a-select-option": Select.Option,
    [MiniToolbar.name]: MiniToolbar,
    [Button.name]: Button,
    FormOutlined,
    DeleteOutlined
  },
  setup() {
    const {
      handleTableChange,
      loading,
      data,
      pagination,
      inputValue
    } = useTable({
      url:
        "https://mock.mengxuegu.com/mock/611ce7233d1d4a721df5a027/product/product",
      params: {
        limit: 10,
        page: 1
      }
    });

    const { $confirm } = useCurrentInstance();
    const selectValue = ref("id");

    const { jumpRouterPush } = useJump();

    return {
      inputValue,
      selectValue,
      data,
      pagination,
      loading,
      columns: tableColumnsData,
      productSelectOptions,
      handleTableChange,
      handleClick() {
        jumpRouterPush("/productAddEdit");
      },
      handleEdit(row: any) {
        jumpRouterPush(`/productAddEdit/${row.text.id}`);
      },
      handleDelete() {
        $confirm({
          title: "Do you want to delete these items?",
          content:
            "When clicked the OK button, this dialog will be closed after 1 second",
          onOk() {
            return new Promise((resolve, reject) => {
              setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            }).catch(() => console.log("Oops errors!"));
          },
          onCancel() {
            console.log(ManageProduct);
          }
        });
      }
    };
  }
});
export default ManageProduct;
</script>
<style lang="scss"></style>
