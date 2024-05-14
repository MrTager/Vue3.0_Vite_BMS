<template>
  <el-scrollbar>
    <el-menu :collapse="false" :default-openeds="[currentRouteName]">
      <SubMenu :tree="menuTree"></SubMenu>
    </el-menu>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute, RouteRecordRaw } from "vue-router";
import router from "@/router";
import SubMenu from "./SubMenu.vue";
const currentRouteName = ref(useRoute().name);
const routes: Array<RouteRecordRaw> = router.options.routes.filter(
  (it: RouteRecordRaw) => it.path === "/",
);
const menuTree: Array<RouteRecordRaw> =
  (routes.length && routes[0].children) || [];
</script>
<style lang="scss" scoped></style>
