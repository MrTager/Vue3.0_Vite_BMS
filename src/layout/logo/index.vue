<template>
  <section class="logo-box">
    <img src="@/assets/vue.svg" alt="" />
    <h3>事项平台</h3>
  </section>
</template>

<script lang="ts" setup>
defineProps({
  status: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss" scoped>
.logo-box {
  height: 100%;
  padding: 10px;

  // background: #2d2d2d;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: #fff;

  img {
    height: 100%;
    display: block;
  }

  h3 {
    margin-left: 10px;
    display: block;
  }
}
</style>
