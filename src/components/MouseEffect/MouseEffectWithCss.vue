<!-- This example not working correct  -->

<template>
  <section
    class="mouse-effect"
    :style="{ backgroundColor }"
    @mousemove="mouseMove"
  >
    <MouseEffectTitle title="CSS DEMO" />
    <span
      v-for="(dot, i) in dots"
      class="circle"
      :style="{
        ...styleObject,
        opacity: 1 - i * styleObject['--opacity-step'],
        transform: `translate(${dot.x - size / 2}px, ${dot.y - size / 2}px)`,
      }"
      :key="i"
    >
    </span>
  </section>
</template>

<script setup lang="ts">
import { reactive, withDefaults, defineProps, watch, ref } from "vue";
import MouseEffectTitle from "./MouseEffectTitle";

import { IMouseEffectProps, defaultMouseEffectProps } from "./MouseEffectProps";
import { StyleUtil } from "../../utilities/StyleUtil";

const props = withDefaults(defineProps<IMouseEffectProps>(), {
  ...defaultMouseEffectProps,
});

const dots = reactive(
  Array.from({ length: props.count }, () => ({ x: 0, y: 0 }))
);

const styleObject = ref({
  backgroundColor: props.itemColor,
  width: props.size + "px",
  height: props.size + "px",
  "--opacity-step": StyleUtil.calculateOpacityStep(
    props.count,
    props.opacityStep
  ),
});

function mouseMove(event: MouseEvent) {
  const mousePosition = { x: event.clientX, y: event.clientY };
  for (let i = 0; i < props.count; i++) {
    const d = dots[i];
    setTimeout(() => {
      d.x += (mousePosition.x - d.x) * props.speed;
      d.y += (mousePosition.y - d.y) * props.speed;
    }, i * 100);
  }
}

watch(
  () => props,
  (props) => {
    styleObject.value = {
      backgroundColor: props.itemColor,
      width: props.size + "px",
      height: props.size + "px",
      "--opacity-step": StyleUtil.calculateOpacityStep(
        props.count,
        props.opacityStep
      ),
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

.circle {
  position: absolute;
  border-radius: 50%;
}
</style>
