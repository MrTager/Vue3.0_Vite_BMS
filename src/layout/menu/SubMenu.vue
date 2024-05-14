<template>
  <div>
    <div v-for="(item, i) in props.tree" :key="i">
      <div v-if="!item?.children && !item?.children?.length">
        <AppLink :route="item">
          <el-menu-item :index="item.name">
            <el-icon><svg-icon name="home" color="#fff" /></el-icon
            >{{ item.meta.title }}</el-menu-item
          >
        </AppLink>
      </div>

      <el-sub-menu v-else :index="item.name">
        <template #title>
          <el-icon><svg-icon name="home" color="#fff" /></el-icon>
          {{ item.meta.title }}
        </template>
        <MenuItemGroup :tree="item.children"></MenuItemGroup>
      </el-sub-menu>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
import MenuItemGroup from "./MenuItemGroup.vue";
import AppLink from "./AppLink.vue";
const props = defineProps(["tree"]);
</script>
<style lang="scss" scoped></style>
