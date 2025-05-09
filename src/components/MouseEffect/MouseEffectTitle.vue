<template>
  <h2 class="title">{{ title }}</h2>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
withDefaults(defineProps<{ title?: string }>(), {
  title: "DEMO",
});
</script>

<style scoped>
.title {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  color: white;
}
</style>
