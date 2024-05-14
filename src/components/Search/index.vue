<!-- eslint-disable vue/no-mutating-props -->
<template>
  <el-form
    ref="formRef"
    :inline="true"
    layout="horizontal"
    :model="props.form"
    :rules="props.rules"
    :label-width="props.labelWidth"
    :label-position="props.labelPosition"
    v-bind="$attrs"
    :size="props.size"
    class="demo-form-inline"
    @submit.native.prevent
  >
    <el-form-item
      v-for="(item, index) in props.list"
      :key="index"
      :label="item.label"
      :rules="item.rules ? item.rules : []"
      :prop="item.field"
      :label-width="item.labelWidth"
    >
      <template v-if="item.tooltip" #label>
        <el-tooltip :content="item.tooltip" placement="top">
          <i class="el-icon-question"></i>
        </el-tooltip>
        {{ item.label }}
      </template>
      <span v-if="item.type === 'text'">{{ props.form[item.field] }}</span>
      <el-input
        v-else-if="item.type === 'input'"
        v-model="props.form[item.field]"
        type="input"
        :placeholder="item.placeholder || `请输入${item.label}`"
        clearable
        :disabled="item.disabled || false"
        :maxlength="item.length || 100"
      >
        <template v-if="item.prefix" #prefix>
          <span>{{ item.prefix || "" }}</span>
        </template>
        <template v-if="item.suffix" #suffix>
          <span>{{ item.suffix || "" }} </span>
        </template>
      </el-input>
      <el-select
        v-else-if="item.type === 'select'"
        :value="props.form[item.field]"
        :disabled="item.disabled || false"
        filterable
        :placeholder="item.placeholder || `请选择${item.label}`"
        clearable
        :multiple="item.multiple || false"
        @change="onChangeSelect($event, item)"
      >
        <el-option
          v-for="(option, optionIndex) in item.extra
            ? $attrs[item.extra] || []
            : item.format || []"
          :key="optionIndex"
          :value="option.value"
          :label="option.label"
        ></el-option>
      </el-select>
      <el-date-picker
        v-else-if="item.type === 'datepicker'"
        :value="props.form[item.field] || ''"
        :type="item.dateType || 'date'"
        :format="item.dateFormat || 'yyyy-MM-dd'"
        clearable
        :value-format="item.dateFormat || 'yyyy-MM-dd'"
        :placeholder="item.placeholder || `请选择${item.label}`"
        :disabled="item.disabled || false"
        v-bind="item.otherAttr || {}"
        @input="emit('update:form', { ...props.form, [item.field]: $event })"
      ></el-date-picker>
      <el-time-select
        v-else-if="item.type === 'timeselect'"
        :value="props.form[item.field] || ''"
        :picker-options="item.pickerOptions || {}"
        clearable
        :value-format="item.dateFormat || ''"
        :placeholder="item.placeholder || `请选择${item.label}`"
        :disabled="item.disabled || false"
        @input="emit('update:form', { ...props.form, [item.field]: $event })"
      >
      </el-time-select>

      <el-radio-group
        v-else-if="item.type === 'radio'"
        :value="props.form[item.field]"
        @input="onChangeSelect($event, item)"
      >
        <el-radio
          v-for="(option, optionIndex) in item.extra
            ? $attrs[item.extra] || []
            : item.format || []"
          :key="optionIndex"
          :label="option.value"
          >{{ option.label }}</el-radio
        >
      </el-radio-group>
      <el-cascader
        v-else-if="item.type === 'cascader'"
        :value="props.form[item.field]"
        :disabled="item.disabled || false"
        filterable
        :placeholder="item.placeholder || `请选择${item.label}`"
        clearable
        :multiple="item.multiple || false"
        :options="item.extra ? $attrs[item.extra] || [] : item.format || []"
        :props="
          item.props || {
            label: 'label',
            value: 'value',
            children: 'children',
          }
        "
        @change="onChangeCascader($event, item)"
      ></el-cascader>
      <template v-else-if="item.slot">
        <slot :name="item.slot" :item="item" class="w100"></slot>
      </template>
    </el-form-item>
    <slot>
      <el-form-item class="sepcialFormContent">
        <el-button type="primary" @click="emit('query')">
          <el-icon class="el-icon--left"
            ><svg-icon name="search" color="#fff"
          /></el-icon>
          查询
        </el-button>
        <el-button @click="onReset">
          <el-icon class="el-icon--left"
            ><svg-icon name="reset" color="#000" /></el-icon
          >重置</el-button
        >
      </el-form-item>
    </slot>
  </el-form>
</template>
<script lang="ts" setup>
import { ref, useAttrs, defineProps } from "vue";
type SelectModel = string | number | string[] | number[];
interface Props {
  form: FormValue;
  rules?: any;
  list: FormItem[];
  labelWidth?: string;
  labelPosition?: string;
  inline?: boolean;
  size?: string;
  change?: (data: any) => void;
}
interface FormItem {
  label: string;
  field: string;
  [key: string]: any;
}
interface FormValue {
  [key: string]: any;
}
const emit = defineEmits(["change", "selectChange", "query", "reset"]);
const props = withDefaults(defineProps<Props>(), {
  form: () => {
    return {};
  },
  rules: () => {
    return {};
  },
  list: () => [],
  inline: true,
  // labelWidth: '107px',
  size: "medium",
});
const attrs = useAttrs();
const formRef = ref();

const validate = () => {
  return new Promise((resolve, reject) => {
    formRef.value.validate((valid: boolean) => {
      if (!valid) {
        reject(new Error("验证失败"));
        return;
      }
      resolve(null);
    });
  });
};
const validateField = (field: string) => {
  return new Promise((resolve, reject) => {
    formRef.value.validateField(field, (errMsg: any) => {
      if (errMsg) {
        reject(new Error(errMsg || "验证失败"));
        return;
      }
      resolve(null);
    });
  });
};

const resetFields = () => {
  formRef.value.resetFields();
};
const clearValidate = (field?: string) => {
  if (field) {
    formRef.value.clearValidate(field);
  } else {
    formRef.value.clearValidate();
  }
};
const onChangeCascader = (value: SelectModel, item: any) => {
  emit("change", { ...props.form, [item.field]: value });
  if (
    item.event &&
    attrs[item.event] &&
    typeof attrs[item.event] === "function"
  ) {
    const funName = attrs[item.event] as (
      field: string,
      value: SelectModel,
    ) => void;
    funName(item.field, value);
    // attrs[item.event](item.field, value);
  }
  emit("selectChange", value, item);
};
const onChangeSelect = (value: SelectModel, item: any) => {
  emit("update:form", { ...props.form, [item.field]: value });
  if (
    item.event &&
    attrs[item.event] &&
    typeof attrs[item.event] === "function"
  ) {
    const funName = attrs[item.event] as (
      field: string,
      value: SelectModel,
    ) => void;
    funName(item.field, value);
  }
  emit("selectChange", value, item);
};

// 重制
const onReset = () => {
  formRef.value.resetFields();
  emit("reset");
};

defineExpose({
  validate,
  validateField,
  resetFields,
  clearValidate,
});
</script>
<style lang="scss" scoped>
.demo-form-inline {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
