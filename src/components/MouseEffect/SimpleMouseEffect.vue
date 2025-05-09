<template>
  <div class="mouse-effect" @mousemove="mouseMove">
    <span
      v-for="(dot, i) in dots"
      class="circle"
      :key="i"
      :style="{
        opacity: 1 - i * 0.2,
        left: `${dot.x}px`,
        top: `${dot.y}px`,
      }"
    ></span>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
const numDots = 5;
const delay = 100;
const size = 40;

const dots = reactive(Array.from({ length: numDots }, () => ({ x: 0, y: 0 })));

function mouseMove(event: MouseEvent) {
  const mousePosition = { x: event.clientX, y: event.clientY };

  for (let i = 0; i < numDots; i++) {
    const d = dots[i];
    setTimeout(() => {
      d.x += mousePosition.x - d.x;
      d.y += mousePosition.y - d.y;
    }, i * delay);
  }
}
</script>

<style scoped>
.mouse-effect {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #222;
}

.circle {
  position: absolute;
  background: cyan;
  width: v-bind(size + "px");
  height: v-bind(size + "px");
  transform: translate(-50%, -50%);
  border-radius: 50%;
}
</style>
