<template>
  <div class="mouse-effect" @mousemove="mouseMove">
    <span
      v-for="(dot, i) in dots"
      class="circle"
      :key="i"
      :style="{
        opacity: 1 - i * 0.2,
        transform: `translate(${dot.x - size / 2}px, ${dot.y - size / 2}px)`,
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
  dots[0].x = mousePosition.x;
  dots[0].y = mousePosition.y;

  for (let i = 1; i < numDots; i++) {
    const d = dots[i];
    setTimeout(() => {
      d.x += (mousePosition.x - d.x) * 0.2;
      d.y += (mousePosition.y - d.y) * 0.2;
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
  border-radius: 50%;
}
</style>
