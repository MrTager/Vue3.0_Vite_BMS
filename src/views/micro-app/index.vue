<template>
  <div><div id="micorApp">这是微前端页面</div></div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue";
import { start } from "qiankun";

onMounted(() => {
  if (!(window as any).qiankunStarted) {
    (window as any).qiankunStarted = true;
    start({ sandbox: { experimentalStyleIsolation: true } });
  } else {
    (window as any).qiankunStarted = false;
    location.reload();
  }
});
</script>
<style lang="scss" scoped></style>
