/** * 废弃 */
<template>
  <div>
    <div class="tableColumn bg-gray">
      <div
        v-for="(item, index) in props.columnsOptions"
        :key="index"
        class="tableitem"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="tableColumn">
      <div
        v-for="(item, index) in props.columnsOptions"
        :key="index"
        class="tableitem"
      >
        <el-input
          v-if="item.component === 'Input'"
          v-model="item.value"
          :clearable="props.clearable"
          @change="(val) => handleChange(val, item)"
        ></el-input>
        <el-select
          v-if="item.component === 'Select'"
          v-model="item.value"
          placeholder="请选择"
          :clearable="props.clearable"
          @change="(val) => handleChange(val, item)"
        >
          <el-option
            v-for="(item, index) in item.options"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div>
      <el-button link @click="addRow">+添加一行</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  vModel: {
    type: Array,
    default: () => [],
  },
  columnsOptions: {
    type: Array,
    default: () => [],
  },
  clearable: {
    type: Boolean,
    default: true,
  },
});
const handleChange = (val: any, item: any) => {
  let row = {};
  props.columnsOptions
    .map((it: any) => {
      let obj: any = {};
      obj[it.key] = it.value;
      return obj;
    })
    .forEach((it: any) => {
      row = { ...row, ...it };
    });
};
const addRow = () => {
  //   props.data.push({});
};
</script>
<style lang="scss" scoped>
.tableColumn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.bg-gray {
  background-color: rgb(206, 206, 206);
}
.tableitem {
  margin: 4px;
  min-width: 150px;
}
</style>
