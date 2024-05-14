<template>
  <div>
    <el-table
      ref="tableRef"
      v-loading="props.loading"
      class="fx_table"
      :data="props.list"
      :border="props.border"
      :header-cell-style="props.headerCellStyle"
      :tree-props="props.treeProps"
      :default-expand-all="props.defaultExpandAll"
      :row-key="props.rowKey"
      style="width: 100%"
      :default-sort="props.defaultSort"
      :lazy="props.lazy"
    >
      <el-table-column
        v-for="(item, index) in props.columns"
        v-bind="item"
        :key="index"
      >
        <template
          v-if="item.type !== 'selection' && item.type !== 'index'"
          #default="{ row, $index }"
        >
          <span v-if="item.prop === 'index'">{{
            (props.queryParams.pageNumber - 1) * props.queryParams.pageSize +
            $index +
            1
          }}</span>
          <slot
            v-else-if="item.slotName"
            :name="item.slotName"
            :item="item"
            :row="row"
            :index="$index"
          ></slot>
          <span v-else>{{ row[item.prop] || "-" }}</span>
        </template>
      </el-table-column>
      <div slot="empty" class="flex-column g-empty-table-box">
        <span class="g-empty-table-box--txt">{{
          props.emptyText ? props.emptyText : "暂无数据"
        }}</span>
      </div>
    </el-table>
    <el-pagination
      v-if="props.total > 0"
      class="fx_pagination mt12"
      :total="props.total"
      :layout="props.layout"
      background
      :page-size="props.queryParams.pageSize"
      :current-page="props.queryParams.pageNumber"
      :hide-on-single-page="props.hideOnSinglePage"
      @current-change="onPageChange"
      @size-change="onPageSizeChange"
    />
  </div>
</template>
<script lang="ts" setup>
interface QueryParams {
  pageNumber: number;
  pageSize: number;
}
interface Props {
  list: any[];
  columns: any[];
  total?: number;
  border?: boolean;
  queryParams: QueryParams;
  hideOnSinglePage?: boolean;
  layout?: string;
  treeProps?: any | undefined;
  rowKey?: string | undefined;
  headerCellStyle?: any;
  defaultExpandAll?: boolean;
  defaultSort?: any;
  emptyText?: string;
  lazy?: boolean;
  loading?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
  columns: () => {
    return [] as any[];
  },
  total: 0,
  border: true,
  queryParams: () => {
    return {
      pageNumber: 1,
      pageSize: 10,
    };
  },
  hideOnSinglePage: true,
  layout: "total, sizes, prev, pager, next, jumper",
  treeProps: () => {
    return {
      children: "children",
      hasChildren: "hasChildren",
    };
  },
  rowKey: undefined,
  headerCellStyle: () => {
    return { backgroundColor: "#f1f6fe" };
  },
  defaultExpandAll: false,
  defaultSort: () => {
    return {};
  },
  lazy: true,
  loading: () => {
    return false;
  },
});
const emit = defineEmits(["update:queryParams", "pageChange"]);
const onPageChange = (page: number) => {
  emit("update:queryParams", {
    ...props.queryParams,
    pageNumber: page,
  });
  emit("pageChange");
};
const onPageSizeChange = (pageSize: number) => {
  let { pageNumber } = props.queryParams;
  if (pageNumber * pageSize > props.total) {
    pageNumber = 1;
  }
  emit("update:queryParams", { pageNumber, pageSize });
  emit("pageChange");
};
</script>
<style></style>
