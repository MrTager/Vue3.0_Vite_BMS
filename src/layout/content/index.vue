<template>
  <el-main>
    <div class="content">
      <transition name="fade-transform" mode="out-in">
        <router-view :key="$route.path"></router-view>
      </transition>
    </div>
  </el-main>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.el-main {
  color: #333;
  padding: 0 24px 20px;
}
</style>
