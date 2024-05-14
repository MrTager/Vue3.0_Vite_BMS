<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      :title="props.title"
      :width="props.width"
      :before-close="handleClose"
    >
      <slot></slot>
      <template v-if="props.footer.show" #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">{{
            props.footer.cancelText
          }}</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            {{ props.footer.confirmText }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  width: {
    type: String,
    default: "500",
  },
  footer: {
    type: Object,
    default: () => {
      return {
        show: false,
        confirmText: "确定",
        cancelText: "取消",
      };
    },
  },
});

const dialogVisible = ref(false);

const handleShow = () => {
  dialogVisible.value = true;
};
const handleClose = () => {
  dialogVisible.value = false;
};

defineExpose({
  handleClose,
  handleShow,
});
</script>
<style lang="scss" scoped></style>
