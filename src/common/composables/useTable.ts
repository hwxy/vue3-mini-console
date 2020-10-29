import { ref, watch, reactive, onUnmounted, watchEffect } from "vue";
// util
import { apiGet } from "common/network";
import { get } from "lodash";
// compostion api
import useDebouncedRef from "./useDebouncedRef";
interface TableConfig {
  url: string;
}

export default function useTable(config: TableConfig) {
  const url = get(config, "url", "");
  const data = ref<any[]>([]);
  const loading = ref<boolean>(false);
  const pagination = ref<{
    total: number;
    current: number;
  }>({
    total: 0,
    current: 0
  });
  const inputValue = useDebouncedRef("");
  const fetch = (params = {}) => {
    loading.value = true;
    apiGet(url, {
      results: 10,
      ...params
    }).then((res: any) => {
      const newPagination = { ...pagination.value };
      newPagination.total = 200;
      loading.value = false;
      data.value = res.results;
      pagination.value = reactive(newPagination);
    });
  };

  const handleTableChange = (
    newpagination: {
      current: number;
      pageSize: number;
      total: number;
    },
    filters: {
      gender: any[];
    },
    sorter: {
      column: object;
      columnKey: string;
      field: string;
      order: string;
    }
  ) => {
    const pager: {
      current: number;
      total: number;
    } = { ...pagination.value };
    pager.current = newpagination.current;
    pagination.value = pager;
    fetch({
      results: newpagination.pageSize,
      page: newpagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  fetch();

  const unwatch = watch(inputValue, (n, o) => {
    console.log(11);
  });

  onUnmounted(() => {
    unwatch();
  });

  return {
    inputValue,
    handleTableChange,
    loading,
    data,
    pagination
  };
}
