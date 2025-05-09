<template>
  <section
    class="mouse-effect"
    :style="{ backgroundColor }"
    @mousemove="mouseMove"
  >
    <MouseEffectTitle title="request Animation Frame DEMO" />

    <div
      v-for="(dot, index) in dots"
      :key="index"
      class="cursor-effect"
      :style="{
        ...dotsBaseStyle,
        opacity: dot.opacity,
        transform: `translate(${dot.x - dot.offset}px, ${
          dot.y - dot.offset
        }px)`,
      }"
    ></div>
  </section>
</template>

<script setup lang="ts">
import {
  reactive,
  onMounted,
  ref,
  withDefaults,
  defineProps,
  watch,
} from "vue";
import MouseEffectTitle from "./MouseEffectTitle";

import { IMouseEffectProps, defaultMouseEffectProps } from "./MouseEffectProps";
import { StyleUtil } from "../../utilities/StyleUtil";

const props = withDefaults(defineProps<IMouseEffectProps>(), {
  ...defaultMouseEffectProps,
});

const offset = props.size / 2;
const opacityStep = StyleUtil.calculateOpacityStep(
  props.count,
  props.opacityStep
);

const mousePosition = reactive({ x: 0, y: 0 });
const dots = ref(
  Array.from({ length: props.count }, (_, i) => ({
    x: 0,
    y: 0,
    opacity: 1 - opacityStep * i,
    offset: offset,
  }))
);

const dotsBaseStyle = ref({
  backgroundColor: props.itemColor,
  width: props.size + "px",
  height: props.size + "px",
});

onMounted(() => {
  requestAnimationFrame(animate);
});

function animate() {
  dots.value.forEach((dot, i) => {
    // Stagger each dot's movement using a delayed update
    setTimeout(() => {
      // Smoothly move the dot towards the current x/y
      // coordinate relative to the previous point using linear interpolation
      const target = i === 0 ? mousePosition : dots.value[i - 1];
      dot.x += (target.x - dot.x) * props.speed;
      dot.y += (target.y - dot.y) * props.speed;
    }, i * 100); // Each dot is delayed compare previous with 100ms milliseconds for first load
  });
  requestAnimationFrame(animate);
}

function mouseMove(event: MouseEvent) {
  mousePosition.x = event.clientX;
  mousePosition.y = event.clientY;
}

watch(
  () => props,
  (props) => {
    const offset = props.size / 2;
    const opacityStep = StyleUtil.calculateOpacityStep(
      props.count,
      props.opacityStep
    );

    dots.value = Array.from({ length: props.count }, (_, i) => ({
      x: 0,
      y: 0,
      opacity: 1 - opacityStep * i,
      offset: offset,
    }));

    dotsBaseStyle.value = {
      backgroundColor: props.itemColor,
      width: props.size + "px",
      height: props.size + "px",
    };
  },
  { deep: true }
);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mouse-effect {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.mouse-effect .title {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  color: white;
}

.cursor-effect {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  border-radius: 50%;
}
</style>
