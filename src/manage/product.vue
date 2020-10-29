<template>
  <div>
    <mini-toolbar>
      <template v-slot:left>
        <mini-input v-model="inputValue">
          <template v-slot:addonBefore>
            <a-select v-model:value="selectValue" style="width: 90px">
              <a-select-option value="Http://">
                Http://
              </a-select-option>
              <a-select-option value="Https://">
                Https://
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
        'row-key': record => record.login.uuid
      }"
      v-on="{
        change: handleTableChange
      }"
    >
      <template v-slot:name="{ text }">
        {{ text.first }} {{ text.last }}
      </template>
    </a-table>
  </div>
</template>

<script>
// comp
import { Table, Select, Button } from "ant-design-vue";
import MiniInput from "common/component/input";
import MiniToolbar from "common/component/toolbar";
// composition
import useTable from "common/composables/useTable";
// vue
import { defineComponent, ref } from "vue";
// util
import { jumpToPush } from "common/utils/jumpTo";
const columnsData = [
  {
    title: "商品ID",
    dataIndex: "name",
    sorter: true,
    width: "20%",
    slots: { customRender: "name" }
  },
  {
    title: "商品名称",
    dataIndex: "gender",
    width: "20%"
  },
  {
    title: "商品参数",
    dataIndex: "email",
    filters: [
      { text: "规格1", value: "male" },
      { text: "规格2", value: "female" }
    ]
  }
];

const ManageProduct = defineComponent({
  name: "product",
  components: {
    [Table.name]: Table,
    [MiniInput.name]: MiniInput,
    [Select.name]: Select,
    [Select.Option.name]: Select.Option,
    [MiniToolbar.name]: MiniToolbar,
    [Button.name]: Button
  },
  created() {
    console.log(this.$route, 11);
  },
  activated() {
    console.log(this.$route, 22);
  },
  setup() {
    const {
      handleTableChange,
      loading,
      data,
      pagination,
      inputValue
    } = useTable({
      url: "https://randomuser.me/api"
    });
    const selectValue = ref("Http://");

    return {
      inputValue,
      selectValue,
      data,
      pagination,
      loading,
      columns: columnsData,
      handleTableChange,
      handleClick() {
        jumpToPush("/productedit");
      }
    };
  }
});
export default ManageProduct;
</script>
<style lang="scss"></style>
