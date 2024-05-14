<template>
  <div>
    <div>
      <Search
        :list="formList"
        :form.sync="queryForm"
        class="mt20"
        :size="'default'"
        :change="formOnChange"
        @query="onSearch"
        @reset="onSearch"
      />
    </div>
    <div>
      <el-button type="primary" @click="create">新增</el-button>
      <SearchTable
        :loading="tableConfig.loading"
        :list="tableData"
        :columns="tableConfig.columns"
        :query-params="{
          pageNumber: tableConfig.pageNumber,
          pageSize: tableConfig.pageSize,
        }"
        :total="tableConfig.total"
        :row-key="'id'"
        lazy
        class="mt16"
        @pageChange="getTableData"
      >
        <template #operation>
          <el-button type="text" size="small" @click="() => {}">编辑</el-button>
        </template>
      </SearchTable>
    </div>
    <FormDialog ref="formDialog" />
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import Search from "@/components/Search/index.vue";
import SearchTable from "@/components/SearchTable/index.vue";
import FormDialog from "./components/FormDialog.vue";
import { SearchList, QueryNormal, TableConfig, GetPage } from "./config";
import { formationQueryFormParams } from "@u/basicsUtils";

const formList = ref<any[]>(SearchList);
const queryForm = ref<any>(QueryNormal);
const tableData = ref<any[]>([
  { taskSubName: 1, subCatalogCode: 1, taskTypeText: 1 },
]);
const tableConfig = ref<any>(TableConfig);

const formOnChange = ({ val, field }: any) => {
  queryForm.value[field] = val;
};

const onSearch = (params: any) => {
  getTableData();
};

/**
 * 查询
 */
const getTableData = async () => {
  tableConfig.value.loading = true;
  tableData.value = [];
  const params = {
    pageNumber: tableConfig.value.pageNumber,
    pageSize: tableConfig.value.pageSize,
    params: {
      ...formationQueryFormParams(queryForm.value),
    },
  };
  const result = await GetPage(params);
  if (result.code === 200) {
    tableConfig.value.total = result.data.total;
    tableConfig.value.pageNumber = result.data.pageNumber;
    tableConfig.value.pageSize = result.data.pageSize;
  }
  tableConfig.value.loading = false;
};

/**
 * 表格操作相关函数
 */
const handleView = (row: any) => {};

const formDialog = ref();
const create = () => {
  formDialog.value.formShow();
};
</script>
<style lang="scss" scoped></style>
