import { ref, reactive } from "vue";
// util
import { apiGet } from "common/network";
import { get } from "lodash";
// compostion api
import useDebouncedRef from "./useDebouncedRef";

interface TableParams {
  limit: number;
  page: number;
}
interface TableConfig {
  url: string;
  params: TableParams;
}

export default function useTable(config: TableConfig) {
  const url = get(config, "url", "");
  const params = get(config, "params", {
    limit: 10,
    page: 1
  });
  const data = ref<any[]>([]);
  const loading = ref<boolean>(false);
  const pagination = ref<{
    total: number;
    page: number;
  }>({
    total: 0,
    page: 1
  });
  const inputValue = useDebouncedRef("");
  const fetch = (params = {}) => {
    loading.value = true;
    apiGet(url, {
      ...params
    }).then(
      res => {
        const newPagination = { ...pagination.value };
        newPagination.total = get(res, "data.total", 0);
        loading.value = false;
        data.value = get(res, "data.productlist", []);
        pagination.value = reactive(newPagination);
      },
      () => {
        loading.value = true;
      }
    );
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
      page: number;
      total: number;
    } = { ...pagination.value };
    pager.page = newpagination.current;
    pagination.value = pager;
    fetch({
      limit: params.limit,
      page: newpagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters
    });
  };

  fetch(params);

  // const unwatch = watch(inputValue, (n, o) => {
  //   console.log(11);
  // });

  // onUnmounted(() => {
  //   unwatch();
  // });

  return {
    inputValue,
    handleTableChange,
    loading,
    data,
    pagination
  };
}
