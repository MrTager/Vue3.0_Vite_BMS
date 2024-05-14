<template>
  <div>
    <a
      v-if="props.route.meta.isExternal"
      :href="props.route.path"
      target="_blank"
    >
      <slot />
    </a>
    <router-link v-else :to="props.route.path">
      <slot />
    </router-link>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps(["route"]);
</script>
<style lang="scss" scoped></style>
