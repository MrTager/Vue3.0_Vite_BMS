<template>
  <div>
    <Dialog ref="formDialog" title="新增" width="800">
      <DynamicForm
        ref="dynamicForm"
        :config="dynamicFormConfig"
        :col="2"
        :colWidth="400"
        :formWidth="800"
        :buttonConfig="{
          show: false,
        }"
      >
        <el-button @click="formSubmit()">{{ "提交" }}</el-button>
        <el-button @click="formReset()">{{ "重置" }}</el-button>
      </DynamicForm>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
import Dialog from "@/components/Dialog/index.vue";
import DynamicForm from "@/components/DynamicForm/index.vue";
import { FormConfig } from "../config";

const dynamicFormConfig = reactive(FormConfig);
const formDialog = ref();

/**
 * 动态表单
 *
 */
const dynamicForm = ref();

const formSubmit = () => {
  dynamicForm.value.onSubmit();
};
const formReset = () => {
  dynamicForm.value.onReset();
};
const formClose = () => {
  formDialog.value.handleClose();
};
const formShow = () => {
  formDialog.value.handleShow();
};
defineExpose({
  formClose,
  formShow,
});
</script>
<style lang="scss" scoped></style>
