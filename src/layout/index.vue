<template>
  <div class="common-layout">
    <el-container>
      <el-aside class="sidebar-container">
        <div class="iconTitle">
          <Logo></Logo>
        </div>
        <div class="menu"><Menu></Menu></div>
      </el-aside>
      <el-container class="main-container">
        <el-header class="headerBox">
          <Header></Header>
        </el-header>
        <div class="breadcrumbBox">
          <Breadcrumb></Breadcrumb>
        </div>
        <el-main class="mainBox">
          <Content></Content>
        </el-main>
        <el-footer class="footerBox">Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts" setup>
import Header from "./header/index.vue";
import Content from "./content/index.vue";
import Logo from "./logo/index.vue";
import Menu from "./menu/index.vue";
import Breadcrumb from "./breadcrumb/index.vue";
</script>
<style lang="scss" scoped>
.sidebar-container {
  display: block;
  height: 100vh;
  width: 200px !important;
  color: #333;
  background-color: #227aff;
}
.main-container {
  position: relative;
}
.headerBox {
  position: absolute;
  width: 100%;
}
.breadcrumbBox {
  position: absolute;
  width: 100%;
  top: 72px;
  height: 30px;
}
.mainBox {
  position: absolute;
  top: 102px;
  width: 100%;
  height: calc(100% - 60px - 102px);
  overflow-y: auto;
}
.footerBox {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.menu {
  height: calc(100% - 56px);
  overflow-y: scroll;
}
</style>
