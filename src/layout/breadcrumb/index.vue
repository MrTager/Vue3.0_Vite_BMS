<template>
  <div class="box">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item>{{ name || "根目录" }}</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, i) in matched" :key="i">{{
        item?.meta?.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, watch, ref } from "vue";
import { ArrowRight } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";

const route = useRoute();
const name = ref(import.meta.env.VITE_APP_NAME);
const matched = ref(route.matched.length && route.matched.slice(1));
watch(
  () => route.path,
  () => {
    matched.value = route.matched.length && route.matched.slice(1);
  },
);
</script>
<style lang="scss" scoped>
.box {
  height: 30px;
  padding-left: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>
