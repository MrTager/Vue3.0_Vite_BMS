<template>
  <div>
    <el-form
      v-if="afterInit"
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="auto"
      :style="{ maxWidth: `${props.formWidth}px` }"
    >
      <el-descriptions :column="props.col" title="">
        <el-descriptions-item
          v-for="(item, index) in config || []"
          :key="index"
          label=""
          :width="props.colWidth"
        >
          <el-form-item :label="item.label" :prop="item.name">
            <el-input
              v-if="item.componentType === 'Input'"
              v-model="form[item.name]"
              :type="item.options?.type || ''"
              :placeholder="item.options?.placeholder || ''"
              :rows="item.options?.rows || 1"
              :disabled="item.options?.disabled || false"
              :readonly="item.options?.readonly || false"
              :clearable="item.options?.clearable || false"
              @input="
                (e: any) => {
                  item.callback({ e, type: 'input' });
                }
              "
              @change="
                (e: any) => {
                  item.callback({ e, type: 'change' });
                }
              "
              @blur="
                (e: any) => {
                  item.callback({ e, type: 'blur' });
                }
              "
              @focus="
                (e: any) => {
                  item.callback({ e, type: 'focus' });
                }
              "
              @clear="
                (e: any) => {
                  item.callback({ e, type: 'clear' });
                }
              "
            />
            <el-select
              v-if="item.componentType === 'Select'"
              v-model="form[item.name]"
              :placeholder="item.options?.placeholder || ''"
              :disabled="item.options?.disabled || false"
              :readonly="item.options?.readonly || false"
              :clearable="item.options?.clearable || false"
              @change="
                (e: any) => {
                  item.callback({ e, type: 'change', item });
                }
              "
              @blur="
                (e: any) => {
                  item.callback({ e, type: 'blur' });
                }
              "
              @focus="
                (e: any) => {
                  item.callback({ e, type: 'focus' });
                }
              "
              @clear="
                (e: any) => {
                  item.callback({ e, type: 'clear' });
                }
              "
              @visible-change="
                (e: any) => {
                  item.callback({ e, type: 'visible-change' });
                }
              "
              @remove-tag="
                (e: any) => {
                  item.callback({ e, type: 'remove-tag' });
                }
              "
            >
              <el-option
                v-for="(optionItem, optionIndex) in item.options.selectOptions"
                :key="optionIndex"
                :label="optionItem.label"
                :value="optionItem.value"
              ></el-option>
            </el-select>
            <el-date-picker
              v-if="item.componentType === 'DatePicker'"
              v-model="form[item.name]"
              :type="item.options?.type || 'date'"
              :placeholder="item.options?.placeholder || ''"
              :disabled="item.options?.disabled || false"
              :readonly="item.options?.readonly || false"
              :clearable="item.options?.clearable || false"
              style="width: 100%"
              @change="
                (e: any) => {
                  item.callback({ e, type: 'change', item });
                }
              "
              @blur="
                (e: any) => {
                  item.callback({ e, type: 'blur' });
                }
              "
              @focus="
                (e: any) => {
                  item.callback({ e, type: 'focus' });
                }
              "
              @calendar-change="
                (e: any) => {
                  item.callback({ e, type: 'calendar-change' });
                }
              "
              @panel-change="
                (e: any) => {
                  item.callback({ e, type: 'panel-change' });
                }
              "
              @visible-change="
                (e: any) => {
                  item.callback({ e, type: 'visible-change' });
                }
              "
            />
            <el-switch
              v-if="item.componentType === 'Switch'"
              v-model="form[item.name]"
              :disabled="item.options?.disabled || false"
              :readonly="item.options?.readonly || false"
              @change="
                (e: any) => {
                  item.callback({ e, type: 'change', item });
                }
              "
            />
            <el-checkbox-group
              v-if="item.componentType === 'CheckBoxGroup'"
              v-model="form[item.name]"
              :disabled="item.options?.disabled || false"
              :readonly="item.options?.readonly || false"
              @change="
                (e: any) => {
                  item.callback({ e, type: 'change', item });
                }
              "
            >
              <el-checkbox
                v-for="(selectOption, selectIndex) in item.options
                  ?.selectOptions"
                :key="selectIndex"
                :value="selectOption.value"
                :name="selectOption.value"
              >
                {{ selectOption.label }}
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group
              v-if="item.componentType === 'RadioGroup'"
              v-model="form[item.name]"
              :disabled="item.options?.disabled || false"
              :readonly="item.options?.readonly || false"
              @change="
                (e: any) => {
                  item.callback({ e, type: 'change', item });
                }
              "
            >
              <el-radio
                v-for="(selectOption, selectIndex) in item.options
                  ?.selectOptions"
                :key="selectIndex"
                :value="selectOption.value"
              >
                {{ selectOption.label }}</el-radio
              >
            </el-radio-group>
            <TableListGroup
              v-if="item.componentType === 'TableListGroup'"
              v-model="form[item.name]"
              :disabled="item.options?.disabled || false"
              :readonly="item.options?.readonly || false"
              :columns-options="item.options?.columnsOptions || []"
              :clearable="item.options?.clearable || true"
              @change="
                (e: any) => {
                  item.callback({ e, type: 'change', item });
                }
              "
            ></TableListGroup>
          </el-form-item>
        </el-descriptions-item>
        <el-descriptions-item>
          <el-form-item>
            <div
              v-if="props.buttonConfig.show"
              :style="{
                width: '100%',
                textAlign: props.buttonConfig.position,
              }"
            >
              <el-button type="primary" @click="onSubmit">{{
                props.buttonConfig.submitText
              }}</el-button>
              <el-button @click="onReset">{{
                props.buttonConfig.resetText
              }}</el-button>
            </div>
            <slot v-else></slot>
          </el-form-item>
        </el-descriptions-item>
      </el-descriptions>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import TableListGroup from "@/components/TableListGroup/index.vue";
// type FieldToProp<T extends { name: string; dataType: string }> = {
//   [P in T["name"]]: T["dataType"] extends "string"
//     ? string
//     : T["dataType"] extends "number"
//       ? number
//       : T["dataType"] extends "boolean"
//         ? boolean
//         : never;
// };

// type RuleForm = FieldToProp<(typeof props.config)[number]>;
const afterInit = ref<boolean>(false);
const props = defineProps({
  config: {
    type: Array,
    required: true,
  },
  col: {
    type: Number,
    default: 1,
  },
  colWidth: {
    type: Number,
    default: 500,
  },
  formWidth: {
    type: Number,
    default: 600,
  },
  buttonConfig: {
    type: Object,
    default: () => {
      return {
        show: true,
        submitText: "提交",
        resetText: "重置",
        position: "right",
      };
    },
  },
});

const ruleFormRef: any = ref<FormInstance>();
const form: any = ref({});
const rules: any = ref({});
const config: Array<any> = props.config;

onMounted(() => {
  config.forEach((item: any) => {
    form.value[item.name] = item.defaultValue;
    rules.value[item.name] = item.options.rules;
  });
  afterInit.value = true;
});

const onSubmit = async () => {
  if (!ruleFormRef.value) return;
  await ruleFormRef.value.validate((valid: any, fields: any) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};
const onReset = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};
defineExpose({
  onSubmit,
  onReset,
});
</script>
<style lang="scss" scoped></style>
